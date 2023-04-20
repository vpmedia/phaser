export class WebGLFilterManager {
  /**
   * TBD.
   */
  constructor() {
    this.filterStack = [];
    this.offsetX = 0;
    this.offsetY = 0;
  }

  /**
   * TBD.
   * @param gl
   */
  setContext(gl) {
    this.gl = gl;
    this.texturePool = [];
    this.initShaderBuffers();
  }

  /**
   * TBD.
   */
  begin() {
    // TODO
  }

  /**
   * TBD.
   */
  pushFilter() {
    // TODO
  }

  /**
   * TBD.
   */
  popFilter() {
    // TODO
  }

  /**
   * TBD.
   */
  applyFilterPass() {
    // TODO
  }

  /**
   * TBD.
   */
  initShaderBuffers() {
    // TODO
  }

  /**
   * TBD.
   */
  destroy() {
    // TODO
  }
}
