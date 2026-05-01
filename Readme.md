# PYQDeck Backend

[![codecov](https://codecov.io/gh/pyqdeck/pyqdeck-backend-express/graph/badge.svg?token=3RQZRCU6QZ)](https://codecov.io/gh/pyqdeck/pyqdeck-backend-express)
[![CI Pipeline](https://github.com/pyqdeck/pyqdeck-backend-express/actions/workflows/ci.yml/badge.svg)](https://github.com/pyqdeck/pyqdeck-backend-express/actions/workflows/ci.yml)

Express backend for the PYQDeck application. This project uses:
- Express.js
- MongoDB & Mongoose
- Clerk for Authentication
- Resend for Emails
- Svix for Webhooks
- Zod for Validation
- Vitest for Testing

## Getting Started

```bash
cd backend
pnpm install
pnpm dev
```

## Testing

```bash
cd backend
pnpm test
pnpm test:coverage
```

## Coverage Visualization

![Codecov Sunburst](https://codecov.io/gh/pyqdeck/pyqdeck-backend-express/graphs/sunburst.svg?token=3RQZRCU6QZ)
