// enhanced.js
// تضع هذا الملف في جذر المشروع (/enhanced.js)
// ثم في الـ HTML: <script src="/enhanced.js" defer></script>

(() => {
  'use strict';

  const html       = document.documentElement;
  const switcher   = document.getElementById('langSwitch');
  const themeBtn   = document.getElementById('themeToggle');
  const nav        = document.querySelector('.main-nav');
  const navLinksUl = document.querySelector('.nav-links');
  const navToggle  = document.getElementById('navToggle');
  const skillBars  = document.querySelectorAll('.skill-bar div');
  const sections   = document.querySelectorAll('section[id]');

  // ===== 1) Language Toggle =====
  if (switcher) {
    switcher.addEventListener('click', () => {
      const isEn = html.getAttribute('lang') === 'en';
      html.setAttribute('lang', isEn ? 'ar' : 'en');
      switcher.textContent = isEn ? 'EN' : 'عربى';

      document.querySelectorAll('[data-en]').forEach(el => {
        const text = isEn
          ? el.getAttribute('data-ar') || el.textContent
          : el.getAttribute('data-en') || el.textContent;
        el.textContent = text;
      });
    });
  }

  // ===== 2) Theme Toggle =====
  if (themeBtn) {
    // تحميل الوضع من التخزين وتحديث الـ class والزر
    const savedDark = localStorage.getItem('darkMode') === 'true';
    if (savedDark) {
      html.classList.add('dark');
      themeBtn.textContent = '☀️';
    } else {
      html.classList.remove('dark');
      themeBtn.textContent = '🌙';
    }

    themeBtn.addEventListener('click', () => {
      const isDark = html.classList.toggle('dark');
      themeBtn.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('darkMode', isDark);
    });
  }

  // ===== 3) Mobile Navigation Toggle =====
  if (navToggle && navLinksUl) {
    navToggle.addEventListener('click', () => {
      navLinksUl.classList.toggle('open');
    });
  }

  // ===== 4) Smooth Scrolling & Active Link Highlight =====
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Active Link Highlight
    sections.forEach(sec => {
      const top    = sec.offsetTop - 80;
      const height = sec.offsetHeight;
      const id     = sec.id;
      const link   = document.querySelector(`.nav-links a[href="#${id}"]`);

      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });

    // Navbar style on scroll
    if (nav) {
      nav.classList.toggle('scrolled', scrollY > 50);
    }
  });

  // ===== 5) Intersection Observer for reveals =====
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-item, .service, .about article, .skill-bar')
          .forEach(el => observer.observe(el));

  // ===== 6) Fill Skill Bars Dynamically =====
  skillBars.forEach(bar => {
    const parent = bar.parentElement;
    const target = parent ? parent.dataset.target : null;
    if (target) {
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = target;
      }, 800);
    }
  });

  // ===== 7) Button Ripple Effect =====
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', e => {
      const circle   = document.createElement('span');
      const diameter = Math.max(btn.clientWidth, btn.clientHeight);
      const radius   = diameter / 2;
      circle.style.width  = circle.style.height = `${diameter}px`;
      circle.style.left   = `${e.clientX - btn.offsetLeft - radius}px`;
      circle.style.top    = `${e.clientY - btn.offsetTop  - radius}px`;
      circle.className    = 'ripple';
      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  // ===== 8) Typed Text Effect in Hero =====
  const typedEl = document.querySelector('.hero h1');
  if (typedEl) {
    // يدعم data-en و data-ar بناءً على اللغة الحالية
    const attrName = html.getAttribute('lang') === 'en' ? 'data-en' : 'data-ar';
    const fullText = typedEl.getAttribute(attrName) || typedEl.textContent;
    let idx = 0;
    const speed = 100;
    typedEl.textContent = '';
    (function type() {
      if (idx < fullText.length) {
        typedEl.textContent += fullText.charAt(idx++);
        setTimeout(type, speed);
      }
    })();
  }

})();
