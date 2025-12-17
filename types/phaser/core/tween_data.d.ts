export class TweenData {
    /**
     * Creates a new TweenData instance.
     * @param {import('./tween.js').Tween} parent - The parent Tween instance.
     */
    constructor(parent: import("./tween.js").Tween);
    parent: import("./tween.js").Tween;
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
    easingFunction: (k: any) => any;
    interpolationFunction: (v: number[], k: number) => number;
    interpolationContext: typeof MathUtils;
    isRunning: boolean;
    isFrom: boolean;
    /**
     * Sets the target properties to tween to.
     * @param {object} properties - The properties to tween to.
     * @param {number} duration - The duration of the tween in milliseconds.
     * @param {(number) => number} ease - The easing function to use.
     * @param {number} delay - The delay before starting the tween in milliseconds.
     * @param {number} repeat - The number of times to repeat the tween (0 = no repeat, -1 = infinite).
     * @param {boolean} yoyo - Whether to reverse the tween on each repeat.
     * @returns {TweenData} This TweenData object for chaining.
     */
    to(properties: object, duration: number, ease: (number: any) => number, delay: number, repeat: number, yoyo: boolean): TweenData;
    /**
     * Sets the target properties to tween from (in reverse).
     * @param {object} properties - The properties to tween from.
     * @param {number} duration - The duration of the tween in milliseconds.
     * @param {(number) => number} ease - The easing function to use.
     * @param {number} delay - The delay before starting the tween in milliseconds.
     * @param {number} repeat - The number of times to repeat the tween (0 = no repeat, -1 = infinite).
     * @param {boolean} yoyo - Whether to reverse the tween on each repeat.
     * @returns {TweenData} This TweenData object for chaining.
     */
    from(properties: object, duration: number, ease: (number: any) => number, delay: number, repeat: number, yoyo: boolean): TweenData;
    /**
     * Starts the tween.
     * @returns {TweenData} This TweenData object for chaining.
     */
    start(): TweenData;
    yoyoCounter: number;
    /**
     * Loads the tween values from the parent object.
     * @returns {TweenData} This TweenData object for chaining.
     */
    loadValues(): TweenData;
    /**
     * Updates the tween at a given time.
     * @param {number} time - The current time in milliseconds.
     * @returns {number} The tween status (TWEEN_PENDING, TWEEN_RUNNING, or TWEEN_COMPLETE).
     */
    update(time: number): number;
    /**
     * Generates an array of tween data points for a given frame rate.
     * @param {number} frameRate - The frame rate to generate data for.
     * @returns {object[]} An array of tween data points.
     */
    generateData(frameRate: number): object[];
    /**
     * Handles tween repetition logic.
     * @returns {number} The tween status (TWEEN_LOOPED or TWEEN_COMPLETE).
     */
    repeat(): number;
}
import * as MathUtils from '../util/math.js';
//# sourceMappingURL=tween_data.d.ts.map