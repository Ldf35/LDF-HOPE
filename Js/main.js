document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  let isMenuOpen = false; // Track menu state

  /* =========================
     HEADER SCROLL EFFECT
  ========================= */
  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  // Throttle scroll events for better performance
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateHeader, 10);
  });
  updateHeader();

  /* =========================
     MOBILE MENU
  ========================= */
  function openMenu() {
    isMenuOpen = true;
    mobileNav.classList.add("active");
    document.body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    isMenuOpen = false;
    mobileNav.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
      isMenuOpen ? closeMenu() : openMenu();
    });

    // Close menu when clicking any link inside
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* =========================
     ESCAPE KEY CLOSE
  ========================= */
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isMenuOpen) {
      closeMenu();
    }
  });

  /* =========================
     REVEAL ANIMATION — REFIINED
  ========================= */
  const revealElements = document.querySelectorAll(".reveal");
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
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px" // Trigger slightly earlier
      }
    );
    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    // Fallback: show everything immediately
    revealElements.forEach(function (element) {
      element.classList.add("active");
    });
  }

  /* =========================
     SMOOTH SCROLL — OFFSET FIXED
  ========================= */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const position = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: position,
        behavior: "smooth"
      });
    });
  });

  /* =========================
     CURRENT YEAR
  ========================= */
      document.getElementById("ldf-footer-year").textContent =
      new Date().getFullYear();

  
const LDF_AI_URL = "https://ldf-ai-gateway.lifedevelopmentfoundation-docs.workers.dev/";

async function askLDFAgent(agent, message) {
  const response = await fetch(LDF_AI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ agent, message })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "AI request failed.");
  }

  return data.answer;
}

// Examples:
// askLDFAgent("learning", "Help me improve my focus.")
// askLDFAgent("hope", "How does the HOPE project work?")
// askLDFAgent("admin", "Draft a weekly operations checklist.")
  document.querySelectorAll("[data-year]").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });
});
