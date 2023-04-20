export class TweenData {
    /**
     * TBD.
     * @param parent
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
     * @param properties
     * @param duration - TBD.
     * @param ease - TBD.
     * @param delay - TBD.
     * @param repeat
     * @param yoyo
     */
    to(properties: any, duration: any, ease: any, delay: any, repeat: any, yoyo: any): TweenData;
    /**
     * TBD.
     * @param properties
     * @param duration - TBD.
     * @param ease - TBD.
     * @param delay - TBD.
     * @param repeat
     * @param yoyo
     */
    from(properties: any, duration: any, ease: any, delay: any, repeat: any, yoyo: any): TweenData;
    /**
     * TBD.
     */
    start(): TweenData;
    yoyoCounter: number;
    /**
     * TBD.
     */
    loadValues(): TweenData;
    /**
     * TBD.
     * @param time
     */
    update(time: any): number;
    /**
     * TBD.
     * @param frameRate
     */
    generateData(frameRate: any): {}[];
    /**
     * TBD.
     */
    repeat(): number;
}
import * as MathUtils from '../util/math';
//# sourceMappingURL=tween_data.d.ts.map