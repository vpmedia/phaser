export class Time {
    /**
     * TBD.
     * @param {import('./game').Game} game - TBD.
     */
    constructor(game: import('./game').Game);
    game: import("./game").Game;
    time: number;
    prevTime: number;
    now: number;
    elapsed: number;
    elapsedMS: number;
    desiredFpsMult: number;
    _desiredFps: number;
    suggestedFps: number;
    advancedTiming: boolean;
    frames: number;
    fps: number;
    fpsMin: number;
    fpsMax: number;
    msMin: number;
    msMax: number;
    pauseDuration: number;
    timeToCall: number;
    timeExpected: number;
    events: Timer;
    _frameCount: number;
    _elapsedAccumulator: number;
    _started: number;
    _timeLastSecond: number;
    _pauseStarted: number;
    _justResumed: boolean;
    _timers: any[];
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
    set desiredFps(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get desiredFps(): number;
}
import { Timer } from './timer';
//# sourceMappingURL=time.d.ts.map