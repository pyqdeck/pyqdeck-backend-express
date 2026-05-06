# Contributing to PYQDeck

Thank you for your interest in contributing to PYQDeck! We welcome contributions from the community to help make this platform better for students.

## 📜 Code of Conduct

This project and everyone participating in it are governed by the [PYQDeck Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [INSERT EMAIL ADDRESS].

## 🌿 Branch Naming Conventions

Use the following prefixes for branch names:

| Prefix | Use for |
|---|---|
| `feat/` | New features or enhancements |
| `fix/` | Bug fixes |
| `docs/` | Documentation changes |

Example: `feat/add-search-filters` or `fix/broken-bookmark-button`.

## 🔄 Pull Request Process

1. **Fork the Repository** — Create a personal fork of the project on GitHub.
2. **Create a Branch** — Branch off `main` using the naming conventions above.
3. **Make Your Changes** — Implement your feature or fix.
4. **Format & Lint** — Run the formatting and linting commands below before committing (see [Coding Standards](#-coding-standards)).
5. **Commit Your Changes** — Write clear and concise commit messages.
6. **Push to GitHub** — Push your branch to your forked repository.
7. **Open a Pull Request** — Submit a PR to `main`. Provide a detailed description of your changes.

## 🎨 Coding Standards

We use **Prettier** for formatting and **ESLint** for linting in both `frontend/` and `backend/`. You **must** run both before committing.

### Frontend (`frontend/`)

```sh
cd frontend
pnpm format        # auto-fix all formatting
pnpm format:check  # check without writing (used in CI)
pnpm lint          # ESLint — must pass with 0 errors
```

**Prettier config** (`frontend/.prettierrc`):

| Rule | Value |
|---|---|
| `singleQuote` | `true` |
| `semi` | `true` |
| `trailingComma` | `"es5"` |
| `printWidth` | `80` |
| `tabWidth` | `2` |
| `plugins` | `prettier-plugin-tailwindcss` (auto-sorts Tailwind classes) |

**ESLint**: `eslint-config-next/core-web-vitals` + `eslint-plugin-storybook`.

### Backend (`backend/`)

```sh
cd backend
pnpm format    # auto-fix all formatting
pnpm lint      # ESLint — must pass with 0 errors
pnpm lint:fix  # auto-fix ESLint issues where possible
```

**Prettier config** (`backend/.prettierrc`):

| Rule | Value |
|---|---|
| `singleQuote` | `true` |
| `semi` | `true` |
| `trailingComma` | `"es5"` |
| `printWidth` | `80` |
| `tabWidth` | `2` |

**ESLint**: `@eslint/js` recommended + `eslint-config-prettier`.

### Quick reference — run both at once

```sh
# From the repo root
cd frontend && pnpm format && pnpm lint && cd ../backend && pnpm format && pnpm lint
```

## 🧪 Testing

Always run existing tests and add new ones for any new functionality:

```sh
# Backend
cd backend && pnpm test

# Frontend
cd frontend && pnpm test
```

---

Thank you for helping us build the best resource for university students!
