# AGENTS.md

## Overview

A modern ECMAScript port of the Phaser game engine v2.6.2. Some original features are intentionally omitted: Creature/RetroFont/Rope/SpriteBatch/Video display objects, the Particle System, Physics System, Plugin System, and TileMap package.

## Tech Stack

- **Language:** TypeScript (ESM, `"type": "module"`)
- **Runtime:** Node.js / Browser (WebGL & Canvas)
- **Package Manager:** pnpm (workspaces)
- **Runtime Dependencies:** `@vpmedia/simplify`, `uuid`
- **Build:** Rolldown + `tsc`
- **Testing:** Vitest, @vitest/coverage-v8, happy-dom
- **Lint/Format:** oxlint (+ `oxlint-tsgolint`), oxfmt
- **Type Checking:** TypeScript
- **Tooling:** lefthook (git hooks), commitlint (conventional commits)

## Documentation

- Lefthook: https://lefthook.dev/llms.txt
- OXC (oxlint, oxfmt): https://oxc.rs/llms.txt
- Rolldown: https://rolldown.rs/llms.txt
- TypeScript: https://context7.com/websites/typescriptlang/llms.txt
- Vitest: https://vitest.dev/llms.txt

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

- **Commits:** Conventional Commits (`@commitlint/config-conventional`)
- **Modules:** ESM only
- **Style:** Enforced by oxlint + oxfmt — do not hand-format

## Testing

- Tests are co-located with source as `*.test.ts` under `src/phaser/`
- Run a single file: `pnpm test src/phaser/util/math.test.ts`
- DOM APIs available via happy-dom environment
