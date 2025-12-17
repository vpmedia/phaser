export class AbstractFilter {
  /**
   * Creates a new AbstractFilter instance.
   * @param {string[]} fragmentSrc - The fragment shader source.
   * @param {object} uniforms - The uniform variables for the shader.
   */
  constructor(fragmentSrc, uniforms) {
    this.passes = [this];
    this.shaders = [];
    this.dirty = true;
    this.padding = 0;
    this.uniforms = uniforms || {};
    this.fragmentSrc = fragmentSrc || [];
  }

  /**
   * Initializes the filter.
   */
  syncUniforms() {
    for (let i = 0, j = this.shaders.length; i < j; i += 1) {
      this.shaders[i].dirty = true;
    }
  }
}
