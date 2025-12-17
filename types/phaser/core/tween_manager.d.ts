export class TweenManager {
    /**
     * Creates a new TweenManager instance.
     * @param {import('./game.js').Game} game - The game instance this manager belongs to.
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
     * Get all tweens managed by this manager.
     * @returns {Tween[]} An array of all active tweens.
     */
    getAll(): Tween[];
    /**
     * Remove all tweens from the manager.
     * This method removes all active and pending tweens.
     */
    removeAll(): void;
    /**
     * Remove tweens associated with an object or its children.
     * @param {object} obj - The object to remove tweens from.
     * @param {object[]} children - Optional array of child objects to remove tweens from.
     */
    removeFrom(obj: object, children?: object[]): void;
    /**
     * Add a tween to the manager.
     * @param {Tween} tween - The tween to add.
     */
    add(tween: Tween): void;
    /**
     * Create a new tween for an object.
     * @param {object} object - The object to create a tween for.
     * @returns {Tween} The created Tween object.
     */
    create(object: object): Tween;
    /**
     * Remove a tween from the manager.
     * @param {Tween | null | undefined} tween - The tween to remove.
     */
    remove(tween: Tween | null | undefined): void;
    /**
     * Update all tweens managed by this manager.
     * @returns {boolean} True if any tweens were updated, false otherwise.
     */
    update(): boolean;
    /**
     * Check if an object is currently being tweened.
     * @param {object} object - The object to check.
     * @returns {boolean} True if the object is being tweened, false otherwise.
     */
    isTweening(object: object): boolean;
    /**
     * Pause all tweens managed by this manager.
     * This method pauses all active tweens.
     */
    _pauseAll(): void;
    /**
     * Resume all tweens managed by this manager.
     * This method resumes all paused tweens.
     */
    _resumeAll(): void;
    /**
     * Pause all tweens managed by this manager.
     * This method pauses all active tweens.
     */
    pauseAll(): void;
    /**
     * Resume all tweens managed by this manager.
     * This method resumes all paused tweens.
     */
    resumeAll(): void;
}
import { Tween } from './tween.js';
//# sourceMappingURL=tween_manager.d.ts.map