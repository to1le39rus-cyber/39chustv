(function () {

  /* === ШАПКА САЙТА === */
    function addSiteHeader() {
    if (document.querySelector('.header')) return;
    var h = document.createElement('header');
    h.className = 'header';
    h.id = 'header';
    h.innerHTML =
      '<div class="header__inner">' +
        '<a href="/" class="logo">39 <span>ЧУВСТВО</span></a>' +
        '<nav class="nav" id="nav">' +
          '<div class="nav__item nav__item--dropdown">' +
            '<a href="/#directions" class="nav__link nav__link--dropdown-toggle">Направления <span class="nav__caret" aria-hidden="true">▾</span></a>' +
            '<div class="nav__dropdown" aria-label="Список услуг" style="grid-template-columns: 1fr; min-width: 240px; padding: 1rem;">' +
              '<a href="/services/yoga" class="nav__dropdown-link">Йога</a>' +
              '<a href="/services/massage" class="nav__dropdown-link">Массаж</a>' +
              '<a href="/services/pravilo" class="nav__dropdown-link">ПравИло</a>' +
              '<a href="/services/sound-meditation" class="nav__dropdown-link">Звуковые медитации</a>' +
            '</div>' +
          '</div>' +
          '<a href="/services/trainers" class="nav__link">Наша команда</a>' +
          '<a href="/#founders" class="nav__link">О нас</a>' +
          '<a href="#0" data-booking-open class="nav__link nav__link--cta">Записаться</a>' +
        '</nav>' +
        '<button class="burger" id="burger" aria-label="Меню">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
      '</div>';

    document.body.insertBefore(h, document.body.firstChild);

    /* Бургер */
    var burger = document.getElementById('burger');
    var nav = document.getElementById('nav');
    if (burger && nav) {
      burger.addEventListener('click', function () {
        nav.classList.toggle('is-open');
        burger.classList.toggle('is-active');
      });
    }

    /* Dropdown на мобильном */
    var toggleLink = nav ? nav.querySelector('.nav__link--dropdown-toggle') : null;
    var dropdownItem = nav ? nav.querySelector('.nav__item--dropdown') : null;
    if (toggleLink && dropdownItem) {
      toggleLink.addEventListener('click', function (e) {
        if (window.innerWidth > 900) return;
        e.preventDefault();
        dropdownItem.classList.toggle('is-expanded');
      });
    }

    /* Sticky */
    window.addEventListener('scroll', function () {
      h.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* === КЛАСС СТРАНИЦЫ ПО URL === */
  function setPageBodyClass() {
    var match = window.location.pathname.match(/\/services\/([^\/]+)/);
    if (match) {
      document.body.classList.add('svc-' + match[1]);
    }
  }

  /* === ФОНОВОЕ ФОТО ДЛЯ ГЕРОЯ === */
  function setHeroImage() {
    var hero = document.querySelector('.service-hero');
    if (!hero || hero.classList.contains('service-hero--massage')) return;
    var path = window.location.pathname;
    var img;
    if (/yoga|qigong|beloyar|aerial/.test(path))      img = '/img/yoga1.webp';
    else if (/pravilo|nails/.test(path))              img = '/img/pravilo.webp';
    else if (/sound|meditation|meditat/.test(path))   img = '/img/yoga.webp';
    else if (/couple|love|date/.test(path))           img = '/img/yoga3.webp';
    else if (/circle|longevity/.test(path))           img = '/img/yaest.webp';
    else if (/event|concert/.test(path))              img = '/img/hiroblock.webp';
    else if (/massage/.test(path))                    return;
    else                                               img = '/img/yoga2.webp';

    var s = document.createElement('style');
    s.textContent = '.service-hero--with-img::before { background-image: url("' + img + '"); }';
    document.head.appendChild(s);
    hero.classList.add('service-hero--with-img');

    /* Wrap hero inner content in hero-shell if not already there */
    var container = hero.querySelector('.container');
    if (container && !container.querySelector('.hero-shell')) {
      var shell = document.createElement('div');
      shell.className = 'hero-shell';
      while (container.firstChild) {
        shell.appendChild(container.firstChild);
      }
      container.appendChild(shell);
    }
  }

  function removeSocialPromoBlock() {
    document.querySelectorAll('.social-promo').forEach(function (el) {
      el.remove();
    });
  }

  function buildModal() {
    if (document.getElementById('bookingModal')) {
      return document.getElementById('bookingModal');
    }

    var wrapper = document.createElement('div');
    wrapper.className = 'booking-modal';
    wrapper.id = 'bookingModal';
    wrapper.setAttribute('aria-hidden', 'true');
    wrapper.innerHTML =
      '<div class="booking-modal__backdrop" data-booking-close></div>' +
      '<div class="booking-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="bookingTitle">' +
        '<button class="booking-modal__close" type="button" aria-label="Закрыть" data-booking-close>&times;</button>' +
        '<h2 class="booking-modal__title" id="bookingTitle">Запись на практику</h2>' +
        '<p class="booking-modal__sub" id="bookingSub">Оставьте заявку и мы свяжемся с вами.</p>' +
        '<form class="booking-form" id="bookingForm">' +
          '<label>Ваше имя *<input id="bookingName" name="name" type="text" minlength="2" required></label>' +
          '<label>Телефон / Telegram *<input id="bookingPhone" name="phone" type="text" minlength="5" required></label>' +
          '<label>Комментарий<textarea id="bookingMessage" name="message" placeholder="Удобное время, вопросы, пожелания"></textarea></label>' +
          '<div class="booking-form__actions">' +
            '<button class="btn btn-gold" type="submit" id="bookingSubmit">Отправить</button>' +
            '<span class="booking-form__status" id="bookingStatus" aria-live="polite"></span>' +
          '</div>' +
        '</form>' +
      '</div>';

    document.body.appendChild(wrapper);
    return wrapper;
  }

  function getServiceTitle() {
    var h1 = document.querySelector('h1');
    if (h1 && h1.textContent.trim()) {
      return h1.textContent.trim();
    }
    return document.title.replace(/\s*[-—]\s*39\s*ЧУВСТВО\s*$/i, '').trim() || 'Услуга';
  }

  function formatModalTitle(serviceName) {
    var clean = (serviceName || '').replace(/\s+/g, ' ').trim();
    if (!clean) return 'Запись на практику';
    if (clean.length > 56) {
      clean = clean.slice(0, 53).trim() + '...';
    }
    return 'Запись на «' + clean + '»';
  }

  function isBookingLink(a) {
    if (!a) return false;
    if (a.hasAttribute('data-booking-open')) return true;
    var href = (a.getAttribute('href') || '').trim();
    if (!href) return false;
    return href === '/#contact' || (href === '#contact' && !document.getElementById('contact')) || href.endsWith('/#contact');
  }

  function setup() {
    setPageBodyClass();
    addSiteHeader();
    setHeroImage();
    removeSocialPromoBlock();
    addBackToTop();

    var modal = buildModal();
    var form = document.getElementById('bookingForm');
    var status = document.getElementById('bookingStatus');
    var submit = document.getElementById('bookingSubmit');
    var currentService = getServiceTitle();

    function openModal(serviceName) {
      currentService = serviceName || getServiceTitle();
      document.getElementById('bookingTitle').textContent = formatModalTitle(currentService);
      document.getElementById('bookingSub').textContent = 'Оставьте заявку и мы свяжемся с вами.';
      status.textContent = '';
      status.className = 'booking-form__status';
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.getElementById('bookingName').focus();
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    document.addEventListener('click', function (e) {
      var closeBtn = e.target.closest('[data-booking-close]');
      if (closeBtn) {
        e.preventDefault();
        closeModal();
        return;
      }

      var link = e.target.closest('a');
      if (isBookingLink(link)) {
        e.preventDefault();
        openModal(link.getAttribute("data-service-name") || getServiceTitle());
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      var name = document.getElementById('bookingName').value.trim();
      var phone = document.getElementById('bookingPhone').value.trim();
      var message = document.getElementById('bookingMessage').value.trim();

      status.className = 'booking-form__status';
      if (name.length < 2 || phone.length < 5) {
        status.textContent = 'Проверьте имя и контакт.';
        status.classList.add('is-error');
        return;
      }

      submit.disabled = true;
      submit.textContent = 'Отправляем...';

      try {
        var payload = {
          name: name,
          phone: phone,
          service: currentService,
          message: message,
          source_title: document.title,
          source_url: window.location.href
        };

        var response = await fetch('/send.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        var contentType = (response.headers.get('content-type') || '').toLowerCase();
        if (contentType.indexOf('application/json') === -1) {
          throw new Error('BACKEND_NOT_CONFIGURED');
        }

        var result = await response.json();
        if (!result.ok) {
          throw new Error(result.error || 'SEND_FAILED');
        }

        status.textContent = 'Отправлено. Мы свяжемся с вами в ближайшее время.';
        status.classList.add('is-ok');
        form.reset();

        setTimeout(function () {
          closeModal();
        }, 900);
      } catch (err) {
        if (err && err.message === 'BACKEND_NOT_CONFIGURED') {
          status.textContent = 'Сервер не настроен: send.php не выполняется как PHP.';
        } else if (err && err.message === 'Telegram error') {
          status.textContent = 'Ошибка Telegram API. Проверьте BOT_TOKEN и CHAT_ID в send.php.';
        } else {
          status.textContent = 'Не удалось отправить. Попробуйте еще раз или напишите в Telegram.';
        }
        status.classList.add('is-error');
      } finally {
        submit.disabled = false;
        submit.textContent = 'Отправить';
      }
    });
  }

  function addBackToTop() {
    if (document.querySelector('.back-to-top')) return;
    var btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Наверх');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><polyline points="18 15 12 9 6 15"/></svg>';
    document.body.appendChild(btn);
    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();

