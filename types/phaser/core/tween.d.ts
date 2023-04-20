export class Tween {
    /**
     * TBD.
     * @param target
     * @param {object} game - TBD.
     * @param manager
     */
    constructor(target: any, game: object, manager: any);
    game: any;
    target: any;
    manager: any;
    timeline: any[];
    reverse: boolean;
    timeScale: number;
    repeatCounter: number;
    pendingDelete: boolean;
    onStart: Signal;
    onLoop: Signal;
    onRepeat: Signal;
    onChildComplete: Signal;
    onComplete: Signal;
    isRunning: boolean;
    current: number;
    properties: {};
    chainedTween: any;
    isPaused: boolean;
    _onUpdateCallback: any;
    _onUpdateCallbackContext: any;
    _pausedTime: number;
    _codePaused: boolean;
    _hasStarted: boolean;
    /**
     * TBD.
     * @param properties
     * @param duration
     * @param ease
     * @param autoStart
     * @param delay
     * @param repeat
     * @param yoyo
     */
    to(properties: any, duration?: number, ease?: string, autoStart?: boolean, delay?: number, repeat?: number, yoyo?: boolean): Tween;
    /**
     * TBD.
     * @param properties
     * @param duration
     * @param ease
     * @param autoStart
     * @param delay
     * @param repeat
     * @param yoyo
     */
    from(properties: any, duration?: number, ease?: string, autoStart?: boolean, delay?: number, repeat?: number, yoyo?: boolean): Tween;
    /**
     * TBD.
     * @param index
     */
    start(index?: number): Tween;
    /**
     * TBD.
     * @param complete
     */
    stop(complete?: boolean): Tween;
    /**
     * TBD.
     * @param property
     * @param value
     * @param index
     */
    updateTweenData(property: any, value: any, index?: number): Tween;
    /**
     * TBD.
     * @param duration
     * @param index
     */
    delay(duration: any, index: any): Tween;
    /**
     * TBD.
     * @param total
     * @param repeatDelay
     * @param index
     */
    repeat(total: any, repeatDelay?: number, index?: number): Tween;
    /**
     * TBD.
     * @param duration
     * @param index
     */
    repeatDelay(duration: any, index: any): Tween;
    /**
     * TBD.
     * @param enable
     * @param yoyoDelay
     * @param index
     */
    yoyo(enable: any, yoyoDelay?: number, index?: number): Tween;
    /**
     * TBD.
     * @param duration
     * @param index
     */
    yoyoDelay(duration: any, index: any): Tween;
    /**
     * TBD.
     * @param ease
     * @param index
     */
    easing(ease: any, index: any): Tween;
    /**
     * TBD.
     * @param interpolation
     * @param context
     * @param index
     */
    interpolation(interpolation: any, context?: typeof MathUtils, index?: number): Tween;
    /**
     * TBD.
     * @param total
     */
    repeatAll(total?: number): Tween;
    /**
     * TBD.
     * @param {...any} args
     */
    chain(...args: any[]): Tween;
    /**
     * TBD.
     * @param value
     */
    loop(value?: boolean): Tween;
    /**
     * TBD.
     * @param callback
     * @param callbackContext
     */
    onUpdateCallback(callback: any, callbackContext: any): Tween;
    /**
     * TBD.
     */
    pause(): void;
    /**
     * TBD.
     */
    _pause(): void;
    /**
     * TBD.
     */
    resume(): void;
    /**
     * TBD.
     */
    _resume(): void;
    /**
     * TBD.
     * @param time
     */
    update(time: any): boolean;
    /**
     * TBD.
     * @param frameRate
     * @param data
     */
    generateData(frameRate?: number, data?: any[]): any[];
    /**
     * TBD.
     */
    get totalDuration(): number;
}
import { Signal } from './signal';
import * as MathUtils from '../util/math';
//# sourceMappingURL=tween.d.ts.map