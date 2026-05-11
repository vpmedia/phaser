# WebGL Performance Audit — Action Checklist

Findings from rendering hot-path audit. Ordered by expected impact. Each item lists the file, the problem, and the fix.

## High impact

- [ ] **Frustum culling** — [src/phaser/display/display_object.ts:488-499](../src/phaser/display/display_object.ts#L488-L499)
  - Problem: `renderWebGL()` recurses into every child regardless of camera bounds.
  - Fix: skip subtrees whose world bounds don't intersect the viewport. Add an early-out before the children loop.

- [ ] **Sort sprites by texture/blend before flushing** — [src/phaser/display/webgl/sprite_batch.ts:240-290](../src/phaser/display/webgl/sprite_batch.ts#L240-L290)
  - Problem: flushes on every texture/blend/shader change in scene order; alternating textures collapse the batch to 1 sprite per draw.
  - Fix: sort the batch by `(baseTexture, blendMode, shader)` before the flush loop, or bucket sprites into per-texture sub-batches as they're added.

- [ ] **Dirty-flag world transform math** — [src/phaser/display/display_object.ts:327-330](../src/phaser/display/display_object.ts#L327-L330)
  - Problem: two `Math.sqrt` + one `Math.atan2` per object per frame for `worldScale` / `worldRotation`, even when nothing changed.
  - Fix: introduce a `_transformDirty` flag set by scale/rotation setters; only recompute when dirty or when parent transform changed.

- [ ] **Stop invalidating bounds cache every frame** — [src/phaser/display/display_object.ts:332](../src/phaser/display/display_object.ts#L332)
  - Problem: `updateTransform()` unconditionally sets `currentBounds = null`, defeating the cache.
  - Fix: only null `currentBounds` when the transform actually changes (tie to the dirty flag above).

- [ ] **Always upload only the used vertex range** — [src/phaser/display/webgl/sprite_batch.ts:223-227](../src/phaser/display/webgl/sprite_batch.ts#L223-L227)
  - Problem: when batch >50% full, uploads the entire ~2000-sprite buffer.
  - Fix: drop the branch; always `bufferSubData` with `positions.subarray(0, currentBatchSize * 4 * vertSize)`.

## Medium impact

- [ ] **Cache compiled shaders** — [src/phaser/display/webgl/sprite_batch.ts:266-270](../src/phaser/display/webgl/sprite_batch.ts#L266-L270)
  - Problem: `new NormalShader(gl)` + `init()` runs on every shader swap.
  - Fix: keep a `Map<shaderUID, compiledShader>` per GL context and reuse.

- [ ] **Use VAO for vertex layout** — [src/phaser/display/webgl/sprite_batch.ts:212-220](../src/phaser/display/webgl/sprite_batch.ts#L212-L220)
  - Problem: rebinds buffers and re-issues `vertexAttribPointer` on every flush.
  - Fix: create a VAO once (via `OES_vertex_array_object` or WebGL2) and bind it per flush.

- [ ] **Dirty-flag worldAlpha** — [src/phaser/display/display_object.ts:324](../src/phaser/display/display_object.ts#L324)
  - Problem: `worldAlpha = alpha * parent.worldAlpha` walks the whole tree every frame.
  - Fix: recompute only when local alpha or parent alpha changed.

- [ ] **Cache line geometry in Graphics** — [src/phaser/display/webgl/graphics.ts:129,146,153,177,202](../src/phaser/display/webgl/graphics.ts#L129)
  - Problem: `Math.sqrt` per point in `buildLine()` for perpendicular normalization, rebuilt each frame.
  - Fix: only rebuild when graphics commands change; cache normalized perpendiculars.

- [ ] **Require output param on `Matrix.apply` / `applyInverse`** — [src/phaser/geom/matrix.ts:140-145](../src/phaser/geom/matrix.ts#L140-L145)
  - Problem: allocates `new Point()` when no output is passed; called from rendering math.
  - Fix: audit call sites, pass a reusable Point, then make output mandatory.

- [ ] **Pool the `getBounds()` Rectangle** — [src/phaser/display/display_object.ts:390](../src/phaser/display/display_object.ts#L390)
  - Problem: `new Rectangle()` allocated on the no-visible-children path.
  - Fix: return a shared static empty rect, or reuse `_bounds`.

## Lower impact

- [ ] **Defer `Group.updateZ()`** — [src/phaser/display/group.ts:138-143](../src/phaser/display/group.ts#L138-L143)
  - Problem: rewrites `z` on every child for each add/remove/swap.
  - Fix: mark group z-dirty and rebuild once per frame, or drop the index entirely if not used by render.

- [ ] **Faster child removal** — [src/phaser/display/display_object.ts:160,205](../src/phaser/display/display_object.ts#L160)
  - Problem: `indexOf` + `splice` is O(n); painful for large groups with churn.
  - Fix: store child→index in a Map, or swap-pop when order doesn't matter.

- [ ] **Replace global `currentRenderOrderID` counter** — [src/phaser/display/image.ts:97-98](../src/phaser/display/image.ts#L97-L98)
  - Problem: per-sprite global write; symptom of no render-queue model.
  - Fix: assign render order from a proper queue/depth pass instead of a running global.

## Suggested execution order

1. Quick wins that don't change architecture: #4 (bounds cache), #5 (vertex upload), #6 (shader cache), #11 (Rectangle pool).
2. Dirty-flag pass: #3, #4, #8 together — single coherent change to `DisplayObject`.
3. Architectural wins: #1 (culling), #2 (sort/bucket batching), #7 (VAO).
4. Cleanup: graphics caching, Matrix.apply audit, group/child structure changes.
