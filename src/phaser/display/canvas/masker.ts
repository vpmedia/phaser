import { renderGraphicsMask } from './graphics.js';
import type { RenderSession } from '../render_session.js';
import type { Graphics } from '../graphics.js';

/**
 * Pushes a mask onto the rendering stack.
 * @param {object} maskData - The mask data to apply.
 * @param {object} renderSession - The rendering session object.
 */
export const pushMask = (maskData: any, renderSession: RenderSession): void => {
  const { context } = renderSession;
  context.save();
  const cacheAlpha = maskData.alpha;
  const transform = maskData.worldTransform;
  const { resolution } = renderSession;
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
 * @param {object} _maskData - Unused; the canvas path restores whatever was saved.
 * @param {object} renderSession - The rendering session object.
 */
export const popMask = (_maskData: Graphics | null, renderSession: RenderSession): void => {
  renderSession.context.restore();
};
