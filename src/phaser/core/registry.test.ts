import { beforeEach, describe, expect, it } from 'vitest';
import { getRegistry } from './registry.js';

describe('getRegistry', () => {
  beforeEach(() => {
    // @ts-expect-error the registry is created on demand, so tests may clear it
    delete globalThis.PhaserRegistry;
  });

  it('creates the registry on first access', () => {
    expect(globalThis.PhaserRegistry).toBeUndefined();
    expect(getRegistry()).toBeDefined();
    expect(globalThis.PhaserRegistry).toBeDefined();
  });

  it('returns the same object on repeat access', () => {
    expect(getRegistry()).toBe(getRegistry());
  });

  it('preserves members written by subsystems', () => {
    getRegistry().GL_CONTEXT_ID = 7;
    expect(getRegistry().GL_CONTEXT_ID).toBe(7);
  });

  it('does not clobber a registry that already exists', () => {
    const existing = getRegistry();
    existing.stencilBufferLimit = 3;
    expect(getRegistry()).toBe(existing);
    expect(getRegistry().stencilBufferLimit).toBe(3);
  });
});
