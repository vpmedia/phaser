import { describe, expect, it } from 'vitest';
import type { Image } from '../display/image.js';
import { InputHandler } from './input_handler.js';

const createSprite = (): Image =>
  ({
    x: 0,
    y: 0,
    game: {
      time: { time: 0 },
      canvas: { style: { cursor: 'default' } },
      input: { interactiveItems: { add: () => undefined, remove: () => undefined } },
    },
    events: {
      onAddedToGroup: { add: () => undefined },
      onRemovedFromGroup: { add: () => undefined },
    },
  }) as unknown as Image;

describe('InputHandler', () => {
  describe('pointerData', () => {
    it('seeds pointer 0 from the constructor', () => {
      const handler = new InputHandler(createSprite());
      expect(handler._pointerData).toHaveLength(1);
      expect(handler.pointerData(0).id).toBe(0);
    });

    it('returns the same record on repeat access', () => {
      const handler = new InputHandler(createSprite());
      expect(handler.pointerData(0)).toBe(handler.pointerData(0));
    });

    it('creates a record on first access of an unseeded pointer', () => {
      const handler = new InputHandler(createSprite());
      const data = handler.pointerData(7);
      expect(data.id).toBe(7);
      expect(data.isDown).toBe(false);
      expect(handler.pointerData(7)).toBe(data);
    });

    it('hands back a record whose mutations are visible through the array', () => {
      const handler = new InputHandler(createSprite());
      handler.pointerData(3).isOver = true;
      expect(handler._pointerData[3]?.isOver).toBe(true);
    });

    it('exposes every field a fresh record needs', () => {
      const handler = new InputHandler(createSprite());
      expect(handler.pointerData(1)).toStrictEqual({
        id: 1,
        x: 0,
        y: 0,
        camX: 0,
        camY: 0,
        isDown: false,
        isUp: false,
        isOver: false,
        isOut: false,
        timeOver: 0,
        timeOut: 0,
        timeDown: 0,
        timeUp: 0,
        downDuration: 0,
        isDragged: false,
      });
    });
  });

  describe('start', () => {
    it('populates the ten pointer slots the input system tracks', () => {
      const handler = new InputHandler(createSprite());
      handler.start();
      expect(handler._pointerData).toHaveLength(10);
      expect(handler._pointerData.map((data) => data.id)).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(handler.enabled).toBe(true);
    });
  });

  describe('reset', () => {
    it('clears pointer state back to a fresh record', () => {
      const handler = new InputHandler(createSprite());
      handler.start();
      handler.pointerData(2).isDown = true;
      handler.pointerData(2).timeDown = 1234;
      handler.reset();
      expect(handler.pointerData(2).isDown).toBe(false);
      expect(handler.pointerData(2).timeDown).toBe(0);
      expect(handler.enabled).toBe(false);
    });
  });

  describe('pointer accessors', () => {
    it('read through to the backing record', () => {
      const handler = new InputHandler(createSprite());
      handler.start();
      const data = handler.pointerData(4);
      data.x = 11;
      data.y = 22;
      data.isDown = true;
      data.timeDown = 99;
      expect(handler.pointerX(4)).toBe(11);
      expect(handler.pointerY(4)).toBe(22);
      expect(handler.pointerDown(4)).toBe(true);
      expect(handler.pointerTimeDown(4)).toBe(99);
    });

    it('default to pointer 0', () => {
      const handler = new InputHandler(createSprite());
      handler.pointerData(0).x = 5;
      expect(handler.pointerX()).toBe(5);
    });
  });
});
