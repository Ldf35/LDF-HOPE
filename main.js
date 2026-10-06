/* =====================================================
   LDF MAIN JAVASCRIPT
===================================================== */


/* -----------------------------------------------------
   HEADER SCROLL EFFECT
----------------------------------------------------- */

const header = document.getElementById("siteHeader");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* -----------------------------------------------------
   MOBILE MENU
----------------------------------------------------- */

const menuToggle =
    document.getElementById("menuToggle");

const mobileMenu =
    document.getElementById("mobileMenu");


menuToggle.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


/* -----------------------------------------------------
   CLOSE MOBILE MENU AFTER CLICK
----------------------------------------------------- */

document.querySelectorAll(
    ".mobile-menu a"
).forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});


/* -----------------------------------------------------
   CURRENT YEAR
----------------------------------------------------- */

const year =
    document.getElementById("year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* -----------------------------------------------------
   IMPACT COUNTERS
----------------------------------------------------- */

const counters =
    document.querySelectorAll("[data-count]");


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const counter =
                    entry.target;

                const target =
                    Number(
                        counter.dataset.count
                    );

                let current = 0;

                const increment =
                    Math.max(
                        1,
                        Math.ceil(target / 60)
                    );

                const updateCounter =
                    () => {

                        current += increment;

                        if (current >= target) {

                            counter.textContent =
                                target + "+";

                            return;

                        }

                        counter.textContent =
                            current;

                        requestAnimationFrame(
                            updateCounter
                        );

                    };

                updateCounter();

                observer.unobserve(counter);

            });

        },
        {
            threshold: .5
        }
    );


counters.forEach(counter => {

    observer.observe(counter);

});


/* -----------------------------------------------------
   SIMPLE REVEAL ANIMATION
----------------------------------------------------- */

const revealItems =
    document.querySelectorAll(
        ".focus-card, .purpose-card, .involved-card, .process-step"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


revealItems.forEach(item => {

    item.classList.add("reveal");

    revealObserver.observe(item);

});
