export class Sound {
    /**
     * TBD.
     * @param {object} game - TBD.
     * @param {string} key - TBD.
     * @param volume
     * @param loop
     * @param connect
     */
    constructor(game: object, key: string, volume?: number, loop?: boolean, connect?: any);
    game: any;
    name: string;
    key: string;
    loop: boolean;
    markers: {};
    context: any;
    autoplay: boolean;
    totalDuration: number;
    startTime: number;
    currentTime: number;
    duration: number;
    durationMS: number;
    position: number;
    stopTime: number;
    paused: boolean;
    pausedPosition: number;
    pausedTime: number;
    isPlaying: boolean;
    currentMarker: string;
    fadeTween: any;
    pendingPlayback: boolean;
    override: boolean;
    allowMultiple: boolean;
    externalNode: any;
    masterGainNode: any;
    gainNode: any;
    _sound: any;
    _markedToDelete: boolean;
    _removeFromSoundManager: boolean;
    onPlay: Signal;
    onPause: Signal;
    onResume: Signal;
    onLoop: Signal;
    onStop: Signal;
    onMute: Signal;
    onMarkerComplete: Signal;
    onFadeComplete: Signal;
    _volume: number;
    _buffer: any;
    _muted: boolean;
    _tempMarker: number;
    _tempPosition: number;
    _tempVolume: number;
    _tempPause: number;
    _muteVolume: number;
    _tempLoop: number;
    _paused: boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    soundHasUnlocked(key: string): void;
    /**
     * TBD.
     * @param name
     * @param start
     * @param duration
     * @param volume
     * @param loop
     */
    addMarker(name: any, start: any, duration?: number, volume?: number, loop?: boolean): void;
    /**
     * TBD.
     * @param name
     */
    removeMarker(name: any): void;
    /**
     * TBD.
     */
    onEndedHandler(): void;
    /**
     * TBD.
     */
    update(): void;
    /**
     * TBD.
     * @param volume
     */
    loopFull(volume: any): Sound;
    /**
     * TBD.
     * @param marker
     * @param position
     * @param volume
     * @param loop
     * @param forceRestart
     */
    play(marker: any, position: any, volume: any, loop: any, forceRestart: any): Sound;
    /**
     * TBD.
     */
    set volume(arg: number);
    /**
     * TBD.
     */
    get volume(): number;
    /**
     * TBD.
     * @param marker
     * @param position
     * @param volume
     * @param loop
     */
    restart(marker?: string, position?: number, volume?: number, loop?: boolean): void;
    /**
     * TBD.
     */
    pause(): void;
    /**
     * TBD.
     */
    resume(): void;
    /**
     * TBD.
     */
    stop(): void;
    /**
     * TBD.
     * @param duration
     * @param loop
     * @param marker
     */
    fadeIn(duration: any, loop?: boolean, marker?: string): void;
    /**
     * TBD.
     * @param duration
     */
    fadeOut(duration: any): void;
    /**
     * TBD.
     * @param duration
     * @param volume
     */
    fadeTo(duration?: number, volume?: number): void;
    /**
     * TBD.
     */
    fadeComplete(): void;
    /**
     * TBD.
     * @param remove
     */
    destroy(remove?: boolean): void;
    /**
     * TBD.
     */
    set mute(arg: any);
    /**
     * TBD.
     */
    get mute(): any;
}
import { Signal } from './signal';
//# sourceMappingURL=sound.d.ts.map