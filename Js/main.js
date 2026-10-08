```javascript
document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });
  }

  // Close mobile menu after selecting a page
  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav?.classList.remove("open");
    });
  });

  // Current year
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Header shadow on scroll
  const header = document.getElementById("header");

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = "0 10px 35px rgba(0,0,0,.08)";
      } else {
        header.style.boxShadow = "none";
      }
    });
  }

});
```
