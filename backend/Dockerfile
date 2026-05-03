# Stage 1: Dependencies
FROM node:20-slim AS deps
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Stage 2: Runtime
FROM node:20-slim AS runner
WORKDIR /app

# Create a non-root user for security
RUN groupadd -g 1001 nodejs && \
    useradd -u 1001 -g nodejs -s /bin/sh -m nodeuser

ENV NODE_ENV=production
ENV PORT=3000

# Copy necessary files from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json

# Copy source code
COPY src ./src

# Set proper ownership
RUN chown -R nodeuser:nodejs /app

# Switch to non-root user
USER nodeuser

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "src/index.js"]
