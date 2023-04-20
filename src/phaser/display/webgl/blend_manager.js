export class WebGLBlendModeManager {
  /**
   *
   */
  constructor() {
    this.gl = null;
    this.currentBlendMode = 99999;
  }

  /**
   *
   * @param gl
   */
  setContext(gl) {
    this.gl = gl;
  }

  /**
   *
   * @param blendMode
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
   *
   */
  destroy() {
    this.gl = null;
  }
}
