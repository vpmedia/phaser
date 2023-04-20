export class WebGLBlendModeManager {
  /**
   * TBD.
   */
  constructor() {
    this.gl = null;
    this.currentBlendMode = 99999;
  }

  /**
   * TBD.
   * @param gl
   */
  setContext(gl) {
    this.gl = gl;
  }

  /**
   * TBD.
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
   * TBD.
   */
  destroy() {
    this.gl = null;
  }
}
