export default class _default {
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
    to(properties: any, duration: any, ease: any, delay: any, repeat: any, yoyo: any): default;
    from(properties: any, duration: any, ease: any, delay: any, repeat: any, yoyo: any): default;
    start(): default;
    yoyoCounter: number | undefined;
    loadValues(): default;
    update(time: any): 0 | 1 | 2 | 3;
    generateData(frameRate: any): {}[];
    repeat(): 2 | 3;
}
import * as MathUtils from '../util/math';
//# sourceMappingURL=tween_data.d.ts.map