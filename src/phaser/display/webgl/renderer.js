import {
  BLEND_ADD,
  BLEND_COLOR,
  BLEND_COLOR_BURN,
  BLEND_COLOR_DODGE,
  BLEND_DARKEN,
  BLEND_DIFFERENCE,
  BLEND_EXCLUSION,
  BLEND_HARD_LIGHT,
  BLEND_HUE,
  BLEND_LIGHTEN,
  BLEND_LUMINOSITY,
  BLEND_MULTIPLY,
  BLEND_NORMAL,
  BLEND_OVERLAY,
  BLEND_SATURATION,
  BLEND_SCREEN,
  BLEND_SOFT_LIGHT,
  RENDER_WEBGL,
  SCALE_LINEAR,
} from '../../core/const.js';
import { ENGINE_ERROR_CREATING_WEBGL_CONTEXT, ENGINE_ERROR_WEBGL_CONTEXT_LOST } from '../../core/error_code.js';
import { Point } from '../../geom/point.js';
import { isPowerOfTwo } from '../../util/math.js';
import { remove } from '../canvas/pool.js';
import { WebGLBlendModeManager } from './blend_manager.js';
import { WebGLFilterManager } from './filter_manager.js';
import * as WebGLMaskManager from './mask_manager.js';
import { WebGLShaderManager } from './shader_manager.js';
import { WebGLSpriteBatch } from './sprite_batch.js';
import { WebGLStencilManager } from './stencil_manager.js';
import { getWebGLContextErrorCode, getWebGLContextErrorName } from './util.js';

export class WebGLRenderer {
  /**
   * Creates a new WebGLRenderer instance.
   * @param {import('../../core/game.js').Game} game - The game instance.
   */
  constructor(game) {
    /** @type {number} */
    this.type = RENDER_WEBGL;
    this.resolution = game.config.resolution;
    this.autoResize = false;
    this.contextLost = false;
    this.clearBeforeRender = game.config.clearBeforeRender;
    this.width = game.width;
    this.height = game.height;
    this.view = game.canvas;
    this._contextOptions = {
      alpha: game.config.transparent,
      depth: false,
      antialias: game.config.antialias,
      premultipliedAlpha: game.config.transparent && game.config.transparent !== 'notMultiplied',
      stencil: true,
      failIfMajorPerformanceCaveat: false,
      preserveDrawingBuffer: game.config.preserveDrawingBuffer,
    };
    this.projection = new Point();
    this.offset = new Point();
    this.shaderManager = new WebGLShaderManager();
    this.spriteBatch = new WebGLSpriteBatch();
    this.filterManager = new WebGLFilterManager();
    this.stencilManager = new WebGLStencilManager();
    this.blendModeManager = new WebGLBlendModeManager();
    this.renderSession = {};
    this.renderSession.gl = this.gl;
    this.renderSession.drawCount = 0;
    this.renderSession.shaderManager = this.shaderManager;
    this.renderSession.maskManager = WebGLMaskManager;
    this.renderSession.filterManager = this.filterManager;
    this.renderSession.blendModeManager = this.blendModeManager;
    this.renderSession.spriteBatch = this.spriteBatch;
    this.renderSession.stencilManager = this.stencilManager;
    this.renderSession.renderer = this;
    this.renderSession.resolution = this.resolution;
    this.initContext(game);
    this.mapBlendModes();
  }

  /**
   * Destroys this renderer and cleans up resources.
   */
  destroy() {
    window.PhaserRegistry.GL_CONTEXTS[this.glContextId] = null;
    this.projection = null;
    this.offset = null;
    this.shaderManager.destroy();
    this.spriteBatch.destroy();
    this.filterManager.destroy();
    this.shaderManager = null;
    this.spriteBatch = null;
    this.filterManager = null;
    if (this.gl) {
      this.gl.canvas.width = 1;
      this.gl.canvas.height = 1;
      const loseContextExt = this.gl.getExtension('WEBGL_lose_context');
      if (loseContextExt) {
        loseContextExt.loseContext();
      }
    }
    this.gl = null;
    this.renderSession = null;
    remove(this);
    window.PhaserRegistry.INSTANCES[this.glContextId] = null;
    window.PhaserRegistry.GL_CONTEXT_ID -= 1;
  }

  /**
   * Initializes the WebGL registry.
   */
  initRegistry() {
    if (!window.PhaserRegistry.GL_CONTEXT_ID) {
      window.PhaserRegistry.GL_CONTEXT_ID = 0;
    }
    if (!window.PhaserRegistry.GL_CONTEXTS) {
      window.PhaserRegistry.GL_CONTEXTS = [];
    }
    if (!window.PhaserRegistry.INSTANCES) {
      window.PhaserRegistry.INSTANCES = [];
    }
  }

  /**
   * Initializes the WebGL context for rendering.
   * @param {import('../../core/game.js').Game} game - The game instance.
   * @throws {Error}
   */
  initContext(game) {
    game.logger.info('initContext');
    // TODO: view.addEventListener('webglcontextcreationerror', this.onWebGLContextCreationError, false);
    /** @type {WebGLRenderingContext & { id: number }} */
    // @ts-ignore
    const gl = this.view.getContext('webgl', this._contextOptions);
    this.gl = gl;
    if (!gl) {
      throw new Error(ENGINE_ERROR_CREATING_WEBGL_CONTEXT);
    }
    const errorCode = getWebGLContextErrorCode(gl);
    if (errorCode) {
      const errorName = getWebGLContextErrorName(errorCode);
      game.logger.warn('WebGL context error', { errorCode, errorName });
    }
    if (gl?.isContextLost()) {
      throw new Error(ENGINE_ERROR_WEBGL_CONTEXT_LOST);
    }
    // set current context
    this.initRegistry();
    this.glContextId = window.PhaserRegistry.GL_CONTEXT_ID;
    gl.id = window.PhaserRegistry.GL_CONTEXT_ID;
    window.PhaserRegistry.GL_CONTEXTS[this.glContextId] = gl;
    window.PhaserRegistry.INSTANCES[this.glContextId] = this;
    window.PhaserRegistry.GL_CONTEXT_ID += 1;
    // set default settings
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    // set context for managers
    this.shaderManager.setContext(gl);
    this.spriteBatch.setContext(gl);
    this.stencilManager.setContext(gl);
    this.filterManager.setContext(gl);
    this.blendModeManager.setContext(gl);
    this.renderSession.gl = gl;
    // set initial size
    this.resize(this.width, this.height);
  }

  /**
   * Renders the stage to WebGL.
   * @param {import('../../core/stage.js').Stage} stage - The root stage to render.
   */
  render(stage) {
    if (this.contextLost) {
      return;
    }
    const gl = this.gl;
    // -- Does this need to be set every frame? -- //
    // gl.viewport(0, 0, this.width, this.height);
    // make sure we are bound to the main frame buffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    if (this.clearBeforeRender) {
      gl.clearColor(stage._bgColor.r, stage._bgColor.g, stage._bgColor.b, stage._bgColor.a);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    this.offset.x = 0;
    this.offset.y = 0;
    this.renderDisplayObject(stage, this.projection);
  }

  /**
   * Renders a display object to WebGL.
   * @param {import('../../display/display_object.js').DisplayObject} displayObject - The display object to render.
   * @param {Point} projection - The projection matrix.
   * @param {object} buffer - The render buffer.
   * @param {import('../../geom/matrix.js').Matrix} matrix - The transformation matrix.
   */
  renderDisplayObject(displayObject, projection, buffer, matrix) {
    this.renderSession.blendModeManager.setBlendMode(BLEND_NORMAL);
    // reset the render session data..
    this.renderSession.drawCount = 0;
    // make sure to flip the Y if using a render texture..
    this.renderSession.flipY = buffer ? -1 : 1;
    // set the default projection
    this.renderSession.projection = projection;
    // set the default offset
    this.renderSession.offset = this.offset;
    // start the sprite batch
    this.spriteBatch.begin(this.renderSession);
    // start the filter manager
    this.filterManager.begin(this.renderSession, buffer);
    // render the scene!
    displayObject.renderWebGL(this.renderSession, matrix);
    // finish the sprite batch
    this.spriteBatch.end();
  }

  /**
   * Resizes the WebGL canvas to the specified dimensions.
   * @param {number} width - The new width of the canvas.
   * @param {number} height - The new height of the canvas.
   */
  resize(width, height) {
    this.width = width * this.resolution;
    this.height = height * this.resolution;
    this.view.width = this.width;
    this.view.height = this.height;
    if (this.autoResize) {
      this.view.style.width = `${this.width / this.resolution}px`;
      this.view.style.height = `${this.height / this.resolution}px`;
    }
    this.gl.viewport(0, 0, this.width, this.height);
    this.projection.x = this.width / 2 / this.resolution;
    this.projection.y = -this.height / 2 / this.resolution;
  }

  /**
   * Updates a texture in the WebGL context.
   * @param {import('./base_texture.js').BaseTexture} texture - The base texture to update.
   * @returns {boolean} Whether the update was successful.
   */
  updateTexture(texture) {
    if (!texture.hasLoaded) {
      return false;
    }
    const gl = this.gl;
    if (!texture._glTextures[gl.id]) {
      texture._glTextures[gl.id] = gl.createTexture();
    }
    gl.bindTexture(gl.TEXTURE_2D, texture._glTextures[gl.id]);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultipliedAlpha);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.source);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, texture.scaleMode === SCALE_LINEAR ? gl.LINEAR : gl.NEAREST);
    if (texture.mipmap && isPowerOfTwo(texture.width, texture.height)) {
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        texture.scaleMode === SCALE_LINEAR ? gl.LINEAR_MIPMAP_LINEAR : gl.NEAREST_MIPMAP_NEAREST
      );
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        texture.scaleMode === SCALE_LINEAR ? gl.LINEAR : gl.NEAREST
      );
    }
    if (!texture._powerOf2) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    }
    texture._dirty[gl.id] = false;
    // return texture._glTextures[gl.id];
    return true;
  }

  /**
   * Maps blend modes to WebGL rendering operations.
   */
  mapBlendModes() {
    if (window.PhaserRegistry.blendModesWebGL) {
      return;
    }
    const gl = this.gl;
    const b = [];
    b[BLEND_NORMAL] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    b[BLEND_ADD] = [gl.SRC_ALPHA, gl.DST_ALPHA];
    b[BLEND_MULTIPLY] = [gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA];
    b[BLEND_SCREEN] = [gl.SRC_ALPHA, gl.ONE];
    b[BLEND_OVERLAY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    b[BLEND_DARKEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    b[BLEND_LIGHTEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    b[BLEND_COLOR_DODGE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    b[BLEND_COLOR_BURN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    b[BLEND_HARD_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    b[BLEND_SOFT_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    b[BLEND_DIFFERENCE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    b[BLEND_EXCLUSION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    b[BLEND_HUE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    b[BLEND_SATURATION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    b[BLEND_COLOR] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    b[BLEND_LUMINOSITY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    window.PhaserRegistry.blendModesWebGL = b;
  }
}
