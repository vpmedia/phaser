import { describe, expect, it } from 'vitest';
import { TWEEN_COMPLETE, TWEEN_RUNNING } from './const.js';
import { Signal } from './signal.js';
import { Tween } from './tween.js';
import { TweenManager } from './tween_manager.js';
import type { Game } from './game.js';

const createGame = (): Game =>
  ({
    time: { time: 0, elapsedMS: 0 },
    logger: { warn: (): void => undefined },
    onPause: new Signal(),
    onResume: new Signal(),
  }) as unknown as Game;

const createTween = (target: Record<string, number>): { game: Game; tween: Tween } => {
  const game = createGame();
  const manager = new TweenManager(game);
  return { game, tween: new Tween(target, game, manager) };
};

const advance = (game: Game, tween: Tween, ms: number): void => {
  game.time.time += ms;
  game.time.elapsedMS = ms;
  tween.update(game.time.time);
};

describe('TweenData', (): void => {
  describe('resolveEasing', (): void => {
    it('takes a function as-is', (): void => {
      const { tween } = createTween({ x: 0 });
      const ease = (k: number): number => k * k;
      expect(tween.resolveEasing(ease)).toBe(ease);
    });

    it('looks a named curve up in the manager', (): void => {
      const { tween } = createTween({ x: 0 });
      expect(tween.resolveEasing('Quad.easeIn')).toBe(tween.manager.easeMap['Quad.easeIn']);
    });

    it('falls back to linear for a name the manager does not know', (): void => {
      const { tween } = createTween({ x: 0 });
      expect(tween.resolveEasing('No.Such.Curve')).toBe(tween.manager.easeMap['Linear']);
    });
  });

  describe('to', (): void => {
    it('drives a numeric property from its start value to the end value', (): void => {
      const target = { x: 0 };
      const { game, tween } = createTween(target);
      tween.to({ x: 100 }, 100, 'Linear', true);
      advance(game, tween, 50);
      expect(target.x).toBeCloseTo(50);
      advance(game, tween, 50);
      expect(target.x).toBeCloseTo(100);
    });

    it('reads a relative end value against the start', (): void => {
      const target = { x: 20 };
      const { game, tween } = createTween(target);
      tween.to({ x: '+10' }, 100, 'Linear', true);
      advance(game, tween, 100);
      expect(target.x).toBeCloseTo(30);
    });

    it('interpolates through a list of waypoints', (): void => {
      const target = { x: 0 };
      const { game, tween } = createTween(target);
      tween.to({ x: [0, 50, 100] }, 100, 'Linear', true);
      advance(game, tween, 100);
      expect(target.x).toBeCloseTo(100);
    });

    // An empty waypoint list has nothing to interpolate between, so the property goes to NaN.
    it('survives an empty waypoint list', (): void => {
      const target = { x: 7 };
      const { game, tween } = createTween(target);
      tween.to({ x: [] }, 100, 'Linear', true);
      expect((): void => {
        advance(game, tween, 100);
      }).not.toThrow();
    });

    it('reports the tween running until the duration has passed', (): void => {
      const target = { x: 0 };
      const { game, tween } = createTween(target);
      tween.to({ x: 10 }, 100, 'Linear', true);
      game.time.time += 50;
      game.time.elapsedMS = 50;
      expect(tween.timeline[0]?.update(game.time.time)).toBe(TWEEN_RUNNING);
      game.time.time += 100;
      game.time.elapsedMS = 100;
      expect(tween.timeline[0]?.update(game.time.time)).toBe(TWEEN_COMPLETE);
    });
  });

  describe('from', (): void => {
    it('starts at the given value and lands on the target original', (): void => {
      const target = { x: 100 };
      const { game, tween } = createTween(target);
      tween.from({ x: 0 }, 100, 'Linear', true);
      advance(game, tween, 0);
      expect(target.x).toBeCloseTo(0);
      advance(game, tween, 100);
      expect(target.x).toBeCloseTo(100);
    });
  });

  describe('generateData', (): void => {
    it('produces one frame of values per step', (): void => {
      const { tween } = createTween({ x: 0 });
      tween.to({ x: 100 }, 100, 'Linear');
      tween.start();
      const data = tween.generateData(10) ?? [];
      expect(data.length).toBeGreaterThan(0);
      expect(data.at(-1)?.['x']).toBeCloseTo(100);
    });
  });
});
