export class SceneManager {
    /**
     * TBD.
     * @param {Game} game - TBD.
     * @param {string} pendingState - TBD.
     */
    constructor(game: Game, pendingState: string);
    game: Game;
    states: {};
    _pendingState: string;
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
     * @param state - TBD.
     * @param {boolean} autoStart - TBD.
     * @returns {Scene|object} TBD.
     */
    add(key: string, state: any, autoStart?: boolean): Scene | object;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    remove(key: string): void;
    callbackContext: any;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {boolean} clearWorld - TBD.
     * @param {boolean} clearCache - TBD.
     * @param {...any} args - TBD.
     */
    start(key: string, clearWorld?: boolean, clearCache?: boolean, ...args: any[]): void;
    /**
     * TBD.
     * @param {boolean} clearWorld - TBD.
     * @param {boolean} clearCache - TBD.
     * @param {...any} args - TBD.
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
     * @returns {boolean} TBD.
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
     * @returns {Scene} TBD.
     */
    getCurrentState(): Scene;
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
     * @returns {boolean} TBD.
     */
    get created(): boolean;
}
import { Game } from './game';
import { Scene } from './scene';
//# sourceMappingURL=scene_manager.d.ts.map