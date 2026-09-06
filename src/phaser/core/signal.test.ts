import { expect, describe, it } from 'vitest';
import { Signal } from './signal.js';

describe('Signal', (): void => {
  describe('core', (): void => {
    it('adds, dispatches to and removes listeners', (): void => {
      const signal = new Signal();
      const listener = (arg: number): void => {
        expect(arg).toBe(1);
      };
      const listenerOnce = (arg: number): void => {
        expect(arg).toBe(1);
      };
      signal.add(listener);
      expect(signal.getNumListeners()).toBe(1);
      signal.addOnce(listenerOnce);
      expect(signal.getNumListeners()).toBe(2);
      signal.dispatch(1);
      expect(signal.getNumListeners()).toBe(1);
      signal.remove(listener);
      expect(signal.has(listener)).toBe(false);
      expect(signal.getNumListeners()).toBe(0);
      expect(signal.has((): null => null)).toBe(false);
    });

    it('async', async (): Promise<void> => {
      const signal = new Signal();
      const promise = signal.toPromise();
      expect(signal.getNumListeners()).toBe(1);
      setTimeout((): void => {
        signal.dispatch(1);
      }, 10);
      const result = await promise;
      expect(result).toBe(1);
    });
  });
});
