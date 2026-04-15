# AGENTS.md

## Cursor Cloud specific instructions

### Overview
This is a **Next.js 16 portfolio website** (TypeScript, Tailwind CSS 4, Framer Motion, GSAP). It is a standalone frontend that fetches content from an external Laravel REST API (not included in this repo).

### Services
| Service | Command | Port | Notes |
|---|---|---|---|
| Next.js Dev Server | `npm run dev` | 3000 | The only service in this repo |

### Key caveats
- **No backend in this repo.** The Laravel API backend is external. Without it, pages render with empty/fallback content but the frontend still works. The `next build` command **will fail** without a reachable API because server-side data fetching occurs at build time.
- **Environment variables:** Create `.env.local` with `NEXT_PUBLIC_API_URL=http://localhost:8000/api` (and optionally `NEXT_PUBLIC_API_KEY`). This file is gitignored.
- **Lint:** `npm run lint` — uses ESLint 9 flat config. There are pre-existing lint errors in the codebase (hooks called conditionally, unused vars, `any` types); these are not regressions.
- **No automated tests** are configured in this project (no test script in `package.json`).
- **Package manager:** npm (lockfile is `package-lock.json`).
- **Images:** `next.config.ts` allows remote images from `cms.walldev.my.id` and `localhost`.
