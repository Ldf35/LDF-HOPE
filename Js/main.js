// ==================================================
// LDF-HOPE — Professional Animations & Effects
// Free • Lightweight • Mobile-Friendly
// ==================================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('💙 LDF-HOPE — Ready & Animated');

  // ==============================================
  // 1. SMOOTH SCROLL FOR ALL LINKS
  // ==============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ==============================================
  // 2. FADE-IN ANIMATION ON SCROLL
  // ==============================================
  const fadeElements = document.querySelectorAll('.section, .card, .hero');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Initial state + observe
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    fadeObserver.observe(el);
  });

  // ==============================================
  // 3. HEADER BACKGROUND ON SCROLL
  // ==============================================
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,43,127,0.15)';
        header.style.padding = '0.8rem 1rem';
      } else {
        header.style.boxShadow = '0 2px 10px rgba(0,43,127,0.1)';
        header.style.padding = '1.2rem 1rem';
      }
    });
  }

  // ==============================================
  // 4. NUMBER ANIMATION — COUNT UP EFFECT
  // ==============================================
  const animateNumbers = () => {
    const numbers = document.querySelectorAll('.stat-num, .number');
    numbers.forEach(el => {
      const finalText = el.textContent;
      const finalValue = parseInt(finalText.replace(/\D/g, ''));
      
      if (!isNaN(finalValue) && finalValue > 0 && !el.dataset.animated) {
        el.dataset.animated = 'true';
        let current = 0;
        const duration = 2000; // ms
        const step = finalValue / (duration / 16);
        
        const counter = setInterval(() => {
          current += step;
          if (current >= finalValue) {
            el.textContent = finalText;
            clearInterval(counter);
          } else {
            el.textContent = Math.floor(current) + finalText.replace(/[0-9]/g, '');
          }
        }, 16);
      }
    });
  };

  // Trigger when stats section visible
  const statsSection = document.querySelector('.stats-bar, .section');
  if (statsSection) {
    const numObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumbers();
          numObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    numObserver.observe(statsSection);
  }

  // ==============================================
  // 5. BUTTON & CARD INTERACTION EFFECTS
  // ==============================================
  document.querySelectorAll('.btn, .card').forEach(el => {
    el.addEventListener('mousedown', function() {
      this.style.transform = 'scale(0.97)';
    });
    el.addEventListener('mouseup mouseleave', function() {
      this.style.transform = '';
    });
  });

  // ==============================================
  // 6. CURRENT PAGE HIGHLIGHT IN MENU
  // ==============================================
  const currentPath = window.location.pathname;
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath.includes(href) && href !== '#')) {
      link.style.fontWeight = 'bold';
      link.style.textDecoration = 'underline';
      link.style.textUnderlineOffset = '4px';
    }
  });

  // ==============================================
  // 7. LOADING FADE-IN
  // ==============================================
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);

}); // END DOMContentLoaded
