export class SoundManager {
    /**
     * TBD.
     * @param {Game} game - TBD.
     */
    constructor(game: Game);
    game: Game;
    onChange: Signal;
    context: any;
    baseLatency: number;
    noAudio: boolean;
    connectToMaster: boolean;
    isLocked: boolean;
    muteOnPause: boolean;
    _codeMuted: boolean;
    _muted: boolean;
    _unlockSource: any;
    _volume: number;
    _sounds: any[];
    _watchList: ArraySet;
    _watching: boolean;
    _watchCallback: Function;
    _watchContext: any;
    /**
     * TBD.
     */
    boot(): void;
    masterGain: any;
    onUnlockEventBinded: (event: Event) => void;
    /**
     * TBD.
     */
    addUnlockHandlers(): void;
    /**
     * TBD.
     */
    removeUnlockHandlers(): void;
    /**
     * TBD.
     * @param {Event} event - TBD.
     */
    onUnlockEvent(event: Event): void;
    /**
     * TBD.
     */
    stopAll(): void;
    /**
     * TBD.
     */
    pauseAll(): void;
    /**
     * TBD.
     */
    resumeAll(): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    decode(key: string): void;
    /**
     * TBD.
     * @param files - TBD.
     * @param {Function} callback - TBD.
     * @param {object} callbackContext - TBD.
     */
    setDecodedCallback(files: any, callback: Function, callbackContext: object): void;
    /**
     * TBD.
     */
    update(): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param volume - TBD.
     * @param loop - TBD.
     * @param connect - TBD.
     */
    add(key: string, volume?: number, loop?: boolean, connect?: boolean): Sound;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    addSprite(key: string): SoundSprite;
    /**
     * TBD.
     * @param sound - TBD.
     */
    remove(sound: any): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    removeByKey(key: string): number;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param volume - TBD.
     * @param loop - TBD.
     */
    play(key: string, volume?: number, loop?: boolean): Sound;
    /**
     * TBD.
     */
    setMute(): void;
    _muteVolume: any;
    /**
     * TBD.
     */
    unsetMute(): void;
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     */
    set mute(arg: boolean);
    /**
     * TBD.
     */
    get mute(): boolean;
    /**
     * TBD.
     */
    set volume(arg: number);
    /**
     * TBD.
     */
    get volume(): number;
}
import { Game } from './game';
import { Signal } from './signal';
import { ArraySet } from './array_set';
import { Sound } from './sound';
import { SoundSprite } from './sound_sprite';
//# sourceMappingURL=sound_manager.d.ts.map