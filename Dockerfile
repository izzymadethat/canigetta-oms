# 1. Base stage
FROM node:18.20.4-alpine AS base

# Arguments for dynamic services
ARG SERVICE_PATH
ARG PACKAGE_NAME
ARG PNPM_VERSION

# Install PNPM
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    npm i --global --no-update-notifier --no-fund pnpm@${PNPM_VERSION}
    
# Switch to non-root user
USER node

# 2. Install deps stage
FROM base AS deps
WORKDIR /usr/app

# Copy root and service-specific package and config files
COPY --chown=node:node pnpm-*.yaml package.json .npmrc ./
COPY --chown=node:node ${SERVICE_PATH}/package.json ./${SERVICE_PATH}/package.json

# Run installer
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile --filter ${PACKAGE_NAME} \
    | grep -v "cross-device link not permitted\|Falling back to copying packages from store"

# Copy full files needed for specific service
COPY --chown=node:node ${SERVICE_PATH} ./${SERVICE_PATH}

# 3. Deployment stage
FROM base AS deploy
WORKDIR /usr/app
ENV NODE_ENV=production
COPY --chown=node:node --from=deps /usr/app .

# Install only production deps at this point
# May not be needed
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile --filter ${PACKAGE_NAME} --prod \
    | grep -v "cross-device link not permitted\|Falling back to copying packages from store"

ENV EXEC_PATH=${SERVICE_PATH}/index.js
RUN ls -l /usr/app/${SERVICE_PATH}

# Start service when built
CMD node ${EXEC_PATH}