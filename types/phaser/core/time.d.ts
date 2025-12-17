export class Time {
    /**
     * Creates a new Time instance.
     * @param {import('./game.js').Game} game - Reference to the Phaser Game instance.
     */
    constructor(game: import("./game.js").Game);
    game: import("./game.js").Game;
    /** @type {number} */
    time: number;
    /** @type {number} */
    prevTime: number;
    /** @type {number} */
    now: number;
    /** @type {number} */
    elapsed: number;
    /** @type {number} */
    elapsedMS: number;
    /** @type {number} */
    desiredFpsMult: number;
    /** @type {number} */
    _desiredFps: number;
    /** @type {number} */
    suggestedFps: number;
    /** @type {boolean} */
    advancedTiming: boolean;
    /** @type {number} */
    frames: number;
    /** @type {number} */
    fps: number;
    /** @type {number} */
    fpsMin: number;
    /** @type {number} */
    fpsMax: number;
    /** @type {number} */
    msMin: number;
    /** @type {number} */
    msMax: number;
    /** @type {number} */
    pauseDuration: number;
    /** @type {number} */
    timeToCall: number;
    /** @type {number} */
    timeExpected: number;
    /** @type {Timer} */
    events: Timer;
    /** @type {number} */
    _frameCount: number;
    /** @type {number} */
    _elapsedAccumulator: number;
    _started: number;
    /** @type {number} */
    _timeLastSecond: number;
    /** @type {number} */
    _pauseStarted: number;
    /** @type {boolean} */
    _justResumed: boolean;
    /** @type {Timer[]} */
    _timers: Timer[];
    /**
     * Initializes the time manager and starts tracking time.
     */
    boot(): void;
    /**
     * Adds a Timer to the Time manager.
     * @param {Timer} timer - The Timer to add.
     * @returns {Timer} The added Timer object.
     */
    add(timer: Timer): Timer;
    /**
     * Creates a new Timer and adds it to the Time manager.
     * @param {boolean} autoDestroy - Whether the timer should be automatically destroyed when it completes.
     * @returns {Timer} The created Timer object.
     */
    create(autoDestroy?: boolean): Timer;
    /**
     * Removes all timers from the Time manager.
     */
    removeAll(): void;
    /**
     * Refreshes the time tracking values.
     */
    refresh(): void;
    /**
     * Updates the Time manager with a new timestamp.
     * @param {number} time - The new timestamp to use for updating.
     */
    update(time: number): void;
    /**
     * Updates all timers managed by the Time manager.
     */
    updateTimers(): void;
    /**
     * Updates the advanced timing values.
     */
    updateAdvancedTiming(): void;
    /**
     * Handles game pause event.
     */
    gamePaused(): void;
    /**
     * Handles game resume event.
     */
    gameResumed(): void;
    /**
     * Gets the total elapsed time in seconds since the game started.
     * @returns {number} The total elapsed time in seconds.
     */
    totalElapsedSeconds(): number;
    /**
     * Gets the elapsed time in milliseconds since a given timestamp.
     * @param {number} since - The timestamp to calculate elapsed time from.
     * @returns {number} The elapsed time in milliseconds.
     */
    elapsedSince(since: number): number;
    /**
     * Gets the elapsed time in seconds since a given timestamp.
     * @param {number} since - The timestamp to calculate elapsed time from.
     * @returns {number} The elapsed time in seconds.
     */
    elapsedSecondsSince(since: number): number;
    /**
     * Resets the time tracking values.
     */
    reset(): void;
    /**
     * Destroys the Time manager and cleans up resources.
     */
    destroy(): void;
    /**
     * Sets the desired frames per second.
     */
    set desiredFps(value: number);
    /**
     * Gets the desired frames per second.
     * @returns {number} The desired frames per second.
     */
    get desiredFps(): number;
}
import { Timer } from './timer.js';
//# sourceMappingURL=time.d.ts.map