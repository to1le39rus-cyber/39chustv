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
            '<div class="nav__dropdown" aria-label="Список услуг">' +
              '<div class="nav__dropdown-group">' +
                '<span class="nav__dropdown-title">Йога и практики</span>' +
                '<a href="/services/hatha-yoga">Хатха-йога</a>' +
                '<a href="/services/kundalini-yoga">Кундалини-йога</a>' +
                '<a href="/services/aerial-yoga">Йога в гамаках</a>' +
                '<a href="/services/qigong">Цигун</a>' +
                '<a href="/services/beloyar">Белояр</a>' +
              '</div>' +
              '<div class="nav__dropdown-group">' +
                '<span class="nav__dropdown-title">Телесная терапия</span>' +
                '<a href="/services/pravilo">ПравИло</a>' +
                '<a href="/services/massage">Массаж</a>' +
                '<a href="/services/nails">Практика на гвоздях</a>' +
                '<a href="/services/sound-therapy">Звукотерапия</a>' +
              '</div>' +
              '<div class="nav__dropdown-group">' +
                '<span class="nav__dropdown-title">Для двоих</span>' +
                '<a href="/services/couples-practice">Парные практики</a>' +
                '<a href="/services/39-shades-of-love">39 оттенков любви</a>' +
                '<a href="/services/date-in-studio">Свидание в студии</a>' +
              '</div>' +
              '<div class="nav__dropdown-group">' +
                '<span class="nav__dropdown-title">Комьюнити</span>' +
                '<a href="/services/mens-circle">Мужские круги</a>' +
                '<a href="/services/womens-circle">Женские круги</a>' +
                '<a href="/services/longevity-club">Клуб долголетия</a>' +
                '<a href="/services/events">Концерты и события</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<a href="/services/pravilo" class="nav__link">Правило</a>' +
          '<a href="/#founders" class="nav__link">О нас</a>' +
          '<a href="/#packages" class="nav__link">Пакеты</a>' +
          '<a href="/#contact" class="nav__link nav__link--cta">Записаться</a>' +
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

  function addSocialPromoBlock() {
    if (document.querySelector('.social-promo')) {
      return;
    }

    var container = document.querySelector('.service-content .container');
    if (!container) {
      return;
    }

    var promo = document.createElement('section');
    promo.className = 'social-promo';
    promo.innerHTML =
      '<svg class="social-promo__ornament" width="32" height="8" viewBox="0 0 32 8" aria-hidden="true"><circle cx="4" cy="4" r="3" fill="currentColor"/><circle cx="16" cy="4" r="3" fill="currentColor"/><circle cx="28" cy="4" r="3" fill="currentColor"/></svg>' +
      '<p class="social-promo__title">Мы в соцсетях</p>' +
      '<div class="social-promo__links">' +
        '<a class="social-icon-link" href="https://vk.com/39chuvstvo" target="_blank" rel="noopener noreferrer" aria-label="Перейти в ВКонтакте">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 7.1c.16 7.7 4.01 12.34 10.76 12.34h.38v-4.4c2.48.24 4.35 2.04 5.1 4.4H23c-.95-3.47-3.46-5.4-5.03-6.14 1.57-.9 3.76-3.11 4.29-6.2h-3.42c-.7 2.5-2.71 4.72-4.7 4.94V7.1h-3.42v8.65c-2.01-.5-4.55-2.9-4.66-8.65H3z"/></svg>' +
          '<span>ВКонтакте</span>' +
        '</a>' +
        '<a class="social-icon-link" href="https://t.me/masterskaya39chuvstvo" target="_blank" rel="noopener noreferrer" aria-label="Перейти в Telegram">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9.78 14.64l-.4 5.61c.57 0 .82-.24 1.11-.53l2.67-2.53 5.54 4.05c1.02.56 1.74.27 2-.95L23.95 5.2c.35-1.5-.54-2.08-1.54-1.7L2.6 11.12c-1.35.53-1.33 1.28-.23 1.62l5.07 1.58L19.2 6.8c.56-.35 1.07-.16.65.2"/></svg>' +
          '<span>Telegram</span>' +
        '</a>' +
      '</div>';

    container.appendChild(promo);
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
    return href === '/#contact' || href === '#contact' || href.endsWith('/#contact');
  }

  function setup() {
    setPageBodyClass();
    addSiteHeader();
    setHeroImage();
    addSocialPromoBlock();
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
        openModal(getServiceTitle());
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
