// Theme toggle, mobile nav, reveal on scroll, filter, back-to-top, basic form validation
(function() {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') root.classList.add('light');

  function toggleTheme() {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  }
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  // Mobile nav
  const navToggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  if (navToggle && menu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
      navToggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('show');
    });
  }

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tag = btn.dataset.filter;
      cards.forEach(card => {
        const tags = (card.getAttribute('data-tags') || '').split(',').map(s => s.trim());
        card.style.display = (tag === 'all' || tags.includes(tag)) ? '' : 'none';
      });
    });
  });

  // Back to top
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Contact form (client-side only demo)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      let ok = true;

      // Reset errors
      ['nameError','emailError','messageError'].forEach(id => document.getElementById(id).textContent = '');

      if (!name.value.trim()) { document.getElementById('nameError').textContent = 'Please enter your name.'; ok = false; }
      if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { document.getElementById('emailError').textContent = 'Please enter a valid email.'; ok = false; }
      if (message.value.trim().length < 10) { document.getElementById('messageError').textContent = 'Message should be at least 10 characters.'; ok = false; }

      if (ok) {
        alert('Thanks! This demo form has no backend — update action to integrate email/API.');
        form.reset();
      }
    });
  }
})();