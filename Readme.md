# PYQDeck Backend

![Build Status](https://github.com/pyqdeck/pyqdeck-backend-express/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/pyqdeck/pyqdeck-backend-express/branch/main/graph/badge.svg)](https://codecov.io/gh/pyqdeck/pyqdeck-backend-express)
![Security Scan](https://github.com/pyqdeck/pyqdeck-backend-express/actions/workflows/codeql-analysis.yml/badge.svg)

Express backend for the PYQDeck application.

## 🚀 Mission Control

| Tool | Link | Description |
| :--- | :--- | :--- |
| **Base URL** | [backend.pyqdeck.in](https://backend.pyqdeck.in/) | Production API Environment |
| **Public Status** | [pyqdeck.betteruptime.com](https://pyqdeck.betteruptime.com/) | 24/7 Uptime & Incident reporting |
| **API Docs** | [backend.pyqdeck.in/api-docs](https://backend.pyqdeck.in/api-docs) | Interactive Swagger/OpenAPI documentation |

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
