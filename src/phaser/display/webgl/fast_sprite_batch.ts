import type { BaseTexture } from './base_texture.js';
import type { IdentifiedWebGLRenderingContext } from './util.js';
import type { Image } from '../../display/image.js';
import type { RenderSession } from '../render_session.js';
import type { DisplayObject } from '../display_object.js';

/** What the fast batch draws: a container whose children are plain images sharing one texture. */
export type FastBatchRoot = DisplayObject & { children: Image[] };
import type { FastShader } from './shader/fast.js';

export class FastSpriteBatch {
  public gl!: IdentifiedWebGLRenderingContext;
  public vertSize = 10;
  public maxSize = 6e3;
  public size!: number;
  public vertices!: Float32Array;
  public indices!: Uint16Array;
  public vertexBuffer!: WebGLBuffer | null;
  public indexBuffer!: WebGLBuffer | null;
  public lastIndexCount!: number;
  public drawing!: boolean;
  public currentBatchSize!: number;
  public currentBaseTexture!: BaseTexture | null;
  public currentBlendMode!: number;
  public renderSession!: RenderSession;
  public shader!: FastShader | null;
  public matrix!: Float32Array | number[] | null;
  /**
   * Creates a new FastSpriteBatch instance.
   * @param {WebGLRenderingContext & { id: number }} gl - The WebGL rendering context.
   */
  public constructor(gl: IdentifiedWebGLRenderingContext) {
    // Math.pow(2, 16) / this.vertSize;
    this.size = this.maxSize;
    // the total number of floats in our batch
    const numVerts = this.size * 4 * this.vertSize;
    // the total number of indices in our batch
    const numIndices = this.maxSize * 6;
    this.vertices = new Float32Array(numVerts);
    this.indices = new Uint16Array(numIndices);
    this.vertexBuffer = null;
    this.indexBuffer = null;
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
    this.currentBlendMode = 0;
    this.shader = null;
    this.matrix = null;
    this.setContext(gl);
  }

  /**
   * Sets the WebGL context for this batch.
   * @param {WebGLRenderingContext & { id: number }} gl - The WebGL rendering context.
   */
  public setContext(gl: IdentifiedWebGLRenderingContext): void {
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
  }

  /**
   * Renders a sprite batch using WebGL.
   * @param {object} spriteBatch - The sprite batch to render.
   * @param {object} renderSession - The render session to use.
   */
  public begin(spriteBatch: FastBatchRoot, renderSession: RenderSession): void {
    this.renderSession = renderSession;
    this.shader = this.renderSession.shaderManager.fastShader;
    this.matrix = spriteBatch.worldTransform.toArray(true);
    this.start();
  }

  /**
   * Updates the sprite batch.
   */
  public end(): void {
    this.flush();
  }

  /**
   * Flushes the sprite batch to WebGL.
   * @param {object} spriteBatch - The sprite batch to flush.
   */
  public render(spriteBatch: FastBatchRoot): void {
    const { children } = spriteBatch;
    const [sprite] = children;
    // if the uvs have not updated then no point rendering just yet!
    // check texture.
    if (!sprite?.texture._uvs) {
      return;
    }
    this.currentBaseTexture = sprite.texture.baseTexture;
    // check blend mode
    if (sprite.blendMode !== this.renderSession.blendModeManager.currentBlendMode) {
      this.flush();
      this.renderSession.blendModeManager.setBlendMode(sprite.blendMode);
    }
    for (const child of children) {
      this.renderSprite(child);
    }
    this.flush();
  }

  /**
   * Renders a sprite using WebGL.
   * @param {Image} sprite - The sprite to render.
   */
  public renderSprite(sprite: Image): void {
    if (!sprite.visible) {
      return;
    }
    if (sprite.texture.baseTexture !== this.currentBaseTexture && !sprite.texture.baseTexture.skipRender) {
      this.flush();
      this.currentBaseTexture = sprite.texture.baseTexture;
      if (!sprite.texture._uvs) {
        return;
      }
    }
    const uvs = sprite.texture._uvs!;
    const { vertices } = this;
    // const width = sprite.texture.frame.width;
    // const height = sprite.texture.frame.height;
    let w0;
    let w1;
    let h0;
    let h1;
    let index;
    if (sprite.texture.trim) {
      // if the sprite is trimmed then we need to add the extra space before transforming the sprite coords..
      const { trim } = sprite.texture;
      w1 = trim.x - sprite.anchor.x * trim.width;
      w0 = w1 + sprite.texture.crop.width;
      h1 = trim.y - sprite.anchor.y * trim.height;
      h0 = h1 + sprite.texture.crop.height;
    } else {
      w0 = sprite.texture.frame.width * (1 - sprite.anchor.x);
      w1 = sprite.texture.frame.width * -sprite.anchor.x;
      h0 = sprite.texture.frame.height * (1 - sprite.anchor.y);
      h1 = sprite.texture.frame.height * -sprite.anchor.y;
    }
    index = this.currentBatchSize * 4 * this.vertSize;
    index -= 1;
    // xy
    vertices[(index += 1)] = w1;
    vertices[(index += 1)] = h1;
    vertices[(index += 1)] = sprite.position.x;
    vertices[(index += 1)] = sprite.position.y;
    // scale
    vertices[(index += 1)] = sprite.scale.x;
    vertices[(index += 1)] = sprite.scale.y;
    // rotation
    vertices[(index += 1)] = sprite.rotation;
    // uv
    vertices[(index += 1)] = uvs.x0;
    vertices[(index += 1)] = uvs.y1;
    // color
    vertices[(index += 1)] = sprite.alpha;
    // xy
    vertices[(index += 1)] = w0;
    vertices[(index += 1)] = h1;
    vertices[(index += 1)] = sprite.position.x;
    vertices[(index += 1)] = sprite.position.y;
    // scale
    vertices[(index += 1)] = sprite.scale.x;
    vertices[(index += 1)] = sprite.scale.y;
    // rotation
    vertices[(index += 1)] = sprite.rotation;
    // uv
    vertices[(index += 1)] = uvs.x1;
    vertices[(index += 1)] = uvs.y1;
    // color
    vertices[(index += 1)] = sprite.alpha;
    // xy
    vertices[(index += 1)] = w0;
    vertices[(index += 1)] = h0;
    vertices[(index += 1)] = sprite.position.x;
    vertices[(index += 1)] = sprite.position.y;
    // scale
    vertices[(index += 1)] = sprite.scale.x;
    vertices[(index += 1)] = sprite.scale.y;
    // rotation
    vertices[(index += 1)] = sprite.rotation;
    // uv
    vertices[(index += 1)] = uvs.x2;
    vertices[(index += 1)] = uvs.y2;
    // color
    vertices[(index += 1)] = sprite.alpha;
    // xy
    vertices[(index += 1)] = w1;
    vertices[(index += 1)] = h0;
    vertices[(index += 1)] = sprite.position.x;
    vertices[(index += 1)] = sprite.position.y;
    // scale
    vertices[(index += 1)] = sprite.scale.x;
    vertices[(index += 1)] = sprite.scale.y;
    // rotation
    vertices[(index += 1)] = sprite.rotation;
    // uv
    vertices[(index += 1)] = uvs.x3;
    vertices[(index += 1)] = uvs.y3;
    // color
    vertices[(index += 1)] = sprite.alpha;
    // increment the batch
    this.currentBatchSize += 1;
    if (this.currentBatchSize >= this.size) {
      this.flush();
    }
  }

  /**
   * Binds the sprite batch to the WebGL context.
   */
  public flush(): void {
    // If the batch is length 0 then return as there is nothing to draw
    if (this.currentBatchSize === 0) {
      return;
    }
    const { gl } = this;
    // bind the current texture
    const baseTexture = this.currentBaseTexture!;
    if (!baseTexture._glTextures[gl.id]) {
      this.renderSession.renderer.updateTexture(baseTexture);
    }
    gl.bindTexture(gl.TEXTURE_2D, baseTexture._glTextures[gl.id] ?? null);
    // upload the verts to the buffer
    if (this.currentBatchSize > this.size * 0.5) {
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertices);
    } else {
      const view = this.vertices.subarray(0, this.currentBatchSize * 4 * this.vertSize);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
    }
    // now draw those suckas!
    gl.drawElements(gl.TRIANGLES, this.currentBatchSize * 6, gl.UNSIGNED_SHORT, 0);
    // then reset the batch!
    this.currentBatchSize = 0;
    // increment the draw count
    this.renderSession.drawCount += 1;
  }

  /**
   * Renders a sprite using the sprite batch.
   */
  public stop(): void {
    this.flush();
  }

  /**
   * Sets up the sprite batch for WebGL rendering.
   */
  public start(): void {
    const { gl } = this;
    // bind the main texture
    gl.activeTexture(gl.TEXTURE0);
    // bind the buffers
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    // set the projection
    const { projection } = this.renderSession;
    gl.uniform2f(this.shader!.projectionVector, projection.x, projection.y);
    // set the matrix
    gl.uniformMatrix3fv(this.shader!.uMatrix, false, this.matrix!);
    // set the pointers
    const stride = this.vertSize * 4;
    gl.vertexAttribPointer(this.shader!.aVertexPosition, 2, gl.FLOAT, false, stride, 0);
    gl.vertexAttribPointer(this.shader!.aPositionCoord, 2, gl.FLOAT, false, stride, 2 * 4);
    gl.vertexAttribPointer(this.shader!.aScale, 2, gl.FLOAT, false, stride, 4 * 4);
    gl.vertexAttribPointer(this.shader!.aRotation, 1, gl.FLOAT, false, stride, 6 * 4);
    gl.vertexAttribPointer(this.shader!.aTextureCoord, 2, gl.FLOAT, false, stride, 7 * 4);
    gl.vertexAttribPointer(this.shader!.colorAttribute, 1, gl.FLOAT, false, stride, 9 * 4);
  }
}
