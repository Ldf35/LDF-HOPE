document.addEventListener('DOMContentLoaded', function() {
  // Page load fade-in
  setTimeout(() => document.body.classList.add('loaded'), 50);

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) header?.classList.add('header-scrolled');
    else header?.classList.remove('header-scrolled');
  });

  // Fade-in sections on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
  }, { threshold: 0.1 });

  document.querySelectorAll('.section').forEach(s => observer.observe(s));
});
