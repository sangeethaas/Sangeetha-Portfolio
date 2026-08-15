// Change this value to switch the site's theme. There is intentionally no UI
// control: visitors see only the theme selected here.
export const ACTIVE_THEME = "gameboy";

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
};

export function initTheme() {
    if (!THEMES[ACTIVE_THEME]) {
        console.warn(`Unknown theme: ${ACTIVE_THEME}. Falling back to y2k-pink.`);
    }

    document.documentElement.dataset.theme =
        THEMES[ACTIVE_THEME] ? ACTIVE_THEME : "y2k-pink";
}
