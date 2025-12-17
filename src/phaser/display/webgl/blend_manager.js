export class WebGLBlendModeManager {
  /**
   * Creates a new BlendModeManager instance.
   */
  constructor() {
    this.gl = null;
    this.currentBlendMode = 99999;
  }

  /**
   * Initializes the blend mode manager with a WebGL context.
   * @param {WebGLRenderingContext} gl - The WebGL rendering context.
   */
  setContext(gl) {
    this.gl = gl;
  }

  /**
   * Sets the blend mode for the specified WebGL context.
   * @param {number} blendMode - The blend mode to set.
   * @returns {boolean} True if the blend mode was set successfully, false otherwise.
   */
  setBlendMode(blendMode) {
    if (this.currentBlendMode === blendMode) {
      return false;
    }
    this.currentBlendMode = blendMode;
    const blendModeWebGL = window.PhaserRegistry.blendModesWebGL[this.currentBlendMode];
    if (blendModeWebGL) {
      this.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
    }
    return true;
  }

  /**
   * Sets the blend mode for the WebGL context.
   */
  destroy() {
    this.gl = null;
  }
}
