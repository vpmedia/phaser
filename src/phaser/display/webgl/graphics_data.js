export class GraphicsData {
  /**
   * TBD.
   * @param {WebGLRenderingContext & { id: number }} gl - TBD.
   */
  constructor(gl) {
    this.gl = gl;
    // TODO does this need to be split before uploading??
    this.color = [0, 0, 0]; // color split!
    this.points = [];
    this.indices = [];
    this.buffer = gl.createBuffer();
    this.indexBuffer = gl.createBuffer();
    this.mode = 1;
    this.alpha = 1;
    this.dirty = true;
  }

  /**
   * TBD.
   */
  reset() {
    this.points = [];
    this.indices = [];
    this.glPoints = null;
    this.glIndicies = null;
  }

  /**
   * TBD.
   */
  upload() {
    const gl = this.gl;
    // this.lastIndex = graphics.graphicsData.length;
    this.glPoints = new Float32Array(this.points);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.glPoints, gl.STATIC_DRAW);
    this.glIndicies = new Uint16Array(this.indices);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.glIndicies, gl.STATIC_DRAW);
    this.dirty = false;
  }
}
