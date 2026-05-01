# PYQDeck Backend

![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge&logo=statuspage)
[![codecov](https://img.shields.io/codecov/c/github/pyqdeck/pyqdeck-backend-express?style=for-the-badge&token=3RQZRCU6QZ)](https://codecov.io/gh/pyqdeck/pyqdeck-backend-express)
[![CI Pipeline](https://img.shields.io/github/actions/workflow/status/pyqdeck/pyqdeck-backend-express/ci.yml?branch=main&style=for-the-badge&logo=github-actions)](https://github.com/pyqdeck/pyqdeck-backend-express/actions/workflows/ci.yml)

Express backend for the PYQDeck application.

## 🚀 Mission Control

| Tool | Link | Description |
| :--- | :--- | :--- |
| **Public Status** | [pyqdeck.betteruptime.com](https://pyqdeck.betteruptime.com/) | 24/7 Uptime & Incident reporting |
| **API Docs** | `/api-docs` | Interactive Swagger/OpenAPI documentation |

## 🛠️ Tech Stack
- **Runtime**: Node.js (Express)
- **Database**: MongoDB (Mongoose)
- **Auth**: Clerk
- **CI/CD**: GitHub Actions + Docker + CodeQL + Codecov

## 💻 Development

```bash
cd backend
pnpm install
pnpm dev # Status monitor available at /api/v1/status
```

## 🧪 Quality & Testing

```bash
pnpm test          # Run all tests
pnpm test:coverage # Generate coverage report (Threshold: 80%)
```

## 📊 Coverage Visualization

![Codecov Sunburst](https://codecov.io/gh/pyqdeck/pyqdeck-backend-express/graphs/sunburst.svg?token=3RQZRCU6QZ)
