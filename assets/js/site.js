/* =========================================================
   JEREMY LEBLANC PORTFOLIO
   Global Site JavaScript
   ========================================================= */

   document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const navToggle = document.querySelector(".mobile-nav-toggle");
    const siteNav = document.querySelector(".site-nav");

    if (navToggle && siteNav) {

        const closeNavigation = () => {
            navToggle.classList.remove("is-open");
            siteNav.classList.remove("is-open");

            navToggle.setAttribute("aria-expanded", "false");

            document.body.classList.remove("no-scroll");
        };

        const openNavigation = () => {
            navToggle.classList.add("is-open");
            siteNav.classList.add("is-open");

            navToggle.setAttribute("aria-expanded", "true");

            document.body.classList.add("no-scroll");
        };

        navToggle.addEventListener("click", () => {

            const isOpen = siteNav.classList.contains("is-open");

            if (isOpen) {
                closeNavigation();
            } else {
                openNavigation();
            }

        });


        /* Close menu when a nav link is selected */

        const navLinks = siteNav.querySelectorAll(".site-nav__link");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {
                closeNavigation();
            });

        });


        /* Close menu when Escape is pressed */

        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {
                closeNavigation();
            }

        });


        /* Reset mobile nav when returning to desktop size */

        window.addEventListener("resize", () => {

            if (window.innerWidth > 899) {
                closeNavigation();
            }

        });

    }



    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    const currentPath = window.location.pathname;

    const links = document.querySelectorAll(".site-nav__link");

    links.forEach((link) => {

        const linkPath = new URL(link.href).pathname;

        const isHome =
            currentPath === "/" ||
            currentPath.endsWith("/index.html");

        const linkIsHome =
            linkPath === "/" ||
            linkPath.endsWith("/index.html");


        if (isHome && linkIsHome) {

            link.classList.add("is-active");

            return;

        }


        if (!linkIsHome && currentPath.endsWith(linkPath)) {

            link.classList.add("is-active");

        }

    });



    /* =====================================================
       EXTERNAL LINKS
       ===================================================== */

    const externalLinks = document.querySelectorAll(
        'a[href^="http"]:not([target])'
    );

    externalLinks.forEach((link) => {

        const linkUrl = new URL(link.href);

        if (linkUrl.hostname !== window.location.hostname) {

            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");

        }

    });

});