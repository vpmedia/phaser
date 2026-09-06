export class GraphicsData {
  public glPoints!: Float32Array | null;
  public glIndicies!: Uint16Array | null;
  public gl: WebGLRenderingContext;
  public color: number[];
  public points: number[];
  public indices: number[];
  public buffer: WebGLBuffer | null;
  public indexBuffer: WebGLBuffer | null;
  public mode: number;
  public alpha: number;
  public dirty: boolean;
  /**
   * Creates a new GraphicsData instance.
   * @param {WebGLRenderingContext} gl - The WebGL rendering context.
   */
  public constructor(gl: WebGLRenderingContext) {
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
   * Destroys this graphics data and cleans up resources.
   */
  public reset(): void {
    this.points = [];
    this.indices = [];
    this.glPoints = null;
    this.glIndicies = null;
  }

  /**
   * Updates the graphics data for WebGL rendering.
   */
  public upload(): void {
    const { gl } = this;
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
