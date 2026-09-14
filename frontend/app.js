const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const playerNameInput = document.getElementById("playerName");
const startButton = document.getElementById("startButton");
const submitButton = document.getElementById("submitButton");
const scoreElement = document.getElementById("score");
const message = document.getElementById("message");
const leaderboard = document.getElementById("leaderboard");

const API_URL = "http://127.0.0.1:8000";

const gridSize = 20;
const tileSize = canvas.width / gridSize;

let snake = [];
let food = {};
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let score = 0;
let gameRunning = false;
let gameInterval = null;


function randomFood() {
    return {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
    };
}


function startGame() {

    const name = playerNameInput.value.trim();

    if (!name) {
        message.textContent = "Please enter your name first.";
        return;
    }

    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];

    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };

    food = randomFood();

    score = 0;

    scoreElement.textContent = score;

    message.textContent =
        "Use the arrow keys to move.";

    gameRunning = true;

    submitButton.disabled = true;

    clearInterval(gameInterval);

    gameInterval = setInterval(updateGame, 120);

    draw();
}


function updateGame() {

    direction = nextDirection;

    const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    if (
        head.x < 0 ||
        head.x >= gridSize ||
        head.y < 0 ||
        head.y >= gridSize ||
        snake.some(
            part => part.x === head.x && part.y === head.y
        )
    ) {
        endGame();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {

        score++;

        scoreElement.textContent = score;

        food = randomFood();

    } else {

        snake.pop();

    }

    draw();
}


function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "#22c55e";

    snake.forEach(part => {

        ctx.fillRect(
            part.x * tileSize,
            part.y * tileSize,
            tileSize - 1,
            tileSize - 1
        );

    });

    ctx.fillStyle = "#ef4444";

    ctx.fillRect(
        food.x * tileSize,
        food.y * tileSize,
        tileSize - 1,
        tileSize - 1
    );
}


function endGame() {

    gameRunning = false;

    clearInterval(gameInterval);

    message.textContent =
        `Game over! Your score was ${score}.`;

    submitButton.disabled = false;
}


async function submitScore() {

    const name = playerNameInput.value.trim();

    if (!name) {
        return;
    }

    const url =
        `${API_URL}/scores?player_name=${encodeURIComponent(name)}&score=${score}`;

    const response = await fetch(url, {
        method: "POST"
    });

    if (response.ok) {

        message.textContent =
            "Score submitted successfully!";

        submitButton.disabled = true;

        loadLeaderboard();
    }
}


async function loadLeaderboard() {

    const response =
        await fetch(`${API_URL}/scores`);

    if (!response.ok) {
        return;
    }

    const scores = await response.json();

    leaderboard.innerHTML = "";

    scores.forEach(item => {

        const li = document.createElement("li");

        li.textContent =
            `${item.player_name} - ${item.score}`;

        leaderboard.appendChild(li);

    });
}


document.addEventListener("keydown", event => {

    if (!gameRunning) {
        return;
    }

    if (
        event.key === "ArrowUp" &&
        direction.y === 0
    ) {
        nextDirection = { x: 0, y: -1 };
    }

    if (
        event.key === "ArrowDown" &&
        direction.y === 0
    ) {
        nextDirection = { x: 0, y: 1 };
    }

    if (
        event.key === "ArrowLeft" &&
        direction.x === 0
    ) {
        nextDirection = { x: -1, y: 0 };
    }

    if (
        event.key === "ArrowRight" &&
        direction.x === 0
    ) {
        nextDirection = { x: 1, y: 0 };
    }

});


startButton.addEventListener(
    "click",
    startGame
);

submitButton.addEventListener(
    "click",
    submitScore
);

loadLeaderboard();