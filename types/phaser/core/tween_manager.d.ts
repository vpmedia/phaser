export class TweenManager {
    /**
     * TBD.
     * @param {import('./game.js').Game} game - TBD.
     */
    constructor(game: import("./game.js").Game);
    game: import("./game.js").Game;
    _tweens: any[];
    _add: any[];
    easeMap: {
        Linear: typeof LinearNone;
        Quad: typeof QuadraticOut;
        Cubic: typeof CubicOut;
        Quart: typeof QuarticOut;
        Quint: typeof QuinticOut;
        Sine: typeof SinusoidalOut;
        Expo: typeof ExponentialOut;
        Circ: typeof CircularOut;
        Elastic: typeof ElasticOut;
        Back: typeof BackOut;
        Bounce: typeof BounceOut;
        'Quad.easeIn': typeof QuadraticIn;
        'Cubic.easeIn': typeof CubicIn;
        'Quart.easeIn': typeof QuarticIn;
        'Quint.easeIn': typeof QuinticIn;
        'Sine.easeIn': typeof SinusoidalIn;
        'Expo.easeIn': typeof ExponentialIn;
        'Circ.easeIn': typeof CircularIn;
        'Elastic.easeIn': typeof ElasticIn;
        'Back.easeIn': typeof BackIn;
        'Bounce.easeIn': typeof BounceIn;
        'Quad.easeOut': typeof QuadraticOut;
        'Cubic.easeOut': typeof CubicOut;
        'Quart.easeOut': typeof QuarticOut;
        'Quint.easeOut': typeof QuinticOut;
        'Sine.easeOut': typeof SinusoidalOut;
        'Expo.easeOut': typeof ExponentialOut;
        'Circ.easeOut': typeof CircularOut;
        'Elastic.easeOut': typeof ElasticOut;
        'Back.easeOut': typeof BackOut;
        'Bounce.easeOut': typeof BounceOut;
        'Quad.easeInOut': typeof QuadraticInOut;
        'Cubic.easeInOut': typeof CubicInOut;
        'Quart.easeInOut': typeof QuarticInOut;
        'Quint.easeInOut': typeof QuinticInOut;
        'Sine.easeInOut': typeof SinusoidalInOut;
        'Expo.easeInOut': typeof ExponentialInOut;
        'Circ.easeInOut': typeof CircularInOut;
        'Elastic.easeInOut': typeof ElasticInOut;
        'Back.easeInOut': typeof BackInOut;
        'Bounce.easeInOut': typeof BounceInOut;
    };
    /**
     * TBD.
     * @returns {Tween[]} TBD.
     */
    getAll(): Tween[];
    /**
     * TBD.
     */
    removeAll(): void;
    /**
     * TBD.
     * @param {object} obj - TBD.
     * @param {object[]} children - TBD.
     */
    removeFrom(obj: object, children?: object[]): void;
    /**
     * TBD.
     * @param {Tween} tween - TBD.
     */
    add(tween: Tween): void;
    /**
     * TBD.
     * @param {object} object - TBD.
     * @returns {Tween} TBD.
     */
    create(object: object): Tween;
    /**
     * TBD.
     * @param {Tween} tween - TBD.
     */
    remove(tween: Tween): void;
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    update(): boolean;
    /**
     * TBD.
     * @param {object} object - TBD.
     * @returns {boolean} TBD.
     */
    isTweening(object: object): boolean;
    /**
     * TBD.
     */
    _pauseAll(): void;
    /**
     * TBD.
     */
    _resumeAll(): void;
    /**
     * TBD.
     */
    pauseAll(): void;
    /**
     * TBD.
     */
    resumeAll(): void;
}
import { LinearNone } from './tween_easing.js';
import { QuadraticOut } from './tween_easing.js';
import { CubicOut } from './tween_easing.js';
import { QuarticOut } from './tween_easing.js';
import { QuinticOut } from './tween_easing.js';
import { SinusoidalOut } from './tween_easing.js';
import { ExponentialOut } from './tween_easing.js';
import { CircularOut } from './tween_easing.js';
import { ElasticOut } from './tween_easing.js';
import { BackOut } from './tween_easing.js';
import { BounceOut } from './tween_easing.js';
import { QuadraticIn } from './tween_easing.js';
import { CubicIn } from './tween_easing.js';
import { QuarticIn } from './tween_easing.js';
import { QuinticIn } from './tween_easing.js';
import { SinusoidalIn } from './tween_easing.js';
import { ExponentialIn } from './tween_easing.js';
import { CircularIn } from './tween_easing.js';
import { ElasticIn } from './tween_easing.js';
import { BackIn } from './tween_easing.js';
import { BounceIn } from './tween_easing.js';
import { QuadraticInOut } from './tween_easing.js';
import { CubicInOut } from './tween_easing.js';
import { QuarticInOut } from './tween_easing.js';
import { QuinticInOut } from './tween_easing.js';
import { SinusoidalInOut } from './tween_easing.js';
import { ExponentialInOut } from './tween_easing.js';
import { CircularInOut } from './tween_easing.js';
import { ElasticInOut } from './tween_easing.js';
import { BackInOut } from './tween_easing.js';
import { BounceInOut } from './tween_easing.js';
import { Tween } from './tween.js';
//# sourceMappingURL=tween_manager.d.ts.map