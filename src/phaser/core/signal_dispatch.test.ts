import { describe, expect, it, vi } from 'vitest';
import { Signal } from './signal.js';

describe('Signal binding management', () => {
  describe('add', () => {
    it('registers a listener and reports it', () => {
      const signal = new Signal();
      const listener = vi.fn();
      signal.add(listener);
      expect(signal.getNumListeners()).toBe(1);
      expect(signal.has(listener)).toBe(true);
    });

    it('returns the existing binding when the same listener is added twice', () => {
      const signal = new Signal();
      const listener = vi.fn();
      const first = signal.add(listener);
      const second = signal.add(listener);
      expect(second).toBe(first);
      expect(signal.getNumListeners()).toBe(1);
    });

    it('treats the same listener under a different context as a separate binding', () => {
      const signal = new Signal();
      const listener = vi.fn();
      signal.add(listener, { id: 1 });
      signal.add(listener, { id: 2 });
      expect(signal.getNumListeners()).toBe(2);
    });

    it('refuses to switch a listener between add and addOnce', () => {
      const signal = new Signal();
      const listener = vi.fn();
      signal.add(listener);
      expect(() => signal.addOnce(listener)).toThrow(/without removing the relationship first/);
    });
  });

  describe('dispatch', () => {
    it('calls listeners in priority order, highest first', () => {
      const signal = new Signal();
      const order: string[] = [];
      signal.add(() => order.push('low'), null, 0);
      signal.add(() => order.push('high'), null, 10);
      signal.add(() => order.push('mid'), null, 5);
      signal.dispatch();
      expect(order).toStrictEqual(['high', 'mid', 'low']);
    });

    it('forwards its arguments', () => {
      const signal = new Signal();
      const listener = vi.fn();
      signal.add(listener);
      signal.dispatch(1, 'two');
      expect(listener).toHaveBeenCalledWith(1, 'two');
    });

    it('removes an addOnce listener after it fires', () => {
      const signal = new Signal();
      const listener = vi.fn();
      signal.addOnce(listener);
      signal.dispatch();
      signal.dispatch();
      expect(listener).toHaveBeenCalledTimes(1);
      expect(signal.getNumListeners()).toBe(0);
    });

    it('stops propagating once a listener returns false', () => {
      const signal = new Signal();
      const later = vi.fn();
      signal.add(() => false, null, 10);
      signal.add(later, null, 0);
      signal.dispatch();
      expect(later).not.toHaveBeenCalled();
    });

    it('stops propagating once halt is called', () => {
      const signal = new Signal();
      const later = vi.fn();
      signal.add(
        () => {
          signal.halt();
        },
        null,
        10
      );
      signal.add(later, null, 0);
      signal.dispatch();
      expect(later).not.toHaveBeenCalled();
    });

    it('survives a listener that removes every listener mid-dispatch', () => {
      const signal = new Signal();
      const later = vi.fn();
      signal.add(
        () => {
          signal.removeAll();
        },
        null,
        10
      );
      signal.add(later, null, 0);
      expect(() => {
        signal.dispatch();
      }).not.toThrow();
    });
  });

  describe('remove', () => {
    it('drops the matching binding', () => {
      const signal = new Signal();
      const listener = vi.fn();
      const other = vi.fn();
      signal.add(listener);
      signal.add(other);
      signal.remove(listener);
      expect(signal.getNumListeners()).toBe(1);
      expect(signal.has(listener)).toBe(false);
      expect(signal.has(other)).toBe(true);
    });

    it('leaves the list alone for an unregistered listener', () => {
      const signal = new Signal();
      signal.add(vi.fn());
      signal.remove(vi.fn());
      expect(signal.getNumListeners()).toBe(1);
    });
  });

  describe('removeAll', () => {
    it('clears every listener when given no context', () => {
      const signal = new Signal();
      signal.add(vi.fn(), { id: 1 });
      signal.add(vi.fn(), { id: 2 });
      signal.removeAll();
      expect(signal.getNumListeners()).toBe(0);
    });

    it('clears only the listeners bound to the given context', () => {
      const signal = new Signal();
      const context = { id: 1 };
      signal.add(vi.fn(), context);
      signal.add(vi.fn(), { id: 2 });
      signal.removeAll(context);
      expect(signal.getNumListeners()).toBe(1);
    });
  });

  describe('memorize', () => {
    it('replays the last dispatch to a listener added afterwards', () => {
      const signal = new Signal();
      signal.memorize = true;
      signal.add(vi.fn());
      signal.dispatch('remembered');
      const listener = vi.fn();
      signal.add(listener);
      expect(listener).toHaveBeenCalledWith('remembered');
    });

    it('records nothing while the signal has never had a binding', () => {
      const signal = new Signal();
      signal.memorize = true;
      signal.dispatch('dropped');
      const listener = vi.fn();
      signal.add(listener);
      expect(listener).not.toHaveBeenCalled();
    });

    it('stops replaying once forgotten', () => {
      const signal = new Signal();
      signal.memorize = true;
      signal.add(vi.fn());
      signal.dispatch('remembered');
      signal.forget();
      const listener = vi.fn();
      signal.add(listener);
      expect(listener).not.toHaveBeenCalled();
    });
  });
});
