export class WebGLFilterManager {
  /**
   *
   */
  constructor() {
    this.filterStack = [];
    this.offsetX = 0;
    this.offsetY = 0;
  }

  /**
   *
   * @param gl
   */
  setContext(gl) {
    this.gl = gl;
    this.texturePool = [];
    this.initShaderBuffers();
  }

  /**
   *
   */
  begin() {
    // TODO
  }

  /**
   *
   */
  pushFilter() {
    // TODO
  }

  /**
   *
   */
  popFilter() {
    // TODO
  }

  /**
   *
   */
  applyFilterPass() {
    // TODO
  }

  /**
   *
   */
  initShaderBuffers() {
    // TODO
  }

  /**
   *
   */
  destroy() {
    // TODO
  }
}
