# News App (SSR)

A Server-Side Rendered (SSR) React application designed to display news content, powered by Express and Vite.

## Features

- **Frontend**: React 19, TailwindCSS 4, TanStack Query.
- **Backend**: Express server with SSR capabilities.
- **Build Tool**: Vite (Dual config for client and server bundles).
- **Language**: TypeScript.
- **Linting & Formatting**: Oxlint and Oxfmt.

## Todo

- [ ] **News API Integration**: The implementation for fetching news from an external API is currently pending.

## Prerequisites

- Node.js
- [pnpm](https://pnpm.io/) (Package Manager) - This project uses Corepack or requires `pnpm` to be installed. The project specifies `packageManager: pnpm@10.24.0`.

## Getting Started

### Installation

Install the dependencies:

```bash
pnpm install
```

### Development

To start the development server with hot module replacement and watch mode:

```bash
pnpm start:dev
```

This command concurrently runs:
- The Node.js server (with `ts-node-dev`)
- Vite build watcher for the client bundle
- Vite build watcher for the server bundle

### Building for Production

To build the application for production:

```bash
pnpm build
```

This will run:
1. `build:node`: Compiles the server TypeScript code.
2. `build:bundles`: Builds both client and server bundles using Vite.

Artifacts are output to the `dist` directory.

### Running in Production

After building, you can start the production server:

```bash
pnpm start
```

## Project Structure

- `src/server`: Contains the Express server setup and SSR logic.
- `src/pages`: React application pages and components.
- `vite.client.config.ts`: Vite configuration for the client-side bundle.
- `vite.server.config.ts`: Vite configuration for the server-side bundle.
- `news.html`: HTML template.

## Scripts

- `pnpm start:dev`: Start development server.
- `pnpm build`: Build for production.
- `pnpm start`: Start production server.
- `pnpm lint`: Run `oxlint`.
- `pnpm format`: Run `oxfmt`.
- `pnpm clean`: Remove the `dist` directory.
