# Use Node 20 slim as the base image
FROM node:20-slim AS base

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set working directory
WORKDIR /app

# --- Build Stage ---
FROM base AS build
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

# --- Production Stage ---
FROM base AS runtime
ENV NODE_ENV=production

# Copy only production dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Copy source code
COPY src ./src

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "src/index.js"]
