# Lint and type checking

## Shape of the config

[.oxlintrc.json](../../.oxlintrc.json) enables every oxlint category and then turns rules off
explicitly, so the file reads as a list of what this engine cannot satisfy rather than a list of what
it checks. Keep that shape: add a rule to the `rules` block only to turn it off, and only with a
reason that belongs in the backlog below.

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

## The one rule this engine cannot satisfy

`unicorn/prefer-dom-node-remove` is off, and it is the only rule off for a reason other than a
pending refactor. It is a syntactic rule: it rewrites any `parent.removeChild(child)` to
`child.remove()`, without asking what `parent` is. The display tree mirrors the DOM's naming, so it
fires on `DisplayObject.removeChild` — where the rewrite does not compile, because a display object
has no `remove()`. Renaming the display-tree method would be a breaking change to the public API for
a lint rule, so the rule goes instead.

Genuine DOM removals in the engine do use `node.remove()`.

## Burn-down backlog

45 rules are turned off because the engine cannot satisfy them yet, not because we disagree with
them. They fall into four groups; retiring a group means deleting its entries from `.oxlintrc.json`
and fixing what then fires.

| Group | Rules | Blocked on |
| --- | --- | --- |
| `any` elimination | `no-unsafe-*` (5), `no-explicit-any`, `strict-boolean-expressions`, `unbound-method`, `no-redundant-type-constituents` | ~710 `any` annotations left from the JS→TS migration |
| `Function` types | `ban-types`, `no-unsafe-function-type` | the same annotations, at callback boundaries |
| Return types | `explicit-function-return-type`, `explicit-module-boundary-types` | ~2,500 signatures; largely mechanical once the `any`s are gone |
| Engine idioms | the remaining 36, e.g. `no-param-reassign`, `prefer-ternary`, `prefer-for-of` | Phaser 2 style the port inherited; each is a small, self-contained refactor |

The first three groups are one another's prerequisites, in that order. The fourth is independent and
can be picked off a rule at a time.

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
