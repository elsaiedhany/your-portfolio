// Enhanced DOM Ready

document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const switcher = document.getElementById('langSwitch');
  const themeBtn = document.getElementById('themeToggle');
  const nav = document.querySelector('.main-nav');
  const skillBars = document.querySelectorAll('.skill-bar div');
  
  // 1) Language Toggle
  switcher.addEventListener('click', () => {
    const isEn = html.getAttribute('lang') === 'en';
    html.setAttribute('lang', isEn ? 'ar' : 'en');
    switcher.textContent = isEn ? 'EN' : 'عربى';
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = el.getAttribute(isEn ? 'data-ar' : 'data-en');
    });
  });

  // 2) Theme Toggle (Light / Dark)
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = html.classList.toggle('dark');
      themeBtn.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('darkMode', isDark);
    });
    // Load preference
    if (localStorage.getItem('darkMode') === 'true') html.classList.add('dark');
  }

  // 3) Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.toggle('open');
    });
  }

  // 4) Smooth Scrolling & Active Link Highlight
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(sec => {
      const top = sec.offsetTop - 80;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        document.querySelector('.nav-links a[href*="' + id + '"]')
                .classList.add('active');
      } else {
        document.querySelector('.nav-links a[href*="' + id + '"]')
                .classList.remove('active');
      }
    });

    // Navbar shadow/color change on scroll
    if (scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });

  // 5) Intersection Observer for reveals
  const observerOptions = { threshold: 0.1 };
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.project-item, .service, .about article, .skill-bar')
          .forEach(el => revealObserver.observe(el));

  // 6) Fill Skill Bars dynamically
  skillBars.forEach(bar => {
    const target = bar.parentElement.dataset.target;
    bar.style.width = '0';
    setTimeout(() => bar.style.width = target, 800);
  });

  // 7) Button Ripple Effect
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', e => {
      const circle = document.createElement('span');
      const diameter = Math.max(btn.clientWidth, btn.clientHeight);
      const radius = diameter / 2;
      circle.style.width = circle.style.height = diameter + 'px';
      circle.style.left = e.clientX - btn.offsetLeft - radius + 'px';
      circle.style.top = e.clientY - btn.offsetTop - radius + 'px';
      circle.classList.add('ripple');
      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  // 8) Typed Text Effect in Hero
  const typedEl = document.querySelector('.hero h1');
  if (typedEl) {
    const fullText = typedEl.dataset.en;
    let idx = 0;
    const typeSpeed = 100;
    typedEl.textContent = '';
    function type() {
      if (idx < fullText.length) {
        typedEl.textContent += fullText.charAt(idx);
        idx++;
        setTimeout(type, typeSpeed);
      }
    }
    type();
  }
});

// Ripple CSS (Add to your stylesheet)
/*
button { position: relative; overflow: hidden; }
.ripple {
  position: absolute;
  background: rgba(255,255,255,0.7);
  border-radius: 50%;
  transform: scale(0);
  animation: ripple-effect 0.6s linear;
}
@keyframes ripple-effect {
  to { transform: scale(4); opacity: 0; }
}
*/
