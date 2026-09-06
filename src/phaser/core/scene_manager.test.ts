import { describe, expect, it, vi } from 'vitest';
import { Scene } from './scene.js';
import { SceneManager } from './scene_manager.js';
import type { Game } from './game.js';
import type { SceneState } from './scene_manager.js';

const createGame = (isBooted = true): Game =>
  ({
    isBooted,
    isKickStart: false,
    world: { x: 0, y: 0, destroy: vi.fn() },
    tweens: { removeAll: vi.fn() },
    input: { reset: vi.fn() },
    time: { removeAll: vi.fn() },
    scale: { reset: vi.fn() },
    cache: { destroy: vi.fn() },
    load: { reset: vi.fn(), start: vi.fn(), totalQueuedFiles: (): number => 0, totalQueuedPacks: (): number => 0 },
  }) as unknown as Game;

const createManager = (pendingState: ConstructorParameters<typeof SceneManager>[1] = null): SceneManager =>
  new SceneManager(createGame(), pendingState);

describe('SceneManager', () => {
  describe('add', () => {
    it('takes a plain hook object and links the game onto it', () => {
      const manager = createManager();
      const state: SceneState = { create: vi.fn<() => void>() };
      expect(manager.add('menu', state)).toBe(state);
      expect(state.game).toBeDefined();
    });

    it('builds a state from a constructor', () => {
      const manager = createManager();
      class Menu extends Scene {}
      expect(manager.add('menu', Menu)).toBeInstanceOf(Menu);
    });

    it('takes a scene instance as-is', () => {
      const manager = createManager();
      const scene = new Scene();
      expect(manager.add('menu', scene)).toBe(scene);
    });

    it('queues the state when the game has not booted', () => {
      const manager = new SceneManager(createGame(false), null);
      manager.add('menu', { create: vi.fn<() => void>() }, true);
      expect(manager._pendingState).toBe('menu');
    });

    it('starts the state right away once the game has booted', () => {
      const manager = createManager();
      manager.add('menu', { create: vi.fn<() => void>() }, true);
      expect(manager._pendingState).toBe('menu');
    });
  });

  describe('boot', () => {
    it('registers a state given as an object under the default key', () => {
      const manager = createManager({ create: vi.fn<() => void>() });
      manager.boot();
      expect(manager.states['default']).toBeDefined();
    });

    it('leaves a state given by key alone', () => {
      const manager = createManager('menu');
      manager.boot();
      expect(manager.states['default']).toBeUndefined();
    });
  });

  describe('checkState', () => {
    it('accepts a state carrying any of the lifecycle hooks', () => {
      const manager = createManager();
      manager.add('menu', { update: vi.fn<() => void>() });
      expect(manager.checkState('menu')).toBe(true);
    });

    it('rejects a state with no hooks at all', () => {
      const manager = createManager();
      manager.add('menu', {});
      expect(manager.checkState('menu')).toBe(false);
    });

    it('rejects a key it does not hold', () => {
      expect(createManager().checkState('nope')).toBe(false);
    });
  });

  describe('setCurrentState', () => {
    it('binds the hooks the state provides and leaves the rest null', () => {
      const manager = createManager();
      const create = vi.fn<() => void>();
      manager.add('menu', { create });
      manager.setCurrentState('menu');
      expect(manager.current).toBe('menu');
      expect(manager.onCreateCallback).toBe(create);
      expect(manager.onUpdateCallback).toBeNull();
      expect(manager.onPreloadCallback).toBeNull();
    });

    it('falls back to a no-op for init and shutdown', () => {
      const manager = createManager();
      manager.add('menu', {});
      manager.setCurrentState('menu');
      expect(manager.onInitCallback).toBe(manager.dummy);
      expect(manager.onShutDownCallback).toBe(manager.dummy);
    });

    it('calls init with the arguments start was given', () => {
      const manager = createManager();
      const init = vi.fn<() => void>();
      manager.add('menu', { init, update: vi.fn<() => void>() });
      manager.start('menu', true, false, 'a', 1);
      manager.setCurrentState('menu');
      expect(init).toHaveBeenCalledWith('a', 1);
    });

    it('stamps the key onto the state', () => {
      const manager = createManager();
      const state: SceneState = { create: vi.fn<() => void>() };
      manager.add('menu', state);
      manager.setCurrentState('menu');
      expect(state.key).toBe('menu');
    });
  });

  describe('start', () => {
    it('ignores a key with no lifecycle hooks', () => {
      const manager = createManager();
      manager.add('menu', {});
      manager.start('menu');
      expect(manager._pendingState).toBeNull();
    });
  });

  describe('update', () => {
    it('runs the update hook only once the scene has been created', () => {
      const manager = createManager();
      const update = vi.fn<() => void>();
      manager.add('menu', { update });
      manager.setCurrentState('menu');
      manager.update();
      expect(update).not.toHaveBeenCalled();
      manager.loadComplete();
      manager.update();
      expect(update).toHaveBeenCalledTimes(1);
    });

    it('runs the create hook exactly once', () => {
      const manager = createManager();
      const create = vi.fn<() => void>();
      manager.add('menu', { create });
      manager.setCurrentState('menu');
      manager.loadComplete();
      manager.loadComplete();
      expect(create).toHaveBeenCalledTimes(1);
    });
  });

  describe('resize', () => {
    it('passes the new size to the scene', () => {
      const manager = createManager();
      const resize = vi.fn<(width: number, height: number) => void>();
      manager.add('menu', { resize });
      manager.setCurrentState('menu');
      manager.resize(320, 240);
      expect(resize).toHaveBeenCalledWith(320, 240);
    });
  });

  describe('remove', () => {
    it('drops the state and unbinds its hooks when it is current', () => {
      const manager = createManager();
      manager.add('menu', { create: vi.fn<() => void>() });
      manager.setCurrentState('menu');
      manager.remove('menu');
      expect(manager.states['menu']).toBeUndefined();
      expect(manager.onCreateCallback).toBeNull();
    });
  });

  describe('destroy', () => {
    it('empties the manager', () => {
      const manager = createManager();
      manager.add('menu', { create: vi.fn<() => void>(), shutdown: vi.fn<() => void>() });
      manager.setCurrentState('menu');
      manager.destroy();
      expect(manager.states).toStrictEqual({});
      expect(manager.current).toBe('');
      expect(manager._pendingState).toBeNull();
    });
  });
});
