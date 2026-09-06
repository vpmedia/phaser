import type { Game } from './game.js';
import { Scene } from './scene.js';

/** The lifecycle hooks a scene may implement; the manager binds whichever are present. */
export type SceneHooks = {
  init?: (...args: unknown[]) => void;
  preload?: () => void;
  create?: () => void;
  update?: () => void;
  render?: () => void;
  resize?: (width: number, height: number) => void;
  pauseUpdate?: () => void;
  shutdown?: () => void;
};

/** A scene once the manager holds it: its hooks plus the wiring the manager adds. */
export type SceneState = SceneHooks & {
  game?: Game | null;
  key?: string;
};

/** What the manager accepts as a scene: an instance, a plain hook object, or a class to build one. */
export type SceneDefinition = SceneState | (new (game: Game) => SceneState);

/** A hook invoked with the scene as its receiver and the game as its argument. */
type SceneCallback = (game: Game) => void;

export class SceneManager {
  public game!: Game;
  public states!: Record<string, SceneState>;
  public _pendingState!: SceneDefinition | string | null;
  public _clearWorld!: boolean;
  public _clearCache!: boolean;
  public _created!: boolean;
  public _args!: unknown[];
  public current!: string;
  public onInitCallback!: ((...args: unknown[]) => void) | null;
  public onPreloadCallback!: SceneCallback | null;
  public onCreateCallback!: SceneCallback | null;
  public onUpdateCallback!: SceneCallback | null;
  public onResizeCallback!: ((width: number, height: number) => void) | null;
  public onPauseUpdateCallback!: SceneCallback | null;
  public onShutDownCallback!: SceneCallback | null;
  public callbackContext!: SceneState;
  /**
   * Creates a new SceneManager instance.
   * @param {Game} game - The game instance this manager belongs to.
   * @param {string} pendingState - The state to load when the game boots.
   */
  public constructor(game: Game, pendingState: SceneDefinition | string | null) {
    this.game = game;
    this.states = {};
    this._pendingState = null;
    if (pendingState !== undefined && pendingState !== null) {
      this._pendingState = pendingState;
    }
    this._clearWorld = false;
    this._clearCache = false;
    this._created = false;
    this._args = [];
    this.current = '';
    this.onInitCallback = null;
    this.onPreloadCallback = null;
    this.onCreateCallback = null;
    this.onUpdateCallback = null;
    this.onResizeCallback = null;
    this.onPauseUpdateCallback = null;
    this.onShutDownCallback = null;
  }

  /**
   * Initialize the scene manager.
   * This method is called when the game boots and sets up the initial state.
   */
  public boot(): void {
    if (this._pendingState !== null && typeof this._pendingState !== 'string') {
      this.add('default', this._pendingState, true);
    }
  }

  /**
   * Add a new scene state to the manager.
   * @param {string} key - The unique key for this state.
   * @param {object} state - The scene state to add.
   * @param {boolean} autoStart - Whether to start this state immediately.
   * @returns {Scene|object} The created scene or state object.
   */
  public add(key: string, state: SceneDefinition, autoStart = false): SceneState {
    let newState: SceneState;
    if (typeof state === 'function') {
      const SceneClass = state;
      newState = new SceneClass(this.game);
    } else {
      newState = state;
      if (!(state instanceof Scene)) {
        newState.game = this.game;
      }
    }
    this.states[key] = newState;
    if (autoStart) {
      if (this.game.isBooted) {
        this.start(key);
      } else {
        this._pendingState = key;
      }
    }
    return newState;
  }

  /**
   * Remove a scene state from the manager.
   * @param {string} key - The unique key for the state to remove.
   */
  public remove(key: string): void {
    if (this.current === key) {
      this.onInitCallback = null;
      this.onShutDownCallback = null;
      this.onPreloadCallback = null;
      this.onCreateCallback = null;
      this.onUpdateCallback = null;
      this.onResizeCallback = null;
      this.onPauseUpdateCallback = null;
    }
    delete this.states[key];
  }

  /**
   * Start a scene state.
   * @param {string} key - The unique key for the state to start.
   * @param {boolean} clearWorld - Whether to clear the world before starting.
   * @param {boolean} clearCache - Whether to clear the cache before starting.
   * @param {...any} args - Additional arguments to pass to the state.
   */
  public start(key: string, clearWorld = true, clearCache = false, ...args: unknown[]): void {
    if (this.checkState(key)) {
      //  Place the state in the queue. It will be started the next time the game loop begins.
      this._pendingState = key;
      this._clearWorld = clearWorld;
      this._clearCache = clearCache;
      if (args && args.length > 0) {
        this._args = [...args];
      }
    }
  }

  /**
   * Restart the current scene state.
   * @param {boolean} clearWorld - Whether to clear the world before restarting.
   * @param {boolean} clearCache - Whether to clear the cache before restarting.
   * @param {...any} args - Additional arguments to pass to the state.
   */
  public restart(clearWorld = true, clearCache = false, ...args: unknown[]): void {
    this._pendingState = this.current;
    this._clearWorld = clearWorld;
    this._clearCache = clearCache;
    if (args && args.length > 0) {
      this._args = [...args];
    }
  }

  /**
   * Pre-update the scene manager.
   * This method is called before the game loop updates.
   */
  public preUpdate(): void {
    if (typeof this._pendingState === 'string' && this._pendingState && this.game.isBooted) {
      // var previousStateKey = this.current;
      //  Already got a state running?
      this.clearCurrentState();
      this.setCurrentState(this._pendingState);
      this.game.world.x = 0;
      this.game.world.y = 0;
      if (this.current !== this._pendingState) {
        return;
      }
      this._pendingState = null;
      //  If StateManager.start has been called from the init of a State that ALSO has a preload, then
      //  onPreloadCallback will be set, but must be ignored
      if (this.onPreloadCallback) {
        this.game.load.reset(true);
        this.onPreloadCallback.call(this.callbackContext, this.game);
        //  Is the loader empty?
        if (this.game.load.totalQueuedFiles() === 0 && this.game.load.totalQueuedPacks() === 0) {
          this.loadComplete();
        } else {
          //  Start the loader going as we have something in the queue
          this.game.load.start();
        }
      } else {
        //  No init? Then there was nothing to load either
        this.loadComplete();
      }
    }
  }

  /**
   * Clear the current scene state.
   * This method is called when switching scenes to clean up the previous scene.
   */
  public clearCurrentState(): void {
    if (this.current) {
      if (this.onShutDownCallback) {
        this.onShutDownCallback.call(this.callbackContext, this.game);
      }
      this.game.tweens.removeAll();
      this.game.input.reset(true);
      this.game.time.removeAll();
      this.game.scale.reset();
      if (this._clearWorld) {
        this.game.world.destroy(true, true);
        if (this._clearCache) {
          this.game.cache.destroy();
        }
      }
    }
  }

  /**
   * Check if a scene state exists.
   * @param {string} key - The unique key for the state to check.
   * @returns {boolean} True if the scene exists, false otherwise.
   */
  public checkState(key: string): boolean {
    const state = this.states[key];
    if (state) {
      return Boolean(state.preload ?? state.create ?? state.update ?? state.render);
    }
    return false;
  }

  /**
   * Link a scene state to the manager.
   * @param {string} key - The unique key for the state to link.
   */
  public link(key: string): void {
    const state = this.states[key];
    if (state) {
      state.game = this.game;
      state.key = key;
    }
  }

  /**
   * Unlink a scene state from the manager.
   * @param {string} key - The unique key for the state to unlink.
   */
  public unlink(key: string): void {
    const state = this.states[key];
    if (state) {
      state.game = null;
    }
  }

  /**
   * Set the current scene state.
   * @param {string} key - The unique key for the state to set as current.
   */
  public setCurrentState(key: string): void {
    this.callbackContext = this.states[key]!;
    this.link(key);
    //  Used when the state is set as being the current active state
    this.onInitCallback = this.callbackContext.init ?? this.dummy;
    this.onPreloadCallback = this.callbackContext.preload ?? null;
    this.onCreateCallback = this.callbackContext.create ?? null;
    this.onUpdateCallback = this.callbackContext.update ?? null;
    this.onResizeCallback = this.callbackContext.resize ?? null;
    this.onPauseUpdateCallback = this.callbackContext.pauseUpdate ?? null;
    this.onShutDownCallback = this.callbackContext.shutdown ?? this.dummy;
    this.current = key;
    this._created = false;
    this.onInitCallback.apply(this.callbackContext, this._args);
    if (key === this._pendingState) {
      this._args = [];
    }
    this.game.isKickStart = true;
  }

  /**
   * Get the current scene state.
   * @template T
   * @returns {T} The current scene state.
   */
  public getCurrentState<T = Partial<Scene>>(): T {
    return this.states[this.current] as T;
  }

  /**
   * Handle loading completion.
   * This method is called when scene loading is complete.
   */
  public loadComplete(): void {
    if (!this._created && this.onCreateCallback) {
      this._created = true;
      this.onCreateCallback.call(this.callbackContext, this.game);
    } else {
      this._created = true;
    }
  }

  /**
   * Update the scene manager.
   * This method is called every frame while the game is running.
   */
  public update(): void {
    if (this._created && this.onUpdateCallback) {
      this.onUpdateCallback.call(this.callbackContext, this.game);
    }
  }

  /**
   * Pause the scene manager updates.
   * This method is called when the game is paused.
   */
  public pauseUpdate(): void {
    if (this._created && this.onPauseUpdateCallback) {
      this.onPauseUpdateCallback.call(this.callbackContext, this.game);
    }
  }

  /**
   * Handle scene resize.
   * @param {number} width - The new width of the scene.
   * @param {number} height - The new height of the scene.
   */
  public resize(width: number, height: number): void {
    if (this.onResizeCallback) {
      this.onResizeCallback.call(this.callbackContext, width, height);
    }
  }

  /**
   * Destroy the scene manager.
   * This method is called when the scene manager is about to be destroyed.
   */
  public destroy(): void {
    this._clearWorld = true;
    this._clearCache = true;
    this.clearCurrentState();
    this.onInitCallback = null;
    this.onShutDownCallback = null;
    this.onPreloadCallback = null;
    this.onCreateCallback = null;
    this.onUpdateCallback = null;
    this.onPauseUpdateCallback = null;
    this.states = {};
    this._pendingState = null;
    this.current = '';
  }

  /**
   * Dummy function for callbacks.
   * This is a placeholder function used when no callback is defined.
   */
  public dummy(): void {
    // pass
  }

  /**
   * Get whether the scene has been created.
   * @returns {boolean} True if the scene has been created, false otherwise.
   */
  public get created(): boolean {
    return this._created;
  }
}
