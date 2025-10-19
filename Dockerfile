FROM node:22.20.0-alpine AS base
WORKDIR /usr/src/app

FROM base AS builder-base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . .

FROM builder-base AS prod-deps
RUN pnpm install --prod --frozen-lockfile


FROM builder-base AS build
RUN pnpm install --frozen-lockfile && \
  pnpm run build

FROM base
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 3000
CMD [ "node", "dist/main.js" ]
