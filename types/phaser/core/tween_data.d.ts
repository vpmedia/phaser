export class TweenData {
    /**
     * TBD.
     * @param parent - TBD.
     */
    constructor(parent: any);
    parent: any;
    game: any;
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
    startTime: any;
    easingFunction: string;
    interpolationFunction: typeof MathUtils.linearInterpolation;
    interpolationContext: typeof MathUtils;
    isRunning: boolean;
    isFrom: boolean;
    /**
     * TBD.
     * @param properties - TBD.
     * @param {number} duration - TBD.
     * @param {string} ease - TBD.
     * @param {number} delay - TBD.
     * @param {number} repeat - TBD.
     * @param {boolean} yoyo - TBD.
     * @returns {TweenData} TBD.
     */
    to(properties: any, duration: number, ease: string, delay: number, repeat: number, yoyo: boolean): TweenData;
    /**
     * TBD.
     * @param properties - TBD.
     * @param {number} duration - TBD.
     * @param {string} ease - TBD.
     * @param {number} delay - TBD.
     * @param {number} repeat - TBD.
     * @param {boolean} yoyo - TBD.
     * @returns {TweenData} TBD.
     */
    from(properties: any, duration: number, ease: string, delay: number, repeat: number, yoyo: boolean): TweenData;
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
import * as MathUtils from '../util/math';
//# sourceMappingURL=tween_data.d.ts.map