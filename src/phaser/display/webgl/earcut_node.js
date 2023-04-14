/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 */

export default class {
  constructor(i, x, y) {
    // vertice index in coordinates array
    this.i = i;
    // vertex coordinates
    this.x = x;
    this.y = y;
    // previous and next vertice nodes in a polygon ring
    this.prev = null;
    this.next = null;
    // z-order curve value
    this.z = null;
    // previous and next nodes in z-order
    this.prevZ = null;
    this.nextZ = null;
    // indicates whether this is a steiner point
    this.steiner = false;
  }
}
