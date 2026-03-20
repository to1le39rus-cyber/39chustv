<?php
/**
 * 39 ЧУВСТВО — Отправка заявок в Telegram Bot
 *
 * Инструкция по настройке:
 * 1. Создайте бота через @BotFather в Telegram → получите BOT_TOKEN
 * 2. Напишите боту любое сообщение, затем откройте:
 *    https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
 *    — найдите "chat":{"id": XXXX} — это ваш CHAT_ID
 * 3. Вставьте значения ниже
 */

define('BOT_TOKEN', '8567630647:AAFbEusntuoW-6sfMaPOKd6ebH0RiugVQQc');   // ← замените
define('CHAT_ID',   '429501361');       // ← замените

/* --------------------------------------------------------- */

header('Content-Type: application/json; charset=utf-8');

// Разрешаем только POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Читаем JSON
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
    exit;
}

// Санируем данные
$name    = htmlspecialchars(trim($data['name']    ?? ''), ENT_QUOTES, 'UTF-8');
$phone   = htmlspecialchars(trim($data['phone']   ?? ''), ENT_QUOTES, 'UTF-8');
$service = htmlspecialchars(trim($data['service'] ?? ''), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($data['message'] ?? ''), ENT_QUOTES, 'UTF-8');
$sourceTitle = htmlspecialchars(trim($data['source_title'] ?? ''), ENT_QUOTES, 'UTF-8');
$sourceUrl   = htmlspecialchars(trim($data['source_url'] ?? ''), ENT_QUOTES, 'UTF-8');

// Базовая валидация
if (mb_strlen($name, 'UTF-8') < 2 || mb_strlen($phone, 'UTF-8') < 5) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Validation failed']);
    exit;
}

// Формируем сообщение для Telegram
$text  = "🔔 *Новая заявка с сайта 39 ЧУВСТВО*\n\n";
$text .= "👤 *Имя:* {$name}\n";
$text .= "📱 *Телефон / Telegram:* {$phone}\n";

if ($service) {
    $text .= "📌 *Направление:* {$service}\n";
}
if ($sourceTitle || $sourceUrl) {
    $src = trim($sourceTitle . ($sourceUrl ? " ({$sourceUrl})" : ''));
    $text .= "🧭 *Источник:* {$src}\n";
}
if ($message) {
    $text .= "💬 *Сообщение:*\n{$message}\n";
}

$text .= "\n⏰ " . date('d.m.Y H:i') . " (МСК)";

// Отправляем через Telegram Bot API
$url  = "https://api.telegram.org/bot" . BOT_TOKEN . "/sendMessage";
$post = [
    'chat_id'    => CHAT_ID,
    'text'       => $text,
    'parse_mode' => 'Markdown',
];

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => http_build_query($post),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 10,
    CURLOPT_SSL_VERIFYPEER => true,
]);
$response = curl_exec($ch);
$curlErr  = curl_error($ch);
curl_close($ch);

if ($curlErr) {
    error_log("Telegram cURL error: {$curlErr}");
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Network error']);
    exit;
}

$tgResult = json_decode($response, true);

if (!empty($tgResult['ok'])) {
    echo json_encode(['ok' => true]);
} else {
    error_log("Telegram API error: " . $response);
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Telegram error']);
}
