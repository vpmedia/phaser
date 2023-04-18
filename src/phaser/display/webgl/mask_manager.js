/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 */
import { updateGraphics } from './graphics';

/**
 * TBD.
 * @param {object} maskData - TBD.
 * @param {object} renderSession - TBD.
 */
export function pushMask(maskData, renderSession) {
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
}

/**
 * TBD.
 * @param {object} maskData - TBD.
 * @param {object} renderSession - TBD.
 */
export function popMask(maskData, renderSession) {
  const gl = renderSession.gl;
  if (
    maskData._webGL[gl.id] === undefined ||
    maskData._webGL[gl.id].data === undefined ||
    maskData._webGL[gl.id].data.length === 0
  ) {
    return;
  }
  renderSession.stencilManager.popStencil(maskData, maskData._webGL[gl.id].data[0], renderSession);
}
