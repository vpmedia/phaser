import { Scene } from './scene.js';

export class SceneManager {
  /**
   * Creates a new SceneManager instance.
   * @param {import('./game.js').Game} game - The game instance this manager belongs to.
   * @param {string} pendingState - The state to load when the game boots.
   */
  constructor(game, pendingState) {
    this.game = game;
    this.states = {};
    this._pendingState = null;
    if (typeof pendingState !== 'undefined' && pendingState !== null) {
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
  boot() {
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
  add(key, state, autoStart = false) {
    let newState = null;
    if (state instanceof Scene) {
      newState = state;
    } else if (typeof state === 'object') {
      newState = state;
      newState.game = this.game;
    } else if (typeof state === 'function') {
      newState = new state(this.game);
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
  remove(key) {
    if (this.current === key) {
      this.callbackContext = null;
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
  start(key, clearWorld = true, clearCache = false, ...args) {
    if (this.checkState(key)) {
      //  Place the state in the queue. It will be started the next time the game loop begins.
      this._pendingState = key;
      this._clearWorld = clearWorld;
      this._clearCache = clearCache;
      if (args && args.length > 0) {
        this._args = args.slice();
      }
    }
  }

  /**
   * Restart the current scene state.
   * @param {boolean} clearWorld - Whether to clear the world before restarting.
   * @param {boolean} clearCache - Whether to clear the cache before restarting.
   * @param {...any} args - Additional arguments to pass to the state.
   */
  restart(clearWorld = true, clearCache = false, ...args) {
    this._pendingState = this.current;
    this._clearWorld = clearWorld;
    this._clearCache = clearCache;
    if (args && args.length > 0) {
      this._args = args.slice();
    }
  }

  /**
   * Pre-update the scene manager.
   * This method is called before the game loop updates.
   */
  preUpdate() {
    if (this._pendingState && this.game.isBooted) {
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
  clearCurrentState() {
    if (this.current) {
      if (this.onShutDownCallback) {
        this.onShutDownCallback.call(this.callbackContext, this.game);
      }
      this.game.tweens.removeAll();
      this.game.input.reset(true);
      this.game.time.removeAll();
      this.game.scale.reset(this._clearWorld);
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
  checkState(key) {
    if (this.states[key]) {
      if (this.states[key].preload || this.states[key].create || this.states[key].update || this.states[key].render) {
        return true;
      }
      return false;
    }
    return false;
  }

  /**
   * Link a scene state to the manager.
   * @param {string} key - The unique key for the state to link.
   */
  link(key) {
    this.states[key].game = this.game;
    this.states[key].key = key;
  }

  /**
   * Unlink a scene state from the manager.
   * @param {string} key - The unique key for the state to unlink.
   */
  unlink(key) {
    if (this.states[key]) {
      this.states[key].game = null;
    }
  }

  /**
   * Set the current scene state.
   * @param {string} key - The unique key for the state to set as current.
   */
  setCurrentState(key) {
    this.callbackContext = this.states[key];
    this.link(key);
    //  Used when the state is set as being the current active state
    this.onInitCallback = this.callbackContext.init || this.dummy;
    this.onPreloadCallback = this.callbackContext.preload || null;
    this.onCreateCallback = this.callbackContext.create || null;
    this.onUpdateCallback = this.callbackContext.update || null;
    this.onResizeCallback = this.callbackContext.resize || null;
    this.onPauseUpdateCallback = this.callbackContext.pauseUpdate || null;
    this.onShutDownCallback = this.callbackContext.shutdown || this.dummy;
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
   * @returns {Scene} The current scene state.
   */
  getCurrentState() {
    return this.states[this.current];
  }

  /**
   * Handle loading completion.
   * This method is called when scene loading is complete.
   */
  loadComplete() {
    if (this._created === false && this.onCreateCallback) {
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
  update() {
    if (this._created && this.onUpdateCallback) {
      this.onUpdateCallback.call(this.callbackContext, this.game);
    }
  }

  /**
   * Pause the scene manager updates.
   * This method is called when the game is paused.
   */
  pauseUpdate() {
    if (this._created && this.onPauseUpdateCallback) {
      this.onPauseUpdateCallback.call(this.callbackContext, this.game);
    }
  }

  /**
   * Handle scene resize.
   * @param {number} width - The new width of the scene.
   * @param {number} height - The new height of the scene.
   */
  resize(width, height) {
    if (this.onResizeCallback) {
      this.onResizeCallback.call(this.callbackContext, width, height);
    }
  }

  /**
   * Destroy the scene manager.
   * This method is called when the scene manager is about to be destroyed.
   */
  destroy() {
    this._clearWorld = true;
    this._clearCache = true;
    this.clearCurrentState();
    this.callbackContext = null;
    this.onInitCallback = null;
    this.onShutDownCallback = null;
    this.onPreloadCallback = null;
    this.onCreateCallback = null;
    this.onUpdateCallback = null;
    this.onPauseUpdateCallback = null;
    this.game = null;
    this.states = {};
    this._pendingState = null;
    this.current = '';
  }

  /**
   * Dummy function for callbacks.
   * This is a placeholder function used when no callback is defined.
   */
  dummy() {
    // pass
  }

  /**
   * Get whether the scene has been created.
   * @returns {boolean} True if the scene has been created, false otherwise.
   */
  get created() {
    return this._created;
  }
}
