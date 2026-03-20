(function () {
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
