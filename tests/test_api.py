import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1] / "backend"))

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_create_score():
    response = client.post(
        "/scores",
        params={"player_name": "Test Player", "score": 10}
    )

    assert response.status_code == 200

    data = response.json()

    assert data["player_name"] == "Test Player"
    assert data["score"] == 10


def test_get_scores():
    response = client.get("/scores")

    assert response.status_code == 200
    assert isinstance(response.json(), list)
