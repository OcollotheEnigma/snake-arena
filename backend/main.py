from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI(title="Snake Arena API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE = "snake_arena.db"


def init_db():
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            player_name TEXT NOT NULL,
            score INTEGER NOT NULL
        )
    """)

    connection.commit()
    connection.close()


init_db()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/scores")
def get_scores():
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("""
        SELECT player_name, score
        FROM scores
        ORDER BY score DESC
        LIMIT 10
    """)

    rows = cursor.fetchall()
    connection.close()

    return [
        {"player_name": row[0], "score": row[1]}
        for row in rows
    ]


@app.post("/scores")
def create_score(player_name: str, score: int):
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute(
        "INSERT INTO scores (player_name, score) VALUES (?, ?)",
        (player_name, score)
    )

    connection.commit()
    connection.close()

    return {
        "player_name": player_name,
        "score": score
    }