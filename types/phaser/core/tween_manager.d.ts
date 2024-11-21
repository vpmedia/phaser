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
        Linear: (k: number) => number;
        Quad: (k: number) => number;
        Cubic: (k: number) => number;
        Quart: (k: number) => number;
        Quint: (k: number) => number;
        Sine: (k: number) => number;
        Expo: (k: number) => number;
        Circ: (k: number) => number;
        Elastic: (k: number) => number;
        Back: (k: number) => number;
        Bounce: (k: number) => number;
        'Quad.easeIn': (k: number) => number;
        'Cubic.easeIn': (k: number) => number;
        'Quart.easeIn': (k: number) => number;
        'Quint.easeIn': (k: number) => number;
        'Sine.easeIn': (k: number) => number;
        'Expo.easeIn': (k: number) => number;
        'Circ.easeIn': (k: number) => number;
        'Elastic.easeIn': (k: number) => number;
        'Back.easeIn': (k: number) => number;
        'Bounce.easeIn': (k: number) => number;
        'Quad.easeOut': (k: number) => number;
        'Cubic.easeOut': (k: number) => number;
        'Quart.easeOut': (k: number) => number;
        'Quint.easeOut': (k: number) => number;
        'Sine.easeOut': (k: number) => number;
        'Expo.easeOut': (k: number) => number;
        'Circ.easeOut': (k: number) => number;
        'Elastic.easeOut': (k: number) => number;
        'Back.easeOut': (k: number) => number;
        'Bounce.easeOut': (k: number) => number;
        'Quad.easeInOut': (k: number) => number;
        'Cubic.easeInOut': (k: number) => number;
        'Quart.easeInOut': (k: number) => number;
        'Quint.easeInOut': (k: number) => number;
        'Sine.easeInOut': (k: number) => number;
        'Expo.easeInOut': (k: number) => number;
        'Circ.easeInOut': (k: number) => number;
        'Elastic.easeInOut': (k: number) => number;
        'Back.easeInOut': (k: number) => number;
        'Bounce.easeInOut': (k: number) => number;
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
import { Tween } from './tween.js';
//# sourceMappingURL=tween_manager.d.ts.map