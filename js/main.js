document.addEventListener('DOMContentLoaded', ()=> {
  // theme
  const themeBtn = document.getElementById('theme-toggle');
  if (localStorage.getItem('theme')==='dark') document.body.classList.add('dark');
  if (themeBtn) themeBtn.addEventListener('click', ()=> {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) localStorage.setItem('theme','dark'); else localStorage.removeItem('theme');
  });

  // lang / dir toggle
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.addEventListener('click', ()=> {
    const html = document.documentElement;
    html.setAttribute('dir', html.getAttribute('dir')==='rtl' ? 'ltr' : 'rtl');
  });

  // fade-in using IntersectionObserver
  const items = document.querySelectorAll('.fade-in');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, {threshold:0.2});
  items.forEach(i => io.observe(i));

  // search on playlist pages
  document.addEventListener('input', (ev) => {
    if (!ev.target) return;
    if (ev.target.matches('#searchInput') || ev.target.matches('#searchHajj')) {
      const q = ev.target.value.toLowerCase();
      document.querySelectorAll('.video-tile').forEach(tile => {
        tile.style.display = tile.innerText.toLowerCase().includes(q) ? '' : 'none';
      });
    }
  });
});
