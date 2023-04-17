export class Time {
    constructor(game: any);
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
    boot(): void;
    add(timer: any): any;
    create(autoDestroy?: boolean): Timer;
    removeAll(): void;
    refresh(): void;
    update(time: any): void;
    updateTimers(): void;
    updateAdvancedTiming(): void;
    gamePaused(): void;
    gameResumed(): void;
    totalElapsedSeconds(): number;
    elapsedSince(since: any): number;
    elapsedSecondsSince(since: any): number;
    reset(): void;
    destroy(): void;
    set desiredFps(arg: number);
    get desiredFps(): number;
}
import { Timer } from './timer';
//# sourceMappingURL=time.d.ts.map