FROM node:22-alpine AS base

# Build image
FROM base AS build

WORKDIR /build

COPY ./ .

RUN yarn workspaces focus @graphql-ts-app-example/server
RUN (cd server; yarn build)


# Deploy image
FROM base AS deploy

WORKDIR /app
COPY --from=build ./build/server/dist ./dist
COPY --from=build ./build/server/package.json ./package.json
COPY --from=build ./build/yarn.lock ./yarn.lock
COPY --from=build ./build/server/src/sql ./src/sql
COPY .yarnrc.yml ./
COPY .yarn ./.yarn

RUN apk update && apk upgrade
RUN apk add --no-cache sqlite
RUN yarn workspaces focus @graphql-ts-app-example/server --production

EXPOSE 8081
ENV PORT=8081

CMD [ "yarn", "start:prod" ]
