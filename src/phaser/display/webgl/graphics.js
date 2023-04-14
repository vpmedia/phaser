/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 */
import GraphicsData from './graphics_data';
import Point from '../../geom/point';
import {
  GEOM_CIRCLE,
  GEOM_ELLIPSE,
  GEOM_POLYGON,
  GEOM_RECTANGLE,
  GEOM_ROUNDED_RECTANGLE,
} from '../../core/const';
import { hex2rgb } from '../../util/math';
import { triangulate } from './earcut';

/**
 * TBD.
 *
 * @returns {number} TBD.
 */
export function getStencilBufferLimit() {
  if (!window.PhaserRegistry.stencilBufferLimit) {
    window.PhaserRegistry.stencilBufferLimit = 6;
  }
  return window.PhaserRegistry.stencilBufferLimit;
}

/**
 * TBD.
 *
 * @returns {object[]} TBD.
 */
export function getGraphicsDataPool() {
  if (!window.PhaserRegistry.graphicsDataPool) {
    window.PhaserRegistry.graphicsDataPool = [];
  }
  return window.PhaserRegistry.graphicsDataPool;
}

/**
 *
 * @param {object} webGL - TBD.
 * @param {number} type - TBD.
 * @returns {object} TBD.
 */
export function switchMode(webGL, type) {
  let webGLData;
  if (!webGL.data.length) {
    webGLData = getGraphicsDataPool().pop() || new GraphicsData(webGL.gl);
    webGLData.mode = type;
    webGL.data.push(webGLData);
  } else {
    webGLData = webGL.data[webGL.data.length - 1];
    if (webGLData.mode !== type || type === 1) {
      webGLData = getGraphicsDataPool().pop() || new GraphicsData(webGL.gl);
      webGLData.mode = type;
      webGL.data.push(webGLData);
    }
  }
  webGLData.dirty = true;
  return webGLData;
}

/**
 *
 * @param {object} graphicsData - TBD.
 * @param {object} webGLData - TBD.
 */
export function buildLine(graphicsData, webGLData) {
  // TODO OPTIMISE!
  let i = 0;
  let points = graphicsData.points;
  if (points.length === 0) {
    return;
  }
  // if the line width is an odd number add 0.5 to align to a whole pixel
  if (graphicsData.lineWidth % 2) {
    for (i = 0; i < points.length; i += 1) {
      points[i] += 0.5;
    }
  }
  // get first and last point.. figure out the middle!
  const firstPoint = new Point(points[0], points[1]);
  let lastPoint = new Point(points[points.length - 2], points[points.length - 1]);
  // if the first point is the last point - gonna have issues :)
  if (firstPoint.x === lastPoint.x && firstPoint.y === lastPoint.y) {
    // need to clone as we are going to slightly modify the shape..
    points = points.slice();
    points.pop();
    points.pop();
    lastPoint = new Point(points[points.length - 2], points[points.length - 1]);
    const midPointX = lastPoint.x + (firstPoint.x - lastPoint.x) * 0.5;
    const midPointY = lastPoint.y + (firstPoint.y - lastPoint.y) * 0.5;
    points.unshift(midPointX, midPointY);
    points.push(midPointX, midPointY);
  }
  const verts = webGLData.points;
  const indices = webGLData.indices;
  const length = points.length / 2;
  let indexCount = points.length;
  let indexStart = verts.length / 6;
  // DRAW the Line
  const width = graphicsData.lineWidth / 2;
  // sort color
  const color = hex2rgb(graphicsData.lineColor);
  const alpha = graphicsData.lineAlpha;
  const r = color[0] * alpha;
  const g = color[1] * alpha;
  const b = color[2] * alpha;
  let px;
  let py;
  let p1x;
  let p1y;
  let p2x;
  let p2y;
  let p3x;
  let p3y;
  let perpx;
  let perpy;
  let perp2x;
  let perp2y;
  let perp3x;
  let perp3y;
  let a1;
  let b1;
  let c1;
  let a2;
  let b2;
  let c2;
  let denom;
  let pdist;
  let dist;
  p1x = points[0];
  p1y = points[1];
  p2x = points[2];
  p2y = points[3];
  perpx = -(p1y - p2y);
  perpy = p1x - p2x;
  dist = Math.sqrt(perpx * perpx + perpy * perpy);
  perpx /= dist;
  perpy /= dist;
  perpx *= width;
  perpy *= width;
  // start
  verts.push(p1x - perpx, p1y - perpy, r, g, b, alpha);
  verts.push(p1x + perpx, p1y + perpy, r, g, b, alpha);
  for (i = 1; i < length - 1; i += 1) {
    p1x = points[(i - 1) * 2];
    p1y = points[(i - 1) * 2 + 1];
    p2x = points[i * 2];
    p2y = points[i * 2 + 1];
    p3x = points[(i + 1) * 2];
    p3y = points[(i + 1) * 2 + 1];
    perpx = -(p1y - p2y);
    perpy = p1x - p2x;
    dist = Math.sqrt(perpx * perpx + perpy * perpy);
    perpx /= dist;
    perpy /= dist;
    perpx *= width;
    perpy *= width;
    perp2x = -(p2y - p3y);
    perp2y = p2x - p3x;
    dist = Math.sqrt(perp2x * perp2x + perp2y * perp2y);
    perp2x /= dist;
    perp2y /= dist;
    perp2x *= width;
    perp2y *= width;
    a1 = -perpy + p1y - (-perpy + p2y);
    b1 = -perpx + p2x - (-perpx + p1x);
    c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
    a2 = -perp2y + p3y - (-perp2y + p2y);
    b2 = -perp2x + p2x - (-perp2x + p3x);
    c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);
    denom = a1 * b2 - a2 * b1;
    if (Math.abs(denom) < 0.1) {
      denom += 10.1;
      verts.push(p2x - perpx, p2y - perpy, r, g, b, alpha);
      verts.push(p2x + perpx, p2y + perpy, r, g, b, alpha);
      continue;
    }
    px = (b1 * c2 - b2 * c1) / denom;
    py = (a2 * c1 - a1 * c2) / denom;
    pdist = (px - p2x) * (px - p2x) + (py - p2y) + (py - p2y);
    if (pdist > 140 * 140) {
      perp3x = perpx - perp2x;
      perp3y = perpy - perp2y;
      dist = Math.sqrt(perp3x * perp3x + perp3y * perp3y);
      perp3x /= dist;
      perp3y /= dist;
      perp3x *= width;
      perp3y *= width;
      verts.push(p2x - perp3x, p2y - perp3y);
      verts.push(r, g, b, alpha);
      verts.push(p2x + perp3x, p2y + perp3y);
      verts.push(r, g, b, alpha);
      verts.push(p2x - perp3x, p2y - perp3y);
      verts.push(r, g, b, alpha);
      indexCount += 1;
    } else {
      verts.push(px, py);
      verts.push(r, g, b, alpha);
      verts.push(p2x - (px - p2x), p2y - (py - p2y));
      verts.push(r, g, b, alpha);
    }
  }
  p1x = points[(length - 2) * 2];
  p1y = points[(length - 2) * 2 + 1];
  p2x = points[(length - 1) * 2];
  p2y = points[(length - 1) * 2 + 1];
  perpx = -(p1y - p2y);
  perpy = p1x - p2x;
  dist = Math.sqrt(perpx * perpx + perpy * perpy);
  perpx /= dist;
  perpy /= dist;
  perpx *= width;
  perpy *= width;
  verts.push(p2x - perpx, p2y - perpy);
  verts.push(r, g, b, alpha);
  verts.push(p2x + perpx, p2y + perpy);
  verts.push(r, g, b, alpha);
  indices.push(indexStart);
  for (i = 0; i < indexCount; i += 1) {
    indices.push(indexStart);
    indexStart += 1;
  }
  indices.push(indexStart - 1);
}

/**
 *
 * @param {object} graphicsData - TBD.
 * @param {object} webGLData - TBD.
 */
export function buildRectangle(graphicsData, webGLData) {
  //
  // need to convert points to a nice regular data
  //
  const rectData = graphicsData.shape;
  const x = rectData.x;
  const y = rectData.y;
  const width = rectData.width;
  const height = rectData.height;

  if (graphicsData.fill) {
    const color = hex2rgb(graphicsData.fillColor);
    const alpha = graphicsData.fillAlpha;
    const r = color[0] * alpha;
    const g = color[1] * alpha;
    const b = color[2] * alpha;
    const verts = webGLData.points;
    const indices = webGLData.indices;
    const vertPos = verts.length / 6;
    // start
    verts.push(x, y);
    verts.push(r, g, b, alpha);
    verts.push(x + width, y);
    verts.push(r, g, b, alpha);
    verts.push(x, y + height);
    verts.push(r, g, b, alpha);
    verts.push(x + width, y + height);
    verts.push(r, g, b, alpha);
    // insert 2 dead triangles..
    indices.push(vertPos, vertPos, vertPos + 1, vertPos + 2, vertPos + 3, vertPos + 3);
  }
  if (graphicsData.lineWidth) {
    const tempPoints = graphicsData.points;
    graphicsData.points = [x, y, x + width, y, x + width, y + height, x, y + height, x, y];
    buildLine(graphicsData, webGLData);
    graphicsData.points = tempPoints;
  }
}

/**
 *
 * @param {number} fromX - TBD.
 * @param {number} fromY - TBD.
 * @param {number} cpX - TBD.
 * @param {number} cpY - TBD.
 * @param {number} toX - TBD.
 * @param {number} toY - TBD.
 * @returns {number[]} TBD.
 */
export function quadraticBezierCurve(fromX, fromY, cpX, cpY, toX, toY) {
  let xa;
  let ya;
  let xb;
  let yb;
  let x;
  let y;
  const n = 20;
  const points = [];
  const getPt = (n1, n2, perc) => {
    const diff = n2 - n1;
    return n1 + diff * perc;
  };
  let j = 0;
  for (let i = 0; i <= n; i += 1) {
    j = i / n;
    // The Green Line
    xa = getPt(fromX, cpX, j);
    ya = getPt(fromY, cpY, j);
    xb = getPt(cpX, toX, j);
    yb = getPt(cpY, toY, j);
    // The Black Dot
    x = getPt(xa, xb, j);
    y = getPt(ya, yb, j);
    points.push(x, y);
  }
  return points;
}

/**
 *
 * @param {object} graphicsData - TBD.
 * @param {object} webGLData - TBD.
 */
export function buildRoundedRectangle(graphicsData, webGLData) {
  const rrectData = graphicsData.shape;
  const x = rrectData.x;
  const y = rrectData.y;
  const width = rrectData.width;
  const height = rrectData.height;
  const radius = rrectData.radius;
  let recPoints = [];
  recPoints.push(x, y + radius);
  recPoints = recPoints.concat(
    quadraticBezierCurve(x, y + height - radius, x, y + height, x + radius, y + height)
  );
  recPoints = recPoints.concat(
    quadraticBezierCurve(
      x + width - radius,
      y + height,
      x + width,
      y + height,
      x + width,
      y + height - radius
    )
  );
  recPoints = recPoints.concat(
    quadraticBezierCurve(x + width, y + radius, x + width, y, x + width - radius, y)
  );
  recPoints = recPoints.concat(quadraticBezierCurve(x + radius, y, x, y, x, y + radius));
  if (graphicsData.fill) {
    const color = hex2rgb(graphicsData.fillColor);
    const alpha = graphicsData.fillAlpha;
    const r = color[0] * alpha;
    const g = color[1] * alpha;
    const b = color[2] * alpha;
    const verts = webGLData.points;
    const indices = webGLData.indices;
    const vecPos = verts.length / 6;
    const triangles = triangulate(recPoints, null, 2);
    for (let i = 0; i < triangles.length; i += 3) {
      indices.push(triangles[i] + vecPos);
      indices.push(triangles[i] + vecPos);
      indices.push(triangles[i + 1] + vecPos);
      indices.push(triangles[i + 2] + vecPos);
      indices.push(triangles[i + 2] + vecPos);
    }
    for (let i = 0; i < recPoints.length; i += 2) {
      // TODO verify
      verts.push(recPoints[i], recPoints[i + 1], r, g, b, alpha);
    }
  }
  if (graphicsData.lineWidth) {
    const tempPoints = graphicsData.points;
    graphicsData.points = recPoints;
    buildLine(graphicsData, webGLData);
    graphicsData.points = tempPoints;
  }
}

/**
 *
 * @param {object} graphicsData - TBD.
 * @param {object} webGLData - TBD.
 */
export function buildCircle(graphicsData, webGLData) {
  // need to convert points to a nice regular data
  const circleData = graphicsData.shape;
  const x = circleData.x;
  const y = circleData.y;
  let width;
  let height;
  // TODO - bit hacky??
  if (graphicsData.type === GEOM_CIRCLE) {
    width = circleData.radius;
    height = circleData.radius;
  } else {
    width = circleData.width;
    height = circleData.height;
  }
  const totalSegs = 40;
  const seg = (Math.PI * 2) / totalSegs;
  if (graphicsData.fill) {
    const color = hex2rgb(graphicsData.fillColor);
    const alpha = graphicsData.fillAlpha;
    const r = color[0] * alpha;
    const g = color[1] * alpha;
    const b = color[2] * alpha;
    const verts = webGLData.points;
    const indices = webGLData.indices;
    let vecPos = verts.length / 6;
    indices.push(vecPos);
    for (let i = 0; i < totalSegs + 1; i += 1) {
      verts.push(x, y, r, g, b, alpha);
      verts.push(x + Math.sin(seg * i) * width, y + Math.cos(seg * i) * height, r, g, b, alpha);
      indices.push(vecPos, vecPos + 1);
      vecPos += 2;
    }
    indices.push(vecPos - 1);
  }
  if (graphicsData.lineWidth) {
    const tempPoints = graphicsData.points;
    graphicsData.points = [];
    for (let i = 0; i < totalSegs + 1; i += 1) {
      graphicsData.points.push(x + Math.sin(seg * i) * width, y + Math.cos(seg * i) * height);
    }
    buildLine(graphicsData, webGLData);
    graphicsData.points = tempPoints;
  }
}

/**
 *
 * @param {object} graphicsData - TBD.
 * @param {object} webGLData - TBD.
 */
export function buildComplexPoly(graphicsData, webGLData) {
  // TODO - no need to copy this as it gets turned into a Float32Array anyways..
  const points = graphicsData.points.slice();
  if (points.length < 6) {
    return;
  }
  // get first and last point.. figure out the middle!
  const indices = webGLData.indices;
  webGLData.points = points;
  webGLData.alpha = graphicsData.fillAlpha;
  webGLData.color = hex2rgb(graphicsData.fillColor);
  /*
   calculate the bounds..
   */
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  let x;
  let y;
  // get size..
  for (let i = 0; i < points.length; i += 2) {
    x = points[i];
    y = points[i + 1];
    minX = x < minX ? x : minX;
    maxX = x > maxX ? x : maxX;
    minY = y < minY ? y : minY;
    maxY = y > maxY ? y : maxY;
  }
  // add a quad to the end cos there is no point making another buffer!
  points.push(minX, minY, maxX, minY, maxX, maxY, minX, maxY);
  // push a quad onto the end..
  // TODO - this aint needed!
  const length = points.length / 2;
  for (let i = 0; i < length; i += 1) {
    indices.push(i);
  }
}

/**
 *
 * @param {object} graphicsData - TBD.
 * @param {object} webGLData - TBD.
 * @returns {boolean} TBD.
 */
export function buildPoly(graphicsData, webGLData) {
  const points = graphicsData.points;
  if (points.length < 6) {
    return false;
  }
  // get first and last point.. figure out the middle!
  const verts = webGLData.points;
  const indices = webGLData.indices;
  const length = points.length / 2;
  // sort color
  const color = hex2rgb(graphicsData.fillColor);
  const alpha = graphicsData.fillAlpha;
  const r = color[0] * alpha;
  const g = color[1] * alpha;
  const b = color[2] * alpha;
  const triangles = triangulate(points, null, 2);
  if (!triangles) {
    return false;
  }
  const vertPos = verts.length / 6;
  for (let i = 0; i < triangles.length; i += 3) {
    indices.push(triangles[i] + vertPos);
    indices.push(triangles[i] + vertPos);
    indices.push(triangles[i + 1] + vertPos);
    indices.push(triangles[i + 2] + vertPos);
    indices.push(triangles[i + 2] + vertPos);
  }
  for (let i = 0; i < length; i += 1) {
    verts.push(points[i * 2], points[i * 2 + 1], r, g, b, alpha);
  }
  return true;
}

/**
 *
 * @param {object} graphics - TBD.
 * @param {object} gl - TBD.
 */
export function updateGraphics(graphics, gl) {
  const stencilBufferLimit = getStencilBufferLimit();
  // get the contexts graphics object
  let webGL = graphics._webGL[gl.id];
  // if the graphics object does not exist in the webGL context time to create it!
  if (!webGL) {
    webGL = { lastIndex: 0, data: [], gl };
    graphics._webGL[gl.id] = webGL;
  }
  // flag the graphics as not dirty as we are about to update it...
  graphics.dirty = false;
  let i;
  // if the user cleared the graphics object we will need to clear every object
  if (graphics.clearDirty) {
    graphics.clearDirty = false;
    // lop through and return all the webGLDatas to the object pool so than can be reused later on
    for (i = 0; i < webGL.data.length; i += 1) {
      const graphicsData = webGL.data[i];
      graphicsData.reset();
      getGraphicsDataPool().push(graphicsData);
    }
    // clear the array and reset the index..
    webGL.data = [];
    webGL.lastIndex = 0;
  }
  let webGLData;
  // loop through the graphics datas and construct each one..
  // if the object is a complex fill then the new stencil buffer technique will be used
  // other wise graphics objects will be pushed into a batch..
  for (i = webGL.lastIndex; i < graphics.graphicsData.length; i += 1) {
    const data = graphics.graphicsData[i];
    if (data.type === GEOM_POLYGON) {
      // need to add the points the the graphics object..
      data.points = data.shape.points.slice();
      if (data.shape.closed) {
        // close the poly if the value is true!
        if (
          data.points[0] !== data.points[data.points.length - 2] ||
          data.points[1] !== data.points[data.points.length - 1]
        ) {
          data.points.push(data.points[0], data.points[1]);
        }
      }
      // MAKE SURE WE HAVE THE CORRECT TYPE..
      if (data.fill) {
        if (data.points.length >= stencilBufferLimit) {
          if (data.points.length < stencilBufferLimit * 2) {
            webGLData = switchMode(webGL, 0);
            const canDrawUsingSimple = buildPoly(data, webGLData);
            if (!canDrawUsingSimple) {
              webGLData = switchMode(webGL, 1);
              buildComplexPoly(data, webGLData);
            }
          } else {
            webGLData = switchMode(webGL, 1);
            buildComplexPoly(data, webGLData);
          }
        }
      }
      if (data.lineWidth > 0) {
        webGLData = switchMode(webGL, 0);
        buildLine(data, webGLData);
      }
    } else {
      webGLData = switchMode(webGL, 0);
      if (data.type === GEOM_RECTANGLE) {
        buildRectangle(data, webGLData);
      } else if (data.type === GEOM_CIRCLE || data.type === GEOM_ELLIPSE) {
        buildCircle(data, webGLData);
      } else if (data.type === GEOM_ROUNDED_RECTANGLE) {
        buildRoundedRectangle(data, webGLData);
      }
    }
    webGL.lastIndex += 1;
  }
  // upload all the dirty data...
  for (i = 0; i < webGL.data.length; i += 1) {
    webGLData = webGL.data[i];
    if (webGLData.dirty) {
      webGLData.upload();
    }
  }
}

/**
 *
 * @param {object} graphics - TBD.
 * @param {object} renderSession - TBD.
 */
export function renderGraphics(graphics, renderSession) {
  const gl = renderSession.gl;
  const projection = renderSession.projection;
  const offset = renderSession.offset;
  let shader = renderSession.shaderManager.primitiveShader;
  let webGLData;
  if (graphics.dirty) {
    updateGraphics(graphics, gl);
  }
  const webGL = graphics._webGL[gl.id];
  // https://github.com/photonstorm/phaser-ce/pull/179
  if (!webGL) {
    return;
  }
  // This could be speeded up for sure!
  for (let i = 0; i < webGL.data.length; i += 1) {
    if (webGL.data[i].mode === 1) {
      webGLData = webGL.data[i];
      renderSession.stencilManager.pushStencil(graphics, webGLData, renderSession);
      // render quad..
      gl.drawElements(gl.TRIANGLE_FAN, 4, gl.UNSIGNED_SHORT, (webGLData.indices.length - 4) * 2);
      renderSession.stencilManager.popStencil(graphics, webGLData, renderSession);
    } else {
      webGLData = webGL.data[i];
      renderSession.shaderManager.setShader(shader); // activatePrimitiveShader();
      shader = renderSession.shaderManager.primitiveShader;
      gl.uniformMatrix3fv(shader.translationMatrix, false, graphics.worldTransform.toArray(true));
      gl.uniform1f(shader.flipY, 1);
      gl.uniform2f(shader.projectionVector, projection.x, -projection.y);
      gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);
      gl.uniform3fv(shader.tintColor, hex2rgb(graphics.tint));
      gl.uniform1f(shader.alpha, graphics.worldAlpha);
      gl.bindBuffer(gl.ARRAY_BUFFER, webGLData.buffer);
      gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 4 * 6, 0);
      gl.vertexAttribPointer(shader.colorAttribute, 4, gl.FLOAT, false, 4 * 6, 2 * 4);
      // set the index buffer!
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webGLData.indexBuffer);
      gl.drawElements(gl.TRIANGLE_STRIP, webGLData.indices.length, gl.UNSIGNED_SHORT, 0);
    }
  }
}
