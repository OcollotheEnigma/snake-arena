# AI Development Instructions

## Project

Snake Arena is a small full-stack browser game where players control a snake, collect food, earn points, and compete on a leaderboard.

## Development Principles

* Keep the implementation simple and beginner-friendly.
* Follow the product specification in `product-spec.md`.
* Do not introduce unnecessary dependencies.
* Keep the frontend and backend responsibilities separate.
* Use the OpenAPI contract as the source of truth for communication between the frontend and backend.
* Store scores persistently in SQLite.
* Validate user input.
* Write tests for important backend behavior.
* Prefer readable and maintainable code over clever code.
* Explain significant AI-generated changes before accepting them.
* Test changes locally before considering them complete.

## Frontend

The frontend should use:

* HTML
* CSS
* JavaScript

The frontend should provide:

* Player name input
* Snake game
* Keyboard controls
* Score display
* Game-over message
* Score submission
* Leaderboard

## Backend

The backend should use:

* Python
* FastAPI
* SQLite

The backend should provide:

* Health check
* Score submission
* Leaderboard retrieval

## API

The API should follow the `openapi.yaml` contract.

Required endpoints:

* `GET /health`
* `GET /scores`
* `POST /scores`

## Database

Use SQLite for persistent score storage.

The application should keep database-related code separate enough that the database could be replaced with PostgreSQL later without rewriting the entire application.

## Testing

Tests should cover:

* API health
* Creating a score
* Retrieving scores

Run tests with:

```bash
pytest
```

## AI-Assisted Development

AI may be used to help with:

* Planning
* Writing code
* Debugging
* Testing
* Documentation

AI-generated code must be reviewed and tested before being accepted.
