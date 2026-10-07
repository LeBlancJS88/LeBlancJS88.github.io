/* =========================================================
   JEREMY LEBLANC PORTFOLIO
   Project Rendering
   ========================================================= */


/* =========================================================
   HELPERS
   ========================================================= */

   function createProjectCard(project) {

    const article = document.createElement("article");

    article.className = "project-card project-card--third";

    article.dataset.categories =
        project.categories
            .map((category) => category.toLowerCase())
            .join(",");


    const technologies =
        project.technologies
            .slice(0, 3)
            .map(
                (technology) =>
                    `<span class="tag">${technology}</span>`
            )
            .join("");


    article.innerHTML = `

        <a
            class="project-card__link"
            href="${project.links.project}"
        >

            <div class="project-card__media">

                <img
                    class="project-card__image"
                    src="${project.thumbnail}"
                    alt="${project.title}"
                    loading="lazy"
                >

            </div>


            <div class="project-card__body">

                <h2 class="project-card__title">
                    ${project.title}
                </h2>


                <div class="project-meta">

                    ${project.categories
                        .slice(0, 3)
                        .map(
                            (category) =>
                                `<span class="project-meta__item">${category}</span>`
                        )
                        .join("")}

                </div>


                <p class="project-card__description">
                    ${project.summary}
                </p>


                <div class="project-card__footer">

                    <div class="tag-list">
                        ${technologies}
                    </div>


                    <span
                        class="card-action"
                        aria-hidden="true"
                    >

                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            width="16"
                            height="16"
                        >
                            <path
                                d="M5 12H19M14 7L19 12L14 17"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>

                    </span>

                </div>

            </div>

        </a>

    `;


    return article;

}



/* =========================================================
   RENDER PROJECTS
   ========================================================= */

function renderProjects(projects) {

    const container =
        document.querySelector("[data-project-grid]");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    projects.forEach((project) => {

        const card = createProjectCard(project);

        container.appendChild(card);

    });

}



/* =========================================================
   FILTERING
   ========================================================= */

function setupProjectFilters() {

    const filterButtons =
        document.querySelectorAll("[data-project-filter]");


    if (!filterButtons.length) {
        return;
    }


    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const selectedFilter =
                button.dataset.projectFilter.toLowerCase();


            filterButtons.forEach((filterButton) => {

                filterButton.classList.remove("is-active");

            });


            button.classList.add("is-active");


            if (selectedFilter === "all") {

                renderProjects(portfolioProjects);

                return;

            }


            const filteredProjects =
                portfolioProjects.filter((project) => {

                    return project.categories.some(
                        (category) =>
                            category.toLowerCase() === selectedFilter
                    );

                });


            renderProjects(filteredProjects);

        });

    });

}



/* =========================================================
   PROJECT COUNT
   ========================================================= */

function updateProjectCount() {

    const countElement =
        document.querySelector("[data-project-count]");


    if (!countElement) {
        return;
    }


    const count = portfolioProjects.length;


    countElement.textContent =
        `${count} ${count === 1 ? "project" : "projects"}`;

}



/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (
        typeof portfolioProjects === "undefined"
    ) {

        console.error(
            "Project data could not be found. Make sure data/projects.js is loaded before assets/js/projects.js."
        );

        return;

    }


    renderProjects(portfolioProjects);

    setupProjectFilters();

    updateProjectCount();

});