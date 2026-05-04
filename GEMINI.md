# Project Context: PYQDeck Monorepo

This document provides project-specific context and instructions for the Gemini CLI to ensure it follows our architectural patterns and coding standards.

## 🏗️ Backend Architecture (5-Layer Pattern)

All backend features must adhere to the following layered structure:

1.  **Models (`backend/src/models/`)**: Define Mongoose schemas and corresponding Zod validation schemas. Use `normalizedText` for searchable fields.
2.  **Repositories (`backend/src/repositories/`)**: Perform raw database operations. Repositories should be the only place where Mongoose model methods (e.g., `find`, `deleteMany`) are called.
3.  **Services (`backend/src/services/`)**: Contain business logic and orchestrate repositories. Services handle logging, complex data transformations, and domain-specific rules.
4.  **Controllers (`backend/src/controllers/`)**: Extract request data (params, body), call services, and format HTTP responses using `successFormatter` or `errorFormatter`.
5.  **Routes (`backend/src/routes/`)**: Define API endpoints and attach necessary middleware (`syncUser`, `isAdmin`, `rateLimiter`).

## 🎨 Frontend Architecture (3-Layer Pattern)

UI components in the Studio and complex features should be split into three files:

1.  **Logic Container (`frontend/src/app/.../[name].jsx`)**: Manages state, data fetching (using `useApi` hook or Server Actions), and event logic.
2.  **Presentation View (`frontend/src/app/.../[name].view.jsx`)**: Pure functional component focused on JSX and layout. Handles icons (`lucide-react`) and conditional styling (`cn` utility).
3.  **Stories (`frontend/src/app/.../[name].stories.jsx`)**: Defines Storybook stories for different UI states.

## 🔐 Authentication & API Integration

- **Authentication**: Powered by Clerk. Use `useAuth` on the client and `auth()` on the server.
- **API Client**:
    - **Client-side**: Use the `useApi()` hook to get an authenticated instance of the generated SDK.
    - **Server-side**: Use `getApiServer()` in Server Components or Server Actions.
- **SDK Generation**: After updating backend routes/OpenAPI annotations, run `pnpm gen:api` in the `frontend` directory.

## 💅 Coding Standards & UI

- **Styling**: Tailwind CSS with Shadcn UI components.
- **Icons**: Always use `lucide-react`.
- **Feedback**: Use `sonner` for toast notifications.
- **Aesthetics**: "Premium Studio" feel—subtle borders, `font-roboto`, and consistent spacing.
- **Formatting**: The project uses Prettier.

## 🚨 Security & Maintenance

- **Rate Limiting**: Use `express-rate-limit` for all public and sensitive endpoints.
- **NoSQL Injection**: Sanitize user-provided strings using the `escapeRegExp` utility in `backend/src/utils/regex.js` before using in MongoDB `$regex` queries.
- **Admin Access**: Administrative tasks must be protected by the `isAdmin` middleware.

---
This guide is intended for AI assistance tools like Gemini CLI.
