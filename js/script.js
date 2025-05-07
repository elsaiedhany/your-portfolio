// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  // Language toggle
  const switcher = document.getElementById('langSwitch');
  switcher.addEventListener('click', () => {
    const html = document.documentElement;
    const isEn = html.getAttribute('lang') === 'en';
    html.setAttribute('lang', isEn ? 'ar' : 'en');
    switcher.textContent = isEn ? 'EN' : 'عربى';
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = el.getAttribute(isEn ? 'data-ar' : 'data-en');
    });
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href'))
              .scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-item')
          .forEach(item => observer.observe(item));
});
