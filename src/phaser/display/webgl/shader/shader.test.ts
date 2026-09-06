import { describe, expect, it, vi } from 'vitest';
import { ComplexPrimitiveShader } from './complex.js';
import { FastShader } from './fast.js';
import { PrimitiveShader } from './primitive.js';
import { StripShader } from './strip.js';

type StubOptions = {
  linkStatus?: boolean;
  program?: object | null;
  attribLocations?: Record<string, number>;
};

const createStubGl = (options: StubOptions = {}) => {
  const { linkStatus = true, program = {}, attribLocations = {} } = options;
  const uniformLocations = new Map<string, object>();
  const deleteProgram = vi.fn();
  const useProgram = vi.fn();
  const gl = {
    VERTEX_SHADER: 1,
    FRAGMENT_SHADER: 2,
    COMPILE_STATUS: 3,
    LINK_STATUS: 4,
    createShader: vi.fn(() => ({})),
    shaderSource: vi.fn(),
    compileShader: vi.fn(),
    getShaderParameter: vi.fn((): boolean => true),
    getShaderInfoLog: vi.fn((): string => ''),
    createProgram: vi.fn((): object | null => program),
    attachShader: vi.fn(),
    linkProgram: vi.fn(),
    getProgramParameter: vi.fn((): boolean => linkStatus),
    getProgramInfoLog: vi.fn((): string => 'link failed'),
    useProgram,
    deleteProgram,
    getUniformLocation: vi.fn((_program: unknown, name: string): object | undefined => {
      if (!uniformLocations.has(name)) {
        uniformLocations.set(name, { name });
      }
      return uniformLocations.get(name);
    }),
    getAttribLocation: vi.fn((_program: unknown, name: string): number => attribLocations[name] ?? 0),
  } as unknown as WebGLRenderingContext;
  return { gl, deleteProgram, useProgram };
};

describe('WebGL shaders', (): void => {
  describe('PrimitiveShader', (): void => {
    it('resolves its uniforms and attributes on construction', (): void => {
      const { gl } = createStubGl({ attribLocations: { aVertexPosition: 0, aColor: 1 } });
      const shader = new PrimitiveShader(gl);
      expect(shader.program).not.toBeNull();
      expect(shader.projectionVector).toBeDefined();
      expect(shader.attributes).toStrictEqual([0, 1]);
    });

    it('releases the program on destroy', (): void => {
      const { gl, deleteProgram } = createStubGl();
      const shader = new PrimitiveShader(gl);
      shader.destroy();
      expect(deleteProgram).toHaveBeenCalledWith(shader.program);
      expect(shader.attributes).toBeNull();
      expect(shader.gl).toBeNull();
    });

    it('leaves the program null when compilation fails', (): void => {
      const { gl, useProgram } = createStubGl({ program: null });
      const shader = new PrimitiveShader(gl);
      expect(shader.program).toBeNull();
      expect(useProgram).not.toHaveBeenCalled();
    });

    it('destroys cleanly after a failed compile', (): void => {
      const { gl } = createStubGl({ program: null });
      const shader = new PrimitiveShader(gl);
      expect((): void => {
        shader.destroy();
      }).not.toThrow();
    });
  });

  describe('StripShader', (): void => {
    it('resolves its uniforms and attributes on construction', (): void => {
      const { gl } = createStubGl({
        attribLocations: { aVertexPosition: 0, aTextureCoord: 1, aColor: 2 },
      });
      const shader = new StripShader(gl);
      expect(shader.attributes).toStrictEqual([0, 1]);
      expect(shader.uSampler).toBeDefined();
      expect(shader.translationMatrix).toBeDefined();
    });

    it('clears its attributes on destroy', (): void => {
      const { gl } = createStubGl();
      const shader = new StripShader(gl);
      shader.destroy();
      expect(shader.attributes).toBeNull();
    });
  });

  describe('ComplexPrimitiveShader', (): void => {
    it('resolves the uniforms it declares', (): void => {
      const { gl } = createStubGl();
      const shader = new ComplexPrimitiveShader(gl);
      expect(shader.tintColor).toBeDefined();
      expect(shader.color).toBeDefined();
      expect(shader.flipY).toBeDefined();
    });

    it('leaves colorAttribute unresolved, as the shader never reads aColor', (): void => {
      const { gl } = createStubGl();
      const shader = new ComplexPrimitiveShader(gl);
      expect(shader.colorAttribute).toBeUndefined();
      expect(shader.attributes).toStrictEqual([0, undefined]);
    });
  });

  describe('FastShader', (): void => {
    it('resolves the full attribute set in batch order', (): void => {
      const { gl } = createStubGl({
        attribLocations: {
          aVertexPosition: 0,
          aPositionCoord: 1,
          aScale: 2,
          aRotation: 3,
          aTextureCoord: 4,
          aColor: 5,
        },
      });
      const shader = new FastShader(gl);
      expect(shader.attributes).toStrictEqual([0, 1, 2, 3, 4, 5]);
    });

    it('falls back to slot 2 when the driver reports aColor as -1', (): void => {
      const { gl } = createStubGl({ attribLocations: { aColor: -1 } });
      const shader = new FastShader(gl);
      expect(shader.colorAttribute).toBe(2);
    });

    it('releases the program and buffers on destroy', (): void => {
      const { gl, deleteProgram } = createStubGl();
      const shader = new FastShader(gl);
      shader.destroy();
      expect(deleteProgram).toHaveBeenCalled();
      expect(shader.gl).toBeNull();
      expect(shader.attributes).toBeNull();
    });
  });
});
