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

  // Preços: fonte única em data/precos.json. Elementos com data-preco="grupo.chave"
  // (ex.: pacotes.basic) recebem o valor formatado; sem o arquivo, o texto "Consulte" permanece.
  const priceNodes = document.querySelectorAll('[data-preco]');
  const ldNodes = document.querySelectorAll('script[type="application/ld+json"]');

  if (priceNodes.length || ldNodes.length) {
    const brl = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });

    const lookup = (data, path) => path.split('.').reduce((obj, key) => (obj ? obj[key] : undefined), data);

    const format = (item) => {
      if (!item) return null;
      if (Number.isFinite(item.minimo) && Number.isFinite(item.maximo)) {
        return `${brl.format(item.minimo)} a ${brl.format(item.maximo)}`;
      }
      return Number.isFinite(item.preco) ? brl.format(item.preco) : null;
    };

    fetch('data/precos.json', { cache: 'no-cache' })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
      .then((data) => {
        priceNodes.forEach((node) => {
          const text = format(lookup(data, node.dataset.preco));
          if (text) node.textContent = text;
        });

        // Dados estruturados (SEO): preenche price/priceSpecification das ofertas pelo identifier.
        ldNodes.forEach((node) => {
          let json;
          try { json = JSON.parse(node.textContent); } catch (error) { return; }
          const offers = json && json.hasOfferCatalog && json.hasOfferCatalog.itemListElement;
          if (!Array.isArray(offers)) return;
          let changed = false;
          offers.forEach((offer) => {
            const plan = offer.identifier && data.pacotes && data.pacotes[offer.identifier];
            if (!plan || !Number.isFinite(plan.preco)) return;
            const price = String(plan.preco);
            offer.priceCurrency = data.moeda || 'BRL';
            offer.price = price;
            offer.priceSpecification = {
              '@type': 'UnitPriceSpecification',
              price,
              priceCurrency: data.moeda || 'BRL',
              unitText: plan.periodo || 'mês'
            };
            changed = true;
          });
          if (changed) node.textContent = JSON.stringify(json);
        });
      })
      .catch(() => { /* mantém "Consulte" */ });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

})();
