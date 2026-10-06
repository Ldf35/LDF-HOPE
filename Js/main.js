/* =========================================
   LDF WEBSITE V10
   Main JavaScript
========================================= */


/* MOBILE MENU */

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

if (menuButton) {

  menuButton.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

}


/* CLOSE MOBILE MENU */

document.querySelectorAll(".nav a").forEach(link => {

  link.addEventListener("click", () => {

    nav.classList.remove("active");

  });

});


/* HEADER SCROLL */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 30) {

    header.style.boxShadow =
      "0 10px 35px rgba(0,20,60,.08)";

  } else {

    header.style.boxShadow = "none";

  }

});


/* SCROLL REVEAL */

const revealElements = document.querySelectorAll(
  ".focus-card, .involve-card, .about-content, .about-image, .stat"
);

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

      }

    });

  },
  {
    threshold: .12
  }
);


revealElements.forEach(element => {

  element.style.opacity = "0";
  element.style.transform = "translateY(25px)";
  element.style.transition =
    "opacity .7s ease, transform .7s ease";

  observer.observe(element);

});


/* NUMBER COUNTERS */

const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.count);

      let current = 0;

      const duration = 1200;
      const start = performance.now();

      function update(time) {

        const progress =
          Math.min((time - start) / duration, 1);

        current =
          Math.floor(progress * target);

        element.textContent = current;

        if (progress < 1) {

          requestAnimationFrame(update);

        } else {

          element.textContent = target;

        }

      }

      requestAnimationFrame(update);

      counterObserver.unobserve(element);

    });

  },
  {
    threshold: .7
  }
);


counters.forEach(counter => {

  counterObserver.observe(counter);

});


/* CURRENT YEAR */

document.querySelectorAll(".footer-bottom").forEach(footer => {

  footer.innerHTML =
    footer.innerHTML.replace(
      "2026",
      new Date().getFullYear()
    );

});
