/* =========================================================
   JEREMY LEBLANC PORTFOLIO
   Project Data
   ========================================================= */


/*
    This file is the central source of truth for projects.

    Project listing pages and featured-project components can
    read from this data instead of duplicating titles, roles,
    descriptions, tags and image paths throughout the site.
*/


const portfolioProjects = [


    /* =====================================================
       BUILDPULSE
       ===================================================== */

    {
        id: "buildpulse",

        title: "BuildPulse",

        subtitle: "Unity Tooling · C# · Telemetry",

        categories: [
            "Tools",
            "Technical Art",
            "Optimization"
        ],

        technologies: [
            "Unity",
            "C#",
            "Editor Tooling",
            "Performance",
            "Telemetry"
        ],

        role: "Creator & Developer",

        engine: "Unity",

        featured: true,

        featuredOrder: 1,

        thumbnail:
            "assets/images/projects/buildpulse/featured.png",

        hero:
            "assets/images/projects/buildpulse/featured.png",

        summary:
            "A Unity QA telemetry and performance reporting tool designed to streamline internal testing, profiling and build feedback.",

        links: {

            project:
                "projects/buildpulse.html",

            external:
                null,

            video:
                null,

            repository:
                null

        }

    },



    /* =====================================================
       MORTIMER: FIRST LAUNCH
       ===================================================== */

    {
        id: "mortimer",

        title: "Mortimer: First Launch",

        subtitle: "VFX · Technical Art · Gameplay",

        categories: [
            "VFX",
            "Technical Art",
            "Gameplay"
        ],

        technologies: [
            "Unity",
            "URP",
            "VFX Graph",
            "Shader Graph"
        ],

        role: "Product Owner / Technical Art & VFX Lead",

        engine: "Unity",

        featured: true,

        featuredOrder: 2,

        thumbnail:
            "assets/images/projects/mortimer/featured.jpg",

        hero:
            "assets/images/projects/mortimer/featured.jpg",

        summary:
            "Real-time VFX and technical art work created for Mortimer: First Launch, including gameplay effects, shaders and environmental presentation.",

        links: {

            project:
                "projects/mortimer.html",

            external:
                null,

            video:
                null,

            repository:
                null

        }

    },



    /* =====================================================
       HARMONY IN THE WILD
       ===================================================== */

    {
        id: "harmony",

        title: "Harmony in the Wild",

        subtitle: "Technical Art · VFX · Environment",

        categories: [
            "Technical Art",
            "VFX",
            "Environment"
        ],

        technologies: [
            "Unity",
            "URP",
            "VFX Graph",
            "Shader Graph"
        ],

        role: "Technical Artist & VFX Artist",

        engine: "Unity",

        featured: true,

        featuredOrder: 3,

        thumbnail:
            "assets/images/projects/harmony/featured.jpg",

        hero:
            "assets/images/projects/harmony/featured.jpg",

        summary:
            "Real-time VFX, shaders and technical art developed for a stylized Unity environment.",

        links: {

            project:
                "projects/harmony.html",

            external:
                null,

            video:
                null,

            repository:
                null

        }

    }


];