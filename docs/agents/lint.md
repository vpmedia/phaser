# Lint and type checking

## Shape of the config

[.oxlintrc.json](../../.oxlintrc.json) enables every oxlint category and then turns rules off
explicitly, so the file reads as a list of what cannot be satisfied rather than a list of what it
checks.

Its `env`, `plugins`, `categories`, `rules` and `overrides` are kept **byte-identical** to the
ruleset the consuming applications lint under, so a change that is clean here is clean there. Only
`options.typeAware` is this repository's own. A rule that genuinely cannot hold is turned off on both
sides at once, with the reason written down; nothing is relaxed here alone.

## Type-aware linting

`options.typeAware` is on, so `oxlint` runs `oxlint-tsgolint` and the type-aware rules see real
types. This only works because [tsconfig.json](../../tsconfig.json) includes the `*.test.ts` files —
excluded test files come back as `error` type and every type-aware rule fires uselessly on them.

That is why the tsconfig is split:

- `tsconfig.json` — `noEmit`, includes tests, drives `pnpm typecheck` and the type-aware lint.
- `tsconfig.build.json` — extends it, excludes tests, emits the declarations for `pnpm build`.

To confirm the type-aware pass is genuinely running rather than silently inert, flip one staged
type-aware rule (say `typescript/no-unsafe-return`) to `error` and re-run `pnpm lint`; it should
report violations immediately.

## Strict type checking

Every strict flag is on, including `noUncheckedIndexedAccess`, `noPropertyAccessFromIndexSignature`,
`exactOptionalPropertyTypes` and `noUncheckedSideEffectImports`. `pnpm typecheck` is at zero errors
and must stay there.

Two engine-wide patterns carry that weight:

- `typedefs/global.d.ts` types the `globalThis.PhaserRegistry` service locator, and
  [src/phaser/core/registry.ts](../../src/phaser/core/registry.ts) is the single place that seeds it.
- Dense arrays indexed by a known-valid key (pointer ids, timeline slots) go through a total
  accessor — `InputHandler.pointerData()` is the model — rather than a non-null assertion at each
  call site.

## The two rules this engine cannot satisfy

Every other rule is on. These two are off because the engine's shape defeats them, not because a
refactor is pending.

**`unicorn/prefer-dom-node-remove`** is a syntactic rule: it rewrites any `parent.removeChild(child)`
to `child.remove()`, without asking what `parent` is. The display tree mirrors the DOM's naming, so
it fires on `DisplayObject.removeChild` — where the rewrite does not compile, because a display
object has no `remove()`. Renaming the display-tree method would be a breaking change to the public
API for the sake of a lint rule, so the rule goes instead. Genuine DOM removals do use
`node.remove()`.

**`typescript/unbound-method`** flags a method referenced without its receiver. Every callback API in
the engine takes the receiver as its next argument — `signal.add(this.onPause, this)`,
`timer.add(delay, this.tick, this)`, `xhrLoad(file, url, type, this.fileComplete)` — and invokes the
handler with `.call(context, …)`. The reference is therefore never unbound, but the rule has no way
to see the pairing. Binding each of them instead would turn some forty prototype methods into
per-instance closures, which a scene graph allocates thousands of.

## Keeping it green

`pnpm lint` and `pnpm typecheck` are both at zero and must stay there. Two habits keep them there:

- **The engine's `any` is gone.** The only one left is `UserData`, the free-form bag a display object
  carries for its owner, which has no shape the engine can know. Everything else has a type; give new
  code one rather than reaching for `any`.
- **A guard that looks redundant may not be.** Many fields are declared with `!` and set to `null!`
  on `destroy()`, so the compiler believes they are always present while the runtime knows better.
  Where a guard exists because the value really can be absent mid-boot or post-destroy, it is written
  as `if (this.thing as Thing | undefined)` — keep the assertion, and never collapse a two-part guard
  (`this.game.input && this.game.input.scale`) into one.

## Gotcha: `oxlint --fix` on this codebase

`--fix` and `--fix-suggestions` are safe and were used heavily. **`--fix-dangerously` is not** — it
gained four fixes and broke five files when tried on this source.

Even `--fix-suggestions` needs a `pnpm typecheck` and `pnpm test` immediately afterwards. Two fixers
have bitten us:

- `eslint/no-plusplus` rewrites `--k * k` to `k -= 1 * k`, silently changing the arithmetic. It
  produced a syntax error in `tween_easing.ts` and wrong results in six other expressions.
- `typescript/explicit-member-accessibility` can emit `field!: T = value`, which is a TypeScript
  error (TS1263). Strip the `!` where there is an initialiser.

When a fixer touches arithmetic, re-derive the expression by hand and pin it with a test.
