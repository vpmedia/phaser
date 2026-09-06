import { ComplexPrimitiveShader } from './shader/complex.js';
import { FastShader } from './shader/fast.js';
import { NormalShader } from './shader/normal.js';
import { PrimitiveShader } from './shader/primitive.js';
import { StripShader } from './shader/strip.js';
import type { IdentifiedWebGLRenderingContext } from './util.js';

/** The structural subset of a shader that the manager binds. */
export type ManagedShader = {
  _UID: string;
  program: WebGLProgram | null;
  attributes: (number | undefined)[] | null;
};

export class WebGLShaderManager {
  public gl!: IdentifiedWebGLRenderingContext;
  public primitiveShader: PrimitiveShader | null = null;
  public complexPrimitiveShader: ComplexPrimitiveShader | null = null;
  public defaultShader: NormalShader | null = null;
  public fastShader: FastShader | null = null;
  public stripShader: StripShader | null = null;
  public maxAttibs = 10;
  public attribState: (boolean | undefined)[];
  public tempAttribState: (boolean | undefined)[];
  public stack: ManagedShader[];
  public currentShader: ManagedShader | null = null;
  public _currentId: string | null = null;
  /**
   * Initializes the shader manager with a WebGL context.
   */
  public constructor() {
    this.attribState = [];
    this.tempAttribState = [];
    for (let i = 0; i < this.maxAttibs; i += 1) {
      this.attribState[i] = false;
    }
    this.stack = [];
  }

  /**
   * Initializes the shader manager with a WebGL context.
   * @param {WebGLRenderingContext & { id: number }} gl - The WebGL rendering context.
   */
  public setContext(gl: IdentifiedWebGLRenderingContext): void {
    this.gl = gl;
    this.primitiveShader = new PrimitiveShader(gl);
    this.complexPrimitiveShader = new ComplexPrimitiveShader(gl);
    this.defaultShader = new NormalShader(gl);
    this.fastShader = new FastShader(gl);
    this.stripShader = new StripShader(gl);
    this.setShader(this.defaultShader);
  }

  /**
   * Sets up the shader manager for WebGL rendering.
   * @param {number[]} attribs - The attribute locations to set up.
   */
  public setAttribs(attribs: (number | undefined)[]): void {
    // reset temp state
    let i;
    for (i = 0; i < this.tempAttribState.length; i += 1) {
      this.tempAttribState[i] = false;
    }
    // set the new attribs
    for (const attribId of attribs) {
      if (attribId !== undefined) {
        this.tempAttribState[attribId] = true;
      }
    }
    const { gl } = this;
    for (i = 0; i < this.attribState.length; i += 1) {
      if (this.attribState[i] !== this.tempAttribState[i]) {
        this.attribState[i] = this.tempAttribState[i];
        if (this.tempAttribState[i] === true) {
          gl.enableVertexAttribArray(i);
        } else {
          gl.disableVertexAttribArray(i);
        }
      }
    }
  }

  /**
   * Sets up the shader manager for WebGL rendering.
   * @param {NormalShader} shader - The shader to set up.
   * @returns {boolean} Whether the shader setup was successful.
   */
  public setShader(shader: ManagedShader): boolean {
    if (this._currentId === shader._UID) {
      return false;
    }
    this._currentId = shader._UID;
    this.currentShader = shader;
    this.gl.useProgram(shader.program);
    this.setAttribs(shader.attributes ?? []);
    return true;
  }

  /**
   * Destroys the manager.
   */
  public destroy(): void {
    this.attribState = [];
    this.tempAttribState = [];
    this.currentShader = null;
    this._currentId = null;
    this.primitiveShader?.destroy();
    this.complexPrimitiveShader?.destroy();
    this.defaultShader?.destroy();
    this.fastShader?.destroy();
    this.stripShader?.destroy();
  }
}
