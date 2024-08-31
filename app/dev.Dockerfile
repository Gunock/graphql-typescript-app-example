FROM node:22-alpine AS base
ARG GRAPHQL_URL

# Build image
FROM base AS build

WORKDIR /build

ENV VITE_GRAPHQL_URL=$GRAPHQL_URL

COPY ./ .

RUN yarn workspaces focus @graphql-ts-app-example/app
RUN (cd app; yarn build)


# Deploy image
FROM base AS deploy

WORKDIR /app
COPY --from=build ./build/app/dist ./dist
COPY .yarnrc.yml ./
COPY .yarn ./.yarn

EXPOSE 8080

CMD [ "yarn", "dlx", "vite", "preview", "--host", "--port", "8080" ]
