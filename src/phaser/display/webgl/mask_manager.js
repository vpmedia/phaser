import { updateGraphics } from './graphics.js';

/**
 * Sets up the mask manager for WebGL rendering.
 * @param {object} maskData - The mask data to apply.
 * @param {object} renderSession - The rendering session.
 */
export const pushMask = (maskData, renderSession) => {
  const gl = renderSession.gl;
  if (maskData.dirty) {
    updateGraphics(maskData, gl);
  }
  if (
    maskData._webGL[gl.id] === undefined ||
    maskData._webGL[gl.id].data === undefined ||
    maskData._webGL[gl.id].data.length === 0
  ) {
    return;
  }
  renderSession.stencilManager.pushStencil(maskData, maskData._webGL[gl.id].data[0], renderSession);
};

/**
 * Sets up the mask manager for WebGL rendering.
 * @param {object} maskData - The mask data to apply.
 * @param {object} renderSession - The rendering session.
 */
export const popMask = (maskData, renderSession) => {
  const gl = renderSession.gl;
  if (
    maskData._webGL[gl.id] === undefined ||
    maskData._webGL[gl.id].data === undefined ||
    maskData._webGL[gl.id].data.length === 0
  ) {
    return;
  }
  renderSession.stencilManager.popStencil(maskData, maskData._webGL[gl.id].data[0], renderSession);
};
