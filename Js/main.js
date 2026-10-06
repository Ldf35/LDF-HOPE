document.addEventListener("DOMContentLoaded", function () {

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  /* =========================
     HEADER
  ========================= */

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeader);
  updateHeader();


  /* =========================
     MOBILE MENU
  ========================= */

  if (menuToggle && mobileNav) {

    menuToggle.addEventListener("click", function () {

      mobileNav.classList.toggle("active");
      document.body.classList.toggle("menu-open");

    });

    mobileNav.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {

        mobileNav.classList.remove("active");
        document.body.classList.remove("menu-open");

      });

    });
  }


  /* =========================
     ESCAPE MENU
  ========================= */

  document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

      if (mobileNav) {
        mobileNav.classList.remove("active");
      }

      document.body.classList.remove("menu-open");
    }

  });


  /* =========================
     REVEAL ANIMATION
  ========================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(function (element) {
      element.classList.add("active");
    });

  }


  /* =========================
     SMOOTH INTERNAL LINKS
  ========================= */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

      const id = link.getAttribute("href");

      if (!id || id === "#") return;

      const target = document.querySelector(id);

      if (!target) return;

      event.preventDefault();

      const headerHeight =
        header ? header.offsetHeight : 0;

      const position =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: position,
        behavior: "smooth"
      });

    });

  });


  /* =========================
     CURRENT YEAR
  ========================= */

  document.querySelectorAll("[data-year]").forEach(function (element) {

    element.textContent =
      new Date().getFullYear();

  });

});
