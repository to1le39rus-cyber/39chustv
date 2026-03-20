/* =============================================
   39 ЧУВСТВО — JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- HEADER SCROLL ---- */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- БУРГЕР МЕНЮ ---- */
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('nav');
  const dropdownItem = nav.querySelector('.nav__item--dropdown');
  const dropdownToggle = nav.querySelector('.nav__link--dropdown-toggle');

  const isMobileMenu = () => window.matchMedia('(max-width: 900px)').matches;

  if (dropdownToggle && dropdownItem) {
    dropdownToggle.addEventListener('click', (event) => {
      if (!isMobileMenu()) return;
      event.preventDefault();
      dropdownItem.classList.toggle('is-expanded');
    });
  }

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    header.classList.toggle('nav-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (!isOpen && dropdownItem) {
      dropdownItem.classList.remove('is-expanded');
    }
  });
  // Закрыть при клике на ссылку
  nav.querySelectorAll('a:not(.nav__link--dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.classList.remove('open');
      header.classList.remove('nav-open');
      document.body.style.overflow = '';
      if (dropdownItem) {
        dropdownItem.classList.remove('is-expanded');
      }
    });
  });

  /* ---- SCROLL REVEAL ---- */
  const revealItems = document.querySelectorAll(
    '.pain__card, .service-card, .forwhom__item, .review-card, .package-card, .founders__card, .pravilo__fact'
  );
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealItems.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity .55s ease ${(i % 4) * 0.08}s, transform .55s ease ${(i % 4) * 0.08}s`;
    revealObserver.observe(el);
  });
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .revealed { opacity: 1 !important; transform: translateY(0) !important; }
    </style>
  `);

  /* ---- ФОРМА ЗАЯВКИ → TELEGRAM ---- */
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const btnText    = submitBtn.querySelector('.btn-text');
  const btnLoader  = submitBtn.querySelector('.btn-loader');
  const successMsg = document.getElementById('formSuccess');

  const nameInput  = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const nameError  = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');

  const validate = () => {
    let valid = true;
    nameError.textContent  = '';
    phoneError.textContent = '';
    nameInput.classList.remove('error');
    phoneInput.classList.remove('error');

    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameError.textContent = 'Введите ваше имя';
      nameInput.classList.add('error');
      valid = false;
    }
    if (!phoneInput.value.trim() || phoneInput.value.trim().length < 5) {
      phoneError.textContent = 'Укажите телефон или Telegram';
      phoneInput.classList.add('error');
      valid = false;
    }
    return valid;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Загрузка
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');
    submitBtn.disabled = true;

    const data = {
      name:    nameInput.value.trim(),
      phone:   phoneInput.value.trim(),
      service: document.getElementById('service').value,
      message: document.getElementById('message').value.trim(),
    };

    try {
      const response = await fetch('send.php', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });
      const result = await response.json();

      if (result.ok) {
        successMsg.classList.remove('hidden');
        form.reset();
      } else {
        throw new Error(result.error || 'Ошибка отправки');
      }
    } catch (err) {
      console.error(err);
      alert('Не удалось отправить заявку. Пожалуйста, напишите нам напрямую в Telegram.');
    } finally {
      btnText.classList.remove('hidden');
      btnLoader.classList.add('hidden');
      submitBtn.disabled = false;
    }
  });

  // Убираем ошибку при вводе
  [nameInput, phoneInput].forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
    });
  });

  /* ---- КНОПКА НАВЕРХ ---- */
  const btnTop = document.createElement('button');
  btnTop.className = 'back-to-top';
  btnTop.setAttribute('aria-label', 'Наверх');
  btnTop.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>';
  document.documentElement.appendChild(btnTop);

  window.addEventListener('scroll', () => {
    btnTop.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });

  btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- ПЛАВНЫЙ СКРОЛЛ ДЛЯ ЯКОРЕЙ ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href').slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
