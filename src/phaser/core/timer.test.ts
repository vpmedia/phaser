import { describe, expect, it, vi } from 'vitest';
import type { Game } from './game.js';
import { Timer } from './timer.js';

const createGame = (time = 0): Game => ({ time: { time } }) as unknown as Game;

const createTimer = (startTime = 0): Timer => {
  const timer = new Timer(createGame(startTime));
  timer._now = startTime;
  return timer;
};

describe('Timer', (): void => {
  describe('start', (): void => {
    it('rebases every queued event onto the start time', (): void => {
      const timer = createTimer(1000);
      timer.add(100, (): undefined => undefined);
      timer.add(300, (): undefined => undefined);
      timer.start();
      expect(timer.events.map((event): number => event.tick)).toStrictEqual([1100, 1300]);
    });

    it('is a no-op once already running', (): void => {
      const timer = createTimer(1000);
      timer.add(100, (): undefined => undefined);
      timer.start();
      const ticks = timer.events.map((event): number => event.tick);
      timer.start(500);
      expect(timer.events.map((event): number => event.tick)).toStrictEqual(ticks);
    });
  });

  describe('order', (): void => {
    it('sorts events by tick and exposes the earliest as nextTick', (): void => {
      const timer = createTimer(0);
      timer.add(500, (): undefined => undefined);
      timer.add(100, (): undefined => undefined);
      timer.add(300, (): undefined => undefined);
      expect(timer.events.map((event): number => event.delay)).toStrictEqual([100, 300, 500]);
      expect(timer.nextTick).toBe(100);
    });

    it('leaves nextTick untouched when there are no events', (): void => {
      const timer = createTimer(0);
      timer.nextTick = 42;
      timer.order();
      expect(timer.nextTick).toBe(42);
    });
  });

  describe('remove', (): void => {
    it('marks a matching event for deletion and reports success', (): void => {
      const timer = createTimer(0);
      const event = timer.add(100, (): undefined => undefined);
      expect(timer.remove(event)).toBe(true);
      expect(event.pendingDelete).toBe(true);
    });

    it('reports failure for an event it does not hold', (): void => {
      const timer = createTimer(0);
      timer.add(100, (): undefined => undefined);
      const other = createTimer(0).add(100, (): undefined => undefined);
      expect(timer.remove(other)).toBe(false);
    });

    it('reports failure for null without throwing', (): void => {
      const timer = createTimer(0);
      timer.add(100, (): undefined => undefined);
      expect(timer.remove(null)).toBe(false);
    });
  });

  describe('clearPendingEvents', (): void => {
    it('drops only the events marked for deletion', (): void => {
      const timer = createTimer(0);
      const first = timer.add(100, (): undefined => undefined);
      const second = timer.add(200, (): undefined => undefined);
      timer.remove(first);
      timer.clearPendingEvents();
      expect(timer.events).toStrictEqual([second]);
      expect(timer._len).toBe(1);
    });
  });

  describe('update', (): void => {
    it('fires a one-shot event once its tick is reached and marks it spent', (): void => {
      const timer = createTimer(0);
      const callback = vi.fn();
      timer.add(100, callback);
      timer.start();
      timer.update(50);
      expect(callback).not.toHaveBeenCalled();
      timer.update(100);
      expect(callback).toHaveBeenCalledTimes(1);
      expect(timer.events[0]?.pendingDelete).toBe(true);
    });

    it('keeps firing a looping event and reschedules its tick', (): void => {
      const timer = createTimer(0);
      const callback = vi.fn();
      timer.loop(100, callback);
      timer.start();
      timer.update(100);
      timer.update(200);
      timer.update(300);
      expect(callback).toHaveBeenCalledTimes(3);
      expect(timer.events[0]?.pendingDelete).toBe(false);
    });

    it('fires a repeating event exactly repeatCount times', (): void => {
      const timer = createTimer(0);
      const callback = vi.fn();
      timer.repeat(100, 2, callback);
      timer.start();
      timer.update(100);
      timer.update(200);
      timer.update(300);
      timer.update(400);
      expect(callback).toHaveBeenCalledTimes(2);
      expect(timer.expired).toBe(true);
    });

    it('passes the configured context and arguments to the callback', (): void => {
      const timer = createTimer(0);
      const context = { seen: null as unknown };
      const callback = vi.fn(function callbackImpl(this: typeof context, value: string): void {
        this.seen = value;
      });
      timer.add(100, callback, context, 'payload');
      timer.start();
      timer.update(100);
      expect(callback).toHaveBeenCalledWith('payload');
      expect(context.seen).toBe('payload');
    });

    it('completes and dispatches onComplete once every event is spent', (): void => {
      const timer = createTimer(0);
      const onComplete = vi.fn();
      timer.onComplete.add(onComplete);
      timer.add(100, (): undefined => undefined);
      timer.start();
      timer.update(100);
      expect(timer.expired).toBe(true);
      expect(onComplete).toHaveBeenCalledTimes(1);
    });

    it('survives a callback that removes every event mid-tick', (): void => {
      const timer = createTimer(0);
      timer.add(100, (): void => {
        timer.events.length = 0;
      });
      timer.start();
      expect((): boolean => timer.update(100)).not.toThrow();
    });
  });

  describe('adjustEvents', (): void => {
    it('shifts pending events forward by the time they missed', (): void => {
      const timer = createTimer(0);
      const event = timer.add(100, (): undefined => undefined);
      timer.start();
      timer._now = 5000;
      timer.adjustEvents(0);
      expect(event.tick).toBe(5100);
    });

    it('clamps events whose tick already passed to the current time', (): void => {
      const timer = createTimer(0);
      const event = timer.add(100, (): undefined => undefined);
      timer.start();
      timer._now = 5000;
      timer.adjustEvents(500);
      expect(event.tick).toBe(5000);
    });

    it('leaves events marked for deletion alone', (): void => {
      const timer = createTimer(0);
      const event = timer.add(100, (): undefined => undefined);
      timer.start();
      timer.remove(event);
      const { tick } = event;
      timer._now = 5000;
      timer.adjustEvents(0);
      expect(event.tick).toBe(tick);
    });
  });
});
