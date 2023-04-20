export class Time {
    /**
     * TBD.
     * @param {object} game - TBD.
     */
    constructor(game: object);
    game: any;
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
     * @param timer
     */
    add(timer: any): any;
    /**
     * TBD.
     * @param autoDestroy
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
     * @param time
     */
    update(time: any): void;
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
     */
    totalElapsedSeconds(): number;
    /**
     * TBD.
     * @param since
     */
    elapsedSince(since: any): number;
    /**
     * TBD.
     * @param since
     */
    elapsedSecondsSince(since: any): number;
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
     */
    get desiredFps(): number;
}
import { Timer } from './timer';
//# sourceMappingURL=time.d.ts.map