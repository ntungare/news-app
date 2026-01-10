# News App (SSR)

A Server-Side Rendered React application that displays real-time news from [newsdata.io](https://newsdata.io/). Built with Express, Vite, and TypeScript.

## Features

- **Server-Side Rendering** with Express and Vite for fast performance and SEO
- **Multi-layer Caching**: Redis (optional) or in-memory LRU cache with Axios adapter
- **Category Filtering**: Browse by Technology, Politics, Sports, Business, and 15+ other categories
- **Country Selection**: Switch between US, Ireland, and India with flag-based dropdown
- **Pagination**: Navigate through articles with preserved state
- **Responsive Design**: Tailwind CSS with CSS Grid layouts
- **Error Handling**: Custom error pages with graceful fallbacks
- **Podman Support**: Containerized deployment with optional Redis service
- **Performance Monitoring**: Uses `web-vitals` for tracking performance metrics
- **Search**: Full-text search across articles with pagination and preserved URL state

## Tech Stack

**Frontend**: React 19, TailwindCSS 4, TanStack Query
**Backend**: Express, TypeScript
**Build**: Vite (dual client/server configs)
**Cache**: Redis (optional) + LRU fallback
**Tools**: Oxlint, Oxfmt

## Getting Started

### Prerequisites

- Node.js
- pnpm (v10.25.0)
- [Podman & Podman Compose](https://podman.io/) (optional, for Redis) - Podman is a Docker-compatible daemonless container engine

### Installation

```bash
pnpm install
```

### Configuration

**Environment Variables**

| Variable              | Required | Default     | Description                   |
| --------------------- | -------- | ----------- | ----------------------------- |
| `NEWSDATA_IO_API_KEY` | Yes      | -           | API key for newsdata.io       |
| `REDIS_HOST`          | No       | `localhost` | Redis hostname                |
| `REDIS_PORT`          | No       | `6379`      | Redis port                    |
| `LOCAL_REDIS`         | No       | -           | Fallback to local Redis if `REDIS_HOST`/`REDIS_PORT` are not set (e.g., `redis://localhost:6379`) |

Create a `.env` file:

```dotenv
NEWSDATA_IO_API_KEY=your_api_key_here
# Optional Redis
REDIS_HOST=localhost
REDIS_PORT=6379
LOCAL_REDIS=true
```

## Development & Deployment

### Local Development

```bash
pnpm start:dev
```

Runs the server with hot reload at `http://localhost:8080`.

#### Podman

**Option 1: Redis in container, App on host (recommended for development)**

```bash
# Start Redis container
podman compose up redis

# In another terminal, start the app on host
pnpm run start:dev
```

**Option 2: Both Redis and App in containers**

```bash
# Start both Redis and app
podman compose up app-dev
```

> **Note**: Live refresh (bundle rebuilds on file changes) does not work when running the app in a container. You may need to restart the app to see changes.


**Option 3: Both Redis and App in containers**

```bash
# Start both Redis and app
podman compose up app-prod
```

> **Note**: This uses a production build of the app so the sources are minified.

### Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
src/
├── server/          # Express server, SSR, middleware
│   ├── api/         # NewsData API integration
│   ├── controllers/ # Route handlers
│   ├── middleware/  # Country detection, navbar
│   └── service/     # Caching (Redis + LRU)
├── pages/           # React pages (home, error)
├── components/      # UI components (Article, NavBar, etc.)
├── template/        # Layout wrapper
├── context/         # React contexts (URL, Country, Tag)
├── hooks/           # Custom hooks (URL state)
└── constants/       # Categories, countries
```

## Detailed Features

### Caching Strategy

Three-layer approach for optimal performance:

1. **Axios adapter** - HTTP client-level caching
2. **Redis** - Distributed cache (when configured)
3. **LRU cache** - In-memory fallback

> **TTL**: Cached responses expire after 12 hours.

### Pagination

- Server tracks pagination tokens in a Map
- Previous/Next navigation with URL state preservation
- Automatic redirect for invalid page tokens

### Country & Category Filtering

- **Countries**: US, Ireland (default), India
- **Categories**: Breaking, Business, Crime, Domestic, Education, Entertainment, Environment, Food, Health, Lifestyle, Politics, Science, Sports, Technology, Tourism, World, Other
- Middleware validates and normalizes query parameters

## Available Scripts

```bash
pnpm clean         # Remove dist/
pnpm build         # Production build
pnpm start         # Run production server
pnpm start:dev     # Development with hot reload
pnpm lint          # Run oxlint
pnpm format        # Run oxfmt
pnpm check         # TypeScript type checking
```

## Environment Variables

| Variable              | Required | Default     | Description                   |
| --------------------- | -------- | ----------- | ----------------------------- |
| `NEWSDATA_IO_API_KEY` | Yes      | -           | API key for newsdata.io       |
| `REDIS_HOST`          | No       | `localhost` | Redis hostname                |
| `REDIS_PORT`          | No       | `6379`      | Redis port                    |
| `NODE_ENV`            | No       | -           | `production` or `development` |

## Deployment Notes
- Set `NODE_ENV=production` for optimized builds.

---

_Built by [Ninad Tungare](mailto:ninad.tungare@gmail.com) • MIT License_
