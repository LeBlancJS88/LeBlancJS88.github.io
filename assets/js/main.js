/*
    Strata by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

    var $window = $(window),
        $body = $('body'),
        $header = $('#header'),
        $footer = $('#footer'),
        $main = $('#main'),
        settings = {

            // Parallax background effect?
            parallax: true,

            // Parallax factor (lower = more intense, higher = less intense).
            parallaxFactor: 20

        };

    // Breakpoints.
    breakpoints({
        xlarge: ['1281px', '1800px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: [null, '480px'],
    });

    // Play initial animations on page load.
    $window.on('load', function () {
        window.setTimeout(function () {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Slideshow animation by Jeremy
    document.addEventListener("DOMContentLoaded", () => {
        let slides = document.querySelectorAll(".slideshow img, .slideshow video");
        let currentIndex = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add("active");
                    slide.style.display = "block";

                    if (slide.tagName === "VIDEO") {
                        slide.play();
                    }
                } else {
                    slide.classList.remove("active");
                    slide.style.display = "none";

                    if (slide.tagName === "VIDEO") {
                        slide.pause(); 
                        slide.currentTime = 0;
                    }
                }
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }

        showSlide(currentIndex);

        setInterval(nextSlide, 5000);
    });

    // Touch?
    if (browser.mobile) {

        // Turn on touch mode.
        $body.addClass('is-touch');

        // Height fix (mostly for iOS).
        window.setTimeout(function () {
            $window.scrollTop($window.scrollTop() + 1);
        }, 0);

    }

    // Footer.
    breakpoints.on('<=medium', function () {
        $footer.insertAfter($main);
    });

    breakpoints.on('>medium', function () {
        $footer.appendTo($header);
    });

    // Header.

    // Parallax background.

    // Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
    if (browser.name == 'ie'
        || browser.mobile)
        settings.parallax = false;

    if (settings.parallax) {

        breakpoints.on('<=medium', function () {

            $window.off('scroll.strata_parallax');
            $header.css('background-position', '');

        });

        breakpoints.on('>medium', function () {

            $header.css('background-position', 'left 0px');

            $window.on('scroll.strata_parallax', function () {
                $header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
            });

        });

        $window.on('load', function () {
            $window.triggerHandler('scroll');
        });

    }

    // Main Sections: Two.

    // Lightbox gallery.
    $window.on('load', function () {

        $('#two').poptrox({
            caption: function ($a) { return $a.next('h3').text(); },
            overlayColor: '#2c2c2c',
            overlayOpacity: 0.85,
            popupCloserText: '',
            popupLoaderText: '',
            selector: '.work-item a.image',
            usePopupCaption: true,
            usePopupDefaultStyling: false,
            usePopupEasyClose: false,
            usePopupNav: true,
            windowMargin: (breakpoints.active('<=small') ? 0 : 50)
        });

    });

    // Dark Mode Toggle Functionality by Jeremy
    document.addEventListener("DOMContentLoaded", () => {
        const themeToggle = document.getElementById("theme-toggle");
        const icon = themeToggle.querySelector("i");

        // Check localStorage for the saved theme
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");
            document.body.classList.remove("light-mode");
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            document.body.classList.add("light-mode");
            document.body.classList.remove("dark-mode");
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }

        // Toggle theme and save the preference
        themeToggle.addEventListener("click", () => {
            if (document.body.classList.contains("dark-mode")) {
                document.body.classList.remove("dark-mode");
                document.body.classList.add("light-mode");
                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");
                localStorage.setItem("theme", "light");
            } else {
                document.body.classList.remove("light-mode");
                document.body.classList.add("dark-mode");
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
                localStorage.setItem("theme", "dark");
            }
        });
    });

})(jQuery);