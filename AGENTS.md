# Project guidelines

Vite + React + TypeScript + TanStack Router (client-side), Tailwind CSS v4. Package manager: **npm only**.

## Commands

`npm install` · `npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck`

## Architecture

- Routes in `src/routes/` stay thin: SEO `head` plus a page component imported from `src/features/`.
- Feature code (components, data, SEO, types) lives under `src/features/<feature>/`. Only code genuinely used by more than one feature moves to `src/components/`, `src/hooks/` or `src/lib/`.
- Don't create folders (`services/`, `types/`, `utils/`, …) until the app actually needs them.
- Public site origin comes from `VITE_SITE_URL`; never hardcode a domain.

## Reusability

Search before creating a component, hook, utility, type or constant. Prefer reuse → extend → refactor → create new. Don't add abstractions for one-off logic.

## Code quality

- Strict TypeScript; avoid `any`. Keep feature-specific types inside the feature.
- No dead code, unused imports or unused dependencies. No catch-all `utils.ts`/`helpers.ts`.
- Preserve the existing look and behaviour; refactors must not redesign the UI.
- Keep semantic HTML, keyboard access, focus states, labels and alt text.
- Don't add `useMemo`/`useCallback` without a measured reason.
