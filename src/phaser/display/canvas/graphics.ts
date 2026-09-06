import type { Graphics } from '../graphics.js';
import { Circle } from '../../geom/circle.js';
import { Ellipse } from '../../geom/ellipse.js';
import { Polygon } from '../../geom/polygon.js';
import { Rectangle } from '../../geom/rectangle.js';
import { RoundedRectangle } from '../../geom/rounded_rectangle.js';

/**
 * Renders a graphics object to canvas.
 * @param {Graphics} graphics - The graphics object to render.
 */
export const updateGraphicsTint = (graphics: Graphics): void => {
  if (graphics.tint === 0xffffff) {
    return;
  }
  const tintR = ((graphics.tint >> 16) & 0xff) / 255;
  const tintG = ((graphics.tint >> 8) & 0xff) / 255;
  const tintB = (graphics.tint & 0xff) / 255;
  for (const data of graphics.graphicsData) {
    const fillColor = Math.trunc(data.fillColor ?? 0);
    const lineColor = Math.trunc(data.lineColor);
    data._fillTint =
      (((((fillColor >> 16) & 0xff) / 255) * tintR * 255) << 16) +
      (((((fillColor >> 8) & 0xff) / 255) * tintG * 255) << 8) +
      ((fillColor & 0xff) / 255) * tintB * 255;
    data._lineTint =
      (((((lineColor >> 16) & 0xff) / 255) * tintR * 255) << 16) +
      (((((lineColor >> 8) & 0xff) / 255) * tintG * 255) << 8) +
      ((lineColor & 0xff) / 255) * tintB * 255;
  }
};

/**
 * Renders a graphics object to canvas.
 * @param {Graphics} graphics - The graphics object to render.
 * @param {object} context - The canvas rendering context.
 */
export const renderGraphics = (graphics: Graphics, context: CanvasRenderingContext2D): void => {
  const { worldAlpha } = graphics;
  if (graphics.dirty) {
    updateGraphicsTint(graphics);
    graphics.dirty = false;
  }
  for (const data of graphics.graphicsData) {
    const { shape } = data;
    const fillColor = data._fillTint;
    const lineColor = data._lineTint;
    context.lineWidth = data.lineWidth;
    if (shape instanceof Polygon) {
      context.beginPath();
      const points = shape.points as number[];
      context.moveTo(points[0]!, points[1]!);
      for (let j = 1; j < points.length / 2; j += 1) {
        context.lineTo(points[j * 2]!, points[j * 2 + 1]!);
      }
      if (shape.closed) {
        context.lineTo(points[0]!, points[1]!);
      }
      // if the first and last point are the same close the path - much neater :)
      if (points[0] === points.at(-2) && points[1] === points.at(-1)) {
        context.closePath();
      }
      if (data.fill) {
        context.globalAlpha = data.fillAlpha * worldAlpha;
        context.fillStyle = `#${`00000${Math.trunc(fillColor ?? 0).toString(16)}`.slice(-6)}`;
        context.fill();
      }
      if (data.lineWidth) {
        context.globalAlpha = data.lineAlpha * worldAlpha;
        context.strokeStyle = `#${`00000${Math.trunc(lineColor).toString(16)}`.slice(-6)}`;
        context.stroke();
      }
    } else if (shape instanceof Rectangle) {
      if (data.fillColor || data.fillColor === 0) {
        context.globalAlpha = data.fillAlpha * worldAlpha;
        context.fillStyle = `#${`00000${Math.trunc(fillColor ?? 0).toString(16)}`.slice(-6)}`;
        context.fillRect(shape.x, shape.y, shape.width, shape.height);
      }
      if (data.lineWidth) {
        context.globalAlpha = data.lineAlpha * worldAlpha;
        context.strokeStyle = `#${`00000${Math.trunc(lineColor).toString(16)}`.slice(-6)}`;
        context.strokeRect(shape.x, shape.y, shape.width, shape.height);
      }
    } else if (shape instanceof Circle) {
      context.beginPath();
      context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
      context.closePath();
      if (data.fill) {
        context.globalAlpha = data.fillAlpha * worldAlpha;
        context.fillStyle = `#${`00000${Math.trunc(fillColor ?? 0).toString(16)}`.slice(-6)}`;
        context.fill();
      }
      if (data.lineWidth) {
        context.globalAlpha = data.lineAlpha * worldAlpha;
        context.strokeStyle = `#${`00000${Math.trunc(lineColor).toString(16)}`.slice(-6)}`;
        context.stroke();
      }
    } else if (shape instanceof Ellipse) {
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
        context.fillStyle = `#${`00000${Math.trunc(fillColor ?? 0).toString(16)}`.slice(-6)}`;
        context.fill();
      }
      if (data.lineWidth) {
        context.globalAlpha = data.lineAlpha * worldAlpha;
        context.strokeStyle = `#${`00000${Math.trunc(lineColor).toString(16)}`.slice(-6)}`;
        context.stroke();
      }
    } else if (shape instanceof RoundedRectangle) {
      const rx = shape.x;
      const ry = shape.y;
      const { width } = shape;
      const { height } = shape;
      let { radius } = shape;
      const maxRadius = Math.trunc(Math.min(width, height) / 2);
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
        context.fillStyle = `#${`00000${Math.trunc(fillColor ?? 0).toString(16)}`.slice(-6)}`;
        context.fill();
      }
      if (data.lineWidth) {
        context.globalAlpha = data.lineAlpha * worldAlpha;
        context.strokeStyle = `#${`00000${Math.trunc(lineColor).toString(16)}`.slice(-6)}`;
        context.stroke();
      }
    }
  }
};

/**
 * Renders a graphics object to canvas.
 * @param {Graphics} graphics - The graphics object to render.
 * @param {object} context - The canvas rendering context.
 */
export const renderGraphicsMask = (graphics: Graphics, context: CanvasRenderingContext2D): void => {
  const len = graphics.graphicsData.length;
  if (len === 0) {
    return;
  }
  context.beginPath();
  for (let i = 0; i < len; i += 1) {
    const data = graphics.graphicsData[i]!;
    const { shape } = data;
    if (shape instanceof Polygon) {
      const points = shape.points as number[];
      context.moveTo(points[0]!, points[1]!);
      for (let j = 1; j < points.length / 2; j += 1) {
        context.lineTo(points[j * 2]!, points[j * 2 + 1]!);
      }
      // if the first and last point are the same close the path - much neater :)
      if (points[0] === points.at(-2) && points[1] === points.at(-1)) {
        context.closePath();
      }
    } else if (shape instanceof Rectangle) {
      context.rect(shape.x, shape.y, shape.width, shape.height);
      context.closePath();
    } else if (shape instanceof Circle) {
      context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
      context.closePath();
    } else if (shape instanceof Ellipse) {
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
    } else if (shape instanceof RoundedRectangle) {
      const rx = shape.x;
      const ry = shape.y;
      const { width } = shape;
      const { height } = shape;
      let { radius } = shape;
      const maxRadius = Math.trunc(Math.min(width, height) / 2);
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
};
