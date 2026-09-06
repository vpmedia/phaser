import { beforeEach, describe, expect, it } from 'vitest';
import { getRegistry } from './registry.js';

describe('getRegistry', (): void => {
  beforeEach((): void => {
    // @ts-expect-error the registry is created on demand, so tests may clear it
    delete globalThis.PhaserRegistry;
  });

  it('creates the registry on first access', (): void => {
    expect(globalThis.PhaserRegistry).toBeUndefined();
    expect(getRegistry()).toBeDefined();
    expect(globalThis.PhaserRegistry).toBeDefined();
  });

  it('returns the same object on repeat access', (): void => {
    expect(getRegistry()).toBe(getRegistry());
  });

  it('preserves members written by subsystems', (): void => {
    getRegistry().GL_CONTEXT_ID = 7;
    expect(getRegistry().GL_CONTEXT_ID).toBe(7);
  });

  it('does not clobber a registry that already exists', (): void => {
    const existing = getRegistry();
    existing.stencilBufferLimit = 3;
    expect(getRegistry()).toBe(existing);
    expect(getRegistry().stencilBufferLimit).toBe(3);
  });
});
