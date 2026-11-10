# CLAUDE.md — SAYO

SAYO is a private, stigma-free health app for young women (first pilot: 18+, Ghana).
Pillars: **Ask SAYO** (AI-supported intake, never diagnoses) · **Verified Professional
Review** (async queue, not live chat) · **Find Care** (verified services, no booking) ·
**The Circle** (pseudonymous peer community). Plus a professional dashboard and an admin
console. The source of truth is `docs/SAYO_MASTER_CONTEXT.md` — read it before product work.

**Phase 1 = everything in Storybook.** No backend yet; every person, clinic and case is
fictional sample data.

## Stack
Vite · React 19 · TypeScript · **Astryx** (`@astryxdesign/core`, Meta's design system,
StyleX-built, themed with CSS custom properties) · Storybook 10 (`pnpm storybook` →
http://localhost:6030) · lucide-react icons. Checks: `pnpm check`.

Astryx docs come from its CLI, never from memory: `pnpm -s astryx component <Name>`,
`pnpm -s astryx docs <topic>`, `pnpm -s astryx search <query>`. Verify every prop.

## Brand directions
Candidate directions share one codebase, explored in rounds. **Round 2 (current):** D Ink,
E Clay (default), F Quiet (all AskTia-guided) and G Grove (Hers-guided). Round 1 (A Big Sister,
B Clear Care, C Unmuted: the pink set) is kept for comparison. Each is an Astryx theme made with
`defineTheme({extends: neutralTheme, ...})` in `src/brand/themes.ts`, with copy in
`src/brand/directions.ts`. Brand docs live in `src/brand/rounds/round1|round2/`; round-2 imagery
uses ten shared slots (`src/brand/rounds/round2/imagery/`, `R2Img`). Themes inherit Astryx metrics
(see `docs/ASTRYX_FIRST.md`); phone screens use iOS control sizes. Storybook toolbar → **Direction**
switches every story.
Screens read copy via `useDirection().copy` and colour via Astryx tokens
(`var(--color-…)`) or `--sayo-*` brand tokens. Never hard-code a direction's hex in a screen.
The logo is fixed (traced SVGs in `src/brand/logo/`); directions change how it is used.

## Product rules (from the master context — do not drift)
- Ask SAYO never diagnoses. Every AI answer is labelled as information, not a diagnosis.
- AI vs peer vs **Verified Professional ✓** must always be visually distinct.
- Out of MVP: booking, payments, video, live chat, prescriptions, DMs, profile photos,
  dark UI. Do not design them in. No prices, statistics, outcome claims or result testimonials.
- GBV/sexual-violence flow asks about immediate danger and device safety first, and
  always offers Quick exit.
- Notifications are discreet: lock-screen copy never names a health topic.
- Circle identity never reveals private Ask SAYO history.

## Layout
- `src/brand/` — logo SVGs, themes, directions (copy + voice), provider.
- `src/components/` — SAYO building blocks composed from Astryx (`sayo/`), phone chrome.
- `src/screens/user/<NN group>/`, `src/screens/pro/`, `src/screens/admin/`.
- `src/docs/` — Start Here and other MDX pages.
- `src/prototype/` — clickable flow prototypes built from the real screens (`pnpm dev` → http://localhost:5340).
  A flow is a list of steps; each wraps one screen in `Proto` with tap rules matched by button label
  (`hotspots.tsx`). Screens are never edited for the prototype. After changing a flow or a screen label,
  run `scripts/check-prototype.mjs` (walks every flow; needs playwright-core).
- `src/data/fixtures.ts` — fictional sample data only.
- `docs/research/` — Mobbin findings (`synthesis.md` first).

## Story conventions
Titles: `User/<NN Group>/<Screen>`, `Professional/<Screen>`, `Admin/<Screen>`. Default
frame is a 390×844 phone; `parameters.frame: 'none'` for components, `'desktop'` for pro/admin.
Every important state gets its own story (empty, loading, error, red flag, offline…).

## Git
Commit as girardjustin1 (repo-local config). The GitHub repo `girardjustin1/sayo-app` is
**public**: no secrets, no real personal or health data. **Never push without the owner's
explicit go-ahead.** The published history starts from one squashed commit; the full pre-publication history is the
local-only branch `local-history-pre-publish` (never push it). The full master context (team, legal,
funding) lives in `docs/private/` (gitignored); the tracked copy is product-only. Stage by path, never `git add -A`, while agents are working.

<!-- ASTRYX:START -->
Astryx v0.7.11 · 174 components
CLI: run every command as `pnpm exec astryx <cmd>` (shown below as `astryx ...`).

SETUP (once, in app entry e.g. main.tsx) — without these, components render unstyled:
  import "@astryxdesign/core/reset.css";
  import "@astryxdesign/core/astryx.css";

WORKFLOW — start every page from a template, never from scratch:
1. `astryx build "<idea>"` — names the template to scaffold from and the parts it lacks.
2. `astryx template <name> <path>` — scaffold it; keep its frame, gap and padding; replace the content.
3. `astryx template <Block>` for parts it lacks; `astryx component <Name>` to read props before using one.
Changing an existing page? Keep it: skip step 2 and add blocks/components inside its sections.
Before you deliver a build, run `astryx doctor --built <dir>`; don't deliver it if it fails.

RULES:
- No <div> — components handle all layout and spacing.
- Read `astryx docs layout` before changing a template's frame.
- Dense data = rows (Table, List/Item), not Card-wrapped lists. Badge = counts only.
- Style with component props first, then tokens (var(--color-*|--spacing-*|--radius-*)). No raw hex/px. No StyleX/Tailwind compiler here — don't use xstyle/utility classes directly. Some templates use StyleX and need a compiler plugin; see `astryx docs styling-overview`.
- Palettes and custom colors go through the theme, never :root overrides. Run `astryx theme add <slug>` to import; `theme eject <slug>` only forks source. See `astryx docs theme`.
- SELF-CHECK: re-read the file; replace any raw <div>/<span>, imported .css/@apply, or hardcoded #hex/px with the component or a token.

`astryx help` lists every command. Key ones beyond the workflow:
  search "<query>"   find any component / hook / doc / template
  discover <words>   integrations you could add
  docs <topic>       getting-started, principles, tokens, theme … (`astryx docs` lists all)
  docs cli           commands and API reference
  docs authoring     build an integration package, and every field it holds
  upgrade --from <old version> --apply   run after a dependency bump
<!-- ASTRYX:END -->
