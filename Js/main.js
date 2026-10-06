/* =========================================================
   LDF WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------------------
     YEAR
  ----------------------------------------- */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* -----------------------------------------
     HEADER SCROLL
  ----------------------------------------- */

  const header = document.getElementById("siteHeader");

  function updateHeader() {

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }

  window.addEventListener("scroll", updateHeader);

  updateHeader();


  /* -----------------------------------------
     MOBILE MENU
  ----------------------------------------- */

  const menuButton = document.getElementById("menuButton");
  const mobileNav = document.getElementById("mobileNav");

  if (menuButton && mobileNav) {

    menuButton.addEventListener("click", () => {

      mobileNav.classList.toggle("open");

    });


    mobileNav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        mobileNav.classList.remove("open");

      });

    });

  }


  /* -----------------------------------------
     SMOOTH ANCHOR LINKS
  ----------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight =
        document.querySelector(".site-header").offsetHeight;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* -----------------------------------------
     SCROLL REVEAL
  ----------------------------------------- */

  const revealElements = document.querySelectorAll(
    ".about-grid, .purpose-item, .focus-row, .process-step, .impact-feature, .involved-item, .contact-grid"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });


  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


  revealElements.forEach(element => {
    observer.observe(element);
  });


  /* -----------------------------------------
     FOCUS ROW STAGGER
  ----------------------------------------- */

  document.querySelectorAll(".focus-row").forEach((row, index) => {

    row.style.transitionDelay = `${index * 60}ms`;

  });


  /* -----------------------------------------
     PROCESS STAGGER
  ----------------------------------------- */

  document.querySelectorAll(".process-step").forEach((step, index) => {

    step.style.transitionDelay = `${index * 80}ms`;

  });


  /* -----------------------------------------
     PREVENT EMPTY SOCIAL LINKS
  ----------------------------------------- */

  document.querySelectorAll('a[href="#"]').forEach(link => {

    link.addEventListener("click", event => {

      event.preventDefault();

    });

  });

});
