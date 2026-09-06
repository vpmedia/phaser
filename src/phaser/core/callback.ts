import type { InputHandler } from './input_handler.js';
import type { Pointer } from './input_pointer.js';

/**
 * A callback the engine invokes with a receiver the caller chose. The rest parameter is `never[]`
 * so a handler declared with concrete parameters is still assignable.
 */
export type Callback = (...args: never[]) => unknown;

/** The same callback once its concrete parameter types are behind us, ready to be applied. */
export type AppliedCallback = (...args: unknown[]) => unknown;

/** A pointer-move listener, as the input manager invokes it on every move it dispatches. */
export type PointerMoveCallback = (pointer: Pointer, x: number, y: number, fromClick: boolean) => void;

/** A hook that picks which of the candidates under a pointer should receive its events. */
export type CandidateHandler = (
  pointer: Pointer,
  candidates: InputHandler[],
  current: InputHandler | null
) => InputHandler | null;

/** An easing curve: it maps a normalised time to a normalised progress. */
export type EasingFunction = (k: number) => number;

/** An interpolation curve: it reads a value out of a list of stops at a normalised position. */
export type InterpolationFunction = (v: number[], k: number) => number;

/**
 * Free-form data a display object carries for its owner. The engine stores it and never reads it,
 * and consumers narrow it by declaring their own display-object subtype — which only holds while
 * the property stays assignable in both directions, so this one bag has no shape.
 */
// eslint-disable-next-line typescript/no-explicit-any -- the whole point of this bag is that it has no shape
export type UserData = any;
