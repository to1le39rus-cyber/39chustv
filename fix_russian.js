const fs = require('fs');
let file = 'C:/Users/User/Desktop/проба/site/services/service-booking.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace('39 <span>СТ</span>', '39 <span>СТ</span>');
content = content.replace('аправления <span', 'аправления <span');
content = content.replace('ога</a>', 'ога</a>');
content = content.replace('ассаж</a>', 'ассаж</a>');
content = content.replace('равло</a>', 'равло</a>');
content = content.replace('вуковые медитации</a>', 'вуковые медитации</a>');
content = content.replace('> нас</a>', '> нас</a>');
content = content.replace('>аписаться</a>', '>аписаться</a>');

fs.writeFileSync(file, content, 'utf8');
