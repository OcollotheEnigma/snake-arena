# Snake Arena Product Specification

## Product Overview

Snake Arena is a small browser-based game where players control a snake, collect food, earn points, and compete for a place on the leaderboard.

## User Stories

### Player

* As a player, I want to enter my name so that my score can be associated with me.
* As a player, I want to control a snake using the keyboard so that I can play the game.
* As a player, I want my score to increase when I collect food.
* As a player, I want to see when the game ends.
* As a player, I want my score saved so that I can see it on the leaderboard.
* As a player, I want to see previous high scores.

## Acceptance Criteria

1. A player can enter a name before starting.
2. The game displays a snake and food on a grid.
3. Arrow keys control the snake.
4. Eating food increases the score.
5. Hitting a wall or the snake's own body ends the game.
6. The final score can be submitted to the backend.
7. Submitted scores are stored in SQLite.
8. The leaderboard displays saved scores.
9. The frontend communicates with the backend through documented API endpoints.
10. The backend tests pass successfully.

## Non-Goals

* Multiplayer gameplay.
* User authentication.
* Payments.
* Social networking.
* Cloud deployment.
* Advanced matchmaking.
* Real-time multiplayer communication.

## Technical Requirements

* Frontend: HTML, CSS, and JavaScript.
* Backend: Python FastAPI.
* Database: SQLite.
* API contract: OpenAPI.
* Testing: pytest.
