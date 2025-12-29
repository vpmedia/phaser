import { expect } from 'vitest';
import { Signal } from './signal.js';

describe('Signal', () => {
  describe('core', () => {
    it('', () => {
      const signal = new Signal();
      const listener = (arg) => {
        expect(arg).toBe(1);
      };
      const listenerOnce = (arg) => {
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
      expect(signal.has(() => null)).toBe(false);
    });

    it('async', async () => {
      const signal = new Signal();
      const promise = signal.toPromise();
      expect(signal.getNumListeners()).toBe(1);
      setTimeout(() => {
        signal.dispatch(1);
      }, 10);
      const result = await promise;
      expect(result).toBe(1);
    });
  });
});
