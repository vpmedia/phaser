/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import { renderGraphicsMask } from './graphics';

/**
 *
 * @param {object} maskData TBD
 * @param {object} renderSession TBD
 */
export function pushMask(maskData, renderSession) {
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
    transform.ty * resolution,
  );
  renderGraphicsMask(maskData, context);
  context.clip();
  maskData.worldAlpha = cacheAlpha;
}

/**
 *
 * @param {object} renderSession TBD
 */
export function popMask(renderSession) {
  renderSession.context.restore();
}
