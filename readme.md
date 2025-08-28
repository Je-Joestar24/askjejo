AskJeJo — Full‑Stack Vue 3 + Laravel 12 (Dockerized)

Overview

Full‑stack application featuring a Vue 3 (Composition API) SPA powered by a Laravel 12 API, containerized with Docker and backed by PostgreSQL. Authentication uses Laravel Sanctum with cookie-based session + CSRF protection. The frontend communicates via Axios and is served by Vite during development.

Tech Stack

- Frontend:
  - Vue 3 (Composition API)
  - Vue Router 4
  - Vuex 4 (state management)
  - Vite 7 (dev/build)
  - Axios (HTTP client)
  - Vitest + @vue/test-utils (unit tests)

- Backend:
  - PHP 8.2
  - Laravel 12
  - Laravel Sanctum (cookie/CSRF auth)
  - PHPUnit (tests)

- Infrastructure:
  - Docker + docker-compose
  - PostgreSQL 15
  - Node.js runtime in frontend container
  - Optional: Nginx reverse proxy (not included yet; see Notes)

- Integrations:
  - Groq API (LLAMA/LLAMA-4-scout) for chat responses
  - marked (frontend) for safe Markdown-to-HTML rendering of AI replies

Architecture

- frontend/ — Vue SPA built with Vite
  - Uses Axios to call the backend at `http://localhost:9000`
  - Sanctum flow via `/sanctum/csrf-cookie` then API calls with credentials
  - Renders AI responses with `marked` (install with `npm i marked`)
- backend/ — Laravel application
  - Exposes API over PHP built-in server on port 9000 (Docker container)
  - PostgreSQL connection configured via environment variables
  - Integrates with Groq via a service adapter and controller using model `LLAMA/LLAMA-4-scout-17b-16e-instruct`
- docker-compose.yaml — Orchestrates `backend`, `frontend`, and `db` services

Ports

- Frontend (Vite): http://localhost:5173
- Backend (Laravel): http://localhost:9000
- PostgreSQL: localhost:5432

Quick Start (Docker)

1) Prerequisites

- Docker Desktop
- Node 20+ (only if running frontend outside Docker)

2) Environment

- Request or create backend `.env` in `backend/` (copy from `.env.example` and adjust DB to Postgres). Minimum:
  - `DB_CONNECTION=pgsql`
  - `DB_HOST=db`
  - `DB_PORT=5432`
  - `DB_DATABASE=askjejo`
  - `DB_USERNAME=postgres`
  - `DB_PASSWORD=postgres`
  - For Sanctum (example): `SESSION_DRIVER=cookie`, `SANCTUM_STATEFUL_DOMAINS=localhost:5173`, `SESSION_DOMAIN=localhost`, `APP_URL=http://localhost:9000`

3) Build and Run

```sh
docker-compose build
docker-compose up -d
```

4) Migrate database (inside backend container)

```sh
docker exec -it laravel_app_askjejo php artisan migrate
```

5) Access apps

- Frontend: http://localhost:5173
- API: http://localhost:9000

Authentication (Sanctum)

- Flow used by the frontend:
  1. GET `/sanctum/csrf-cookie` to set `XSRF-TOKEN` cookie
  2. Send login/register requests with `withCredentials: true` and `X-CSRF-TOKEN` header
  3. Subsequent authenticated requests include session cookie automatically

Local Development (without Docker)

- Backend
  - PHP 8.2+, Composer
  - `cd backend && composer install`
  - `cp .env.example .env` and configure Postgres
  - `php artisan key:generate`
  - `php artisan migrate`
  - `php artisan serve --host=127.0.0.1 --port=9000`

- Frontend
  - Node 20+
  - `cd frontend && npm install`
  - `npm run dev` (Vite on http://localhost:5173)

Testing

- Frontend: `cd frontend && npm run test:unit`
- Backend: `cd backend && php artisan test`

Notes

- Nginx: The current Docker setup serves Laravel via PHP’s built-in server on port 9000. If you need an Nginx reverse proxy (e.g., TLS termination, static asset offloading), add an `nginx` service to `docker-compose.yaml` and proxy to `backend:9000`.
- Groq API: Integrated. The backend calls Groq with model `LLAMA/LLAMA-4-scout`. Configure your credentials in `backend/.env`:
  - `GROQ_API_KEY=your_groq_api_key`
  - Optional: `GROQ_MODEL=LLAMA/LLAMA-4-scout`
  The frontend displays model responses as Markdown using `marked`.
- CORS/CSRF: Ensure CORS is configured to allow origin `http://localhost:5173` and that `withCredentials` is enabled on Axios requests (already set in `frontend/src/config/api.js`).

Troubleshooting

- CSRF mismatch:
  - Call `/sanctum/csrf-cookie` before login, and ensure cookies are not blocked by the browser.
- DB connection errors:
  - Confirm `db` container is healthy and `.env` matches docker-compose values.
- Port conflicts:
  - Change exposed ports in `docker-compose.yaml` if 5173/9000/5432 are occupied.

Roadmap

- Add Nginx reverse proxy service for production-like setup and TLS termination.
- Introduce API versioning and OpenAPI/Swagger documentation.
- Harden CORS/CSRF/session settings for production domains.

Groq API Integration

- Backend
  - Service: a dedicated adapter calls Groq using `GROQ_API_KEY` and the model `LLAMA/LLAMA-4-scout`.
  - Example env in `backend/.env`:
    - `GROQ_API_KEY=...`
    - `GROQ_MODEL=LLAMA/LLAMA-4-scout`
  - Example endpoint (subject to change): `POST /api/ask` with JSON `{ "message": "..." }` returns `{ reply: string, meta: {...} }`.

- Frontend
  - Install and use `marked` to render assistant replies:
    ```sh
    cd frontend && npm i marked
    ```
  - Typical usage:
    ```js
    import { marked } from 'marked'
    const html = marked.parse(replyMarkdown)
    ```

Model

- Current model: `LLAMA/LLAMA-4-scout` (via Groq). You can override with `GROQ_MODEL` in the backend environment.

License

MIT (unless otherwise specified in subdirectories)