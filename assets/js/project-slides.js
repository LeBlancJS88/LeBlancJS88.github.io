/* =========================================================
   JEREMY LEBLANC PORTFOLIO
   Project Case Study Slide System
   ========================================================= */


   document.addEventListener("DOMContentLoaded", () => {

    const decks =
        document.querySelectorAll("[data-project-deck]");


    decks.forEach((deck) => {

        const slides =
            Array.from(
                deck.querySelectorAll("[data-project-slide]")
            );

        const tabs =
            Array.from(
                deck.querySelectorAll("[data-project-slide-target]")
            );

        const previousButton =
            deck.querySelector("[data-project-slide-previous]");

        const nextButton =
            deck.querySelector("[data-project-slide-next]");

        const currentCounter =
            deck.querySelector("[data-project-slide-current]");

        const totalCounter =
            deck.querySelector("[data-project-slide-total]");


        if (!slides.length) {
            return;
        }


        let activeIndex = 0;



        /* =================================================
           HELPERS
           ================================================= */

        const getSlideIndexFromHash = () => {

            const hash =
                window.location.hash.replace("#", "");


            if (!hash) {
                return -1;
            }


            return slides.findIndex(
                (slide) => slide.id === hash
            );

        };


        const updateHash = (slide) => {

            if (!slide.id) {
                return;
            }


            const nextUrl =
                `${window.location.pathname}${window.location.search}#${slide.id}`;


            window.history.replaceState(
                null,
                "",
                nextUrl
            );

        };



        /* =================================================
           ACTIVATE SLIDE
           ================================================= */

        const activateSlide = (
            index,
            {
                updateUrl = true,
                focusTab = false
            } = {}
        ) => {

            if (
                index < 0 ||
                index >= slides.length
            ) {
                return;
            }


            activeIndex = index;


            slides.forEach(
                (slide, slideIndex) => {

                    const isActive =
                        slideIndex === activeIndex;


                    slide.hidden = !isActive;

                    slide.classList.toggle(
                        "is-active",
                        isActive
                    );


                    slide.setAttribute(
                        "aria-hidden",
                        isActive ? "false" : "true"
                    );

                }
            );


            tabs.forEach(
                (tab, tabIndex) => {

                    const isActive =
                        tabIndex === activeIndex;


                    tab.classList.toggle(
                        "is-active",
                        isActive
                    );


                    tab.setAttribute(
                        "aria-selected",
                        isActive ? "true" : "false"
                    );


                    tab.setAttribute(
                        "tabindex",
                        isActive ? "0" : "-1"
                    );

                }
            );


            if (currentCounter) {

                currentCounter.textContent =
                    String(activeIndex + 1);

            }


            if (previousButton) {

                previousButton.disabled =
                    activeIndex === 0;

            }


            if (nextButton) {

                nextButton.disabled =
                    activeIndex === slides.length - 1;

            }


            if (updateUrl) {

                updateHash(
                    slides[activeIndex]
                );

            }


            if (
                focusTab &&
                tabs[activeIndex]
            ) {

                tabs[activeIndex].focus();

            }

        };



        /* =================================================
           COUNTERS
           ================================================= */

        if (totalCounter) {

            totalCounter.textContent =
                String(slides.length);

        }



        /* =================================================
           TAB CONTROLS
           ================================================= */

        tabs.forEach(
            (tab, index) => {

                tab.addEventListener(
                    "click",
                    () => {

                        activateSlide(index);

                    }
                );


                tab.addEventListener(
                    "keydown",
                    (event) => {

                        if (
                            event.key !== "ArrowLeft" &&
                            event.key !== "ArrowRight"
                        ) {
                            return;
                        }


                        event.preventDefault();


                        const direction =
                            event.key === "ArrowRight"
                                ? 1
                                : -1;


                        const nextIndex =
                            Math.min(
                                Math.max(
                                    index + direction,
                                    0
                                ),
                                tabs.length - 1
                            );


                        activateSlide(
                            nextIndex,
                            {
                                focusTab: true
                            }
                        );

                    }
                );

            }
        );



        /* =================================================
           PREVIOUS / NEXT
           ================================================= */

        if (previousButton) {

            previousButton.addEventListener(
                "click",
                () => {

                    activateSlide(
                        activeIndex - 1
                    );

                }
            );

        }


        if (nextButton) {

            nextButton.addEventListener(
                "click",
                () => {

                    activateSlide(
                        activeIndex + 1
                    );

                }
            );

        }



        /* =================================================
           KEYBOARD NAVIGATION
           ================================================= */

        document.addEventListener(
            "keydown",
            (event) => {

                const target =
                    event.target;


                const isFormControl =
                    target instanceof HTMLInputElement ||
                    target instanceof HTMLTextAreaElement ||
                    target instanceof HTMLSelectElement ||
                    target instanceof HTMLButtonElement;


                if (isFormControl) {
                    return;
                }


                if (event.key === "ArrowLeft") {

                    activateSlide(
                        activeIndex - 1
                    );

                }


                if (event.key === "ArrowRight") {

                    activateSlide(
                        activeIndex + 1
                    );

                }

            }
        );



        /* =================================================
           TOUCH SWIPE
           ================================================= */

        let touchStartX = null;
        let touchStartY = null;


        deck.addEventListener(
            "touchstart",
            (event) => {

                const touch =
                    event.changedTouches[0];


                touchStartX = touch.clientX;
                touchStartY = touch.clientY;

            },
            {
                passive: true
            }
        );


        deck.addEventListener(
            "touchend",
            (event) => {

                if (
                    touchStartX === null ||
                    touchStartY === null
                ) {
                    return;
                }


                const touch =
                    event.changedTouches[0];


                const deltaX =
                    touch.clientX - touchStartX;

                const deltaY =
                    touch.clientY - touchStartY;


                touchStartX = null;
                touchStartY = null;


                const horizontalSwipe =
                    Math.abs(deltaX) >
                    Math.abs(deltaY) * 1.25;


                if (!horizontalSwipe) {
                    return;
                }


                if (Math.abs(deltaX) < 55) {
                    return;
                }


                if (deltaX < 0) {

                    activateSlide(
                        activeIndex + 1
                    );

                } else {

                    activateSlide(
                        activeIndex - 1
                    );

                }

            },
            {
                passive: true
            }
        );



        /* =================================================
           HASH NAVIGATION
           ================================================= */

        window.addEventListener(
            "hashchange",
            () => {

                const hashIndex =
                    getSlideIndexFromHash();


                if (hashIndex >= 0) {

                    activateSlide(
                        hashIndex,
                        {
                            updateUrl: false
                        }
                    );

                }

            }
        );



        /* =================================================
           INITIAL SLIDE
           ================================================= */

        const initialIndex =
            getSlideIndexFromHash();


        activateSlide(
            initialIndex >= 0
                ? initialIndex
                : 0,
            {
                updateUrl: false
            }
        );

    });

});