/**
 * A callback the engine invokes with a receiver the caller chose. The rest parameter is `never[]`
 * so a handler declared with concrete parameters is still assignable.
 */
export type Callback = (...args: never[]) => unknown;

/** The same callback once its concrete parameter types are behind us, ready to be applied. */
export type AppliedCallback = (...args: unknown[]) => unknown;

/** An easing curve: it maps a normalised time to a normalised progress. */
export type EasingFunction = (k: number) => number;

/** An interpolation curve: it reads a value out of a list of stops at a normalised position. */
export type InterpolationFunction = (v: number[], k: number) => number;
