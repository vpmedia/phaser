import { updateGraphics } from './graphics.js';
import type { RenderSession } from '../render_session.js';
import type { Graphics } from '../graphics.js';

/**
 * Sets up the mask manager for WebGL rendering.
 * @param {object} maskData - The mask data to apply.
 * @param {object} renderSession - The rendering session.
 */
export const pushMask = (maskData: Graphics, renderSession: RenderSession): void => {
  const { gl } = renderSession;
  if (maskData.dirty) {
    updateGraphics(maskData, gl);
  }
  const [first] = maskData._webGL[gl.id]?.data ?? [];
  if (!first) {
    return;
  }
  renderSession.stencilManager.pushStencil(maskData, first, renderSession);
};

/**
 * Sets up the mask manager for WebGL rendering.
 * @param {object} maskData - The mask data to apply.
 * @param {object} renderSession - The rendering session.
 */
export const popMask = (maskData: Graphics | null, renderSession: RenderSession): void => {
  const { gl } = renderSession;
  const [first] = maskData?._webGL[gl.id]?.data ?? [];
  if (!first) {
    return;
  }
  renderSession.stencilManager.popStencil(maskData!, first, renderSession);
};
