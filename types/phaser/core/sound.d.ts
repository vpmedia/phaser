export class Sound {
    /**
     * TBD.
     * @param {import('./game.js').Game} game - TBD.
     * @param {string} key - TBD.
     * @param {number} volume - TBD.
     * @param {boolean} loop - TBD.
     * @param {boolean} connect - TBD.
     */
    constructor(game: import("./game.js").Game, key: string, volume?: number, loop?: boolean, connect?: boolean);
    game: import("./game.js").Game;
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
    fadeTween: import("./tween.js").Tween;
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
     * @param {string} name - TBD.
     * @param {number} start - TBD.
     * @param {number} duration - TBD.
     * @param {number} volume - TBD.
     * @param {boolean} loop - TBD.
     */
    addMarker(name: string, start: number, duration?: number, volume?: number, loop?: boolean): void;
    /**
     * TBD.
     * @param {string} name - TBD.
     */
    removeMarker(name: string): void;
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
     * @param {number} volume - TBD.
     * @returns {Sound} TBD.
     */
    loopFull(volume: number): Sound;
    /**
     * TBD.
     * @param {string} marker - TBD.
     * @param {number} position - TBD.
     * @param {number} volume - TBD.
     * @param {boolean} loop - TBD.
     * @param {boolean} forceRestart - TBD.
     * @returns {Sound} TBD.
     */
    play(marker: string, position: number, volume: number, loop: boolean, forceRestart: boolean): Sound;
    /**
     * TBD.
     */
    set volume(value: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get volume(): number;
    /**
     * TBD.
     * @param {string} marker - TBD.
     * @param {number} position - TBD.
     * @param {number} volume - TBD.
     * @param {boolean} loop - TBD.
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
     * @param {number} duration - TBD.
     * @param {boolean} loop - TBD.
     * @param {string} marker - TBD.
     */
    fadeIn(duration: number, loop?: boolean, marker?: string): void;
    /**
     * TBD.
     * @param {number} duration - TBD.
     */
    fadeOut(duration: number): void;
    /**
     * TBD.
     * @param {number} duration - TBD.
     * @param {number} volume - TBD.
     */
    fadeTo(duration?: number, volume?: number): void;
    /**
     * TBD.
     */
    fadeComplete(): void;
    /**
     * TBD.
     * @param {boolean} remove - TBD.
     */
    destroy(remove?: boolean): void;
    /**
     * TBD.
     */
    set mute(value: boolean);
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    get mute(): boolean;
}
import { Signal } from './signal.js';
//# sourceMappingURL=sound.d.ts.map