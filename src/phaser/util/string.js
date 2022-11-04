/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */

/**
 * TBD
 *
 * @returns {string} TBD
 */
export function generateID() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/**
 * TBD
 *
 * @returns {string} TBD
 */
export function generateUUID() {
  return (`${generateID()}${generateID()}-${generateID()}-4${generateID().substr(0, 3)}-${generateID()}-${generateID()}${generateID()}${generateID()}`).toLowerCase();
}

/**
 * TBD
 *
 * @returns {string} TBD
 */
export function generateShaderID() {
  return (`${generateID()}${generateID()}-${generateID()}`).toLowerCase();
}
