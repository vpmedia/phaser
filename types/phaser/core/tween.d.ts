export class Tween {
    constructor(target: any, game: any, manager: any);
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
    to(properties: any, duration?: number, ease?: string, autoStart?: boolean, delay?: number, repeat?: number, yoyo?: boolean): Tween;
    from(properties: any, duration?: number, ease?: string, autoStart?: boolean, delay?: number, repeat?: number, yoyo?: boolean): Tween;
    start(index?: number): Tween;
    stop(complete?: boolean): Tween;
    updateTweenData(property: any, value: any, index?: number): Tween;
    delay(duration: any, index: any): Tween;
    repeat(total: any, repeatDelay?: number, index?: number): Tween;
    repeatDelay(duration: any, index: any): Tween;
    yoyo(enable: any, yoyoDelay?: number, index?: number): Tween;
    yoyoDelay(duration: any, index: any): Tween;
    easing(ease: any, index: any): Tween;
    interpolation(interpolation: any, context?: typeof MathUtils, index?: number): Tween;
    repeatAll(total?: number): Tween;
    chain(...args: any[]): Tween;
    loop(value?: boolean): Tween;
    onUpdateCallback(callback: any, callbackContext: any): Tween;
    pause(): void;
    _pause(): void;
    resume(): void;
    _resume(): void;
    update(time: any): boolean;
    generateData(frameRate?: number, data?: any[]): any[];
    get totalDuration(): number;
}
import { Signal } from './signal';
import * as MathUtils from '../util/math';
//# sourceMappingURL=tween.d.ts.map