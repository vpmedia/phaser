/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 */
/**
 * TBD.
 */
export function initDefaultShaders(): void;
/**
 * TBD.
 * @param {object} gl - TBD.
 * @param {string[]|string} shaderSrc - TBD.
 * @param {object} shaderType - TBD.
 * @returns {object} TBD.
 */
export function compileShader(gl: object, shaderSrc: string[] | string, shaderType: object): object;
/**
 * TBD.
 * @param {object} gl - TBD.
 * @param {string[]|string} shaderSrc - TBD.
 * @returns {object} TBD.
 */
export function compileVertexShader(gl: object, shaderSrc: string[] | string): object;
/**
 * TBD.
 * @param {object} gl - TBD.
 * @param {string[]|string} shaderSrc - TBD.
 * @returns {object} TBD.
 */
export function compileFragmentShader(gl: object, shaderSrc: string[] | string): object;
/**
 * TBD.
 * @param {object} gl - TBD.
 * @param {string[]|string} vertexSrc - TBD.
 * @param {string[]|string} fragmentSrc - TBD.
 * @returns {object} TBD.
 */
export function compileProgram(gl: object, vertexSrc: string[] | string, fragmentSrc: string[] | string): object;
//# sourceMappingURL=util.d.ts.map