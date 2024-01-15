# Base Image
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set into /app dir in image
WORKDIR /app

# Prepare all files needed
COPY package.json .
COPY pnpm-lock.yaml .
COPY tsconfig.json .
COPY codegen.ts .
COPY schema.graphql .
COPY src/ src/

# Install app dependencies to "node_modules"
FROM base AS dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Build application code in "dist"
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# Prepare
FROM base
COPY --from=dependencies /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
CMD [ "node", "dist/index.js" ]
