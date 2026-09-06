import { v4 as uuidv4 } from 'uuid';
import type { NormalShader } from './shader/normal.js';

/** A shader uniform: its GLSL type and the value bound to it. */
export type ShaderUniform = {
  type: string;
  value: unknown;
};

export class AbstractFilter {
  public _UID: string;
  public passes: AbstractFilter[];
  public shaders: NormalShader[];
  public dirty: boolean;
  public padding: number;
  public uniforms: Record<string, ShaderUniform>;
  public fragmentSrc: string[];
  /**
   * Creates a new AbstractFilter instance.
   * @param {string[]} fragmentSrc - The fragment shader source.
   * @param {object} uniforms - The uniform variables for the shader.
   */
  public constructor(fragmentSrc: string[], uniforms?: Record<string, ShaderUniform>) {
    this._UID = uuidv4();
    this.passes = [this];
    this.shaders = [];
    this.dirty = true;
    this.padding = 0;
    this.uniforms = uniforms ?? {};
    this.fragmentSrc = fragmentSrc;
  }

  /**
   * Initializes the filter.
   */
  public syncUniforms(): void {
    for (const shader of this.shaders) {
      shader.dirty = true;
    }
  }
}
