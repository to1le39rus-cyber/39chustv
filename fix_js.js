const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'services/service-booking.js');
let content = fs.readFileSync(file, 'utf8');

const newHTML = '<div class="header__inner">' +
        '<a href="/" class="logo">39 <span>СТ</span></a>' +
        '<nav class="nav" id="nav">' +
          '<div class="nav__item nav__item--dropdown">' +
            '<a href="/#directions" class="nav__link nav__link--dropdown-toggle">аправления <span class="nav__caret" aria-hidden="true">▾</span></a>' +
            '<div class="nav__dropdown" aria-label="Список услуг" style="grid-template-columns: 1fr; min-width: 240px; padding: 1rem;">' +
              '<a href="/services/yoga" class="nav__dropdown-link">ога</a>' +
              '<a href="/services/massage" class="nav__dropdown-link">ассаж</a>' +
              '<a href="/services/pravilo" class="nav__dropdown-link">равло</a>' +
              '<a href="/services/sound-meditation" class="nav__dropdown-link">вуковые медитации</a>' +
            '</div>' +
          '</div>' +
          '<a href="/services/trainers" class="nav__link">Тренеры</a>' +
          '<a href="/#founders" class="nav__link"> нас</a>' +
          '<a href="#0" data-booking-open class="nav__link nav__link--cta">аписаться</a>' +
        '</nav>' +
        '<button class="burger" id="burger" aria-label="еню">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
      '</div>';;

content = content.replace(/h\.innerHTML\s*=\s*([\\s\\S]*?)(?=\s*document\.body\.insertBefore)/g, h.innerHTML =\n + newHTML + '\n');
fs.writeFileSync(file, content);
