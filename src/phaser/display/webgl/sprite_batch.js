/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import AbstractFilter from './abstract_filter';
import NormalShader from './shader/normal';

// TODO: fix ++ +=1 conversion issues (when a is 0 than a++ is 0 but a+=1 is 1)

export default class {

  constructor() {
    this.vertSize = 5;
    this.size = 2000; // Math.pow(2, 16) /  this.vertSize;
    // the total number of bytes in our batch
    const numVerts = this.size * 4 * 4 * this.vertSize;
    // the total number of indices in our batch
    const numIndices = this.size * 6;
    this.vertices = new ArrayBuffer(numVerts);
    this.positions = new Float32Array(this.vertices);
    this.colors = new Uint32Array(this.vertices);
    this.indices = new Uint16Array(numIndices);
    this.lastIndexCount = 0;
    for (let i = 0, j = 0; i < numIndices; i += 6, j += 4) {
      this.indices[i + 0] = j + 0;
      this.indices[i + 1] = j + 1;
      this.indices[i + 2] = j + 2;
      this.indices[i + 3] = j + 0;
      this.indices[i + 4] = j + 2;
      this.indices[i + 5] = j + 3;
    }
    this.drawing = false;
    this.currentBatchSize = 0;
    this.currentBaseTexture = null;
    this.dirty = true;
    this.textures = [];
    this.blendModes = [];
    this.shaders = [];
    this.sprites = [];
    this.defaultShader = new AbstractFilter([
      'precision lowp float;',
      'varying vec2 vTextureCoord;',
      'varying vec4 vColor;',
      'uniform sampler2D uSampler;',
      'void main(void) {',
      '   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;',
      '}',
    ]);
  }

  setContext(gl) {
    this.gl = gl;
    // create a couple of buffers
    this.vertexBuffer = gl.createBuffer();
    this.indexBuffer = gl.createBuffer();
    // 65535 is max index, so 65535 / 6 = 10922.
    // upload the index data
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
    this.currentBlendMode = 99999;
    const shader = new NormalShader(gl);
    shader.fragmentSrc = this.defaultShader.fragmentSrc;
    shader.uniforms = {};
    shader.init();
    this.defaultShader.shaders[gl.id] = shader;
  }

  begin(renderSession) {
    this.renderSession = renderSession;
    this.shader = this.renderSession.shaderManager.defaultShader;
    this.start();
  }

  end() {
    this.flush();
  }

  render(sprite, matrix) {
    const texture = sprite.texture;
    //  They provided an alternative rendering matrix, so use it
    let wt = sprite.worldTransform;
    if (matrix) {
      wt = matrix;
    }
    // check texture..
    if (this.currentBatchSize >= this.size) {
      this.flush();
      this.currentBaseTexture = texture.baseTexture;
    }
    // get the uvs for the texture
    const uvs = texture._uvs;
    // if the uvs have not updated then no point rendering just yet!
    if (!uvs) {
      return;
    }
    const aX = sprite.anchor.x;
    const aY = sprite.anchor.y;
    let w0;
    let w1;
    let h0;
    let h1;
    if (texture.trim) {
      // if the sprite is trimmed then we need to add the extra space before transforming the sprite coords.
      const trim = texture.trim;
      w1 = trim.x - aX * trim.width;
      w0 = w1 + texture.crop.width;
      h1 = trim.y - aY * trim.height;
      h0 = h1 + texture.crop.height;
    } else {
      w0 = (texture.frame.width) * (1 - aX);
      w1 = (texture.frame.width) * -aX;
      h0 = texture.frame.height * (1 - aY);
      h1 = texture.frame.height * -aY;
    }
    const i = this.currentBatchSize * 4 * this.vertSize;
    const resolution = texture.baseTexture.resolution;
    const a = wt.a / resolution;
    const b = wt.b / resolution;
    const c = wt.c / resolution;
    const d = wt.d / resolution;
    const tx = wt.tx;
    const ty = wt.ty;
    const colors = this.colors;
    const positions = this.positions;
    if (this.renderSession.roundPixels) {
      // xy
      positions[i] = a * w1 + c * h1 + tx | 0;
      positions[i + 1] = d * h1 + b * w1 + ty | 0;
      // xy
      positions[i + 5] = a * w0 + c * h1 + tx | 0;
      positions[i + 6] = d * h1 + b * w0 + ty | 0;
      // xy
      positions[i + 10] = a * w0 + c * h0 + tx | 0;
      positions[i + 11] = d * h0 + b * w0 + ty | 0;
      // xy
      positions[i + 15] = a * w1 + c * h0 + tx | 0;
      positions[i + 16] = d * h0 + b * w1 + ty | 0;
    } else {
      // xy
      positions[i] = a * w1 + c * h1 + tx;
      positions[i + 1] = d * h1 + b * w1 + ty;
      // xy
      positions[i + 5] = a * w0 + c * h1 + tx;
      positions[i + 6] = d * h1 + b * w0 + ty;
      // xy
      positions[i + 10] = a * w0 + c * h0 + tx;
      positions[i + 11] = d * h0 + b * w0 + ty;
      // xy
      positions[i + 15] = a * w1 + c * h0 + tx;
      positions[i + 16] = d * h0 + b * w1 + ty;
    }
    // uv
    positions[i + 2] = uvs.x0;
    positions[i + 3] = uvs.y0;
    // uv
    positions[i + 7] = uvs.x1;
    positions[i + 8] = uvs.y1;
    // uv
    positions[i + 12] = uvs.x2;
    positions[i + 13] = uvs.y2;
    // uv
    positions[i + 17] = uvs.x3;
    positions[i + 18] = uvs.y3;
    // color and alpha
    const tint = sprite.tint;
    colors[i + 4] = (tint >> 16) + (tint & 0xff00) + ((tint & 0xff) << 16) + (sprite.worldAlpha * 255 << 24);
    colors[i + 9] = colors[i + 4];
    colors[i + 14] = colors[i + 4];
    colors[i + 19] = colors[i + 4];
    // increment the batchsize
    this.sprites[this.currentBatchSize] = sprite;
    this.currentBatchSize += 1;
  }

  renderTilingSprite() {
    // TODO
  }

  flush() {
    // If the batch is length 0 then return as there is nothing to draw
    if (this.currentBatchSize === 0) {
      return;
    }
    const gl = this.gl;
    let shader;
    if (this.dirty) {
      this.dirty = false;
      // bind the main texture
      gl.activeTexture(gl.TEXTURE0);
      // bind the buffers
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      shader = this.defaultShader.shaders[gl.id];
      // this is the same for each shader?
      const stride = this.vertSize * 4;
      gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, stride, 0);
      gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, stride, 2 * 4);
      // color attributes will be interpreted as unsigned bytes and normalized
      gl.vertexAttribPointer(shader.colorAttribute, 4, gl.UNSIGNED_BYTE, true, stride, 4 * 4);
    }
    // upload the verts to the buffer
    if (this.currentBatchSize > (this.size * 0.5)) {
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertices);
    } else {
      const view = this.positions.subarray(0, this.currentBatchSize * 4 * this.vertSize);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
    }
    let nextTexture;
    let nextBlendMode;
    let nextShader;
    let batchSize = 0;
    let start = 0;
    let currentBaseTexture = null;
    let currentBlendMode = this.renderSession.blendModeManager.currentBlendMode;
    let currentShader = null;
    let blendSwap = false;
    let shaderSwap = false;
    let sprite;
    for (let i = 0, j = this.currentBatchSize; i < j; i += 1) {
      sprite = this.sprites[i];
      if (sprite.tilingTexture) {
        nextTexture = sprite.tilingTexture.baseTexture;
      } else {
        nextTexture = sprite.texture.baseTexture;
      }
      nextBlendMode = sprite.blendMode;
      nextShader = sprite.shader || this.defaultShader;
      blendSwap = currentBlendMode !== nextBlendMode;
      shaderSwap = !currentShader || !nextShader || currentShader._UID !== nextShader._UID;
      let skip = nextTexture.skipRender;
      if (skip && sprite.children.length > 0) {
        skip = false;
      }
      if ((currentBaseTexture !== nextTexture && !skip) || blendSwap || shaderSwap) {
        this.renderBatch(currentBaseTexture, batchSize, start);
        start = i;
        batchSize = 0;
        currentBaseTexture = nextTexture;
        if (blendSwap) {
          currentBlendMode = nextBlendMode;
          this.renderSession.blendModeManager.setBlendMode(currentBlendMode);
        }
        if (shaderSwap) {
          currentShader = nextShader;
          shader = currentShader.shaders[gl.id];
          if (!shader) {
            shader = new NormalShader(gl);
            shader.fragmentSrc = currentShader.fragmentSrc;
            shader.uniforms = currentShader.uniforms;
            shader.init();
            currentShader.shaders[gl.id] = shader;
          }
          // set shader function???
          this.renderSession.shaderManager.setShader(shader);
          if (shader.dirty) {
            shader.syncUniforms();
          }
          // both these only need to be set if they are changing..
          // set the projection
          const projection = this.renderSession.projection;
          gl.uniform2f(shader.projectionVector, projection.x, projection.y);
          // TODO - this is temporary!
          const offsetVector = this.renderSession.offset;
          gl.uniform2f(shader.offsetVector, offsetVector.x, offsetVector.y);
          // set the pointers
        }
      }
      batchSize += 1;
    }
    this.renderBatch(currentBaseTexture, batchSize, start);
    // then reset the batch!
    this.currentBatchSize = 0;
  }

  renderBatch(texture, size, startIndex) {
    if (size === 0) {
      return;
    }
    const gl = this.gl;
    // check if a texture is dirty..
    if (texture._dirty[gl.id]) {
      if (!this.renderSession.renderer.updateTexture(texture)) {
        //  If updateTexture returns false then we cannot render it, so bail out now
        return;
      }
    } else {
      // bind the current texture
      gl.bindTexture(gl.TEXTURE_2D, texture._glTextures[gl.id]);
    }
    // now draw those suckas!
    gl.drawElements(gl.TRIANGLES, size * 6, gl.UNSIGNED_SHORT, startIndex * 6 * 2);
    // increment the draw count
    this.renderSession.drawCount += 1;
  }

  stop() {
    this.flush();
    this.dirty = true;
  }

  start() {
    this.dirty = true;
  }

  destroy() {
    this.vertices = null;
    this.positions = null;
    this.colors = null;
    this.indices = null;
    this.gl.deleteBuffer(this.vertexBuffer);
    this.gl.deleteBuffer(this.indexBuffer);
    this.currentBaseTexture = null;
    this.gl = null;
  }

}
