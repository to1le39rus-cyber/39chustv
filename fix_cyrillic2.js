const fs = require('fs');
let file = 'C//Users/User/Desktop/проба/site/services/service-booking.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace('39 <span>СТ</span>', '39 <span>ЧУВСТВО</span>');
content = content.replace('аправления <span', 'Направления <span');
content = content.replace('ога</a>', 'Йога</a>');
content = content.replace('ассаж</a>', 'Массаж</a>');
content = content.replace('равло</a>', 'ПравИло</a>');
content = content.replace('вуковые медитации</a>', 'Звуковые медитации</a>');
content = content.replace('> нас</a>', '>О нас</a>');
content = content.replace('>аписатьсь</a>', '>Записатьсѓ</a>');

fs.writeFileSync(file, content, 'utf8');
