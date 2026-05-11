# AGENTS.md

## Overview

A modern ECMAScript port of the Phaser game engine v2.6.2. Some original features are intentionally omitted: Creature/RetroFont/Rope/SpriteBatch/Video display objects, the Particle System, Physics System, Plugin System, and TileMap package.

## Tech Stack

- **Language:** TypeScript (ESM, `"type": "module"`)
- **Runtime:** Node.js / Browser (WebGL & Canvas)
- **Package Manager:** pnpm (workspaces)
- **Domain:** Modern ECMAScript port of Phaser game engine v2.6.2
- **Runtime Dependencies:** `@vpmedia/simplify`, `uuid`
- **Build:** Rolldown + `tsc`
- **Testing:** Vitest, @vitest/coverage-v8, jsdom
- **Lint/Format:** oxlint (+ `oxlint-tsgolint`), oxfmt
- **Type Checking:** TypeScript
- **Tooling:** lefthook (git hooks), commitlint (conventional commits)

## Commands

- **Install:** `pnpm install`
- **Build:** `pnpm build` (Rolldown + `tsc`)
- **Clean:** `pnpm clean`
- **Test:** `pnpm test`
- **Lint / Format / Typecheck:** `pnpm lint` / `pnpm format` / `pnpm typecheck`
- **All checks:** `pnpm check`

## Project Structure

- `src/index.ts` — public entry point
- `src/phaser/` — engine source (core, geom, util, etc.)
- `typedefs/` — ambient type declarations
- `docs/` — documentation
- `dist/` — build output (gitignored)

## Conventions

- **Commits:** Conventional Commits with custom rules (header ≤ 100, body line ≤ 100, no sentence/start/pascal/upper-case subjects)
- **Modules:** ESM only
- **Style:** Enforced by oxlint + oxfmt

## Testing

- Tests are co-located with source as `*.test.ts` under `src/phaser/`
- Run a single file: `pnpm test src/phaser/util/math.test.ts`
- DOM APIs available via jsdom environment
