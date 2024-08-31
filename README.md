# GraphQL TypeScript App Example

## Documentation

This project is structured as a monorepo with two packages: a React app and a server app.
The project are contained withing modules managed by yarn workspaces.
All projects are using TypeScript to ensure type safety and better developer experience.

## React app

The React app uses Vite as a bundler for quick a developer-friendly development experience.

### Developer tools

The following developer tools have been added to the project:

1. ESLint - linter to ensure better code quality
2. Prettier - code formatter
3. Husky - to create pre-commit hooks that work out-of-the box after a fresh repo clone
4. GitHub Actions - CI pipeline to run tests and linting on pull requests

You can run prettier using `yarn format` and eslint using `yarn lint` in the root directory.
It is recommended to set up your IDE to utilize the ESLint and Prettier configurations.

### How to run?

To run the React app for dev purposes, you can use the following command in the `app` directory:

```bash
yarn dev
```

### GraphQL codegen

The React app uses the `@graphql-codegen` to generate TypeScript types for the GraphQL queries and mutations.
To generate the types, you can use the following command in the `app` directory:

```bash
yarn codegen:compile
```

## Server app

The server app is a GraphQL server built with Apollo Server and NestJS.
The GraphQL schema is generated using the NestJS's code-first approach.

### How to run?

To run the React app for dev purposes, you can use the following commands in the `server` directory:

```bash
yarn start:dev
```
