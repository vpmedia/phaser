import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getPageState,
  onPageStateChange,
  oncePageActive,
  PAGE_STATE_ACTIVE,
  PAGE_STATE_FROZEN,
  PAGE_STATE_HIDDEN,
  PAGE_STATE_PASSIVE,
  PAGE_STATE_TERMINATED,
  readPageState,
  resetPageLifecycle,
  startPageLifecycle,
} from './page_lifecycle.js';

const setVisibility = (value: DocumentVisibilityState): void => {
  Object.defineProperty(document, 'visibilityState', { value, configurable: true });
};

const setFocus = (value: boolean): void => {
  document.hasFocus = (): boolean => value;
};

const dispatch = (type: string, init: EventInit = {}): void => {
  globalThis.dispatchEvent(new Event(type, init));
};

describe('page lifecycle', () => {
  afterEach(() => {
    resetPageLifecycle();
    setVisibility('visible');
    setFocus(true);
  });

  describe('readPageState', () => {
    it('reads a visible, focused page as active', () => {
      setVisibility('visible');
      setFocus(true);
      expect(readPageState()).toBe(PAGE_STATE_ACTIVE);
    });

    it('reads a visible, unfocused page as passive', () => {
      setVisibility('visible');
      setFocus(false);
      expect(readPageState()).toBe(PAGE_STATE_PASSIVE);
    });

    it('reads a hidden page as hidden', () => {
      setVisibility('hidden');
      setFocus(false);
      expect(readPageState()).toBe(PAGE_STATE_HIDDEN);
    });
  });

  describe('getPageState', () => {
    it('starts the observer and reports the current state', () => {
      setVisibility('visible');
      setFocus(true);
      expect(getPageState()).toBe(PAGE_STATE_ACTIVE);
    });
  });

  describe('onPageStateChange', () => {
    it('reports the state the page moved to and the one it left', () => {
      setFocus(true);
      startPageLifecycle();
      const seen: string[][] = [];
      onPageStateChange((state, previous) => {
        seen.push([state, previous]);
      });
      setVisibility('hidden');
      dispatch('visibilitychange');
      expect(seen).toStrictEqual([[PAGE_STATE_HIDDEN, PAGE_STATE_ACTIVE]]);
    });

    it('says nothing when the state has not moved', () => {
      setFocus(true);
      startPageLifecycle();
      const listener = vi.fn<(state: string, previous: string) => void>();
      onPageStateChange(listener);
      dispatch('visibilitychange');
      expect(listener).not.toHaveBeenCalled();
    });

    it('stops reporting once the listener is removed', () => {
      setFocus(true);
      startPageLifecycle();
      const listener = vi.fn<(state: string, previous: string) => void>();
      onPageStateChange(listener)();
      setVisibility('hidden');
      dispatch('visibilitychange');
      expect(listener).not.toHaveBeenCalled();
    });

    it('reports a freeze', () => {
      startPageLifecycle();
      const listener = vi.fn<(state: string, previous: string) => void>();
      onPageStateChange(listener);
      dispatch('freeze');
      expect(listener).toHaveBeenCalledWith(PAGE_STATE_FROZEN, PAGE_STATE_ACTIVE);
    });

    it('reports an unloading page as terminated', () => {
      startPageLifecycle();
      const listener = vi.fn<(state: string, previous: string) => void>();
      onPageStateChange(listener);
      globalThis.dispatchEvent(new Event('pagehide'));
      expect(listener).toHaveBeenCalledWith(PAGE_STATE_TERMINATED, PAGE_STATE_ACTIVE);
    });

    it('ignores focus events that came from an element rather than the page', () => {
      setFocus(true);
      startPageLifecycle();
      const listener = vi.fn<(state: string, previous: string) => void>();
      onPageStateChange(listener);
      const input = document.createElement('input');
      document.body.append(input);
      setFocus(false);
      input.dispatchEvent(new Event('blur', { bubbles: true }));
      expect(listener).not.toHaveBeenCalled();
      input.remove();
    });
  });

  describe('oncePageActive', () => {
    it('runs the callback the next time the page becomes active', () => {
      setFocus(false);
      setVisibility('hidden');
      startPageLifecycle();
      const callback = vi.fn<() => void>();
      oncePageActive(callback);
      setVisibility('visible');
      setFocus(true);
      dispatch('visibilitychange');
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('runs the callback only once', () => {
      setFocus(false);
      setVisibility('hidden');
      startPageLifecycle();
      const callback = vi.fn<() => void>();
      oncePageActive(callback);
      setVisibility('visible');
      setFocus(true);
      dispatch('visibilitychange');
      setVisibility('hidden');
      setFocus(false);
      dispatch('visibilitychange');
      setVisibility('visible');
      setFocus(true);
      dispatch('visibilitychange');
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('does not run the callback while the page stays hidden', () => {
      setFocus(false);
      setVisibility('hidden');
      startPageLifecycle();
      const callback = vi.fn<() => void>();
      oncePageActive(callback);
      dispatch('freeze');
      expect(callback).not.toHaveBeenCalled();
    });

    it('cancels a pending callback', () => {
      setFocus(false);
      setVisibility('hidden');
      startPageLifecycle();
      const callback = vi.fn<() => void>();
      oncePageActive(callback)();
      setVisibility('visible');
      setFocus(true);
      dispatch('visibilitychange');
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
