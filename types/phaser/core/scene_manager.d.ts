export class SceneManager {
    /**
     * Creates a new SceneManager instance.
     * @param {import('./game.js').Game} game - The game instance this manager belongs to.
     * @param {string} pendingState - The state to load when the game boots.
     */
    constructor(game: import("./game.js").Game, pendingState: string);
    game: import("./game.js").Game;
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
     * Initialize the scene manager.
     * This method is called when the game boots and sets up the initial state.
     */
    boot(): void;
    /**
     * Add a new scene state to the manager.
     * @param {string} key - The unique key for this state.
     * @param {object} state - The scene state to add.
     * @param {boolean} autoStart - Whether to start this state immediately.
     * @returns {Scene|object} The created scene or state object.
     */
    add(key: string, state: object, autoStart?: boolean): Scene | object;
    /**
     * Remove a scene state from the manager.
     * @param {string} key - The unique key for the state to remove.
     */
    remove(key: string): void;
    callbackContext: any;
    /**
     * Start a scene state.
     * @param {string} key - The unique key for the state to start.
     * @param {boolean} clearWorld - Whether to clear the world before starting.
     * @param {boolean} clearCache - Whether to clear the cache before starting.
     * @param {...any} args - Additional arguments to pass to the state.
     */
    start(key: string, clearWorld?: boolean, clearCache?: boolean, ...args: any[]): void;
    /**
     * Restart the current scene state.
     * @param {boolean} clearWorld - Whether to clear the world before restarting.
     * @param {boolean} clearCache - Whether to clear the cache before restarting.
     * @param {...any} args - Additional arguments to pass to the state.
     */
    restart(clearWorld?: boolean, clearCache?: boolean, ...args: any[]): void;
    /**
     * Pre-update the scene manager.
     * This method is called before the game loop updates.
     */
    preUpdate(): void;
    /**
     * Clear the current scene state.
     * This method is called when switching scenes to clean up the previous scene.
     */
    clearCurrentState(): void;
    /**
     * Check if a scene state exists.
     * @param {string} key - The unique key for the state to check.
     * @returns {boolean} True if the scene exists, false otherwise.
     */
    checkState(key: string): boolean;
    /**
     * Link a scene state to the manager.
     * @param {string} key - The unique key for the state to link.
     */
    link(key: string): void;
    /**
     * Unlink a scene state from the manager.
     * @param {string} key - The unique key for the state to unlink.
     */
    unlink(key: string): void;
    /**
     * Set the current scene state.
     * @param {string} key - The unique key for the state to set as current.
     */
    setCurrentState(key: string): void;
    /**
     * Get the current scene state.
     * @returns {Scene} The current scene state.
     */
    getCurrentState(): Scene;
    /**
     * Handle loading completion.
     * This method is called when scene loading is complete.
     */
    loadComplete(): void;
    /**
     * Update the scene manager.
     * This method is called every frame while the game is running.
     */
    update(): void;
    /**
     * Pause the scene manager updates.
     * This method is called when the game is paused.
     */
    pauseUpdate(): void;
    /**
     * Handle scene resize.
     * @param {number} width - The new width of the scene.
     * @param {number} height - The new height of the scene.
     */
    resize(width: number, height: number): void;
    /**
     * Destroy the scene manager.
     * This method is called when the scene manager is about to be destroyed.
     */
    destroy(): void;
    /**
     * Dummy function for callbacks.
     * This is a placeholder function used when no callback is defined.
     */
    dummy(): void;
    /**
     * Get whether the scene has been created.
     * @returns {boolean} True if the scene has been created, false otherwise.
     */
    get created(): boolean;
}
import { Scene } from './scene.js';
//# sourceMappingURL=scene_manager.d.ts.map