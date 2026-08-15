const SELECTORS = {
    gameArea: "catGameArea",
    cat: "cat",
    catImage: "catImage",
    hand: "pettingHand",
    score: "catScore",
    counter: "petCounter",
    finalScore: "finalCatScore",
    status: "catStatus",
    startScreen: "catStart",
    gameOverScreen: "catGameOver",
    startButton: "startCatGame",
    restartButton: "restartCatGame",
    closeButton: "closeCatGame",
};

const IMAGES = {
    closed: "images/cat-closed-mouth.jpg",
    open: "images/cat-open-mouth.jpg",
};

const TIMING = {
    scoreInterval: 100,
    attackMin: 2000,
    attackMax: 5000,
    mouthOpenDuration: 2200,
    reactionGracePeriod: 900,
    caughtNoticeDuration: 900,
    blackFadeDuration: 350,
    petAnimationDuration: 120,
};

const state = {
    score: 0,
    petCount: 0,
    gameRunning: false,
    catIsOpen: false,
    caught: false,
    catTimer: null,
    scoreTimer: null,
    lastX: 0,
    lastY: 0,
    handMoved: false,
    mouthOpenedAt: 0,
};

function getElements() {
    return Object.fromEntries(
        Object.entries(SELECTORS).map(([key, id]) => [
            key,
            document.getElementById(id),
        ])
    );
}

function formatScore(value) {
    return String(value).padStart(3, "0");
}

function playEndGameSound() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) return;

    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;

    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(240, now);
    oscillator.frequency.exponentialRampToValueAtTime(55, now + 0.55);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.14, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.62);
    oscillator.addEventListener("ended", () => audioContext.close());
}

function createGameController(elements) {
    const {
        gameArea,
        cat,
        catImage,
        hand,
        score,
        counter,
        finalScore,
        status,
        startScreen,
        gameOverScreen,
        startButton,
        restartButton,
        closeButton,
    } = elements;
    const fadeScreen = document.createElement("div");

    fadeScreen.className = "cat-game-fade";
    fadeScreen.setAttribute("aria-hidden", "true");
    gameArea.append(fadeScreen);

    const updateScore = () => {
        score.textContent = formatScore(state.score);
        counter.textContent = formatScore(state.petCount);
    };

    const setCatMouth = (isOpen) => {
        state.catIsOpen = isOpen;
        catImage.src = isOpen ? IMAGES.open : IMAGES.closed;
    };

    const clearTimers = () => {
        clearTimeout(state.catTimer);
        clearInterval(state.scoreTimer);
        state.catTimer = null;
        state.scoreTimer = null;
    };

    const resetVisualState = () => {
        gameArea.style.cursor = "default";
        hand.style.display = "none";
        cat.classList.remove("cat-caught", "petting");
        status.classList.remove("caught-flash");
        fadeScreen.classList.remove("is-visible");
        setCatMouth(false);
    };

    const endGame = () => {
        state.gameRunning = false;
        clearTimers();

        gameArea.style.cursor = "default";
        hand.style.display = "none";
        finalScore.textContent = formatScore(state.score);
        gameOverScreen.style.display = "flex";
        status.textContent = "💀 GAME OVER";
    };

    const triggerCaught = () => {
        if (state.caught) return;

        state.caught = true;
        state.catIsOpen = false;
        clearTimers();
        playEndGameSound();

        hand.style.display = "none";
        gameArea.style.cursor = "default";
        catImage.src = IMAGES.open;
        status.textContent = "😱 GOTCHA! HOLD STILL...";
        status.classList.add("caught-flash");
        cat.classList.add("cat-caught");

        window.setTimeout(() => {
            status.classList.remove("caught-flash");
            cat.classList.remove("cat-caught");
            fadeScreen.classList.add("is-visible");

            window.setTimeout(() => {
                endGame();
                window.requestAnimationFrame(() => {
                    fadeScreen.classList.remove("is-visible");
                });
            }, TIMING.blackFadeDuration);
        }, TIMING.caughtNoticeDuration);
    };

    const closeCatMouth = () => {
        if (!state.gameRunning) return;

        setCatMouth(false);
        status.textContent = "🐈 PET THE CAT";
        scheduleCatAttack();
    };

    const openCatMouth = () => {
        if (!state.gameRunning) return;

        setCatMouth(true);
        state.mouthOpenedAt = Date.now();
        status.textContent = "😼 CAT IS WATCHING — DON'T MOVE!";

        window.setTimeout(() => {
            if (!state.gameRunning || !state.catIsOpen) return;
            closeCatMouth();
        }, TIMING.mouthOpenDuration);
    };

    function scheduleCatAttack() {
        clearTimeout(state.catTimer);

        if (!state.gameRunning) return;

        const delay =
            Math.floor(
                Math.random() * (TIMING.attackMax - TIMING.attackMin)
            ) + TIMING.attackMin;

        state.catTimer = window.setTimeout(openCatMouth, delay);
    }

    const startScoring = () => {
        clearInterval(state.scoreTimer);

        state.scoreTimer = window.setInterval(() => {
            if (!state.gameRunning || state.catIsOpen || state.caught) return;

            if (state.handMoved) {
                state.score += 1;
                state.petCount += 1;
                updateScore();

                cat.classList.add("petting");

                window.setTimeout(
                    () => cat.classList.remove("petting"),
                    TIMING.petAnimationDuration
                );
            }

            state.handMoved = false;
        }, TIMING.scoreInterval);
    };

    const startGame = () => {
        clearTimers();

        Object.assign(state, {
            score: 0,
            petCount: 0,
            gameRunning: true,
            catIsOpen: false,
            caught: false,
            lastX: 0,
            lastY: 0,
            handMoved: false,
            mouthOpenedAt: 0,
        });

        gameArea.style.cursor = "none";
        updateScore();
        resetVisualState();

        startScreen.style.display = "none";
        gameOverScreen.style.display = "none";
        hand.style.display = "block";
        status.textContent = "🐈 PET THE CAT";

        scheduleCatAttack();
        startScoring();
    };

    const moveHand = (x, y) => {
        if (!state.gameRunning || state.caught) return;

        const rect = gameArea.getBoundingClientRect();
        const handX = x - rect.left;
        const handY = y - rect.top;

        hand.style.left = `${handX}px`;
        hand.style.top = `${handY}px`;

        const moved =
            Math.abs(handX - state.lastX) > 2 ||
            Math.abs(handY - state.lastY) > 2;

        if (moved) {
            state.handMoved = true;

            const reactionTimeElapsed =
                Date.now() - state.mouthOpenedAt >= TIMING.reactionGracePeriod;

            if (state.catIsOpen && reactionTimeElapsed) {
                triggerCaught();
                return;
            }
        }

        state.lastX = handX;
        state.lastY = handY;
    };

    const closeGame = () => {
        clearTimers();

        Object.assign(state, {
            gameRunning: false,
            caught: false,
            catIsOpen: false,
            handMoved: false,
            mouthOpenedAt: 0,
        });

        gameArea.style.cursor = "default";
        gameOverScreen.style.display = "none";
        startScreen.style.display = "flex";
        hand.style.display = "none";

        cat.classList.remove("cat-caught");
        status.classList.remove("caught-flash");
        fadeScreen.classList.remove("is-visible");
        status.textContent = "🐈 PET THE CAT";
        setCatMouth(false);
    };

    gameArea.addEventListener("mousemove", (event) => {
        moveHand(event.clientX, event.clientY);
    });

    gameArea.addEventListener(
        "touchmove",
        (event) => {
            event.preventDefault();
            const touch = event.touches[0];
            moveHand(touch.clientX, touch.clientY);
        },
        { passive: false }
    );

    startButton.addEventListener("click", startGame);
    restartButton.addEventListener("click", startGame);
    closeButton.addEventListener("click", closeGame);

    return {
        start: startGame,
        close: closeGame,
    };
}

export function initCatGame() {
    const elements = getElements();

    if (Object.values(elements).some((element) => !element)) {
        console.warn("Cat game could not initialize: required elements are missing.");
        return null;
    }

    return createGameController(elements);
}
