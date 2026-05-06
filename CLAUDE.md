# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal resume/portfolio website for Alberto Perez Gant (Data Scientist & Engineer). Fully static frontend served by Nginx. Contact form submissions go directly from the browser to a shared self-hosted Pocketbase instance.

## Architecture

```
alberto-resume/
  frontend/           Vanilla HTML/CSS/JS single-page site
    data/data.json    Single source of truth for all resume content
    assets/js/scripts.js  Fetches data.json at load time and injects into DOM
  nginx.conf          Nginx config to serve the static frontend
  docker-compose.yml  Single service: Nginx

/projects/pocketbase/
  docker-compose.yml  Standalone Pocketbase instance shared across projects
```

Key design decisions:
- **No backend**: The site is fully static. Nginx serves all files directly.
- **Data-driven frontend**: All resume sections live in `data/data.json`. The JS fetches it at page load and renders into DOM placeholders (elements with `-js` id suffixes).
- **Contact form**: POSTs as JSON directly from the browser to Pocketbase (`/api/collections/alberto_resume_contacts/records`). The `POCKETBASE_URL` constant at the top of `scripts.js` controls the target URL.
- **Pocketbase**: Self-hosted at `/projects/pocketbase/`, shared across multiple projects. Each project has its own collection. Admin UI at `http://localhost:8090/_/`.

## Pocketbase Setup (first time)

1. `cd /projects/pocketbase && docker compose up -d`
2. Open `http://localhost:8090/_/` and create an admin account.
3. Create collection `alberto_resume_contacts` with fields:
   - `name` (Plain text, required)
   - `email` (Email, required)
   - `message` (Plain text, required)
4. In the collection's **API Rules**, set **Create** rule to empty (allow everyone).
5. For production: update `POCKETBASE_URL` in `frontend/assets/js/scripts.js` to the public URL.

## Common Commands

**Start the site:**
```bash
docker compose up -d
```

**Start Pocketbase (shared, run once):**
```bash
cd /projects/pocketbase && docker compose up -d
```

## Coding Preferences

- No backend — avoid introducing server-side logic. Keep it static.
- To add or update resume content, edit `frontend/data/data.json` only.
- CSS is split by section (`global.css`, `styles.css`, `contact.css`, `education.css`, `experience.css`, `projects-v2.css`), all imported via `assets/css/all.css`.
- The Pocketbase URL is the `POCKETBASE_URL` constant at the top of `scripts.js`. Update it for production.
