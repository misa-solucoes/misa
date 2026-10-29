'use strict';

(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#nav-principal');

  if (toggle && nav) {
    const setMenuOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      const label = toggle.querySelector('.sr-only');
      if (label) label.textContent = open ? 'Fechar menu' : 'Abrir menu';
    };

    toggle.addEventListener('click', () => {
      setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        toggle.focus();
      }
    });
  }


  const sub = document.querySelector('.has-sub');
  const subToggle = sub && sub.querySelector('.sub-toggle');

  if (sub && subToggle) {
    const setSubOpen = (open) => {
      sub.classList.toggle('is-open', open);
      subToggle.setAttribute('aria-expanded', String(open));
    };

    subToggle.addEventListener('click', () => {
      setSubOpen(subToggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('click', (event) => {
      if (!sub.contains(event.target)) setSubOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && subToggle.getAttribute('aria-expanded') === 'true') {
        setSubOpen(false);
        subToggle.focus();
      }
    });

    sub.querySelectorAll('.submenu a').forEach((link) => {
      link.addEventListener('click', () => setSubOpen(false));
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

})();
