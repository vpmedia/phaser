export class WebGLBlendModeManager {
  [key: string]: any;
  public gl: any = null;
  public currentBlendMode: any = 99_999;
  /**
   * Creates a new BlendModeManager instance.
   */

  /**
   * Initializes the blend mode manager with a WebGL context.
   * @param {WebGLRenderingContext} gl - The WebGL rendering context.
   */
  public setContext(gl: WebGLRenderingContext): void {
    this.gl = gl;
  }

  /**
   * Sets the blend mode for the specified WebGL context.
   * @param {number} blendMode - The blend mode to set.
   * @returns {boolean} True if the blend mode was set successfully, false otherwise.
   */
  public setBlendMode(blendMode: number): boolean {
    if (this.currentBlendMode === blendMode) {
      return false;
    }
    this.currentBlendMode = blendMode;
    const blendModeWebGL = globalThis.PhaserRegistry.blendModesWebGL[this.currentBlendMode];
    if (blendModeWebGL) {
      this.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
    }
    return true;
  }

  /**
   * Sets the blend mode for the WebGL context.
   */
  public destroy(): void {
    this.gl = null;
  }
}
