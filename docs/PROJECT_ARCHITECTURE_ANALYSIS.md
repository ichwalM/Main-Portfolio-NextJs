# Project Architecture Analysis — Portfolio Fullstack

**Scope:** `frontend/` (Next.js) + `backend-cms/` (Laravel)
**Type:** Read-only architecture audit — no implementation changes made.
**Date:** 2026-08-23

---

## 1. Executive Summary

The project is a personal portfolio + CMS split into two independently deployable codebases:

- **`frontend/`** — Next.js **16.2.4** (App Router, React 19.2.3), Tailwind CSS v4 (CSS-first config), Framer Motion + GSAP for animation. It is a content-driven, mostly server-rendered site (ISR-heavy) with no user authentication and a hand-rolled fetch client. Two visual design systems currently coexist in the codebase ("premium/futuristic" and a newer "brutalism" theme), toggled via a body class.
- **`backend-cms/`** — Laravel **12** on PHP **8.2+**, with a **custom Blade/Breeze-based admin dashboard** (not Filament/Nova/Voyager) and a versioned public JSON API (`/api/v1`). Content is flat — no foreign keys or Eloquent relationships exist between any domain tables. Authentication for the public API is a **static shared API key** (`X-API-KEY` header or `?api_key=`), not Sanctum SPA/token auth, despite Sanctum being installed and partially configured.

**Overall condition:** Functional and clearly documented (both repos have unusually thorough README/troubleshooting docs, several in Indonesian), but architecturally shallow in both layers — thin-on-structure Laravel controllers with no Service/Repository/Resource layer, and a frontend with a stale README (claims Next 14, actual is 16), one clearly dead dependency (`matter-js`), and duplicated API-key logic. There are no automated tests exercising the domain logic on either side beyond framework scaffolding. The stack is **not yet 3D-ready**: zero 3D libraries are present, and the animation layer (Framer Motion + GSAP, no Lenis) would need deliberate integration work before adding React Three Fiber/Drei/Spline without regressing performance or the reduced-motion "brutalism" theme.

---

## 2. Directory & Module Tree

### 2.1 Frontend (`frontend/`) — Next.js App Router

```
frontend/
├── app/                        # App Router (no /pages, no /src)
│   ├── layout.tsx              # Root layout: fonts, ThemeProvider, Header/Footer, Analytics
│   ├── page.tsx                # Home: single-page composition, server-fetches all sections
│   ├── projects/page.tsx       # Projects listing
│   ├── projects/[slug]/page.tsx# Project detail (generateStaticParams → [], on-demand SSR)
│   ├── blog/page.tsx           # Blog listing
│   ├── blog/[slug]/page.tsx    # Blog post detail (same on-demand pattern)
│   ├── wall-app/page.tsx       # "Wall Apps" showcase, revalidate = 360s
│   ├── maintenance/page.tsx    # Target of middleware maintenance redirect
│   ├── loading.tsx, error.tsx, global-error.tsx
│   ├── robots.ts, sitemap.ts   # SEO, sitemap fetches live API data
│   └── web-vitals.tsx          # Client-side Core Web Vitals reporter
├── middleware.ts               # Site-wide maintenance-mode gate only (no auth)
├── components/
│   ├── animations/             # AnimatedBorder, FloatingParticles, ScrollReveal, WaveAnimation…
│   ├── layout/                 # Header, Footer, PageTransition, BrutalistMotionProvider
│   ├── sections/                # Hero, About, Skills, Experience, Certificates, GithubStats, ContactForm
│   ├── seo/                    # JSON-LD injectors (Person, Project, BlogPost)
│   ├── ui/                     # Aceternity/ReactBits-style effects + domain cards
│   └── dynamic-client.tsx      # next/dynamic wrappers needing ssr:false
├── lib/
│   ├── api/                    # client.ts + one wrapper per resource (profile, projects, skills…)
│   ├── animations/variants.ts  # Shared Framer Motion variants
│   ├── context/ThemeContext.tsx# Custom light/dark theme context (no external lib)
│   └── utils.ts                # formatDate, calculateReadingTime, cn()
├── types/                       # Per-domain TS interfaces
├── next.config.ts, tsconfig.json, postcss.config.mjs, eslint.config.mjs
└── *.md                         # README, API_TROUBLESHOOTING, TROUBLESHOOTING_ID, BRUTALISM_*
```

State management: none beyond React Context (theme) + server-passed props — no Redux/Zustand/Jotai.

### 2.2 Backend (`backend-cms/`) — Laravel 12

```
backend-cms/
├── routes/
│   ├── web.php                 # Breeze-session dashboard: resource CRUD per module
│   ├── api.php                 # /v1/* public JSON API, guarded by custom api.key middleware
│   └── auth.php                # Breeze auth (login/reset/verify), registration disabled
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Dashboard/      # Project, Skill, Experience, Blog, Certificate, WallApp,
│   │   │   │                   #   ContactMessage, Profile, About, DashboardController — FAT controllers,
│   │   │   │                   #   inline $request->validate(), inline Intervention image conversion
│   │   │   └── Api/            # PortfolioApiController, WallAppApiController, VisitApiController,
│   │   │                       #   ContactController — raw Eloquent → JSON, manual asset() URL building
│   │   ├── Requests/           # Only 3: LoginRequest, ContactRequest, ProfileUpdateRequest
│   │   └── Middleware/CheckApiKey.php   # api.key guard: X-API-KEY header or ?api_key=
│   └── Models/                  # Profile, About, Project, Skill, Experience, Blog, Certificate,
│                                 #   WallApp, ContactMessage, Visit, User — plain Eloquent, NO relationships
├── database/migrations/         # users, profiles, abouts, projects, skills, experiences, blogs,
│                                 #   certificates, wall_apps, contact_messages, visits, personal_access_tokens
├── config/
│   ├── cors.php                 # supports_credentials: false, hardcoded allowed_origins list
│   ├── sanctum.php               # Installed but only guards unused GET /user route
│   └── filesystems.php           # local/public/s3 disks defined; public disk actually used
├── resources/views/dashboard/    # Blade views for the custom admin panel (no Filament/Nova/Voyager)
└── docs/                          # 01-SETUP-AUTHENTICATION, 02-PORTFOLIO-API, 03-CONTACT-API,
                                    #   04-VISIT-API, 05-WALL-APP-API, QUICK-REFERENCE (Indonesian)
```

**Notable absence on both sides:** no `app/Services`, `app/Repositories`, `app/Actions`, or `app/Http/Resources` in Laravel; no state-management library, no bundle analyzer, and no `.env.example` in the frontend.

---

## 3. Data Flow Diagram

```mermaid
flowchart LR
    subgraph Client["Browser"]
        User[Visitor]
    end

    subgraph FE["Next.js Frontend (App Router)"]
        RSC["Server Components\n(page.tsx, projects/[slug], blog/[slug])"]
        CSR["Client Components\n('use client': ContactForm, GithubStats, ThemeToggle)"]
        MW["middleware.ts\n(maintenance-mode gate only)"]
        APIClient["lib/api/client.ts\napiClient() + SWR fetcher\n?api_key=NEXT_PUBLIC_API_KEY"]
    end

    subgraph BE["Laravel Backend-CMS"]
        MWApi["CheckApiKey middleware\n(api.key alias)"]
        PortfolioApi["Api\\PortfolioApiController\nApi\\WallAppApiController\nApi\\VisitApiController\nApi\\ContactController"]
        DashboardCtrl["Dashboard\\* Controllers\n(session-guarded, Breeze)"]
        Models[(Eloquent Models\nno relationships)]
        Storage["storage/app/public\n(WebP via Intervention Image)"]
    end

    subgraph Admin["Content Editor"]
        Editor[Admin User]
    end

    DB[(MySQL)]

    User -->|HTTP request| MW --> RSC
    RSC -->|Promise.all fetch, ISR revalidate 3600s| APIClient
    CSR -->|client fetch, no-store| APIClient
    APIClient -->|"GET /api/v1/* + X-API-KEY / ?api_key="| MWApi
    MWApi -->|valid key| PortfolioApi
    PortfolioApi --> Models --> DB
    PortfolioApi -->|asset() absolute URL| Storage
    Storage -->|served via /storage symlink| User

    Editor -->|session login, Breeze| DashboardCtrl
    DashboardCtrl -->|inline validate + Intervention WebP convert| Storage
    DashboardCtrl --> Models
    DashboardCtrl -->|generate-key| Models

    RSC -->|rendered HTML/RSC payload| User
```

**Key characteristics of the flow:**
- Frontend never talks to the database directly — always through the versioned `/api/v1` JSON surface.
- No session/cookie auth between Next.js and Laravel; a single static API key (exposed client-side via `NEXT_PUBLIC_API_KEY`) authorizes every request. This is a **shared-secret model, not per-user auth**.
- Admin dashboard (Breeze session auth) and public API (API-key auth) are two entirely separate, non-overlapping auth domains that happen to share the same `User` model (`users.api_key` column).
- Media flows one way: uploaded in the dashboard → converted to WebP by Intervention Image → stored on the `public` disk → served as static files, referenced by absolute URL in API JSON.

---

## 4. API Endpoints Inventory

### 4.1 Public API consumed by the Next.js frontend (`routes/api.php`, prefix `/api/v1`, middleware `api.key`)

| Method | Endpoint | Controller@Method | Used by frontend module |
|---|---|---|---|
| GET | `/v1/profile` | `PortfolioApiController@getProfile` | `lib/api/profile.ts` → Hero/Header |
| GET | `/v1/about` | `PortfolioApiController@getAbout` | `lib/api/about.ts` → About section |
| GET | `/v1/projects` | `PortfolioApiController@getProjects` | `lib/api/projects.ts` → Projects listing/carousel |
| GET | `/v1/projects/{slug}` | `PortfolioApiController@getProject` | `lib/api/projects.ts` → `app/projects/[slug]` |
| GET | `/v1/skills` | `PortfolioApiController@getSkills` | `lib/api/skills.ts` → Skills section |
| GET | `/v1/experiences` | `PortfolioApiController@getExperiences` | `lib/api/experience.ts` → Experience timeline |
| GET | `/v1/posts` | `PortfolioApiController@getPosts` | `lib/api/blog.ts` → Blog listing |
| GET | `/v1/posts/{slug}` | `PortfolioApiController@getPost` | `lib/api/blog.ts` → `app/blog/[slug]` |
| GET | `/v1/certificates` | `PortfolioApiController@getCertificates` | `lib/api/certificates.ts` → Certificates section |
| GET | `/v1/wall-apps` | `WallAppApiController@index` | `lib/api/wall-apps.ts` → `app/wall-app` |
| POST | `/v1/visits` | `VisitApiController@store` | Analytics ping (visit logging) |
| POST | `/v1/contact` | `ContactController@store` | `lib/api/contact.ts` → ContactForm |

⚠️ Duplicate route: `GET /v1/projects/{slug}` and `POST /v1/contact` are also registered a second time outside the `prefix('v1')` group in `routes/api.php`, redundant with the entries above.

Unused: `GET /user` (`auth:sanctum`) — vestigial, not called by the frontend.

### 4.2 Admin dashboard routes (`routes/web.php`, session-guarded, not consumed by Next.js)

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/dashboard` | Stats overview (counts, 14-day visit chart) |
| POST | `/dashboard/generate-key` | Rotate/generate the API key used by the frontend |
| GET/PUT | `/dashboard/profile`, `/dashboard/about` | Singleton content editing |
| resource | `/dashboard/projects`, `/skills`, `/experiences`, `/blogs`, `/certificates`, `/wall-apps` | Full CRUD |
| resource (partial) | `/dashboard/contacts` (`index`, `destroy`) | Contact inbox |
| DELETE | `/dashboard/blogs/{blog}/photo/{index}` | Remove one gallery photo |
| — | `/login`, `/forgot-password`, `/reset-password`, `/verify-email`, `/confirm-password` | Breeze auth |

---

## 5. Modernization & 3D Readiness Assessment

### 5.1 Current performance & bundling posture

**Strengths already in place:**
- Next.js `output: 'standalone'`, `compress: true`, aggressive immutable caching headers for hashed assets.
- `experimental.optimizePackageImports` for `framer-motion` and `lucide-react`.
- Deliberate SSR/CSR split via `next/dynamic` (`ssr:false` for `GithubStatsClient`/`ContactFormClient`) with `Suspense` skeleton fallbacks.
- Image pipeline: AVIF/WebP, tuned `deviceSizes`, 1-year cache TTL, remote patterns scoped to the CMS domain only.
- Dynamic detail routes intentionally skip static generation (`generateStaticParams` → `[]`) to avoid build-time coupling to CMS content — a reasonable ISR-on-request tradeoff for a low-traffic portfolio.

**Gaps / risks:**
- No bundle analyzer wired in — bundle-size regressions from future 3D/animation additions won't be visible until they ship.
- `matter-js` (^0.20.0, a full 2D physics engine) is a declared dependency with **zero import sites found** — dead weight in `node_modules`/lockfile, and a bundle-size risk if someone re-adds an import without pruning it first.
- Two coexisting design systems ("premium/futuristic" + "brutalism") increase CSS/JS surface area and cognitive load; the brutalist theme forces `MotionConfig reducedMotion="always"`, which will directly conflict with any 3D/scroll-driven animation work unless the two themes are reconciled or the 3D layer explicitly opts out of the brutalist provider.
- API key is a `NEXT_PUBLIC_*` env var sent as a query string — it is not a secret in practice (visible in browser network tab and bundled JS for client-fetched calls like `ContactForm`). Not a 3D-readiness blocker, but worth fixing before any "modern relaunch" since it's an easy rotate-and-scope-down fix (e.g., move server-only calls behind Route Handlers so the key never reaches the client bundle).
- README is stale (says Next 14, ships Next 16) — low risk but signals docs drift that will compound as the 3D work adds new libraries.

### 5.2 3D & animation library readiness

| Capability | Status | Notes |
|---|---|---|
| Three.js / React Three Fiber / Drei | **Absent** | No package, no imports. Would be a net-new dependency. |
| Spline | **Absent** | No package, no imports. |
| Framer Motion | **Present, actively used** | v12.29.0, broad usage (`AnimatePresence`, `MotionConfig`, section transitions). Compatible with R3F's `motion3d`/`framer-motion-3d` if adopted. |
| GSAP | **Present, declared** | v3.14.2 in `package.json`; concrete usage not confirmed in the files inspected (likely inside `components/animations/*`) — worth auditing which scroll effects already exist before layering GSAP's ScrollTrigger onto a 3D canvas to avoid two competing scroll-animation systems. |
| Lenis (smooth scroll) | **Absent** | Not installed. Needed before any camera-driven/scroll-linked 3D scene to keep scroll position and R3F camera sync smooth. |
| Reduced-motion handling | **Present but theme-scoped** | `BrutalistMotionProvider` forces `reducedMotion="always"` only under the brutalist theme; the "premium" theme has no equivalent `prefers-reduced-motion` guard visible in the audited files — this should be verified/added globally before shipping any WebGL scene, since 3D is the highest-impact case for respecting reduced-motion and low-end-device fallbacks. |
| Server/Client component boundary | **Well-established** | The existing `components/dynamic-client.tsx` pattern (`next/dynamic` + `ssr:false` + skeleton) is exactly the pattern a React Three Fiber `<Canvas>` would need — no architectural rework required to slot in a client-only 3D component. |

### 5.3 Recommended refactoring before the 3D/visualization phase

1. **Frontend:**
   - Remove `matter-js` if truly unused, or wire it in intentionally; run a bundle-analyzer pass first to get a size baseline before adding `three`/`@react-three/fiber`/`@react-three/drei` (these add meaningful weight — code-split any 3D scene behind `next/dynamic(ssr:false)` from day one, following the existing `dynamic-client.tsx` convention).
   - Resolve the brutalism-vs-premium theme conflict (or scope 3D features to only one theme) before adding a WebGL layer, since `BrutalistMotionProvider`'s forced `reducedMotion="always"` will silently disable any Framer-Motion-driven 3D transition under that theme.
   - Add a global `prefers-reduced-motion` fallback (not just brutalist-theme-scoped) and a low-end-device / WebGL-unsupported fallback path for any 3D scene, given the site currently has zero GPU-dependent rendering.
   - Consolidate the duplicated API-key-injection logic (`lib/api/client.ts` vs `lib/api/contact.ts`) into the single shared client, and move any client-executed API calls behind Next.js Route Handlers so the key isn't shipped in client bundles — this is unrelated to 3D but is a quick win worth doing in the same modernization pass.
   - Update the stale README (Next 14 → 16) as part of the same cleanup so onboarding docs don't mislead contributors during the visualization rework.

2. **Backend:**
   - Introduce `app/Http/Resources` for the `/v1/*` endpoints so response shape (currently raw Eloquent + manual `asset()` string building, inconsistent with the documented `{data, success}` envelope) is centralized and stable — important if the 3D/visual relaunch adds new data shapes (e.g., 3D asset URLs, model metadata) that multiple endpoints need to expose consistently.
   - Extract inline validation/image-conversion logic from the fat Dashboard controllers into Form Requests + a small media-conversion service, so that adding new media types (e.g., glTF/GLB models or HDRI environment maps for 3D scenes) doesn't mean copy-pasting the existing per-controller Intervention Image pattern again.
   - Decide deliberately whether the API-key scheme is sufficient long-term or should move to Sanctum (already installed, already has a `personal_access_tokens` table) — this doesn't block 3D work but is a pre-existing architectural inconsistency (Sanctum installed but unused) worth resolving in the same modernization pass rather than carrying it forward.
   - No database changes are required for 3D readiness itself, since 3D assets can be served the same way images are today (via the `public` disk + `asset()` URLs), but if asset sizes grow significantly (GLB models, textures), reassess the `local`/`public` disk choice against the already-scaffolded-but-unused `s3` disk config for CDN-backed delivery.

---

## 6. Notes on Documentation Consistency

Both repos are unusually well-documented for a solo/portfolio project (multiple `.md` guides, bilingual EN/ID troubleshooting docs), but there are drift points to reconcile before the modernization phase: the frontend README's stated Next.js version, the documented-but-not-implemented `{data, success}` API response envelope, and the two parallel design-system docs (premium vs. brutalism) should be consolidated into a single source of truth so the upcoming 3D/animation work has one authoritative design and API contract to build against.
