# AGENT.md

This file provides guidance to AGENT Code (AGENT.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install          # install dependencies
pnpm dev              # development server with hot reload (node --watch)
pnpm start            # production server
pnpm format           # format with Prettier
```

No test framework is configured yet.

## Environment Variables

Create a `.env` file. Required keys:

| Variable | Default | Notes |
|---|---|---|
| `PORT` | `3000` | |
| `NODE_ENV` | `development` | |
| `MONGODB_URI` | `mongodb://localhost:27017/backend` | |
| `CLERK_PUBLISHABLE_KEY` | — | Required for auth |
| `CLERK_SECRET_KEY` | — | Required for auth |
| `RESEND_API_KEY` | — | Optional; email silently skipped if absent |
| `MAIL_FROM` | `noreply@example.com` | |
| `APP_NAME` | `Backend API` | Used in emails |
| `APP_URL` | `http://localhost:3000` | |
| `RATE_LIMIT_WINDOW_MS` | `900000` | 15 min |
| `RATE_LIMIT_MAX` | `100` | |
| `DEBUG` | `false` | Enables debug logging |

## Architecture

Express 5 REST API using a layered architecture:

```
Request → Middleware → Route → Controller → Service → Repository → MongoDB
```

**Layers:**

- `src/config/` — Environment config, MongoDB connection (`database.js`), email client (`mail.config.js`)
- `src/models/` — Mongoose schemas + Zod validation schemas (e.g., `User.js` with `clerkId`, `name`, `email`, `role`, `isActive`)
- `src/repositories/` — All direct DB access; `userRepository.js`, `healthRepository.js`, `rateLimiter.repository.js` (in-memory TTL store)
- `src/services/` — Business logic; `healthService.js`, `mail.service.js`, `rateLimiter.service.js`
- `src/controllers/` — HTTP handlers; call services, use formatters, throw typed errors
- `src/routes/` — Route mounting; currently only `health.js` (`GET /api/v1/health`, `GET /api/v1/health/detailed`)
- `src/middlewares/` — `errorHandler.js` (global), `rateLimiter.middleware.js`, `validationMiddleware.js`
- `src/utils/` — `logger/` (ConsoleLogger), `errors/` (BaseError + subclasses), `formatters/` (successFormatter/errorFormatter), `validators/` (Zod helpers), `constants.js` (rate limits, roles)

**Key design decisions:**

- Rate limiting uses an in-memory store in `rateLimiter.repository.js` — not suitable for multi-process deployments; swap for Redis if scaling horizontally.
- Authentication is handled entirely by Clerk via `@clerk/express` middleware; user records in MongoDB store `clerkId` as the foreign key linking to Clerk.
- Email is built with Resend + Mailgen (HTML templates); the service silently no-ops if `RESEND_API_KEY` is missing.
- Errors thrown as `BaseError` subclasses (e.g., `NotFoundError`, `UnauthorizedError`) are caught by the global `errorHandler` middleware and serialized via `errorFormatter`.
- All responses go through `successFormatter` / `errorFormatter` in `src/utils/formatters/`.
- Mongoose documents have a custom `toJSON` transform that renames `_id` → `id` and drops `__v`.
