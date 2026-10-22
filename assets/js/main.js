/* Mejora progresiva del menú: sin JavaScript, las anclas quedan visibles. */
(() => {
  const header = document.querySelector('.site-header');
  const toggle = header?.querySelector('.nav-toggle');
  const nav = header?.querySelector('.site-nav');
  if (!toggle || !nav) return;

  const mobile = matchMedia('(max-width: 1023px)');
  const setOpen = open => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    nav.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  nav.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link || !mobile.matches) return;
    const url = new URL(link.href);
    const target = url.pathname === location.pathname && document.getElementById(url.hash.slice(1));
    setOpen(false);
    if (target) {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    } else {
      toggle.focus({ preventScroll: true });
    }
  });
  document.addEventListener('click', event => {
    if (mobile.matches && !header.contains(event.target)) setOpen(false);
  });
  header.addEventListener('focusout', event => {
    if (mobile.matches && !header.contains(event.relatedTarget)) setOpen(false);
  });
  mobile.addEventListener('change', () => {
    const focused = document.activeElement;
    if (mobile.matches && nav.contains(focused)) toggle.focus();
    if (!mobile.matches && focused === toggle) nav.querySelector('a').focus();
    setOpen(false);
  });
  toggle.hidden = false;
  header.classList.add('site-header--menu-ready');
})();
