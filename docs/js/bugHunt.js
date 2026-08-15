const GAME_DURATION = 20;
const SPAWN_INTERVAL = 700;

export function initBugHunt() {
    const area = document.getElementById("bugHuntArea");
    const score = document.getElementById("bugHuntScore");
    const time = document.getElementById("bugHuntTime");
    const message = document.getElementById("bugHuntMessage");
    const button = document.getElementById("startBugHunt");

    if (!area || !score || !time || !message || !button) return;

    let scoreValue = 0;
    let timeRemaining = GAME_DURATION;
    let spawnTimer;
    let countdownTimer;

    const updateScore = () => {
        score.textContent = String(scoreValue).padStart(3, "0");
    };

    const clearBugs = () => area.querySelectorAll(".bug-target").forEach((bug) => bug.remove());

    const endGame = () => {
        clearInterval(spawnTimer);
        clearInterval(countdownTimer);
        clearBugs();
        area.classList.remove("is-playing");
        message.textContent = `SCAN COMPLETE — ${scoreValue} BUG${scoreValue === 1 ? "" : "S"} SQUASHED`;
        button.textContent = "RUN AGAIN";
        button.disabled = false;
    };

    const spawnBug = () => {
        const bug = document.createElement("button");
        const maxX = Math.max(0, area.clientWidth - 44);
        const maxY = Math.max(0, area.clientHeight - 44);

        bug.type = "button";
        bug.className = "bug-target";
        bug.textContent = "🐛";
        bug.setAttribute("aria-label", "Squash bug");
        bug.style.left = `${Math.random() * maxX}px`;
        bug.style.top = `${Math.random() * maxY}px`;

        bug.addEventListener("click", () => {
            scoreValue += 1;
            updateScore();
            bug.remove();
        });

        area.append(bug);
        window.setTimeout(() => bug.remove(), SPAWN_INTERVAL * 1.4);
    };

    const startGame = () => {
        clearInterval(spawnTimer);
        clearInterval(countdownTimer);
        clearBugs();
        area.classList.add("is-playing");

        scoreValue = 0;
        timeRemaining = GAME_DURATION;
        updateScore();
        time.textContent = timeRemaining;
        message.textContent = "CLICK THE BUGS BEFORE THEY ESCAPE";
        button.disabled = true;

        spawnBug();
        spawnTimer = window.setInterval(spawnBug, SPAWN_INTERVAL);
        countdownTimer = window.setInterval(() => {
            timeRemaining -= 1;
            time.textContent = timeRemaining;

            if (timeRemaining === 0) endGame();
        }, 1000);
    };

    button.addEventListener("click", startGame);
}
