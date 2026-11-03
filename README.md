# Predo

A very small todo app: **React** (frontend) talks to **Express on Node** (backend), which saves todos in a JSON file.

```
frontend/src/App.jsx   the whole UI + 4 fetch() calls
backend/server.js      4 API routes + read/save helpers
backend/todos.json     the "database" (created on first add)
```

Flow diagram: `.archify/sequence-predo-flow-20261103-173332/predo-flow.html`

## API

| Method | URL | Does |
|---|---|---|
| GET | /api/todos | list all |
| POST | /api/todos `{ "text": "..." }` | add one |
| PATCH | /api/todos/:id | flip done |
| DELETE | /api/todos/:id | remove one |

## Run in development (two terminals)

```bash
cd backend && npm install && npm run dev     # API on http://localhost:3001
cd frontend && npm install && npm run dev    # UI on http://localhost:5173 (proxies /api to 3001)
```

## Run like production (one server)

```bash
cd frontend && npm install && npm run build  # makes frontend/dist
cd backend && npm install && npm start       # serves UI + API on http://localhost:3001
```
