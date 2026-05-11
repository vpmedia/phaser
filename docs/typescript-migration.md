# TypeScript Migration Plan

Incremental migration of the `@vpmedia/phaser` source from JavaScript to TypeScript. The migration must be safe at every step: the test suite (`pnpm test`) and `pnpm typecheck` must continue to succeed (the typecheck baseline starts at 212 pre-existing errors from `checkJs`, which we aim to *not* increase). The public API surface in [src/index.js](src/index.js) must not change.

## Strategy

- `tsconfig.json` already has `allowJs`, `checkJs`, `strict: true` (with `noImplicitAny: false`, `strictNullChecks: false`). This lets `.js` and `.ts` files coexist.
- Rename files `.js` → `.ts` bottom-up (leaves first). Keep `.js` import specifiers — NodeNext + TS resolves them correctly.
- Each file rename is its own commit-sized unit. After each phase, run `pnpm test` + `pnpm typecheck` and confirm error count does not regress.
- Test files (`*.test.js`) are migrated alongside their subject file.
- No behavioral changes during rename. Type tightening (replacing `any`, fixing pre-existing `checkJs` errors) is a separate follow-up.
- `vitest.config.js` and `src/index.js` entry stay as `.js` until the final phase to avoid touching `package.json#main`.

## Baseline

- 119 `.js` source files, 17 `.test.js` files (188 tests passing).
- `pnpm typecheck` reports 212 pre-existing errors in `.js` files. Goal: never exceed this count during migration.

## Phases

### Phase 1 — Leaf utilities (no internal imports)
- [x] `src/phaser/util/math.js` + `math.test.js`
- [x] `src/phaser/core/const.js`
- [x] `src/phaser/core/error_code.js`
- [x] `src/phaser/core/raf.js`
- [x] `src/phaser/core/array_set.js`
- [x] `src/phaser/core/signal_binding.js`
- [x] `src/phaser/core/signal.js` + `signal.test.js`
- [x] `src/phaser/core/tween_easing.js`
- [x] `src/phaser/core/device_util.js`
- [x] `src/phaser/core/dom.js`
- [x] `src/phaser/display/canvas/util.js`
- [x] `src/phaser/display/webgl/util.js`
- [x] `src/phaser/display/webgl/earcut.js`
- [x] `src/phaser/display/webgl/earcut_node.js`

### Phase 2 — Geometry primitives
- [x] `src/phaser/geom/point.js` + test
- [x] `src/phaser/geom/circle.js` + test
- [x] `src/phaser/geom/ellipse.js` + test
- [x] `src/phaser/geom/line.js` + test
- [x] `src/phaser/geom/matrix.js` + test
- [x] `src/phaser/geom/rectangle.js` + test
- [x] `src/phaser/geom/rounded_rectangle.js` + test
- [x] `src/phaser/geom/polygon.js`

### Phase 3 — Geometry utilities
- [x] `src/phaser/geom/util/point.js` + test
- [x] `src/phaser/geom/util/circle.js` + test
- [x] `src/phaser/geom/util/ellipse.js` + test
- [x] `src/phaser/geom/util/line.js` + test
- [x] `src/phaser/geom/util/matrix.js` + test
- [x] `src/phaser/geom/util/rectangle.js` + test
- [x] `src/phaser/geom/util/rounded_rectangle.js` + test
- [x] `src/phaser/geom/util/polygon.js` + test

### Phase 4 — Core data/services (low coupling)
Renamed with `// @ts-nocheck` as a transitional pragma. Strict typing deferred to Phase 10.
- [x] `frame.js`, `frame_data.js`, `frame_util.js`
- [x] `animation_parser.js`, `animation.js`, `animation_manager.js`
- [x] `tween_data.js`, `tween.js`, `tween_manager.js`
- [x] `timer_event.js`, `timer.js`, `time.js`
- [x] `event_manager.js`
- [x] `device.js`
- [x] `cache.js`, `loader_parser.js`, `loader.js`
- [x] `sound.js`, `sound_sprite.js`, `sound_manager.js`

### Phase 5 — Display: canvas pipeline (with `@ts-nocheck`)
- [x] `display/canvas/buffer.js`, `pool.js`, `tinter.js`, `graphics.js`, `masker.js`, `renderer.js`

### Phase 6 — Display: webgl pipeline (with `@ts-nocheck`)
- [x] `display/webgl/shader/*.js`
- [x] `display/webgl/base_texture.js`, `texture.js`, `texture_util.js`, `render_texture.js`, `filter_texture.js`
- [x] `display/webgl/abstract_filter.js`
- [x] `display/webgl/blend_manager.js`, `stencil_manager.js`, `mask_manager.js`, `shader_manager.js`, `filter_manager.js`
- [x] `display/webgl/graphics.js`, `graphics_data.js`
- [x] `display/webgl/sprite_batch.js`, `fast_sprite_batch.js`
- [x] `display/webgl/renderer.js`

### Phase 7 — Display: scene-graph objects (with `@ts-nocheck`)
- [x] `display/display_object.js`
- [x] `display/sprite_util.js`, `image.js`, `button.js`, `text.js`, `bitmap_text.js`
- [x] `display/graphics.js`, `graphics_data.js`, `graphics_data_util.js`
- [x] `display/sprite_batch.js`
- [x] `display/group.js`

### Phase 8 — Core: input + scene + game (with `@ts-nocheck`)
- [x] `input.js`, `input_pointer.js`, `input_mouse.js`, `input_touch.js`, `input_mspointer.js`, `input_handler.js`
- [x] `stage.js`, `world.js`
- [x] `scale_manager.js`
- [x] `factory.js`
- [x] `scene.js`, `scene_manager.js`
- [x] `game.js`

### Phase 9 — Entry point and config
- [x] `src/index.js` → `src/index.ts`
- [x] Update `package.json#main` to `./src/index.ts`
- [x] Remove `allowJs` / `checkJs` from `tsconfig.json`
- [x] Update `vitest.config.js` include/coverage globs to drop `.js` patterns
- [ ] `typedefs/global.d.ts` review (no changes needed — current declaration is minimal)

### Phase 10 — Cleanup (post-rename, follow-up)
- [ ] Remove `// @ts-nocheck` pragmas from Phase 4–8 files, one module at a time, adding class field declarations and tightening types as you go
- [ ] Replace residual `any`s with concrete types
- [ ] Enable `strictNullChecks` and `noImplicitAny`
- [ ] Address remaining latent issues (e.g., `webgl/base_texture` `naturalHeight` on canvas, `webgl/renderer` arity mismatches, `complex` shader `colorAttribute`)

## Final state

- 119 source files renamed `.js` → `.ts`.
- 17 test files renamed `.test.js` → `.test.ts`; all 188 tests pass.
- `pnpm typecheck`: **0 errors** (down from 212 baseline).
- `pnpm lint`: 0 errors.
- 50 files in `core/`, `display/`, `display/canvas/`, `display/webgl/` carry `// @ts-nocheck`. Their strict re-enabling is the deliverable of Phase 10.

## Verification per file

For each file renamed `X.js` → `X.ts`:
1. Rename the file.
2. Run `pnpm test` — must still pass.
3. Run `pnpm typecheck 2>&1 | grep -c "error TS"` — must be `<=` baseline (212 initially, lowering as we go).
4. If a downstream file imports the renamed file with a `.js` extension, leave the import as-is (NodeNext resolves `.js` → `.ts` source during typecheck; vitest/runtime resolves `.ts` via its loader).
