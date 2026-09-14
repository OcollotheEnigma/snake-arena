Markdown# Snake Arena

A browser-based Snake game with a persistent leaderboard — built as the Module 2 deliverable for the [AI Dev Tools Zoomcamp](https://github.com/DataTalksClub/ai-dev-tools-zoomcamp).

---

## Quick start

### 1. Clone / enter the repo

```bash
cd snake-arena
2. Start the backendBashcd backend
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
The API is now live at http://localhost:8000.Interactive docs: http://localhost:8000/docs3. Open the frontendBash# In a second terminal, from the repo root:
open frontend/index.html    # macOS
xdg-open frontend/index.html  # Linux
# or just drag frontend/index.html into your browser
No build step. No bundler. One file.Run the testsBashcd backend
pytest ../tests/test_scores.py -v
Expected: 15 passed.Project layoutsnake-arena/
├── product-spec.md      ← feature spec with user stories & acceptance criteria
├── AGENTS.md            ← rules for AI coding assistants working in this repo
├── openapi.yaml         ← API contract (source of truth for routes & shapes)
├── README.md
├── frontend/
│   └── index.html       ← single-file Snake game + leaderboard UI
├── backend/
│   ├── main.py          ← FastAPI routes (operationIds match openapi.yaml)
│   ├── database.py      ← SQLite adapter (swap for Postgres here only)
│   ├── models.py        ← Pydantic schemas (match openapi.yaml components)
│   └── requirements.txt
├── tests/
│   ├── test_scores.py         ← pytest backend tests (in-memory SQLite)
│   └── frontend-checklist.md  ← manual AC checklist for the frontend
└── docs/
    └── ai-usage-report.md     ← what AI generated, what humans reviewed/fixed
API referenceMethodPathDescriptionGET/healthLiveness probeGET/scores?limit=10Top-N leaderboardPOST/scoresSubmit a scoreGET/scores/{id}Single score entryFull contract: openapi.yamlArchitecture decisionsDecisionRationaleSingle-file frontendNo build toolchain needed for Module 2Raw sqlite3, no ORMThin adapter; swapping to Postgres only requires changing database.pyOpenAPI written firstContract is the single source of truth; prevents frontend/backend driftuse_memory_db() in testsEach test gets a clean schema; the file DB is never touchedWhat's next (Module 3)Playwright frontend testsDockerfile + docker-composeGitHub Actions CIDeployment to fly.io / Railway
