---
name: Football-Data.org mock fallback pattern
description: How sportivox (Next.js sports site) falls back from live Football-Data.org calls to mock data, and why.
---

Live data fetchers should catch API errors at the point they're called and return mock data of the same shape, rather than letting errors propagate to `error.tsx` boundaries. This applies per-sport/per-source — only wrap the source that's expected to be flaky or optional; don't blanket-catch sources that should hard-fail.

**Why:** The user explicitly wanted "unavailable or rate-limited" API failures (invalid key, 400/429, network error) to be invisible to end users, while keeping other data sources (e.g. TheSportsDB for cricket/basketball/tennis) untouched and still throwing on failure.

**How to apply:** Put the try/catch in the shared data-access layer (e.g. `lib/data-fetcher.ts`), not in individual page components — this keeps the fallback centralized and consistent across every caller. Mock data generators should compute dates relative to `new Date()` at call time (not hardcoded timestamps) so fallback content always looks current.
