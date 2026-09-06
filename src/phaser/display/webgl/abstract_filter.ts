export class AbstractFilter {
  [key: string]: any;
  public passes!: any;
  public shaders!: any;
  public dirty!: any;
  public padding!: any;
  public uniforms!: any;
  public fragmentSrc!: any;
  /**
   * Creates a new AbstractFilter instance.
   * @param {string[]} fragmentSrc - The fragment shader source.
   * @param {object} uniforms - The uniform variables for the shader.
   */
  public constructor(fragmentSrc: string[], uniforms?: any) {
    this.passes = [this];
    this.shaders = [];
    this.dirty = true;
    this.padding = 0;
    this.uniforms = uniforms ?? {};
    this.fragmentSrc = fragmentSrc || [];
  }

  /**
   * Initializes the filter.
   */
  public syncUniforms(): void {
    for (let i = 0, j = this.shaders.length; i < j; i += 1) {
      this.shaders[i].dirty = true;
    }
  }
}
