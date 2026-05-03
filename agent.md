# PyqDeck Agent Guidelines

This document outlines the architectural patterns, coding standards, and development workflows established for the PyqDeck project. Follow these guidelines strictly to maintain consistency across the monorepo.

## 🏗️ Backend Architecture (5-Layer Pattern)

All backend features must adhere to the following layered structure:

1.  **Models (`src/models/`)**: Define Mongoose schemas and corresponding Zod validation schemas. Use `normalizedText` for searchable fields.
2.  **Repositories (`src/repositories/`)**: Perform raw database operations. Repositories should be the only place where Mongoose model methods (e.g., `find`, `deleteMany`) are called.
3.  **Services (`src/services/`)**: Contain business logic and orchestrate repositories. Services handle logging, complex data transformations, and domain-specific rules.
4.  **Controllers (`src/controllers/`)**: Extract request data (params, body), call services, and format HTTP responses using `successFormatter` or `errorFormatter`.
5.  **Routes (`src/routes/`)**: Define API endpoints and attach necessary middleware:
    - `syncUser`: Ensures Clerk user exists in the local DB.
    - `isAdmin`: Restricts access to administrative roles.
    - `rateLimiter`: Protects against abuse.

## 🎨 Frontend Architecture (3-Layer Pattern)

UI components in the Studio and complex features should be split into three files:

1.  **Logic Container (`[name].jsx`)**:
    - Manages local state (`useState`, `useMemo`).
    - Performs data fetching using `useApi` hook or Server Actions.
    - Handles event logic (e.g., toast notifications).
    - Renders the `.view` component with necessary props.

2.  **Presentation View (`[name].view.jsx`)**:
    - Pure functional component focused on JSX and layout.
    - Handles icons (`lucide-react`) and conditional styling (`cn` utility).
    - Formats data for display (e.g., date/memory/uptime formatting).
    - No direct API calls or complex state management.

3.  **Stories (`[name].stories.jsx`)**:
    - Defines Storybook stories for different UI states (Default, Loading, Error, etc.).
    - Enables visual regression testing and documentation.

## 🔐 Authentication & API Integration

- **Authentication**: Powered by Clerk. Use `useAuth` on the client and `auth()` on the server.
- **API Client**:
    - **Client-side**: Use the `useApi()` hook to get an authenticated instance of the generated SDK.
    - **Server-side**: Use `getApiServer()` in Server Components or Server Actions.
- **SDK Generation**: Run `pnpm gen:api` in the frontend directory after updating backend routes/OpenAPI annotations to keep the TypeScript SDK in sync.

## 💅 Coding Standards & UI

- **Styling**: Tailwind CSS with Shadcn UI components.
- **Icons**: Always use `lucide-react`.
- **Feedback**: Use `sonner` for toast notifications.
- **Aesthetics**: Maintain the "Premium Studio" feel—use subtle borders, `font-roboto`, and consistent spacing.
- **Formatting**: Run `pnpm format` before committing. The project uses Prettier to enforce style consistency.

## 🚨 Security & Maintenance

- **Rate Limiting**: Use `express-rate-limit` for all public and sensitive endpoints.
- **Maintenance**: Administrative tasks (like database wipes) must be protected by the `isAdmin` middleware and provided with clear confirmation dialogs (`AlertDialog`) in the UI.
