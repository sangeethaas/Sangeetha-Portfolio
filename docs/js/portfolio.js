import { ACTIVE_THEME, THEMES } from "./theme.js";

const portfolioData = {
    profile: {
        name: "Sangeetha A S",
        role: "Software Engineer",
        experience: "4",
        clients: "22",
        modules: "10+",
        dashboardImprovement: "97%",
        email: "sangeethaanikumari@gmail.com",
        linkedin: "https://linkedin.com/in/sangeethaas",
    },

    hero: {
        welcome: "★ WELCOME TO MY CORNER OF THE INTERNET ★",
        headline: "hello im sangeetha",
        terminal: [
            "> Software Engineer",
            "> 4 years experience",
            "> PHP / Laravel / Symfony / Node.js",
            "> APIs / SaaS / SQL / real-time systems",
        ],
    },

    experience: [
        "4 years building enterprise web applications and multi-tenant SaaS platforms.",
        "Supported a shared SaaS platform across 22 clients in live and UAT environments.",
        "Worked across 10+ enterprise modules with extensive client-specific customization.",
        "Led and mentored junior developers.",
        "Built APIs, real-time features, event-driven functionality and database solutions.",
        "Troubleshot production issues through logs, source code and database investigation.",
    ],

    education: {
        degree: "Bachelor's Degree",
        description:
            "Bachelor of Technology in Electronics and Communication Engineering.",
        note:
            "Started in electronics. Somehow ended up debugging APIs at unreasonable hours.",
    },

    engineering: {
        cards: [
            {
                number: "01",
                title: '"okay, let\'s debug this."',
                description:
                    "Some things look simple until you have to explain how they actually work.",
                topics: [
                    "database architecture",
                    "event-driven systems",
                    "multi-tenant design",
                    "performance debugging",
                ],
            },
            {
                number: "02",
                title: "6 minutes → 12 seconds",
                description:
                    "A critical dashboard was taking approximately six minutes to load.",
                stat: "97%",
                result:
                    "reduction in page load time after investigating queries, data access and application behaviour.",
            },
        ],
    },
};

export function initPortfolio() {
    document.documentElement.dataset.portfolioReady = "true";
    hydrateText();
}

function hydrateText() {
    setText("[data-profile-name]", portfolioData.profile.name);
    setText("[data-profile-role]", portfolioData.profile.role);
    setText("[data-experience-years]", portfolioData.profile.experience);
    setText("[data-client-count]", portfolioData.profile.clients);
    setText("[data-module-count]", portfolioData.profile.modules);
    setText("[data-dashboard-improvement]", portfolioData.profile.dashboardImprovement);
    setText("[data-email]", portfolioData.profile.email);

    document.querySelectorAll("[data-linkedin]").forEach((link) => {
        link.href = portfolioData.profile.linkedin;
    });

    // Display the current theme name in the UI (if the element exists)
    if (typeof THEMES !== "undefined" && typeof ACTIVE_THEME !== "undefined") {
        setText("#currentTheme", THEMES[ACTIVE_THEME]);
    }
}

function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element && value !== undefined) {
        element.textContent = value;
    }
}

export { portfolioData };
