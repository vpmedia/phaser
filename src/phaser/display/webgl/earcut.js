/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import Node from './earcut_node';

/**
 *
 * @param {object} list TBD
 * @returns {object} TBD
 */
export function sortLinked(list) {
  let i;
  let p;
  let q;
  let e;
  let tail;
  let numMerges;
  let pSize;
  let qSize;
  let inSize = 1;
  do {
    p = list;
    list = null;
    tail = null;
    numMerges = 0;
    while (p) {
      numMerges += 1;
      q = p;
      pSize = 0;
      for (i = 0; i < inSize; i += 1) {
        pSize += 1;
        q = q.nextZ;
        if (!q) {
          break;
        }
      }
      qSize = inSize;
      while (pSize > 0 || (qSize > 0 && q)) {
        if (pSize === 0) {
          e = q;
          q = q.nextZ;
          qSize -= 1;
        } else if (qSize === 0 || !q) {
          e = p;
          p = p.nextZ;
          pSize -= 1;
        } else if (p.z <= q.z) {
          e = p;
          p = p.nextZ;
          pSize -= 1;
        } else {
          e = q;
          q = q.nextZ;
          qSize -= 1;
        }
        if (tail) {
          tail.nextZ = e;
        } else {
          list = e;
        }
        e.prevZ = tail;
        tail = e;
      }
      p = q;
    }
    tail.nextZ = null;
    inSize *= 2;
  } while (numMerges > 1);
  return list;
}

/**
 *
 * @param {object} a TBD
 * @param {object} b TBD
 * @returns {number} TBD
 */
export function compareX(a, b) {
  return a.x - b.x;
}

/**
 *
 * @param {number} x TBD
 * @param {number} y TBD
 * @param {number} minX TBD
 * @param {number} minY TBD
 * @param {number} size TBD
 * @returns {number} TBD
 */
export function zOrder(x, y, minX, minY, size) {
  // coords are transformed into non-negative 15-bit integer range
  x = (32767 * (x - minX)) / size;
  y = (32767 * (y - minY)) / size;
  x = (x | (x << 8)) & 0x00ff00ff;
  x = (x | (x << 4)) & 0x0f0f0f0f;
  x = (x | (x << 2)) & 0x33333333;
  x = (x | (x << 1)) & 0x55555555;
  y = (y | (y << 8)) & 0x00ff00ff;
  y = (y | (y << 4)) & 0x0f0f0f0f;
  y = (y | (y << 2)) & 0x33333333;
  y = (y | (y << 1)) & 0x55555555;
  return x | (y << 1);
}

/**
 *
 * @param {object} start TBD
 * @param {number} minX TBD
 * @param {number} minY TBD
 * @param {number} size TBD
 */
export function indexCurve(start, minX, minY, size) {
  let p = start;
  do {
    if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, size);
    p.prevZ = p.prev;
    p.nextZ = p.next;
    p = p.next;
  } while (p !== start);
  p.prevZ.nextZ = null;
  p.prevZ = null;
  sortLinked(p);
}

/**
 *
 * @param {object} start TBD
 * @returns {object} TBD
 */
export function getLeftmost(start) {
  let p = start;
  let leftmost = start;
  do {
    if (p.x < leftmost.x) leftmost = p;
    p = p.next;
  } while (p !== start);
  return leftmost;
}

/**
 *
 * @param {number} ax TBD
 * @param {number} ay TBD
 * @param {number} bx TBD
 * @param {number} by TBD
 * @param {number} cx TBD
 * @param {number} cy TBD
 * @param {number} px TBD
 * @param {number} py TBD
 * @returns {object} TBD
 */
export function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
  return (
    (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
    (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
    (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0
  );
}

/**
 *
 * @param {object} p TBD
 * @param {object} q TBD
 * @param {object} r TBD
 * @returns {number} TBD
 */
export function area(p, q, r) {
  return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

/**
 *
 * @param {object} p1 TBD
 * @param {object} p2 TBD
 * @returns {boolean} TBD
 */
export function equals(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}

/**
 *
 * @param {object} p1 TBD
 * @param {object} q1 TBD
 * @param {object} p2 TBD
 * @param {object} q2 TBD
 * @returns {boolean} TBD
 */
export function intersects(p1, q1, p2, q2) {
  return (
    area(p1, q1, p2) > 0 !== area(p1, q1, q2) > 0 && area(p2, q2, p1) > 0 !== area(p2, q2, q1) > 0
  );
}

/**
 *
 * @param {object} a TBD
 * @param {object} b TBD
 * @returns {boolean} TBD
 */
export function intersectsPolygon(a, b) {
  let p = a;
  do {
    if (
      p.i !== a.i &&
      p.next.i !== a.i &&
      p.i !== b.i &&
      p.next.i !== b.i &&
      intersects(p, p.next, a, b)
    )
      return true;
    p = p.next;
  } while (p !== a);
  return false;
}

/**
 *
 * @param {object} a TBD
 * @param {object} b TBD
 * @returns {object} TBD
 */
export function locallyInside(a, b) {
  return area(a.prev, a, a.next) < 0
    ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0
    : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
}

/**
 *
 * @param {object} a TBD
 * @param {object} b TBD
 * @returns {boolean} TBD
 */
export function middleInside(a, b) {
  let p = a;
  let inside = false;
  const px = (a.x + b.x) / 2;
  const py = (a.y + b.y) / 2;
  do {
    if (
      p.y > py !== p.next.y > py &&
      px < ((p.next.x - p.x) * (py - p.y)) / (p.next.y - p.y) + p.x
    ) {
      inside = !inside;
    }
    p = p.next;
  } while (p !== a);
  return inside;
}

/**
 *
 * @param {object} a TBD
 * @param {object} b TBD
 * @returns {boolean} TBD
 */
export function isValidDiagonal(a, b) {
  return (
    equals(a, b) ||
    (a.next.i !== b.i &&
      a.prev.i !== b.i &&
      !intersectsPolygon(a, b) &&
      locallyInside(a, b) &&
      locallyInside(b, a) &&
      middleInside(a, b))
  );
}

/**
 *
 * @param {object} a TBD
 * @param {object} b TBD
 * @returns {object} TBD
 */
export function splitPolygon(a, b) {
  const a2 = new Node(a.i, a.x, a.y);
  const b2 = new Node(b.i, b.x, b.y);
  const an = a.next;
  const bp = b.prev;
  a.next = b;
  b.prev = a;
  a2.next = an;
  an.prev = a2;
  b2.next = a2;
  a2.prev = b2;
  bp.next = b2;
  b2.prev = bp;
  return b2;
}

/**
 *
 * @param {number} i TBD
 * @param {number} x TBD
 * @param {number} y TBD
 * @param {object} last TBD
 * @returns {object} TBD
 */
export function insertNode(i, x, y, last) {
  const p = new Node(i, x, y);
  if (!last) {
    p.prev = p;
    p.next = p;
  } else {
    p.next = last.next;
    p.prev = last;
    last.next.prev = p;
    last.next = p;
  }
  return p;
}

/**
 *
 * @param {object} p TBD
 */
export function removeNode(p) {
  p.next.prev = p.prev;
  p.prev.next = p.next;
  if (p.prevZ) {
    p.prevZ.nextZ = p.nextZ;
  }
  if (p.nextZ) {
    p.nextZ.prevZ = p.prevZ;
  }
}

/**
 *
 * @param {object} ear TBD
 * @returns {boolean} TBD
 */
export function isEar(ear) {
  const a = ear.prev;
  const b = ear;
  const c = ear.next;
  if (area(a, b, c) >= 0) return false; // reflex, can't be an ear
  // now make sure we don't have other points inside the potential ear
  let p = ear.next.next;
  while (p !== ear.prev) {
    if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0)
      return false;
    p = p.next;
  }
  return true;
}

/**
 *
 * @param {object} ear TBD
 * @param {number} minX TBD
 * @param {number} minY TBD
 * @param {number} size TBD
 * @returns {boolean} TBD
 */
export function isEarHashed(ear, minX, minY, size) {
  const a = ear.prev;
  const b = ear;
  const c = ear.next;
  if (area(a, b, c) >= 0) return false; // reflex, can't be an ear
  // triangle bbox; min & max are calculated like this for speed
  const minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : b.x < c.x ? b.x : c.x;
  const minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : b.y < c.y ? b.y : c.y;
  const maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : b.x > c.x ? b.x : c.x;
  const maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : b.y > c.y ? b.y : c.y;
  // z-order range for the current triangle bbox;
  const minZ = zOrder(minTX, minTY, minX, minY, size);
  const maxZ = zOrder(maxTX, maxTY, minX, minY, size);
  // first look for points inside the triangle in increasing z-order
  let p = ear.nextZ;
  while (p && p.z <= maxZ) {
    if (
      p !== ear.prev &&
      p !== ear.next &&
      pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
      area(p.prev, p, p.next) >= 0
    ) {
      return false;
    }
    p = p.nextZ;
  }
  // then look for points in decreasing z-order
  p = ear.prevZ;
  while (p && p.z >= minZ) {
    if (
      p !== ear.prev &&
      p !== ear.next &&
      pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
      area(p.prev, p, p.next) >= 0
    ) {
      return false;
    }
    p = p.prevZ;
  }
  return true;
}

/**
 *
 * @param {object} data TBD
 * @param {number} start TBD
 * @param {number} end TBD
 * @param {number} dim TBD
 * @param {boolean} clockwise TBD
 * @returns {object} TBD
 */
export function linkedList(data, start, end, dim, clockwise) {
  let sum = 0;
  let i;
  let j;
  let last;
  // calculate original winding order of a polygon ring
  for (i = start, j = end - dim; i < end; i += dim) {
    sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
    j = i;
  }
  // link points into circular doubly-linked list in the specified winding order
  if (clockwise === sum > 0) {
    for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last);
  } else {
    for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);
  }
  return last;
}

/**
 *
 * @param {object} start TBD
 * @param {object} end TBD
 * @returns {object} TBD
 */
export function filterPoints(start, end) {
  if (!start) return start;
  if (!end) end = start;
  let p = start;
  let again;
  do {
    again = false;
    if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
      removeNode(p);
      p = p.prev;
      end = p;
      if (p === p.next) return null;
      again = true;
    } else {
      p = p.next;
    }
  } while (again || p !== end);
  return end;
}

/**
 *
 * @param {object} hole TBD
 * @param {object} outerNode TBD
 * @returns {object} TBD
 */
export function findHoleBridge(hole, outerNode) {
  let p = outerNode;
  const hx = hole.x;
  const hy = hole.y;
  let qx = -Infinity;
  let m;
  // find a segment intersected by a ray from the hole's leftmost point to the left;
  // segment's endpoint with lesser x will be potential connection point
  do {
    if (hy <= p.y && hy >= p.next.y) {
      const x = p.x + ((hy - p.y) * (p.next.x - p.x)) / (p.next.y - p.y);
      if (x <= hx && x > qx) {
        qx = x;
        m = p.x < p.next.x ? p : p.next;
      }
    }
    p = p.next;
  } while (p !== outerNode);
  if (!m) return null;
  if (hole.x === m.x) return m.prev; // hole touches outer segment; pick lower endpoint
  // look for points inside the triangle of hole point, segment intersection and endpoint;
  // if there are no points found, we have a valid connection;
  // otherwise choose the point of the minimum angle with the ray as connection point
  const stop = m;
  let tanMin = Infinity;
  let tan;
  p = m.next;
  while (p !== stop) {
    if (
      hx >= p.x &&
      p.x >= m.x &&
      pointInTriangle(hy < m.y ? hx : qx, hy, m.x, m.y, hy < m.y ? qx : hx, hy, p.x, p.y)
    ) {
      tan = Math.abs(hy - p.y) / (hx - p.x); // tangential
      if ((tan < tanMin || (tan === tanMin && p.x > m.x)) && locallyInside(p, hole)) {
        m = p;
        tanMin = tan;
      }
    }
    p = p.next;
  }
  return m;
}

/**
 *
 * @param {object} hole TBD
 * @param {object} outerNode TBD
 */
export function eliminateHole(hole, outerNode) {
  outerNode = findHoleBridge(hole, outerNode);
  if (outerNode) {
    const b = splitPolygon(outerNode, hole);
    filterPoints(b, b.next);
  }
}

/**
 *
 * @param {object} data TBD
 * @param {object} holeIndices TBD
 * @param {object} outerNode TBD
 * @param {object} dim TBD
 * @returns {object} TBD
 */
export function eliminateHoles(data, holeIndices, outerNode, dim) {
  const queue = [];
  let i;
  let len;
  let start;
  let end;
  let list;
  for (i = 0, len = holeIndices.length; i < len; i += 1) {
    start = holeIndices[i] * dim;
    end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
    list = linkedList(data, start, end, dim, false);
    if (list === list.next) list.steiner = true;
    queue.push(getLeftmost(list));
  }
  queue.sort(compareX);
  // process holes from left to right
  for (i = 0; i < queue.length; i += 1) {
    eliminateHole(queue[i], outerNode);
    outerNode = filterPoints(outerNode, outerNode.next);
  }
  return outerNode;
}

/**
 *
 * @param {object} start TBD
 * @param {object} triangles TBD
 * @param {number} dim TBD
 * @returns {object} TBD
 */
export function cureLocalIntersections(start, triangles, dim) {
  let p = start;
  do {
    const a = p.prev;
    const b = p.next.next;
    // a self-intersection where edge (v[i-1],v[i]) intersects (v[i+1],v[i+2])
    if (intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
      triangles.push(a.i / dim);
      triangles.push(p.i / dim);
      triangles.push(b.i / dim);
      // remove two nodes involved
      removeNode(p);
      removeNode(p.next);
      p = b;
      start = p;
    }
    p = p.next;
  } while (p !== start);
  return p;
}

/**
 *
 * @param {object} start TBD
 * @param {object} triangles TBD
 * @param {number} dim TBD
 * @param {number} minX TBD
 * @param {number} minY TBD
 * @param {number} size TBD
 */
export function splitEarcut(start, triangles, dim, minX, minY, size) {
  // look for a valid diagonal that divides the polygon into two
  let a = start;
  do {
    let b = a.next.next;
    while (b !== a.prev) {
      if (a.i !== b.i && isValidDiagonal(a, b)) {
        // split the polygon in two by the diagonal
        let c = splitPolygon(a, b);
        // filter colinear points around the cuts
        a = filterPoints(a, a.next);
        c = filterPoints(c, c.next);
        // run earcut on each half
        earcutLinked(a, triangles, dim, minX, minY, size);
        earcutLinked(c, triangles, dim, minX, minY, size);
        return;
      }
      b = b.next;
    }
    a = a.next;
  } while (a !== start);
}

/**
 *
 * @param {object} ear TBD
 * @param {object} triangles TBD
 * @param {number} dim TBD
 * @param {number} minX TBD
 * @param {number} minY TBD
 * @param {number} size TBD
 * @param {object} pass TBD
 */
export function earcutLinked(ear, triangles, dim, minX, minY, size, pass) {
  if (!ear) return;
  // interlink polygon nodes in z-order
  if (!pass && size) indexCurve(ear, minX, minY, size);
  let stop = ear;
  let prev;
  let next;
  // iterate through ears, slicing them one by one
  while (ear.prev !== ear.next) {
    prev = ear.prev;
    next = ear.next;
    if (size ? isEarHashed(ear, minX, minY, size) : isEar(ear)) {
      // cut off the triangle
      triangles.push(prev.i / dim);
      triangles.push(ear.i / dim);
      triangles.push(next.i / dim);
      removeNode(ear);
      // skipping the next vertice leads to less sliver triangles
      ear = next.next;
      stop = next.next;
      continue;
    }
    ear = next;
    // if we looped through the whole remaining polygon and can't find any more ears
    if (ear === stop) {
      // try filtering points and slicing again
      if (!pass) {
        earcutLinked(filterPoints(ear), triangles, dim, minX, minY, size, 1);
        // if this didn't work, try curing all small self-intersections locally
      } else if (pass === 1) {
        ear = cureLocalIntersections(ear, triangles, dim);
        earcutLinked(ear, triangles, dim, minX, minY, size, 2);
        // as a last resort, try splitting the remaining polygon into two
      } else if (pass === 2) {
        splitEarcut(ear, triangles, dim, minX, minY, size);
      }
      break;
    }
  }
}

/**
 *
 * @param {object} data TBD
 * @param {object} holeIndices TBD
 * @param {number} dim TBD
 * @returns {object} TBD
 */
export function triangulate(data, holeIndices, dim) {
  dim = dim || 2;
  const hasHoles = holeIndices && holeIndices.length;
  const outerLen = hasHoles ? holeIndices[0] * dim : data.length;
  let outerNode = linkedList(data, 0, outerLen, dim, true);
  const triangles = [];
  if (!outerNode) return triangles;
  let minX;
  let minY;
  let maxX;
  let maxY;
  let x;
  let y;
  let size;
  if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);
  // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
  if (data.length > 80 * dim) {
    minX = data[0];
    maxX = data[0];
    minY = data[1];
    maxY = data[1];
    for (let i = dim; i < outerLen; i += dim) {
      x = data[i];
      y = data[i + 1];
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
    // minX, minY and size are later used to transform coords into integers for z-order calculation
    size = Math.max(maxX - minX, maxY - minY);
  }
  earcutLinked(outerNode, triangles, dim, minX, minY, size);
  return triangles;
}
