/**
 * A pointer-like DOM event as the input system sees it.
 *
 * One set of handlers serves mouse, touch and pointer events, so this is the base Event widened
 * with every field any of those kinds contributes. That includes the vendor-prefixed movement
 * properties, which predate the standard ones and are absent from the DOM types, and `identifier`,
 * which the mouse path assigns so a mouse can flow through the same pointer code as a touch.
 *
 * Each handler reads only the fields its own event kind supplies, so all of them are optional.
 */
export type InputEvent = Event & {
  clientX?: number;
  clientY?: number;
  pageX?: number;
  pageY?: number;
  screenX?: number;
  screenY?: number;
  identifier?: number | undefined;
  pointerId?: number | undefined;
  /** A string on modern pointer events; the legacy MSPointer API reported a number. */
  pointerType?: string | number;
  deltaY?: number;
  movementX?: number;
  movementY?: number;
  mozMovementX?: number;
  mozMovementY?: number;
  webkitMovementX?: number;
  webkitMovementY?: number;
  changedTouches?: ArrayLike<InputEvent> & Iterable<InputEvent>;
  targetTouches?: ArrayLike<InputEvent>;
  touches?: ArrayLike<InputEvent>;
  buttons?: number;
  button?: number;
};
