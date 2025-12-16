export class TweenManager {
    /**
     * TBD.
     * @param {import('./game.js').Game} game - TBD.
     */
    constructor(game: import("./game.js").Game);
    game: import("./game.js").Game;
    /** @type {Tween[]} */
    _tweens: Tween[];
    /** @type {Tween[]} */
    _add: Tween[];
    /** @type {{[key: string]: (k: number) => number}} */
    easeMap: {
        [key: string]: (k: number) => number;
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
     * @param {Tween | null | undefined} tween - TBD.
     */
    remove(tween: Tween | null | undefined): void;
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