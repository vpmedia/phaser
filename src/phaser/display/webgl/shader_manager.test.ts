import { describe, expect, it, vi } from 'vitest';
import type { NormalShader } from './shader/normal.js';
import type { IdentifiedWebGLRenderingContext } from './util.js';
import { WebGLShaderManager } from './shader_manager.js';

const createGlMocks = () => ({
  enableVertexAttribArray: vi.fn(),
  disableVertexAttribArray: vi.fn(),
  useProgram: vi.fn(),
});

type GlMocks = ReturnType<typeof createGlMocks>;

const createManager = (): { manager: WebGLShaderManager; gl: GlMocks } => {
  const gl = createGlMocks();
  const manager = new WebGLShaderManager();
  manager.gl = { id: 0, ...gl } as unknown as IdentifiedWebGLRenderingContext;
  return { manager, gl };
};

const shaderStub = (uid: string, attributes: number[]): NormalShader =>
  ({ _UID: uid, program: {}, attributes }) as unknown as NormalShader;

describe('WebGLShaderManager', (): void => {
  describe('constructor', (): void => {
    it('starts with ten disabled attribute slots', (): void => {
      const manager = new WebGLShaderManager();
      expect(manager.attribState).toHaveLength(10);
      expect(manager.attribState.every((enabled): boolean => enabled === false)).toBe(true);
    });
  });

  describe('setAttribs', (): void => {
    it('enables exactly the requested attribute slots', (): void => {
      const { manager, gl } = createManager();
      manager.setAttribs([0, 2]);
      expect(gl.enableVertexAttribArray).toHaveBeenCalledTimes(2);
      expect(gl.enableVertexAttribArray).toHaveBeenCalledWith(0);
      expect(gl.enableVertexAttribArray).toHaveBeenCalledWith(2);
    });

    it('only touches slots whose state actually changed', (): void => {
      const { manager, gl } = createManager();
      manager.setAttribs([0, 1]);
      vi.clearAllMocks();
      manager.setAttribs([0, 1]);
      expect(gl.enableVertexAttribArray).not.toHaveBeenCalled();
      expect(gl.disableVertexAttribArray).not.toHaveBeenCalled();
    });

    it('disables slots dropped between calls', (): void => {
      const { manager, gl } = createManager();
      manager.setAttribs([0, 1, 2]);
      vi.clearAllMocks();
      manager.setAttribs([0]);
      expect(gl.disableVertexAttribArray).toHaveBeenCalledWith(1);
      expect(gl.disableVertexAttribArray).toHaveBeenCalledWith(2);
      expect(gl.enableVertexAttribArray).not.toHaveBeenCalled();
    });

    it('mirrors the sparse temp state, leaving untouched slots unset', (): void => {
      const { manager } = createManager();
      manager.setAttribs([1, 3]);
      expect(manager.attribState.slice(0, 4)).toStrictEqual([undefined, true, undefined, true]);
    });

    it('disables the previously enabled slots when given no attributes', (): void => {
      const { manager, gl } = createManager();
      manager.setAttribs([0, 1]);
      vi.clearAllMocks();
      manager.setAttribs([]);
      expect(gl.disableVertexAttribArray).toHaveBeenCalledWith(0);
      expect(gl.disableVertexAttribArray).toHaveBeenCalledWith(1);
      expect(manager.attribState[0]).toBe(false);
      expect(manager.attribState[1]).toBe(false);
    });
  });

  describe('setShader', (): void => {
    it('binds a new shader and reports that it switched', (): void => {
      const { manager, gl } = createManager();
      const shader = shaderStub('a', [0, 1]);
      expect(manager.setShader(shader)).toBe(true);
      expect(manager.currentShader).toBe(shader);
      expect(gl.useProgram).toHaveBeenCalledWith(shader.program);
    });

    it('skips rebinding the shader already in use', (): void => {
      const { manager, gl } = createManager();
      const shader = shaderStub('a', [0, 1]);
      manager.setShader(shader);
      vi.clearAllMocks();
      expect(manager.setShader(shader)).toBe(false);
      expect(gl.useProgram).not.toHaveBeenCalled();
    });

    it('rebinds when a different shader is supplied', (): void => {
      const { manager } = createManager();
      manager.setShader(shaderStub('a', [0]));
      const next = shaderStub('b', [0, 1]);
      expect(manager.setShader(next)).toBe(true);
      expect(manager.currentShader).toBe(next);
    });
  });

  describe('destroy', (): void => {
    it('clears attribute state and forgets the current shader', (): void => {
      const { manager } = createManager();
      manager.setShader(shaderStub('a', [0]));
      manager.destroy();
      expect(manager.attribState).toStrictEqual([]);
      expect(manager.tempAttribState).toStrictEqual([]);
      expect(manager.currentShader).toBeNull();
      expect(manager._currentId).toBeNull();
    });

    it('tolerates shaders that were never created', (): void => {
      const { manager } = createManager();
      expect((): void => {
        manager.destroy();
      }).not.toThrow();
    });
  });
});
