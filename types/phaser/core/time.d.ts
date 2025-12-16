export class Time {
    /**
     * TBD.
     * @param {import('./game.js').Game} game - TBD.
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
     * TBD.
     */
    boot(): void;
    /**
     * TBD.
     * @param {Timer} timer - TBD.
     * @returns {Timer} TBD.
     */
    add(timer: Timer): Timer;
    /**
     * TBD.
     * @param {boolean} autoDestroy - TBD.
     * @returns {Timer} TBD.
     */
    create(autoDestroy?: boolean): Timer;
    /**
     * TBD.
     */
    removeAll(): void;
    /**
     * TBD.
     */
    refresh(): void;
    /**
     * TBD.
     * @param {number} time - TBD.
     */
    update(time: number): void;
    /**
     * TBD.
     */
    updateTimers(): void;
    /**
     * TBD.
     */
    updateAdvancedTiming(): void;
    /**
     * TBD.
     */
    gamePaused(): void;
    /**
     * TBD.
     */
    gameResumed(): void;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    totalElapsedSeconds(): number;
    /**
     * TBD.
     * @param {number} since - TBD.
     * @returns {number} TBD.
     */
    elapsedSince(since: number): number;
    /**
     * TBD.
     * @param {number} since - TBD.
     * @returns {number} TBD.
     */
    elapsedSecondsSince(since: number): number;
    /**
     * TBD.
     */
    reset(): void;
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     */
    set desiredFps(value: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get desiredFps(): number;
}
import { Timer } from './timer.js';
//# sourceMappingURL=time.d.ts.map