import { Scene } from './scene.js';

export class SceneManager {
  /**
   * TBD.
   * @param {import('./game.js').Game} game - TBD.
   * @param {string} pendingState - TBD.
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
   * TBD.
   */
  boot() {
    if (this._pendingState !== null && typeof this._pendingState !== 'string') {
      this.add('default', this._pendingState, true);
    }
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {object} state - TBD.
   * @param {boolean} autoStart - TBD.
   * @returns {Scene|object} TBD.
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
   * TBD.
   * @param {string} key - TBD.
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
   * TBD.
   * @param {string} key - TBD.
   * @param {boolean} clearWorld - TBD.
   * @param {boolean} clearCache - TBD.
   * @param {...any} args - TBD.
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
   * TBD.
   * @param {boolean} clearWorld - TBD.
   * @param {boolean} clearCache - TBD.
   * @param {...any} args - TBD.
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
   * TBD.
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
   * TBD.
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
   * TBD.
   * @param {string} key - TBD.
   * @returns {boolean} TBD.
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
   * TBD.
   * @param {string} key - TBD.
   */
  link(key) {
    this.states[key].game = this.game;
    this.states[key].key = key;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   */
  unlink(key) {
    if (this.states[key]) {
      this.states[key].game = null;
    }
  }

  /**
   * TBD.
   * @param {string} key - TBD.
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
   * TBD.
   * @returns {Scene} TBD.
   */
  getCurrentState() {
    return this.states[this.current];
  }

  /**
   * TBD.
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
   * TBD.
   */
  update() {
    if (this._created && this.onUpdateCallback) {
      this.onUpdateCallback.call(this.callbackContext, this.game);
    }
  }

  /**
   * TBD.
   */
  pauseUpdate() {
    if (this._created && this.onPauseUpdateCallback) {
      this.onPauseUpdateCallback.call(this.callbackContext, this.game);
    }
  }

  /**
   * TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   */
  resize(width, height) {
    if (this.onResizeCallback) {
      this.onResizeCallback.call(this.callbackContext, width, height);
    }
  }

  /**
   * TBD.
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
   * TBD.
   */
  dummy() {
    // pass
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  get created() {
    return this._created;
  }
}
