// Change this value to switch the site's theme. There is intentionally no UI
// control: visitors see only the theme selected here.
export const ACTIVE_THEME = "soft-editorial";

export const THEMES = {
    "y2k-pink": "Y2K Pink",
    "dark-mode": "Dark Mode",
    "frutiger-aero": "Frutiger Aero",
    "minimalist": "Minimalist",
    "starry-night": "Starry Night",
    "cyberpunk-neon": "Cyberpunk Neon",
    "soft-editorial": "Soft Editorial",
    "ocean-breeze": "Ocean Breeze",
    "windows-98": "Windows 98",
    "gameboy": "Matcha",
    "synthwave-arcade": "Synthwave Arcade",
    "futuristic-ui": "Futuristic UI",
    "modern-studio": "Modern Studio",
    "cottagecore": "Cottagecore",
    "swiss": "Swiss / International",
    "dark-academia": "Dark Academia",
    "macintosh": "Macintosh System 7",
    "nordic": "Nordic",
    "research-notebook": "Research Notebook",
    "botanical-modern": "Botanical Modern",
    "neo-retro": "Neo-Retro Computing",
    "coffeehouse": "Coffeehouse",
    "mission-control": "Mission Control",
    "ink-paper": "Ink & Paper",
    "brutalist": "Brutalist",
};


export function initTheme() {
    const theme = THEMES[ACTIVE_THEME]
        ? ACTIVE_THEME
        : "y2k-pink";

    document.documentElement.dataset.theme = theme;
}
