export class SoundManager {
    /**
     * Creates a new SoundManager instance.
     * @param {import('./game.js').Game} game - Reference to the Phaser Game instance.
     */
    constructor(game: import("./game.js").Game);
    game: import("./game.js").Game;
    onChange: Signal;
    /** @type {AudioContext} */
    context: AudioContext;
    baseLatency: number;
    noAudio: boolean;
    type: number;
    connectToMaster: boolean;
    isLocked: boolean;
    _codeMuted: boolean;
    _muted: boolean;
    _unlockSource: any;
    _volume: number;
    /** @type {Sound[]} */
    _sounds: Sound[];
    _watchList: ArraySet;
    _watching: boolean;
    _watchCallback: Function;
    _watchContext: any;
    /**
     * Initializes the sound manager and sets up audio context.
     */
    boot(): void;
    masterGain: any;
    /**
     * Handles page lifecycle changes for audio management.
     */
    onPageLifecycleChange: () => void;
    /**
     * Handles audio context state changes.
     */
    onContextStateChange: () => void;
    /**
     * Checks if audio unlock handlers need to be added or removed.
     */
    checkUnlockHandlers: () => void;
    /**
     * Adds event listeners to unlock audio context.
     */
    addUnlockHandlers: () => void;
    /**
     * Removes event listeners that unlock audio context.
     */
    removeUnlockHandlers: () => void;
    /**
     * Handles unlock events to resume audio context.
     * @param {Event} event - The DOM event that triggered the unlock.
     */
    onUnlockEvent: (event: Event) => void;
    /**
     * Stops all sounds in the manager.
     */
    stopAll(): void;
    /**
     * Pauses all sounds in the manager.
     */
    pauseAll(): void;
    /**
     * Resumes all sounds in the manager.
     */
    resumeAll(): void;
    /**
     * Decodes an audio file for playback.
     * @param {string} key - The key of the sound to decode.
     */
    decode(key: string): void;
    /**
     * Sets up a callback to be called when audio files are decoded.
     * @param {Sound[]|string[]} files - The sound files or keys to wait for.
     * @param {Function} callback - The callback function to call when all files are decoded.
     * @param {object} callbackContext - The context in which to call the callback.
     */
    setDecodedCallback(files: Sound[] | string[], callback: Function, callbackContext: object): void;
    /**
     * Updates the sound manager state.
     */
    update(): void;
    /**
     * Adds a new sound to the manager.
     * @param {string} key - The key of the sound to add.
     * @param {number} volume - The initial volume level (0.0 to 1.0).
     * @param {boolean} loop - Whether the sound should loop.
     * @param {boolean} connect - Whether to connect to the master gain node.
     * @returns {Sound} The created Sound object.
     */
    add(key: string, volume?: number, loop?: boolean, connect?: boolean): Sound;
    /**
     * Adds a new sound sprite to the manager.
     * @param {string} key - The key of the sound sprite to add.
     * @returns {SoundSprite} The created SoundSprite object.
     */
    addSprite(key: string): SoundSprite;
    /**
     * Removes a sound from the manager.
     * @param {Sound | null | undefined} sound - The sound object to remove.
     * @returns {boolean} True if the sound was removed, false otherwise.
     */
    remove(sound: Sound | null | undefined): boolean;
    /**
     * Removes all sounds with a specific key from the manager.
     * @param {string} key - The key of sounds to remove.
     * @returns {number} The number of sounds removed.
     */
    removeByKey(key: string): number;
    /**
     * Plays a sound by key.
     * @param {string} key - The key of the sound to play.
     * @param {number} volume - The volume level (0.0 to 1.0).
     * @param {boolean} loop - Whether the sound should loop.
     * @returns {Sound} The created Sound object, or null if audio is disabled.
     */
    play(key: string, volume?: number, loop?: boolean): Sound;
    /**
     * Mutes all sounds in the manager.
     */
    setMute(): void;
    _muteVolume: any;
    /**
     * Unmutes all sounds in the manager.
     */
    unsetMute(): void;
    /**
     * Destroys the sound manager and cleans up resources.
     */
    destroy(): void;
    /**
     * Sets the muted state of the sound manager.
     */
    set mute(value: boolean);
    /**
     * Gets the muted state of the sound manager.
     * @returns {boolean} True if the manager is muted, false otherwise.
     */
    get mute(): boolean;
    /**
     * Sets the volume level of the sound manager.
     */
    set volume(value: number);
    /**
     * Gets the volume level of the sound manager.
     * @returns {number} The volume level (0.0 to 1.0).
     */
    get volume(): number;
}
import { Signal } from './signal.js';
import { Sound } from './sound.js';
import { ArraySet } from './array_set.js';
import { SoundSprite } from './sound_sprite.js';
//# sourceMappingURL=sound_manager.d.ts.map