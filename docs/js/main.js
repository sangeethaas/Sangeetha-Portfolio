import { initNavigation } from "./navigation.js";
import { initCatGame } from "./catGame.js";
import { initBugHunt } from "./bugHunt.js";
import { initGameLauncher } from "./gameLauncher.js";
import { initPortfolio } from "./portfolio.js";
import { initTheme } from "./theme.js";

initTheme();

document.addEventListener("DOMContentLoaded", () => {
    initPortfolio();
    initNavigation();
    initCatGame();
    initBugHunt();
    initGameLauncher();
});
