/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */

export default class {
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

  reset() {
    this.points = [];
    this.indices = [];
    this.glPoints = null;
    this.glIndicies = null;
  }

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
