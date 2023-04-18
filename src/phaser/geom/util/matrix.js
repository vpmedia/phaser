/**
 * @module geom/util/matrix
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
import { Matrix } from  '../matrix';

/**
 * TBD.
 * @param {Matrix} input - TBD.
 * @param {Matrix} output - TBD.
 * @returns {Matrix} TBD.
 */
export function clone(input, output = null) {
  const result = output || new Matrix();
  result.a = input.a;
  result.b = input.b;
  result.c = input.c;
  result.d = input.d;
  result.tx = input.tx;
  result.ty = input.ty;
  return result;
}

/**
 * TBD.
 * @returns {Matrix} TBD.
 */
export function getIdentityMatrix() {
  if (!window.PhaserRegistry) {
    window.PhaserRegistry = {};
  }
  if (!window.PhaserRegistry.IDENTITY_MATRIX) {
    window.PhaserRegistry.IDENTITY_MATRIX = new Matrix();
  }
  return window.PhaserRegistry.IDENTITY_MATRIX;
}

/**
 * TBD.
 * @returns {Matrix} TBD.
 */
export function getTempMatrix() {
  if (!window.PhaserRegistry) {
    window.PhaserRegistry = {};
  }
  if (!window.PhaserRegistry.TEMP_MATRIX) {
    window.PhaserRegistry.TEMP_MATRIX = new Matrix();
  }
  return window.PhaserRegistry.TEMP_MATRIX;
}
