# Learner Progress Card

A small full-stack app for a company admin to see how employees are progressing through a learning program. Progress is calculated on the backend and shown in a React frontend.

- **Frontend:** React, TypeScript, Tailwind CSS v4, React Router (Vite)
- **Backend:** Node.js, Express 5, Prisma 7
- **Database:** PostgreSQL 18 in Docker
- All data is fictional.

## Prerequisites

- Node.js v24.21.0
- Docker (Docker Desktop on Windows/macOS)

## Setup

Run these from the repository root unless stated otherwise.

```bash
# 1. Install frontend dependencies
npm install

# 2. Set up the backend
cd server
docker compose up -d         # reads server/docker-compose.yml
cp .env.example .env         # Windows cmd: copy .env.example .env
npm install
npm run prisma:generate      # builds the Prisma client (it is gitignored)
npm run prisma:deploy        # applies the committed migration
npm run seed                 # creates the fictional data
```

The defaults in `.env.example` match `docker-compose.yml`, so no edits are needed. If `prisma:deploy` fails with `P1001`, wait a few seconds for Postgres to finish starting and run it again.

## Run

Use two terminals.

```bash
# Terminal 1: API on http://localhost:3000
cd server
npm run dev

# Terminal 2 (repo root): frontend on http://localhost:5173
npm run dev
```

Open http://localhost:5173. The Vite dev server proxies `/api` to the backend.

## Seed data

2 programs, 3 modules, 44 lessons, 5 learners, 7 enrolments and 63 lesson completions. Dates are fixed, so results are the same on every run. Running `npm run seed` again wipes and recreates everything.

| Learner | Program | Progress | Modules | Status |
|---|---|---|---|---|
| Lisa | JavaScript Essentials | 24/24, 100% | 1 of 1 | completed |
| Lisa | Web Development Fundamentals | 5/20, 25% | 0 of 2 | in progress |
| Davis | Web Development Fundamentals | 14/20, 70% | 1 of 2 | in progress |
| Davis | JavaScript Essentials | 7/24, 29% | 0 of 1 | in progress |
| Todd | JavaScript Essentials | 10/24, 42% | 0 of 1 | in progress |
| Mayo | Web Development Fundamentals | 3/20, 15% | 0 of 2 | in progress |
| Karen | JavaScript Essentials | 0/24, 0% | 0 of 1 | not started |

## API

| Method and path | Description |
|---|---|
| `GET /api/learners` | One entry per enrolment: name, username, image, program, program id, completed and total lessons, percent, status, last activity |
| `GET /api/learners/:username?programId=<id>` | One learner's progress in one program, with a per-module breakdown |

Errors are returned as JSON: `400` for a missing `programId`, `404` for an unknown learner, enrolment or route, `500` for anything unexpected.

### How progress is calculated

- **Percent:** completed lessons divided by total lessons in the program, rounded.
- **Module completed:** all of its lessons are completed. A module with no lessons is never completed.
- **Status:** `not_started` (0 lessons), `completed` (all lessons), otherwise `in_progress`.
- **Last activity:** the latest lesson completion date, `null` if none. It is derived, not stored.
- Nothing is calculated in the browser.

## Project structure

```
.
├── src/                  # React app
└── server/
    ├── docker-compose.yml
    ├── prisma/           # schema, migrations, seed
    └── src/              # Express app
```

## Design tokens and theme

Colours are CSS custom properties defined in `src/index.css` and exposed as Tailwind utilities (`bg-surface`, `text-muted`, `bg-accent`, and so on). Dark values override them under `data-theme="dark"`. The theme follows the system setting by default, and the toggle in the header saves the choice in `localStorage`.

## Useful commands (in `server/`)

| Command | Purpose |
|---|---|
| `npm run prisma:studio` | Browse the database |
| `npm run prisma:generate` | Rebuild the client after editing `schema.prisma` |
| `npm run prisma:deploy` | Apply committed migrations |
| `npm run seed` | Reset and reseed the data |


## Assumptions and limitations

- Progress counts lessons only. Exercises are not modelled.
- The list shows one card per enrolment, so a learner in two programs appears twice. Switching learners means going back to the list.
- No authentication; the brief does not require it.
- Not built because of the deadline: weekly lessons chart, learner switcher on the card, automated tests.
- Responsive layout, keyboard use and contrast have not been fully verified.

See [PULL_REQUEST.md](./PULL_REQUEST.md) for the decisions, AI notes and screenshots.