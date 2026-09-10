/* Navigation partagée : disclosures desktop et menu mobile. */
(function () {
  'use strict';
  const nav = document.querySelector('nav.main-nav');
  const burger = document.getElementById('nav-burger-btn');
  const menu = nav && nav.querySelector('.nav-menu');
  const overlay = document.getElementById('nav-overlay');
  if (!nav || !burger || !menu) return;

  const mobile = window.matchMedia('(max-width: 1100px)');
  const buttons = [...menu.querySelectorAll('.nav-sub-btn')];
  let previousOverflow = '';
  menu.id = menu.id || 'nav-menu';
  burger.type = 'button';
  burger.setAttribute('aria-controls', menu.id);
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Ouvrir le menu');
  nav.classList.add('nav-accessible');

  function disclose(button, open) {
    button.setAttribute('aria-expanded', String(open));
    button.closest('.nav-item').classList.toggle('open', open);
  }
  function closeSubmenus() {
    buttons.forEach(button => disclose(button, false));
  }
  function closeMenu(restoreFocus = true) {
    const wasOpen = menu.classList.contains('open');
    menu.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    burger.textContent = '\u2630';
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
    closeSubmenus();
    if (wasOpen) document.body.style.overflow = previousOverflow;
    if (wasOpen && restoreFocus) burger.focus();
  }
  burger.addEventListener('click', function () {
    if (menu.classList.contains('open')) return closeMenu();
    previousOverflow = document.body.style.overflow;
    menu.classList.add('open');
    if (overlay) overlay.classList.add('active');
    burger.textContent = '\u2715';
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Fermer le menu');
    document.body.style.overflow = 'hidden';
    buttons[0]?.focus();
  });
  if (overlay) overlay.addEventListener('click', () => closeMenu());

  buttons.forEach(function (button, index) {
    const item = button.closest('.nav-item');
    const dropdown = item.querySelector('.nav-dropdown');
    if (!dropdown) return;
    dropdown.id = dropdown.id || 'nav-submenu-' + index;
    button.type = 'button';
    button.setAttribute('aria-controls', dropdown.id);
    disclose(button, false);
    button.addEventListener('click', function () {
      const open = button.getAttribute('aria-expanded') !== 'true';
      closeSubmenus();
      disclose(button, open);
    });
    item.addEventListener('mouseenter', function () {
      if (!mobile.matches) { closeSubmenus(); disclose(button, true); }
    });
    item.addEventListener('mouseleave', function () {
      if (!mobile.matches && !item.contains(document.activeElement)) disclose(button, false);
    });
    item.addEventListener('focusout', function (event) {
      if (!mobile.matches && !item.contains(event.relatedTarget)) disclose(button, false);
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      const languages = [...nav.querySelectorAll('.lang-dropdown.open')];
      if (languages.length) {
        languages.forEach(el => el.classList.remove('open'));
        nav.querySelector('.lang-wrap .lang-btn')?.focus();
      } else if (mobile.matches && menu.classList.contains('open')) {
        closeMenu();
      } else {
        const open = buttons.find(button => button.getAttribute('aria-expanded') === 'true');
        if (!open) return;
        closeSubmenus();
        open.focus();
      }
      event.preventDefault();
    }
    if (event.key !== 'Tab' || !mobile.matches || !menu.classList.contains('open')) return;
    const focusable = [...nav.querySelectorAll('a[href], button, [tabindex="0"]')]
      .filter(el => !el.disabled && el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || !nav.contains(document.activeElement))) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !nav.contains(document.activeElement))) {
      event.preventDefault(); first.focus();
    }
  });
  document.addEventListener('click', function (event) {
    if (!nav.contains(event.target)) closeSubmenus();
  });
  menu.querySelectorAll('a[href]').forEach(a => a.addEventListener('click', () => {
    if (mobile.matches) closeMenu(false);
  }));
  mobile.addEventListener('change', function () {
    const focusedMenu = menu.contains(document.activeElement);
    const focusedItem = document.activeElement.closest('.nav-item');
    const trigger = focusedItem && focusedItem.querySelector('.nav-sub-btn');
    closeMenu(false);
    if (mobile.matches && focusedMenu) burger.focus();
    else if (!mobile.matches && (focusedMenu || document.activeElement === burger)) {
      (trigger || buttons[0])?.focus();
    }
  });
})();
