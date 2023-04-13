export default class _default {
    constructor(game: any);
    game: any;
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
    _watchCallback: any;
    _watchContext: any;
    boot(): void;
    masterGain: any;
    onUnlockEventBinded: ((event: any) => void) | undefined;
    addUnlockHandlers(): void;
    removeUnlockHandlers(): void;
    onUnlockEvent(event: any): void;
    stopAll(): void;
    pauseAll(): void;
    resumeAll(): void;
    decode(key: any): void;
    setDecodedCallback(files: any, callback: any, callbackContext: any): void;
    update(): void;
    add(key: any, volume?: number, loop?: boolean, connect?: boolean): Sound;
    addSprite(key: any): SoundSprite;
    remove(sound: any): boolean;
    removeByKey(key: any): number;
    play(key: any, volume?: number, loop?: boolean): Sound | null;
    setMute(): void;
    _muteVolume: any;
    unsetMute(): void;
    destroy(): void;
    set mute(arg: boolean);
    get mute(): boolean;
    set volume(arg: number);
    get volume(): number;
}
import Signal from './signal';
import ArraySet from './array_set';
import Sound from './sound';
import SoundSprite from './sound_sprite';
//# sourceMappingURL=sound_manager.d.ts.map