import type { Point } from '../geom/point.js';
import type { Graphics } from './graphics.js';
import type { WebGLBlendModeManager } from './webgl/blend_manager.js';
import type { WebGLFilterManager } from './webgl/filter_manager.js';
import type { WebGLRenderer } from './webgl/renderer.js';
import type { WebGLShaderManager } from './webgl/shader_manager.js';
import type { WebGLSpriteBatch } from './webgl/sprite_batch.js';
import type { WebGLStencilManager } from './webgl/stencil_manager.js';
import type { IdentifiedWebGLRenderingContext } from './webgl/util.js';

/** The canvas and WebGL mask managers, which the renderers supply as namespace imports. */
export type MaskManager = {
  pushMask: (maskData: Graphics, renderSession: RenderSession) => void;
  popMask: (maskData: Graphics | null, renderSession: RenderSession) => void;
};

/**
 * State threaded through every render call.
 *
 * The canvas and WebGL renderers each populate the subset their pipeline needs, so a session is
 * only ever fully populated for one of the two. Members are declared non-optional because that is
 * how the render paths consume them; the renderers assemble the session in one place each.
 */
export type RenderSession = {
  blendModeManager: WebGLBlendModeManager;
  context: CanvasRenderingContext2D;
  currentBlendMode: number;
  drawCount: number;
  filterManager: WebGLFilterManager;
  flipY: number;
  gl: IdentifiedWebGLRenderingContext;
  maskManager: MaskManager;
  offset: Point;
  projection: Point;
  renderer: WebGLRenderer;
  resolution: number;
  roundPixels: boolean;
  scaleMode: number;
  shaderManager: WebGLShaderManager;
  shakeX: number;
  shakeY: number;
  smoothProperty: string | null;
  spriteBatch: WebGLSpriteBatch;
  stencilManager: WebGLStencilManager;
};
