import { describe, expect, it, vi } from 'vitest';
import { Signal } from './signal.js';

/**
 * Callers register callbacks with `this` as the receiver, so every callback-taking API has to
 * accept an arbitrary object as its context. Narrowing one of these to a concrete type compiles
 * inside the engine and only breaks at the call site, so these tests pass a class instance the way
 * a consumer would.
 */
class Consumer {
  public seen: unknown = null;

  public handler(value: unknown): void {
    this.seen = value;
  }
}

describe('callback contexts', (): void => {
  describe('Signal', (): void => {
    it('accepts an arbitrary receiver on add', (): void => {
      const signal = new Signal();
      const consumer = new Consumer();
      signal.add(consumer.handler, consumer);
      signal.dispatch('payload');
      expect(consumer.seen).toBe('payload');
    });

    it('accepts an arbitrary receiver on addOnce', (): void => {
      const signal = new Signal();
      const consumer = new Consumer();
      signal.addOnce(consumer.handler, consumer);
      signal.dispatch('once');
      expect(consumer.seen).toBe('once');
    });

    it('matches the receiver on remove', (): void => {
      const signal = new Signal();
      const consumer = new Consumer();
      signal.add(consumer.handler, consumer);
      signal.remove(consumer.handler, consumer);
      expect(signal.getNumListeners()).toBe(0);
    });

    it('matches the receiver on removeAll', (): void => {
      const signal = new Signal();
      const consumer = new Consumer();
      signal.add(consumer.handler, consumer);
      signal.add(vi.fn(), new Consumer());
      signal.removeAll(consumer);
      expect(signal.getNumListeners()).toBe(1);
    });

    it('reports whether a listener is bound to a receiver', (): void => {
      const signal = new Signal();
      const consumer = new Consumer();
      signal.add(consumer.handler, consumer);
      expect(signal.has(consumer.handler, consumer)).toBe(true);
      expect(signal.has(consumer.handler, new Consumer())).toBe(false);
    });

    it('keeps separate bindings per receiver', (): void => {
      const signal = new Signal();
      const first = new Consumer();
      const second = new Consumer();
      signal.add(first.handler, first);
      signal.add(first.handler, second);
      expect(signal.getNumListeners()).toBe(2);
    });
  });
});
