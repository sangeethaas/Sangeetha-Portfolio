export function initGameLauncher() {
    const launcher = document.querySelector(".arcade-launcher");

    if (!launcher) return;

    const buttons = launcher.querySelectorAll("[data-game-target]");
    const panels = launcher.querySelectorAll("[data-game-panel]");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const target = button.dataset.gameTarget;

            buttons.forEach((item) => {
                const isActive = item === button;
                item.classList.toggle("is-active", isActive);
                item.setAttribute("aria-selected", String(isActive));
            });

            panels.forEach((panel) => {
                panel.classList.toggle(
                    "is-active",
                    panel.dataset.gamePanel === target
                );
            });
        });
    });
}
