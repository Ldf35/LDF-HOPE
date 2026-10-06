
document.addEventListener("DOMContentLoaded", function () {

  /* YEAR */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* MOBILE MENU */

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (menuButton && navigation) {

    menuButton.addEventListener("click", function () {

      navigation.classList.toggle("open");

      const opened = navigation.classList.contains("open");

      menuButton.setAttribute(
        "aria-expanded",
        opened ? "true" : "false"
      );

    });

  }


  /* CLOSE MOBILE MENU AFTER CLICK */

  document.querySelectorAll(".main-nav a").forEach(function (link) {

    link.addEventListener("click", function () {

      if (navigation) {
        navigation.classList.remove("open");
      }

    });

  });

});
