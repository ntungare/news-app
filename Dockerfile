# Stage 1: Install pnpm
FROM docker.io/library/node:24-alpine AS base
WORKDIR /app
RUN corepack install -g pnpm@10
RUN corepack enable pnpm

###

# Stage 2-a: Install Production Dependencies
FROM base AS prodDependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,target=/root/.local,sharing=locked pnpm install --prod --frozen-lockfile

# Stage 2-b: Install All Dependencies
FROM base AS devDependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,target=/root/.local,sharing=locked pnpm install --frozen-lockfile

###

# Stage 3: Build App
FROM base AS build
COPY . .
COPY --from=devDependencies /app/node_modules ./node_modules
RUN pnpm run build

###

# Stage 4-a: Runner
FROM base AS development
ENV NODE_ENV=development

ARG PORT=8080
ENV PORT=${PORT}
EXPOSE ${PORT}
EXPOSE 9220

COPY --from=devDependencies /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

ENTRYPOINT ["pnpm"]
CMD ["start:dev"]

###

# Stage 4-b: Runner
FROM base AS production
ENV NODE_ENV=production

ARG PORT=8080
ENV PORT=${PORT}
EXPOSE ${PORT}

COPY --from=prodDependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json

ENTRYPOINT ["pnpm"]
CMD ["start"]
