import { describe, expect, it } from 'vitest';
import { Circle } from '../geom/circle.js';
import { Point } from '../geom/point.js';
import { POINTER_CURSOR } from './const.js';
import type { Game } from './game.js';
import type { InputEvent } from './input_event.js';
import { Pointer } from './input_pointer.js';

const createGame = (): Game =>
  ({
    time: { time: 0 },
    scale: { bounds: { contains: () => true }, offset: { x: 0, y: 0 } },
    input: {
      enabled: true,
      multiInputOverride: 0,
      moveCallbacks: [],
      interactiveItems: { total: 0, callAll: () => undefined },
      mouse: { locked: false },
      scale: new Point(1, 1),
      position: new Point(),
      circle: new Circle(),
      speed: new Point(),
      activePointer: null,
      onDown: { dispatch: () => undefined },
      onUp: { dispatch: () => undefined },
      onHold: { dispatch: () => undefined },
      onTap: { dispatch: () => undefined },
      x: 0,
      y: 0,
      resetSpeed: () => undefined,
    },
  }) as unknown as Game;

const createPointer = (id = 1): Pointer => new Pointer(createGame(), id, POINTER_CURSOR);

const event = (fields: Partial<InputEvent> = {}): InputEvent =>
  ({ type: 'pointerdown', target: null, preventDefault: () => undefined, ...fields }) as InputEvent;

describe('Pointer', () => {
  describe('updateButtons', () => {
    it('reads a down event as pressed', () => {
      const pointer = createPointer();
      pointer.updateButtons(event({ type: 'pointerdown' }));
      expect(pointer.isDown).toBe(true);
      expect(pointer.isUp).toBe(false);
    });

    it('reads an up event as released', () => {
      const pointer = createPointer();
      pointer.updateButtons(event({ type: 'pointerup' }));
      expect(pointer.isDown).toBe(false);
      expect(pointer.isUp).toBe(true);
    });

    it('matches the suffix case insensitively, as the legacy events are capitalised', () => {
      const pointer = createPointer();
      pointer.updateButtons(event({ type: 'MSPointerDown' }));
      expect(pointer.isDown).toBe(true);
    });

    it('treats a move event as not pressed', () => {
      const pointer = createPointer();
      pointer.updateButtons(event({ type: 'pointermove' }));
      expect(pointer.isUp).toBe(true);
    });
  });

  describe('start', () => {
    it('records the identifier the event carries', () => {
      const pointer = createPointer();
      pointer.start(event({ identifier: 7 }));
      expect(pointer.identifier).toBe(7);
    });

    it('records a null identifier when the event has none', () => {
      const pointer = createPointer();
      pointer.start(event({}));
      expect(pointer.identifier).toBeNull();
    });

    it('records the pointerId when the event carries one', () => {
      const pointer = createPointer();
      pointer.start(event({ pointerId: 3 }));
      expect(pointer.pointerId).toBe(3);
    });

    it('marks the pointer active and down', () => {
      const pointer = createPointer();
      pointer.start(event({ identifier: 1 }));
      expect(pointer.active).toBe(true);
      expect(pointer.isDown).toBe(true);
    });
  });

  describe('move', () => {
    it('copies the coordinate set off the event', () => {
      const pointer = createPointer();
      pointer.start(event({ identifier: 1 }));
      pointer.move(
        event({
          type: 'pointermove',
          clientX: 11,
          clientY: 22,
          pageX: 33,
          pageY: 44,
          screenX: 55,
          screenY: 66,
        })
      );
      expect(pointer.clientX).toBe(11);
      expect(pointer.clientY).toBe(22);
      expect(pointer.pageX).toBe(33);
      expect(pointer.pageY).toBe(44);
      expect(pointer.screenX).toBe(55);
      expect(pointer.screenY).toBe(66);
    });

    it('falls back to zero for coordinates the event omits', () => {
      const pointer = createPointer();
      pointer.start(event({ identifier: 1 }));
      pointer.move(event({ type: 'pointermove' }));
      expect(pointer.clientX).toBe(0);
      expect(pointer.pageY).toBe(0);
    });
  });

  describe('stop', () => {
    it('clears the identifiers it recorded', () => {
      const pointer = createPointer();
      pointer.start(event({ identifier: 5, pointerId: 5 }));
      pointer.stop(event({ type: 'pointerup' }));
      expect(pointer.identifier).toBeNull();
      expect(pointer.pointerId).toBeNull();
      expect(pointer.isDown).toBe(false);
    });
  });

  describe('reset', () => {
    it('returns the pointer to its resting state', () => {
      const pointer = createPointer();
      pointer.start(event({ identifier: 5 }));
      pointer.reset();
      expect(pointer.identifier).toBeNull();
      expect(pointer.pointerId).toBeNull();
      expect(pointer.isDown).toBe(false);
      expect(pointer.isUp).toBe(true);
    });
  });
});
