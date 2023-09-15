export class Tween {
    /**
     * TBD.
     * @param {import('../display/display_object.js').DisplayObject} target - TBD.
     * @param {import('./game.js').Game} game - TBD.
     * @param {import('./tween_manager.js').TweenManager} manager - TBD.
     */
    constructor(target: import('../display/display_object.js').DisplayObject, game: import('./game.js').Game, manager: import('./tween_manager.js').TweenManager);
    game: import("./game.js").Game;
    target: import("../display/display_object.js").DisplayObject;
    manager: import("./tween_manager.js").TweenManager;
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
     * @param {object} properties - TBD.
     * @param {number} duration - TBD.
     * @param {string} ease - TBD.
     * @param {boolean} autoStart - TBD.
     * @param {number} delay - TBD.
     * @param {number} repeat - TBD.
     * @param {boolean} yoyo - TBD.
     * @returns {Tween} TBD.
     */
    to(properties: object, duration?: number, ease?: string, autoStart?: boolean, delay?: number, repeat?: number, yoyo?: boolean): Tween;
    /**
     * TBD.
     * @param {object} properties - TBD.
     * @param {number} duration - TBD.
     * @param {string} ease - TBD.
     * @param {boolean} autoStart - TBD.
     * @param {number} delay - TBD.
     * @param {number} repeat - TBD.
     * @param {boolean} yoyo - TBD.
     * @returns {Tween} TBD.
     */
    from(properties: object, duration?: number, ease?: string, autoStart?: boolean, delay?: number, repeat?: number, yoyo?: boolean): Tween;
    /**
     * TBD.
     * @param {number} index - TBD.
     * @returns {Tween} TBD.
     */
    start(index?: number): Tween;
    /**
     * TBD.
     * @param {boolean} complete - TBD.
     * @returns {Tween} TBD.
     */
    stop(complete?: boolean): Tween;
    /**
     * TBD.
     * @param {string} property - TBD.
     * @param {object} value - TBD.
     * @param {number} index - TBD.
     * @returns {Tween} TBD.
     */
    updateTweenData(property: string, value: object, index?: number): Tween;
    /**
     * TBD.
     * @param {number} duration - TBD.
     * @param {number} index - TBD.
     * @returns {Tween} TBD.
     */
    delay(duration: number, index: number): Tween;
    /**
     * TBD.
     * @param {number} total - TBD.
     * @param {number} repeatDelay - TBD.
     * @param {number} index - TBD.
     * @returns {Tween} TBD.
     */
    repeat(total: number, repeatDelay?: number, index?: number): Tween;
    /**
     * TBD.
     * @param {number} duration - TBD.
     * @param {number} index - TBD.
     * @returns {Tween} TBD.
     */
    repeatDelay(duration: number, index: number): Tween;
    /**
     * TBD.
     * @param {boolean} enable - TBD.
     * @param {number} yoyoDelay - TBD.
     * @param {number} index - TBD.
     * @returns {Tween} TBD.
     */
    yoyo(enable: boolean, yoyoDelay?: number, index?: number): Tween;
    /**
     * TBD.
     * @param {number} duration - TBD.
     * @param {number} index - TBD.
     * @returns {Tween} TBD.
     */
    yoyoDelay(duration: number, index: number): Tween;
    /**
     * TBD.
     * @param {string|Function} ease - TBD.
     * @param {number} index - TBD.
     * @returns {Tween} TBD.
     */
    easing(ease: string | Function, index: number): Tween;
    /**
     * TBD.
     * @param {Function} interpolation - TBD.
     * @param {object} context - TBD.
     * @param {number} index - TBD.
     * @returns {Tween} TBD.
     */
    interpolation(interpolation: Function, context?: object, index?: number): Tween;
    /**
     * TBD.
     * @param {number} total - TBD.
     * @returns {Tween} TBD.
     */
    repeatAll(total?: number): Tween;
    /**
     * TBD.
     * @param {...any} args - TBD.
     * @returns {Tween} TBD.
     */
    chain(...args: any[]): Tween;
    /**
     * TBD.
     * @param {boolean} value - TBD.
     * @returns {Tween} TBD.
     */
    loop(value?: boolean): Tween;
    /**
     * TBD.
     * @param {Function} callback - TBD.
     * @param {object} callbackContext - TBD.
     * @returns {Tween} TBD.
     */
    onUpdateCallback(callback: Function, callbackContext: object): Tween;
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
     * @param {number} frameRate - TBD.
     * @param {object[]} data - TBD.
     * @returns {object[]} TBD.
     */
    generateData(frameRate?: number, data?: object[]): object[];
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get totalDuration(): number;
}
import { Signal } from './signal.js';
//# sourceMappingURL=tween.d.ts.map