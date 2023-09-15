import { SCALE_LINEAR } from '../core/const.js';
import { getIdentityMatrix } from '../geom/util/matrix.js';
import { getTintedTexture } from './canvas/tinter.js';

/**
 * TBD.
 * @param {import('./image.js').Image} target - TBD.
 * @param {import('./webgl/texture.js').Texture} texture - TBD.
 * @param {boolean} destroyBase - TBD.
 */
export function setTexture(target, texture, destroyBase = false) {
  if (destroyBase) {
    target.texture.baseTexture.destroy();
  }
  target.texture.baseTexture.skipRender = false;
  target.texture = texture;
  target.texture.valid = true;
  target.cachedTint = -1;
}

/**
 * TBD.
 * @param {import('./image.js').Image} target - TBD.
 * @param {object} matrix - TBD.
 * @returns {import('../geom/rectangle.js').Rectangle} TBD.
 */
export function getBounds(target, matrix = null) {
  // TODO verify
  if (target.currentBounds) {
    return target.currentBounds;
  }
  const width = target.texture.frame.width;
  const height = target.texture.frame.height;
  let w0 = width * (1 - target.anchor.x);
  let w1 = width * -target.anchor.x;
  let h0 = height * (1 - target.anchor.y);
  let h1 = height * -target.anchor.y;
  const worldTransform = matrix || target.worldTransform;
  let a = worldTransform.a;
  const b = worldTransform.b;
  const c = worldTransform.c;
  let d = worldTransform.d;
  const tx = worldTransform.tx;
  const ty = worldTransform.ty;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let minX = Infinity;
  let minY = Infinity;
  if (b === 0 && c === 0) {
    // scale may be negative!
    if (a < 0) {
      a *= -1;
      const temp = w0;
      w0 = -w1;
      w1 = -temp;
    }
    if (d < 0) {
      d *= -1;
      const temp = h0;
      h0 = -h1;
      h1 = -temp;
    }
    // this means there is no rotation going on right? RIGHT?
    // if thats the case then we can avoid checking the bound values! yay
    minX = a * w1 + tx;
    maxX = a * w0 + tx;
    minY = d * h1 + ty;
    maxY = d * h0 + ty;
  } else {
    const x1 = a * w1 + c * h1 + tx;
    const y1 = d * h1 + b * w1 + ty;
    const x2 = a * w0 + c * h1 + tx;
    const y2 = d * h1 + b * w0 + ty;
    const x3 = a * w0 + c * h0 + tx;
    const y3 = d * h0 + b * w0 + ty;
    const x4 = a * w1 + c * h0 + tx;
    const y4 = d * h0 + b * w1 + ty;
    minX = x1 < minX ? x1 : minX;
    minX = x2 < minX ? x2 : minX;
    minX = x3 < minX ? x3 : minX;
    minX = x4 < minX ? x4 : minX;
    minY = y1 < minY ? y1 : minY;
    minY = y2 < minY ? y2 : minY;
    minY = y3 < minY ? y3 : minY;
    minY = y4 < minY ? y4 : minY;
    maxX = x1 > maxX ? x1 : maxX;
    maxX = x2 > maxX ? x2 : maxX;
    maxX = x3 > maxX ? x3 : maxX;
    maxX = x4 > maxX ? x4 : maxX;
    maxY = y1 > maxY ? y1 : maxY;
    maxY = y2 > maxY ? y2 : maxY;
    maxY = y3 > maxY ? y3 : maxY;
    maxY = y4 > maxY ? y4 : maxY;
  }
  const bounds = target.cachedBounds;
  bounds.x = minX;
  bounds.width = maxX - minX;
  bounds.y = minY;
  bounds.height = maxY - minY;
  target.currentBounds = bounds;
  return bounds;
}

/**
 * TBD.
 * @param {import('./image.js').Image} target - TBD.
 * @returns {import('../geom/rectangle.js').Rectangle} TBD.
 */
export function getLocalBounds(target) {
  const matrixCache = target.worldTransform;
  target.worldTransform = getIdentityMatrix();
  let i;
  for (i = 0; i < target.children.length; i += 1) {
    target.children[i].updateTransform();
  }
  const bounds = target.getBounds();
  target.worldTransform = matrixCache;
  for (i = 0; i < target.children.length; i += 1) {
    target.children[i].updateTransform();
  }
  return bounds;
}

/**
 * TBD.
 * @param {import('./image.js').Image} target - TBD.
 * @param {object} renderSession - TBD.
 * @param {import('../geom/matrix.js').Matrix} matrix - TBD.
 */
export function renderWebGL(target, renderSession, matrix) {
  // if the sprite is not visible or the alpha is 0 then no need to render this element
  if (!target.visible || target.alpha <= 0 || !target.renderable) {
    return;
  }
  //  They provided an alternative rendering matrix, so use it
  let wt = target.worldTransform;
  if (matrix) {
    wt = matrix;
  }
  //  A quick check to see if this element has a mask or a filter.
  if (target._mask || target._filters) {
    const spriteBatch = renderSession.spriteBatch;
    // push filter first as we need to ensure the stencil buffer is correct for any masking
    if (target._filters) {
      spriteBatch.flush();
      renderSession.filterManager.pushFilter(target._filterBlock);
    }
    if (target._mask) {
      spriteBatch.stop();
      renderSession.maskManager.pushMask(target.mask, renderSession);
      spriteBatch.start();
    }
    // add this sprite to the batch
    spriteBatch.render(target);
    // now loop through the children and make sure they get rendered
    for (let i = 0; i < target.children.length; i += 1) {
      target.children[i].renderWebGL(renderSession);
    }
    // time to stop the sprite batch as either a mask element or a filter draw will happen next
    spriteBatch.stop();
    if (target._mask) renderSession.maskManager.popMask(target._mask, renderSession);
    if (target._filters) renderSession.filterManager.popFilter();
    spriteBatch.start();
  } else {
    renderSession.spriteBatch.render(target);
    //  Render children!
    for (let i = 0; i < target.children.length; i += 1) {
      target.children[i].renderWebGL(renderSession, wt);
    }
  }
}

/**
 * TBD.
 * @param {import('./image.js').Image} target - TBD.
 * @param {object} renderSession - TBD.
 * @param {import('../geom/matrix.js').Matrix} matrix - TBD.
 */
export function renderCanvas(target, renderSession, matrix) {
  // If the sprite is not visible or the alpha is 0 then no need to render this element
  if (
    !target.visible ||
    target.alpha === 0 ||
    !target.renderable ||
    target.texture.crop.width <= 0 ||
    target.texture.crop.height <= 0
  ) {
    return;
  }
  let wt = target.worldTransform;
  //  If they provided an alternative rendering matrix then use it
  if (matrix) {
    wt = matrix;
  }
  if (target.blendMode !== renderSession.currentBlendMode) {
    renderSession.currentBlendMode = target.blendMode;
    renderSession.context.globalCompositeOperation =
      window.PhaserRegistry.blendModesCanvas[renderSession.currentBlendMode];
  }
  if (target._mask) {
    renderSession.maskManager.pushMask(target._mask, renderSession);
  }
  //  Ignore null sources
  if (target.texture.valid) {
    const resolution = target.texture.baseTexture.resolution / renderSession.resolution;
    renderSession.context.globalAlpha = target.worldAlpha;

    //  If smoothingEnabled is supported and we need to change the smoothing property for this texture
    if (renderSession.smoothProperty && renderSession.scaleMode !== target.texture.baseTexture.scaleMode) {
      renderSession.scaleMode = target.texture.baseTexture.scaleMode;
      renderSession.context[renderSession.smoothProperty] = renderSession.scaleMode === SCALE_LINEAR;
    }
    //  If the texture is trimmed we offset by the trim x/y, otherwise we use the frame dimensions
    let dx = target.texture.trim
      ? target.texture.trim.x - target.anchor.x * target.texture.trim.width
      : target.anchor.x * -target.texture.frame.width;
    let dy = target.texture.trim
      ? target.texture.trim.y - target.anchor.y * target.texture.trim.height
      : target.anchor.y * -target.texture.frame.height;
    const tx = wt.tx * renderSession.resolution + renderSession.shakeX;
    const ty = wt.ty * renderSession.resolution + renderSession.shakeY;
    //  Allow for pixel rounding
    if (renderSession.roundPixels) {
      renderSession.context.setTransform(wt.a, wt.b, wt.c, wt.d, tx | 0, ty | 0);
      dx |= 0;
      dy |= 0;
    } else {
      renderSession.context.setTransform(wt.a, wt.b, wt.c, wt.d, tx, ty);
    }
    let cw = target.texture.crop.width;
    let ch = target.texture.crop.height;
    dx /= resolution;
    dy /= resolution;
    if (target.tint !== 0xffffff) {
      if (target.texture.requiresReTint || target.cachedTint !== target.tint) {
        target.tintedTexture = getTintedTexture(target, target.tint);
        target.cachedTint = target.tint;
        target.texture.requiresReTint = false;
      }
      renderSession.context.drawImage(target.tintedTexture, 0, 0, cw, ch, dx, dy, cw / resolution, ch / resolution);
    } else {
      const cx = target.texture.crop.x;
      const cy = target.texture.crop.y;
      // https://github.com/photonstorm/phaser-ce/pull/61
      cw = Math.floor(cw);
      ch = Math.floor(ch);
      renderSession.context.drawImage(
        target.texture.baseTexture.source,
        cx,
        cy,
        cw,
        ch,
        dx,
        dy,
        cw / resolution,
        ch / resolution,
      );
    }
  }
  for (let i = 0; i < target.children.length; i += 1) {
    target.children[i].renderCanvas(renderSession);
  }
  if (target._mask) {
    renderSession.maskManager.popMask(renderSession);
  }
}
