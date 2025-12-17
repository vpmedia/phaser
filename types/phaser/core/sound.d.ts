export class Sound {
    /**
     * Creates a new Sound instance.
     * @param {import('./game.js').Game} game - Reference to the Phaser Game instance.
     * @param {string} key - The key of the sound to play.
     * @param {number} volume - The initial volume level (0.0 to 1.0).
     * @param {boolean} loop - Whether the sound should loop.
     * @param {boolean} connect - Whether to connect to the master gain node.
     */
    constructor(game: import("./game.js").Game, key: string, volume?: number, loop?: boolean, connect?: boolean);
    game: import("./game.js").Game;
    name: string;
    key: string;
    loop: boolean;
    markers: {};
    context: AudioContext;
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
    /** @type {GainNode} */
    externalNode: GainNode;
    /** @type {GainNode} */
    masterGainNode: GainNode;
    /** @type {GainNode} */
    gainNode: GainNode;
    /** @type {AudioBufferSourceNode} */
    _sound: AudioBufferSourceNode;
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
    /** @type {AudioBuffer} */
    _buffer: AudioBuffer;
    _muted: boolean;
    _tempMarker: string;
    _tempPosition: number;
    _tempVolume: number;
    _tempPause: number;
    _muteVolume: number;
    _tempLoop: boolean;
    _paused: boolean;
    /**
     * Callback when a sound has been unlocked.
     * @param {string} key - The key of the sound that was unlocked.
     */
    soundHasUnlocked(key: string): void;
    /**
     * Adds a marker to the sound.
     * @param {string} name - The name of the marker.
     * @param {number} start - The start time (in seconds) of the marker.
     * @param {number} duration - The duration (in seconds) of the marker.
     * @param {number} volume - The volume level (0.0 to 1.0) of the marker.
     * @param {boolean} loop - Whether the marker should loop.
     */
    addMarker(name: string, start: number, duration?: number, volume?: number, loop?: boolean): void;
    /**
     * Removes a marker from the sound.
     * @param {string} name - The name of the marker to remove.
     */
    removeMarker(name: string): void;
    /**
     * Handler for when the sound ends.
     */
    onEndedHandler(): void;
    /**
     * Updates the sound state.
     */
    update(): void;
    /**
     * Plays the sound at full volume in a loop.
     * @param {number} volume - The volume level (0.0 to 1.0) to play at.
     * @returns {Sound} This Sound instance for chaining.
     */
    loopFull(volume: number): Sound;
    /**
     * Plays the sound, optionally using a marker.
     * @param {string} marker - The name of the marker to play, or null/undefined to play the entire sound.
     * @param {number} position - The position (in seconds) to start playing from.
     * @param {number} volume - The volume level (0.0 to 1.0) to play at.
     * @param {boolean} loop - Whether the sound should loop.
     * @param {boolean} forceRestart - Whether to force restarting the sound even if it's already playing.
     * @returns {Sound} This Sound instance for chaining.
     */
    play(marker: string, position: number, volume: number, loop: boolean, forceRestart?: boolean): Sound;
    /**
     * Sets the volume of the sound.
     */
    set volume(value: number);
    /**
     * Gets the volume of the sound.
     * @returns {number} The volume level (0.0 to 1.0).
     */
    get volume(): number;
    /**
     * Restarts the sound, optionally using a marker.
     * @param {string} marker - The name of the marker to play, or empty string to play the entire sound.
     * @param {number} position - The position (in seconds) to start playing from.
     * @param {number} volume - The volume level (0.0 to 1.0) to play at.
     * @param {boolean} loop - Whether the sound should loop.
     */
    restart(marker?: string, position?: number, volume?: number, loop?: boolean): void;
    /**
     * Pauses the sound.
     */
    pause(): void;
    /**
     * Resumes the sound.
     */
    resume(): void;
    /**
     * Stops the sound.
     */
    stop(): void;
    /**
     * Fades in the sound to full volume.
     * @param {number} duration - The fade-in duration (in milliseconds).
     * @param {boolean} loop - Whether the sound should loop.
     * @param {string} marker - The name of the marker to fade in, or empty string to use current marker.
     */
    fadeIn(duration: number, loop?: boolean, marker?: string): void;
    /**
     * Fades out the sound to silence.
     * @param {number} duration - The fade-out duration (in milliseconds).
     */
    fadeOut(duration: number): void;
    /**
     * Fades the sound to a specific volume level.
     * @param {number} duration - The fade duration (in milliseconds).
     * @param {number} volume - The target volume level (0.0 to 1.0).
     */
    fadeTo(duration?: number, volume?: number): void;
    /**
     * Callback when fade completes.
     */
    fadeComplete(): void;
    /**
     * Destroys the sound and cleans up resources.
     * @param {boolean} remove - Whether to remove the sound from the SoundManager.
     */
    destroy(remove?: boolean): void;
    /**
     * Sets the muted state of the sound.
     */
    set mute(value: boolean);
    /**
     * Gets the muted state of the sound.
     * @returns {boolean} True if the sound is muted, false otherwise.
     */
    get mute(): boolean;
}
import { Signal } from './signal.js';
//# sourceMappingURL=sound.d.ts.map