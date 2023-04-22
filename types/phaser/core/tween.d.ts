export class Tween {
    /**
     * TBD.
     * @param target - TBD.
     * @param {Game} game - TBD.
     * @param manager - TBD.
     */
    constructor(target: any, game: Game, manager: any);
    game: Game;
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
    _onUpdateCallback: Function;
    _onUpdateCallbackContext: any;
    _pausedTime: number;
    _codePaused: boolean;
    _hasStarted: boolean;
    /**
     * TBD.
     * @param properties - TBD.
     * @param duration - TBD.
     * @param ease - TBD.
     * @param autoStart
     * @param delay - TBD.
     * @param repeat - TBD.
     * @param yoyo - TBD.
     * @returns {Tween} TBD.
     */
    to(properties: any, duration?: number, ease?: string, autoStart?: boolean, delay?: number, repeat?: number, yoyo?: boolean): Tween;
    /**
     * TBD.
     * @param properties - TBD.
     * @param duration - TBD.
     * @param ease - TBD.
     * @param autoStart
     * @param delay - TBD.
     * @param repeat - TBD.
     * @param yoyo - TBD.
     * @returns {Tween} TBD.
     */
    from(properties: any, duration?: number, ease?: string, autoStart?: boolean, delay?: number, repeat?: number, yoyo?: boolean): Tween;
    /**
     * TBD.
     * @param index - TBD.
     * @returns {Tween} TBD.
     */
    start(index?: number): Tween;
    /**
     * TBD.
     * @param complete - TBD.
     * @returns {Tween} TBD.
     */
    stop(complete?: boolean): Tween;
    /**
     * TBD.
     * @param property - TBD.
     * @param value - TBD.
     * @param index - TBD.
     * @returns {Tween} TBD.
     */
    updateTweenData(property: any, value: any, index?: number): Tween;
    /**
     * TBD.
     * @param duration - TBD.
     * @param index - TBD.
     * @returns {Tween} TBD.
     */
    delay(duration: any, index: any): Tween;
    /**
     * TBD.
     * @param total - TBD.
     * @param repeatDelay - TBD.
     * @param index - TBD.
     * @returns {Tween} TBD.
     */
    repeat(total: any, repeatDelay?: number, index?: number): Tween;
    /**
     * TBD.
     * @param duration - TBD.
     * @param index - TBD.
     * @returns {Tween} TBD.
     */
    repeatDelay(duration: any, index: any): Tween;
    /**
     * TBD.
     * @param enable - TBD.
     * @param yoyoDelay - TBD.
     * @param index - TBD.
     * @returns {Tween} TBD.
     */
    yoyo(enable: any, yoyoDelay?: number, index?: number): Tween;
    /**
     * TBD.
     * @param duration - TBD.
     * @param index - TBD.
     * @returns {Tween} TBD.
     */
    yoyoDelay(duration: any, index: any): Tween;
    /**
     * TBD.
     * @param ease - TBD.
     * @param index - TBD.
     * @returns {Tween} TBD.
     */
    easing(ease: any, index: any): Tween;
    /**
     * TBD.
     * @param interpolation - TBD.
     * @param context - TBD.
     * @param index - TBD.
     * @returns {Tween} TBD.
     */
    interpolation(interpolation: any, context?: typeof MathUtils, index?: number): Tween;
    /**
     * TBD.
     * @param total - TBD.
     * @returns {Tween} TBD.
     */
    repeatAll(total?: number): Tween;
    /**
     * TBD.
     * @param {...any} args
     * @returns {Tween} TBD.
     */
    chain(...args: any[]): Tween;
    /**
     * TBD.
     * @param value - TBD.
     * @returns {Tween} TBD.
     */
    loop(value?: boolean): Tween;
    /**
     * TBD.
     * @param {Function} callback - TBD.
     * @param callbackContext
     * @returns {Tween} TBD.
     */
    onUpdateCallback(callback: Function, callbackContext: any): Tween;
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
     * @param {number} time - TBD.
     * @returns {boolean} TBD.
     */
    update(time: number): boolean;
    /**
     * TBD.
     * @param frameRate
     * @param data
     */
    generateData(frameRate?: number, data?: any[]): any[];
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get totalDuration(): number;
}
import { Game } from './game';
import { Signal } from './signal';
import * as MathUtils from '../util/math';
//# sourceMappingURL=tween.d.ts.map