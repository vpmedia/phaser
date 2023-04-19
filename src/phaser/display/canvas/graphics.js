import {
  GEOM_POLYGON,
  GEOM_RECTANGLE,
  GEOM_CIRCLE,
  GEOM_ELLIPSE,
  GEOM_ROUNDED_RECTANGLE,
} from '../../core/const';

/**
 * TBD.
 * @param {object} graphics - TBD.
 */
export function updateGraphicsTint(graphics) {
  if (graphics.tint === 0xffffff) {
    return;
  }
  const tintR = ((graphics.tint >> 16) & 0xff) / 255;
  const tintG = ((graphics.tint >> 8) & 0xff) / 255;
  const tintB = (graphics.tint & 0xff) / 255;
  for (let i = 0; i < graphics.graphicsData.length; i += 1) {
    const data = graphics.graphicsData[i];
    const fillColor = data.fillColor | 0;
    const lineColor = data.lineColor | 0;
    data._fillTint =
      (((((fillColor >> 16) & 0xff) / 255) * tintR * 255) << 16) +
      (((((fillColor >> 8) & 0xff) / 255) * tintG * 255) << 8) +
      ((fillColor & 0xff) / 255) * tintB * 255;
    data._lineTint =
      (((((lineColor >> 16) & 0xff) / 255) * tintR * 255) << 16) +
      (((((lineColor >> 8) & 0xff) / 255) * tintG * 255) << 8) +
      ((lineColor & 0xff) / 255) * tintB * 255;
  }
}

/**
 * TBD.
 * @param {object} graphics - TBD.
 * @param {object} context - TBD.
 */
export function renderGraphics(graphics, context) {
  const worldAlpha = graphics.worldAlpha;
  if (graphics.dirty) {
    updateGraphicsTint(graphics);
    graphics.dirty = false;
  }
  for (let i = 0; i < graphics.graphicsData.length; i += 1) {
    const data = graphics.graphicsData[i];
    const shape = data.shape;
    const fillColor = data._fillTint;
    const lineColor = data._lineTint;
    context.lineWidth = data.lineWidth;
    if (data.type === GEOM_POLYGON) {
      context.beginPath();
      const points = shape.points;
      context.moveTo(points[0], points[1]);
      for (let j = 1; j < points.length / 2; j += 1) {
        context.lineTo(points[j * 2], points[j * 2 + 1]);
      }
      if (shape.closed) {
        context.lineTo(points[0], points[1]);
      }
      // if the first and last point are the same close the path - much neater :)
      if (points[0] === points[points.length - 2] && points[1] === points[points.length - 1]) {
        context.closePath();
      }
      if (data.fill) {
        context.globalAlpha = data.fillAlpha * worldAlpha;
        context.fillStyle = '#' + ('00000' + (fillColor | 0).toString(16)).substr(-6);
        context.fill();
      }
      if (data.lineWidth) {
        context.globalAlpha = data.lineAlpha * worldAlpha;
        context.strokeStyle = '#' + ('00000' + (lineColor | 0).toString(16)).substr(-6);
        context.stroke();
      }
    } else if (data.type === GEOM_RECTANGLE) {
      if (data.fillColor || data.fillColor === 0) {
        context.globalAlpha = data.fillAlpha * worldAlpha;
        context.fillStyle = '#' + ('00000' + (fillColor | 0).toString(16)).substr(-6);
        context.fillRect(shape.x, shape.y, shape.width, shape.height);
      }
      if (data.lineWidth) {
        context.globalAlpha = data.lineAlpha * worldAlpha;
        context.strokeStyle = '#' + ('00000' + (lineColor | 0).toString(16)).substr(-6);
        context.strokeRect(shape.x, shape.y, shape.width, shape.height);
      }
    } else if (data.type === GEOM_CIRCLE) {
      context.beginPath();
      context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
      context.closePath();
      if (data.fill) {
        context.globalAlpha = data.fillAlpha * worldAlpha;
        context.fillStyle = '#' + ('00000' + (fillColor | 0).toString(16)).substr(-6);
        context.fill();
      }
      if (data.lineWidth) {
        context.globalAlpha = data.lineAlpha * worldAlpha;
        context.strokeStyle = '#' + ('00000' + (lineColor | 0).toString(16)).substr(-6);
        context.stroke();
      }
    } else if (data.type === GEOM_ELLIPSE) {
      // ellipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
      const w = shape.width * 2;
      const h = shape.height * 2;
      const x = shape.x - w / 2;
      const y = shape.y - h / 2;
      context.beginPath();
      const kappa = 0.5522848;
      const ox = (w / 2) * kappa; // control point offset horizontal
      const oy = (h / 2) * kappa; // control point offset vertical
      const xe = x + w; // x-end
      const ye = y + h; // y-end
      const xm = x + w / 2; // x-middle
      const ym = y + h / 2; // y-middle
      context.moveTo(x, ym);
      context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
      context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
      context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
      context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
      context.closePath();
      if (data.fill) {
        context.globalAlpha = data.fillAlpha * worldAlpha;
        context.fillStyle = '#' + ('00000' + (fillColor | 0).toString(16)).substr(-6);
        context.fill();
      }
      if (data.lineWidth) {
        context.globalAlpha = data.lineAlpha * worldAlpha;
        context.strokeStyle = '#' + ('00000' + (lineColor | 0).toString(16)).substr(-6);
        context.stroke();
      }
    } else if (data.type === GEOM_ROUNDED_RECTANGLE) {
      const rx = shape.x;
      const ry = shape.y;
      const width = shape.width;
      const height = shape.height;
      let radius = shape.radius;
      const maxRadius = (Math.min(width, height) / 2) | 0;
      radius = radius > maxRadius ? maxRadius : radius;
      context.beginPath();
      context.moveTo(rx, ry + radius);
      context.lineTo(rx, ry + height - radius);
      context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height);
      context.lineTo(rx + width - radius, ry + height);
      context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius);
      context.lineTo(rx + width, ry + radius);
      context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry);
      context.lineTo(rx + radius, ry);
      context.quadraticCurveTo(rx, ry, rx, ry + radius);
      context.closePath();
      if (data.fillColor || data.fillColor === 0) {
        context.globalAlpha = data.fillAlpha * worldAlpha;
        context.fillStyle = '#' + ('00000' + (fillColor | 0).toString(16)).substr(-6);
        context.fill();
      }
      if (data.lineWidth) {
        context.globalAlpha = data.lineAlpha * worldAlpha;
        context.strokeStyle = '#' + ('00000' + (lineColor | 0).toString(16)).substr(-6);
        context.stroke();
      }
    }
  }
}

/**
 * TBD.
 * @param {object} graphics - TBD.
 * @param {object} context - TBD.
 */
export function renderGraphicsMask(graphics, context) {
  const len = graphics.graphicsData.length;
  if (len === 0) {
    return;
  }
  context.beginPath();
  for (let i = 0; i < len; i += 1) {
    const data = graphics.graphicsData[i];
    const shape = data.shape;
    if (data.type === GEOM_POLYGON) {
      const points = shape.points;
      context.moveTo(points[0], points[1]);
      for (let j = 1; j < points.length / 2; j += 1) {
        context.lineTo(points[j * 2], points[j * 2 + 1]);
      }
      // if the first and last point are the same close the path - much neater :)
      if (points[0] === points[points.length - 2] && points[1] === points[points.length - 1]) {
        context.closePath();
      }
    } else if (data.type === GEOM_RECTANGLE) {
      context.rect(shape.x, shape.y, shape.width, shape.height);
      context.closePath();
    } else if (data.type === GEOM_CIRCLE) {
      context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
      context.closePath();
    } else if (data.type === GEOM_ELLIPSE) {
      // ellipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
      const w = shape.width * 2;
      const h = shape.height * 2;
      const x = shape.x - w / 2;
      const y = shape.y - h / 2;
      const kappa = 0.5522848;
      const ox = (w / 2) * kappa; // control point offset horizontal
      const oy = (h / 2) * kappa; // control point offset vertical
      const xe = x + w; // x-end
      const ye = y + h; // y-end
      const xm = x + w / 2; // x-middle
      const ym = y + h / 2; // y-middle
      context.moveTo(x, ym);
      context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
      context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
      context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
      context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
      context.closePath();
    } else if (data.type === GEOM_ROUNDED_RECTANGLE) {
      const rx = shape.x;
      const ry = shape.y;
      const width = shape.width;
      const height = shape.height;
      let radius = shape.radius;
      const maxRadius = (Math.min(width, height) / 2) | 0;
      radius = radius > maxRadius ? maxRadius : radius;
      context.moveTo(rx, ry + radius);
      context.lineTo(rx, ry + height - radius);
      context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height);
      context.lineTo(rx + width - radius, ry + height);
      context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius);
      context.lineTo(rx + width, ry + radius);
      context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry);
      context.lineTo(rx + radius, ry);
      context.quadraticCurveTo(rx, ry, rx, ry + radius);
      context.closePath();
    }
  }
}
