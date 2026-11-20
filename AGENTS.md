# Project guidelines

Next.js (App Router) + React + TypeScript, Tailwind CSS v4. Package manager: **npm only**.

## Commands

`npm install` · `npm run dev` · `npm run build` · `npm run start` · `npm run lint` · `npm run typecheck`

## Architecture

- Routes in `src/app/` stay thin: `metadata` (and JSON-LD) plus a page component imported from `src/features/`.
- Components are Server Components by default; add `"use client"` only to components that use state, effects, browser APIs or event handlers.
- Feature code (components, data, SEO, types) lives under `src/features/<feature>/`. Only code genuinely used by more than one feature moves to `src/components/`, `src/hooks/` or `src/lib/`.
- Blog posts are Markdown in `content/blog/`, loaded by `src/features/blog/data.ts` (server-only). Don't put post content in TypeScript.
- Don't create folders (`services/`, `types/`, `utils/`, …) until the app actually needs them.
- Public site origin comes from `NEXT_PUBLIC_SITE_URL`; never hardcode a domain.

## Reusability

Search before creating a component, hook, utility, type or constant. Prefer reuse → extend → refactor → create new. Don't add abstractions for one-off logic.

## Code quality

- Strict TypeScript; avoid `any`. Keep feature-specific types inside the feature.
- No dead code, unused imports or unused dependencies. No catch-all `utils.ts`/`helpers.ts`.
- Preserve the existing look and behaviour; refactors must not redesign the UI.
- Keep semantic HTML, keyboard access, focus states, labels and alt text.
- Don't add `useMemo`/`useCallback` without a measured reason.
