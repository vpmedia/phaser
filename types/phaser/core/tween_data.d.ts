export class TweenData {
    /**
     * TBD.
     * @param {import('./tween').Tween} parent - TBD.
     */
    constructor(parent: import('./tween').Tween);
    parent: import("./tween").Tween;
    game: import("./game.js").Game;
    vStart: {};
    vStartCache: {};
    vEnd: {};
    vEndCache: {};
    duration: number;
    percent: number;
    value: number;
    repeatCounter: number;
    repeatDelay: number;
    repeatTotal: number;
    interpolate: boolean;
    yoyo: boolean;
    yoyoDelay: number;
    inReverse: boolean;
    delay: number;
    dt: number;
    startTime: number;
    easingFunction: string;
    interpolationFunction: typeof MathUtils.linearInterpolation;
    interpolationContext: typeof MathUtils;
    isRunning: boolean;
    isFrom: boolean;
    /**
     * TBD.
     * @param {object} properties - TBD.
     * @param {number} duration - TBD.
     * @param {string} ease - TBD.
     * @param {number} delay - TBD.
     * @param {number} repeat - TBD.
     * @param {boolean} yoyo - TBD.
     * @returns {TweenData} TBD.
     */
    to(properties: object, duration: number, ease: string, delay: number, repeat: number, yoyo: boolean): TweenData;
    /**
     * TBD.
     * @param {object} properties - TBD.
     * @param {number} duration - TBD.
     * @param {string} ease - TBD.
     * @param {number} delay - TBD.
     * @param {number} repeat - TBD.
     * @param {boolean} yoyo - TBD.
     * @returns {TweenData} TBD.
     */
    from(properties: object, duration: number, ease: string, delay: number, repeat: number, yoyo: boolean): TweenData;
    /**
     * TBD.
     * @returns {TweenData} TBD.
     */
    start(): TweenData;
    yoyoCounter: number;
    /**
     * TBD.
     * @returns {TweenData} TBD.
     */
    loadValues(): TweenData;
    /**
     * TBD.
     * @param {number} time - TBD.
     * @returns {number} TBD.
     */
    update(time: number): number;
    /**
     * TBD.
     * @param {number} frameRate - TBD.
     * @returns {object[]} TBD.
     */
    generateData(frameRate: number): object[];
    /**
     * TBD.
     * @returns {number} TBD.
     */
    repeat(): number;
}
import * as MathUtils from '../util/math.js';
//# sourceMappingURL=tween_data.d.ts.map