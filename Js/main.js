// ==================================================
//  LDF — Professional Light Animations
//  Gentle, fast, mobile-friendly — no distractions
// ==================================================

document.addEventListener('DOMContentLoaded', function() {
  // ----- 1. FADE-IN SECTIONS AS YOU SCROLL -----
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-visible');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply to all content cards & sections
  document.querySelectorAll('.content-card, .card, .stat-card').forEach(el => {
    el.classList.add('fade-hidden');
    fadeInObserver.observe(el);
  });

  // ----- 2. SMOOTH BUTTON & CARD HOVER -----
  document.querySelectorAll('.btn, .card, .nav-button').forEach(el => {
    el.style.transition = 'transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease';
  });

  // ----- 3. ACTIVE NAV HIGHLIGHT -----
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || 
        (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ----- 4. SUBTLE NUMBER COUNT-UP (Stats) -----
  const countElements = document.querySelectorAll('.stat-number');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const match = text.match(/(\d+)/);
        if (match && !el.classList.contains('counted')) {
          el.classList.add('counted');
          const target = parseInt(match[1]);
          const suffix = text.replace(match[1], '');
          let current = 0;
          const step = Math.ceil(target / 25);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current + suffix;
          }, 60);
        }
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  countElements.forEach(el => countObserver.observe(el));
});
