export class AbstractFilter {
  /**
   * TBD.
   * @param {string[]} fragmentSrc - TBD.
   * @param {object} uniforms - TBD.
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
   * TBD.
   */
  syncUniforms() {
    for (let i = 0, j = this.shaders.length; i < j; i += 1) {
      this.shaders[i].dirty = true;
    }
  }
}
