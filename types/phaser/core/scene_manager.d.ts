export class SceneManager {
    /**
     * TBD.
     * @param {Game} game - TBD.
     * @param pendingState
     */
    constructor(game: Game, pendingState: any);
    game: Game;
    states: {};
    _pendingState: any;
    _clearWorld: boolean;
    _clearCache: boolean;
    _created: boolean;
    _args: any[];
    current: string;
    onInitCallback: any;
    onPreloadCallback: any;
    onCreateCallback: any;
    onUpdateCallback: any;
    onResizeCallback: any;
    onPauseUpdateCallback: any;
    onShutDownCallback: any;
    /**
     * TBD.
     */
    boot(): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param state
     * @param autoStart
     */
    add(key: string, state: any, autoStart?: boolean): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    remove(key: string): void;
    callbackContext: any;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param clearWorld
     * @param clearCache
     * @param {...any} args
     */
    start(key: string, clearWorld?: boolean, clearCache?: boolean, ...args: any[]): void;
    /**
     * TBD.
     * @param clearWorld
     * @param clearCache
     * @param {...any} args
     */
    restart(clearWorld?: boolean, clearCache?: boolean, ...args: any[]): void;
    /**
     * TBD.
     */
    preUpdate(): void;
    /**
     * TBD.
     */
    clearCurrentState(): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    checkState(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    link(key: string): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    unlink(key: string): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    setCurrentState(key: string): void;
    /**
     * TBD.
     */
    getCurrentState(): any;
    /**
     * TBD.
     */
    loadComplete(): void;
    /**
     * TBD.
     */
    update(): void;
    /**
     * TBD.
     */
    pauseUpdate(): void;
    /**
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    resize(width: number, height: number): void;
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     */
    dummy(): void;
    /**
     * TBD.
     */
    get created(): boolean;
}
import { Game } from './game';
//# sourceMappingURL=scene_manager.d.ts.map