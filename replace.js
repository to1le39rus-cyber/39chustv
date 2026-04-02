const fs = require('fs');

function updateFile(file) {
    if (!fs.existsSync(file)) return;
    let text = fs.readFileSync(file, 'utf8');
    
    const startStr = '<div class="nav__dropdown" aria-label="Список услуг">';
    // In index.html the div that closes nav__dropdown is followed by </div> which closes nav__item--dropdown
    // And then <a href="#pravilo" class="nav__link">Правило</a>
    // Wait, let's just find `<div class="nav__dropdown"` and `<a href="#pravilo"` or `<a href="/services/trainers"`.
    
    let startIndex = text.indexOf(startStr);
    if (startIndex === -1) return;
    
    let endIndex = text.indexOf('<a href="/services/trainers" class="nav__link">Тренеры</a>');
    if (endIndex === -1) return;
    
    let newBlock = `<div class="nav__dropdown" aria-label="Список услуг" style="grid-template-columns: 1fr; min-width: 240px; padding: 1rem;">
          <a href="/services/yoga">Йога</a>
          <a href="/services/massage">Массаж</a>
          <a href="/services/pravilo">ПравИло</a>
          <a href="/services/sound-meditation">Звуковые медитации</a>
        </div>
      </div>
      `;
    
    text = text.substring(0, startIndex) + newBlock + text.substring(endIndex);
    fs.writeFileSync(file, text);
    console.log('Updated ' + file);
}

['index.html', 'services/trainers/index.html'].forEach(updateFile);

function updateJs(file) {
    if (!fs.existsSync(file)) return;
    let text = fs.readFileSync(file, 'utf8');
    
    // In service-booking.js, the text is encoded: '<div class="nav__dropdown" aria-label="\u0421\u043F\u0438\u0441\u043E\u043A \u0443\u0441\u043B\u0443\u0433">'
    let startStr = /'<div class="nav__dropdown" aria-label="[^"]+">' \+/;
    let matchStart = text.match(startStr);
    if (!matchStart) return;
    
    let endIndex = text.indexOf('\'<a href="/services/trainers" class="nav__link">РўСЂРµРЅРµСЂС‹</a>\''); // cyrillic encoded
    if (endIndex === -1) {
       endIndex = text.indexOf('\'<a href="/services/trainers" class="nav__link">');
    }
    
    if (endIndex !== -1) {
        let newBlock = `            '<div class="nav__dropdown" aria-label="\\u0421\\u043F\\u0438\\u0441\\u043E\\u043A \\u0443\\u0441\\u043B\\u0443\\u0433" style="grid-template-columns: 1fr; min-width: 240px; padding: 1rem;">' +
              '<a href="/services/yoga">\\u0419\\u043E\\u0433\\u0430</a>' +
              '<a href="/services/massage">\\u041C\\u0430\\u0441\\u0441\\u0430\\u0436</a>' +
              '<a href="/services/pravilo">\\u041F\\u0440\\u0430\\u0432\\u0418\\u043B\\u043E</a>' +
              '<a href="/services/sound-meditation">\\u0417\\u0432\\u0443\\u043A\\u043E\\u0432\\u044B\\u0435 \\u043C\\u0435\\u0434\\u0438\\u0442\\u0430\\u0446\\u0438\\u0438</a>' +
            '</div>' +
          '</div>' +
          `;
          
        text = text.substring(0, matchStart.index) + newBlock + text.substring(endIndex);
        fs.writeFileSync(file, text);
        console.log('Updated ' + file);
    }
}
updateJs('services/service-booking.js');
