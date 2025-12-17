import { renderGraphicsMask } from './graphics.js';

/**
 * Pushes a mask onto the rendering stack.
 * @param {object} maskData - The mask data to apply.
 * @param {object} renderSession - The rendering session object.
 */
export const pushMask = (maskData, renderSession) => {
  const context = renderSession.context;
  context.save();
  const cacheAlpha = maskData.alpha;
  const transform = maskData.worldTransform;
  const resolution = renderSession.resolution;
  context.setTransform(
    transform.a * resolution,
    transform.b * resolution,
    transform.c * resolution,
    transform.d * resolution,
    transform.tx * resolution,
    transform.ty * resolution
  );
  renderGraphicsMask(maskData, context);
  context.clip();
  maskData.worldAlpha = cacheAlpha;
};

/**
 * Pops a mask from the rendering stack.
 * @param {object} renderSession - The rendering session object.
 */
export const popMask = (renderSession) => {
  renderSession.context.restore();
};
