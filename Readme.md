# 🎓 PYQDeck Monorepo

[![CI/CD Status](https://github.com/pyqdeck/pyqdeck-backend-express/actions/workflows/monorepo-ci.yml/badge.svg)](https://github.com/pyqdeck/pyqdeck-backend-express/actions/workflows/monorepo-ci.yml)
[![Code Coverage](https://codecov.io/gh/pyqdeck/pyqdeck-backend-express/branch/main/graph/badge.svg)](https://codecov.io/gh/pyqdeck/pyqdeck-backend-express)
[![Security Scan](https://github.com/pyqdeck/pyqdeck-backend-express/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/pyqdeck/pyqdeck-backend-express/actions/workflows/codeql-analysis.yml)
[![Lighthouse Perf](https://img.shields.io/badge/Lighthouse-90%2B-brightgreen.svg)](https://github.com/pyqdeck/pyqdeck-backend-express/actions/workflows/lighthouse.yml)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)

Welcome to the **PYQDeck** monorepo. This repository contains both the high-performance Express backend and the modern Next.js frontend for the PYQDeck platform—a centralized hub for university question papers and solutions.

---

## 🚀 Mission Control

| Component | Tech Stack | Production URL |
| :--- | :--- | :--- |
| **Backend API** | Node.js, Express, MongoDB, Clerk | [backend.pyqdeck.in](https://backend.pyqdeck.in/) |
| **Frontend Web** | Next.js 15, Tailwind 4, shadcn/ui | [pyqdeck.in](https://pyqdeck.in/) |
| **UI Library** | Storybook 8, Radix UI, Vite | [storybook.pyqdeck.in](https://storybook.pyqdeck.in/) |
| **API Docs** | Swagger / OpenAPI 3.0 | [/api-docs](https://backend.pyqdeck.in/api-docs) |
| **Engineering Docs** | Mintlify | [docs.pyqdeck.in](https://docs.pyqdeck.in/) |
| **Status** | Custom Status Page | [status.pyqdeck.in](https://status.pyqdeck.in/) |

---

## 📂 Project Structure

-   `backend/`: Express API with Mongoose models, controllers, and comprehensive Vitest suites.
-   `frontend/`: Next.js application with a type-safe SDK generated from the backend OpenAPI spec.
-   `docs/`: Mintlify-based internal engineering documentation.

---

## 🎨 Design System & Documentation

We use **Storybook** for UI components and **Mintlify** for full engineering documentation.

### Internal Engineering Docs

Our internal docs site covers API references, architecture, and local development flows.

-   **Live Site**: [docs.pyqdeck.in](https://docs.pyqdeck.in/)
-   **Tech**: Mintlify with OpenAPI synchronization.

### Component Library

We use Storybook to document our UI component library in isolation. This ensures visual consistency and accessibility across the platform.

-   **Live Preview**: [View Component Library](https://storybook.pyqdeck.in/)
-   **Coverage**: 100% of core UI components (50+) documented with interactive stories.
-   **Tech**: Radix UI primitives, Tailwind CSS 4, and Framer Motion.

---

## 💻 Local Development

### Prerequisites
-   Node.js (v20+)
-   pnpm (v10+)
-   MongoDB (Local instance or Atlas)

### 1. Backend Setup
```bash
cd backend
pnpm install
cp .env.example .env # Configure your Clerk and MongoDB keys
pnpm dev
```

### 2. Frontend Setup
```bash
cd frontend
pnpm install
cp .env.example .env.local
pnpm run gen:api # Generates the type-safe API SDK from backend
pnpm dev
```

---

## 🛡️ CI/CD & API Safety

We use a **Unified Monorepo Pipeline** that guarantees stability across the stack:

1.  **API Contract Safety**: Every PR verifies that `backend/openapi.json` is in sync with the code. If you modify an API route or model, you must run `pnpm run openapi:export` in the backend.
2.  **SDK Validation**: The frontend SDK is regenerated in CI. If a backend change breaks the frontend types, the build will fail immediately.
3.  **Docker Health Check**: Automated builds of the backend Docker image to ensure deployment readiness.
4.  **Sequential Deploys**: Deployment to Render and Vercel triggers only after all quality checks (Lint, Test, Build) pass for both projects.

---

## 🧪 Quality & Testing

### Backend
```bash
cd backend
pnpm test          # Run Vitest suites
pnpm test:coverage # Generate coverage (Target: 80%+)
```

### Frontend
```bash
cd frontend
pnpm lint   # Run ESLint
pnpm build  # Verify Next.js build & type-safety
```

---

## 📊 Performance & Security
-   **Security**: Automated CodeQL scanning and dependency auditing.
-   **Load Testing**: Performance baselines tracked via k6 (see `backend/tests/load`).
-   **Observability**: Integrated with Sentry and Logtail for production monitoring.

---

© 2026 PYQDeck Team. Built with ❤️ for students.

## 📜 License

This project is proprietary and confidential. All rights reserved. No part of this software may be used, modified, or distributed without the express written permission of the copyright holder.
