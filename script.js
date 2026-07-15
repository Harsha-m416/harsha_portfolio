// ---- Theme toggle ----
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(theme){
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ---- Mobile nav ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ---- Animated stat counters ----
const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const duration = 1200;
      const start = performance.now();
      function tick(now){
        const progress = Math.min((now - start) / duration, 1);
        current = Math.floor(progress * target);
        el.textContent = current;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statObserver.observe(el));

// ---- Footer year ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting){
      navAnchors.forEach(a => a.style.color = '');
      link.style.color = 'var(--accent)';
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => navObserver.observe(s));
