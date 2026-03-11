# 39 ЧУВСТВО — Сайт студии

## Структура файлов

```
site/
├── index.html          — главная страница
├── style.css           — все стили
├── script.js           — JavaScript (анимации, форма, меню)
├── send.php            — отправка заявок в Telegram
├── .htaccess           — настройки Apache для Beget
└── img/                — папка с фотографиями
    ├── hero.jpg        — герой (1920×1080 или больше)
    ├── pravilo.jpg     — карточка Правило
    ├── pravilo-full.jpg — большое фото для секции Правило
    ├── hatha.jpg       — хатха-йога
    ├── kundalini.jpg   — кундалини
    ├── hammock.jpg     — йога в гамаках
    ├── qigong.jpg      — цигун
    ├── beloyar.jpg     — белояр
    ├── massage.jpg     — массаж
    ├── nails.jpg       — гвозди
    ├── sound.jpg       — звукотерапия
    ├── couple.jpg      — парные практики
    ├── 39love.jpg      — 39 оттенков
    ├── date.jpg        — свидание
    ├── men.jpg         — мужские круги
    ├── women.jpg       — женские круги
    ├── longevity.jpg   — долголетие
    ├── concert.jpg     — концерты
    ├── men-practice.jpg — блок "для мужчин" (полноразмерное)
    └── baltic.jpg      — море / Калининград
```

---

## ⚙️ Настройка Telegram-бота

### Шаг 1 — Создать бота
1. Откройте Telegram → найдите **@BotFather**
2. Напишите `/newbot`
3. Придумайте имя и username бота
4. Скопируйте **токен** вида `7123456789:AAHxxx...`

### Шаг 2 — Получить Chat ID
1. Напишите своему боту любое сообщение (например "старт")
2. Откройте в браузере:
   ```
   https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates
   ```
3. Найдите `"chat":{"id": 123456789}` — это ваш Chat ID

### Шаг 3 — Вставить в файл
Откройте `send.php` и замените строки:
```php
define('BOT_TOKEN', 'ВАШ_BOT_TOKEN_ЗДЕСЬ');
define('CHAT_ID',   'ВАШ_CHAT_ID_ЗДЕСЬ');
```

---

## 🚀 Загрузка на Beget

1. Войдите в **Панель управления Beget** → File Manager
   (или подключитесь по FTP/SFTP)
2. Перейдите в папку `public_html` (корень вашего домена)
3. Загрузите **все файлы** из папки `site/` в корень:
   - `index.html`
   - `style.css`
   - `script.js`
   - `send.php`
   - `.htaccess`
   - папку `img/` с фотографиями

### Подключение по FTP (альтернатива FileZilla)
```
Хост:     ftp.beget.com (или ваш домен)
Логин:    ваш логин beget
Пароль:   ваш FTP-пароль
Порт:     21
```

---

## 🖼 Как добавить фотографии

В `index.html` и `style.css` все изображения уже подключены — нужно только загрузить файлы в папку `img/`.

Для **героя** раскомментируйте строку в `style.css`:
```css
.hero__bg {
  /* Замените на: */
  background-image: url('img/hero.jpg');
  background-size: cover;
  background-position: center;
}
```

---

## 📞 Что нужно изменить перед запуском

1. **send.php** — вставить BOT_TOKEN и CHAT_ID
2. **index.html** — поменять ссылки на соцсети (`your_telegram`, `your_instagram`, `your_vk`)
3. **index.html** — указать точный адрес студии
4. **img/** — загрузить реальные фотографии
5. По желанию — добавить реальные цены в пакеты
