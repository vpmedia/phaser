import { Logger } from '@vpmedia/simplify';
import { CanvasRenderer } from '../display/canvas/renderer.js';
import { addToDOM, create, removeFromDOM, setTouchAction } from '../display/canvas/util.js';
import { WebGLRenderer } from '../display/webgl/renderer.js';
import { Cache } from './cache.js';
import { RENDER_AUTO, RENDER_WEBGL } from './const.js';
import { Device } from './device.js';
import { checkOS, initialize } from './device_util.js';
import { GameObjectFactory } from './factory.js';
import { Input } from './input.js';
import { Loader } from './loader.js';
import { RequestAnimationFrame } from './raf.js';
import { ScaleManager } from './scale_manager.js';
import { SceneManager } from './scene_manager.js';
import { Signal } from './signal.js';
import { SoundManager } from './sound_manager.js';
import { Stage } from './stage.js';
import { Time } from './time.js';
import { TweenManager } from './tween_manager.js';
import { World } from './world.js';

export class Game {
  /**
   * Creates a new Game instance.
   * @param {object} gameConfig - The configuration object for the game.
   * @param {number} gameConfig.width - The width of the game canvas (default: 800).
   * @param {number} gameConfig.height - The height of the game canvas (default: 600).
   * @param {string} gameConfig.backgroundColor - The background color of the canvas (default: 0x000000).
   * @param {string} gameConfig.canvasID - The ID of the canvas element (default: '').
   * @param {object} gameConfig.canvasStyle - CSS styles to apply to the canvas.
   * @param {number} gameConfig.resolution - The resolution scale factor (default: 1).
   * @param {boolean} gameConfig.transparent - Whether the canvas should be transparent (default: false).
   * @param {boolean} gameConfig.antialias - Whether to enable antialiasing (default: false).
   * @param {boolean} gameConfig.preserveDrawingBuffer - Whether to preserve the drawing buffer (default: false).
   * @param {boolean} gameConfig.clearBeforeRender - Whether to clear the canvas before rendering (default: true).
   * @param {boolean} gameConfig.roundPixels - Whether to round pixel values (default: true).
   * @param {number} gameConfig.renderType - The rendering type to use (default: RENDER_AUTO).
   * @param {boolean} gameConfig.isForceDisabledAudio - Whether to force disable audio (default: false).
   * @param {number} gameConfig.maxParallelDownloads - Maximum parallel downloads (default: 16).
   * @param {string|HTMLElement} gameConfig.parent - The parent element to append the canvas to.
   * @param {object} gameConfig.state - The initial state object or class.
   */
  constructor(gameConfig = {}) {
    if (!window.PhaserRegistry) {
      window.PhaserRegistry = {};
    }
    this.config = {};
    this.id = 0;
    this.parent = '';
    this.width = 800;
    this.height = 600;
    this.renderer = null;
    this.state = null;
    this.isBooted = false;
    this.paused = false;
    this.raf = null;
    this.add = null;
    this.cache = null;
    this.input = null;
    this.load = null;
    this.scale = null;
    this.sound = null;
    this.stage = null;
    this.time = null;
    this.tweens = null;
    this.world = null;
    this.device = new Device();
    /** @type {Logger} */
    this.logger = null;
    /** @type {HTMLCanvasElement} */
    this.canvas = null;
    /** @type {CanvasRenderingContext2D | ImageBitmapRenderingContext | WebGLRenderingContext | WebGL2RenderingContext} */
    this.context = null;
    this.onPause = new Signal();
    this.onResume = new Signal();
    this.onBoot = new Signal();
    this.isPaused = false;
    this.parseConfig(gameConfig);
    checkOS(this.device);
    if (document.readyState === 'complete') {
      initialize(this.device);
      this.boot();
    } else {
      window.addEventListener(
        'load',
        () => {
          initialize(this.device);
          this.boot();
        },
        false
      );
    }
  }

  /**
   * Boots the game and initializes all systems.
   */
  boot() {
    if (this.isBooted) {
      return;
    }
    this.isBooted = true;
    this.scale = new ScaleManager(this, this.config.width, this.config.height);
    this.stage = new Stage(this);
    this.initRenderer();
    this.world = new World(this);
    this.add = new GameObjectFactory(this);
    this.cache = new Cache(this);
    this.load = new Loader(this);
    this.time = new Time(this);
    this.tweens = new TweenManager(this);
    this.input = new Input(this);
    this.sound = new SoundManager(this);
    this.time.boot();
    this.stage.boot();
    this.world.boot();
    this.scale.boot();
    this.input.boot();
    this.sound.boot();
    this.state.boot();
    if (window.focus) {
      window.focus();
    }
    if (!this.config.isSkipTicker) {
      this.raf = new RequestAnimationFrame(this);
      this.raf.start();
    }
    this.onBoot.dispatch(this);
  }

  /**
   * Creates the renderer canvas element.
   */
  createRendererCanvas() {
    this.logger.info('createRendererCanvas');
    if (this.canvas) {
      removeFromDOM(this.canvas);
    }
    if (this.config.canvas) {
      this.canvas = this.config.canvas;
    } else {
      this.canvas = create(this, this.width, this.height, this.config.canvasID, true);
    }
    if (this.config.canvasStyle) {
      const properties = Object.keys(this.config.canvasStyle);
      for (const property of properties) {
        this.canvas.style[property] = this.config.canvasStyle[property];
      }
    } else {
      this.canvas.style['-webkit-full-screen'] = 'width: 100%; height: 100%';
    }
  }

  /**
   * Initializes the renderer and sets up the rendering context.
   */
  initRenderer() {
    let isWebGlReady = false;
    if (this.config.renderType === RENDER_AUTO || this.config.renderType === RENDER_WEBGL) {
      try {
        this.createRendererCanvas();
        this.logger.info('initWebGLRenderer');
        this.renderer = new WebGLRenderer(this);
        this.context = null;
        this.contextLostBinded = this.contextLost.bind(this);
        this.contextRestoredBinded = this.contextRestored.bind(this);
        this.canvas.addEventListener('webglcontextlost', this.contextLostBinded, false);
        this.canvas.addEventListener('webglcontextrestored', this.contextRestoredBinded, false);
        isWebGlReady = true;
      } catch (error) {
        isWebGlReady = false;
        if (window.PhaserRegistry?.GL_PROGRAM_INFO_LOG) {
          this.logger.warn('WebGL program info', { log: window.PhaserRegistry.GL_PROGRAM_INFO_LOG });
        }
        if (window.PhaserRegistry?.GL_SHADER_INFO_LOG) {
          this.logger.warn('WebGL shader info', { log: window.PhaserRegistry.GL_SHADER_INFO_LOG });
        }
        const typedError = error instanceof Error ? error : new Error(String(error));
        this.logger.exception('Game', typedError);
      }
    }
    if (!isWebGlReady) {
      if (this.contextLostBinded) {
        this.canvas.removeEventListener('webglcontextlost', this.contextLostBinded, false);
      }
      if (this.contextRestoredBinded) {
        this.canvas.removeEventListener('webglcontextlost', this.contextRestoredBinded, false);
      }
      if (this.renderer) {
        this.renderer.destroy();
      }
      this.createRendererCanvas();
      this.logger.info('initCanvasRenderer');
      this.renderer = new CanvasRenderer(this);
      this.context = this.renderer.context;
    }
    this.stage.smoothed = this.config.antialias;
    addToDOM(this.canvas, this.parent, false);
    setTouchAction(this.canvas);
  }

  /**
   * Parses a configuration element and sets it on the game config.
   * @param {object} config - The configuration object to parse from.
   * @param {string} key - The configuration key to parse.
   * @param {*} defaultValue - The default value if the key is not found in config.
   */
  parseConfigElement(config, key, defaultValue) {
    if (config[key] !== undefined) {
      this.config[key] = config[key];
    } else {
      this.config[key] = defaultValue;
    }
  }

  /**
   * Parses the configuration object and sets up game properties.
   * @param {object} config - The configuration object to parse.
   */
  parseConfig(config) {
    this.logger = config.logger ?? new Logger('phaser');
    this.logger.info('parseConfig');
    this.parseConfigElement(config, 'width', 800);
    this.parseConfigElement(config, 'height', 600);
    this.parseConfigElement(config, 'backgroundColor', 0x000000);
    this.parseConfigElement(config, 'canvasID', '');
    this.parseConfigElement(config, 'canvasStyle', undefined);
    this.parseConfigElement(config, 'resolution', 1);
    this.parseConfigElement(config, 'transparent', false);
    this.parseConfigElement(config, 'antialias', false);
    this.parseConfigElement(config, 'preserveDrawingBuffer', false);
    this.parseConfigElement(config, 'clearBeforeRender', true);
    this.parseConfigElement(config, 'roundPixels', true);
    this.parseConfigElement(config, 'renderType', RENDER_AUTO);
    this.parseConfigElement(config, 'isForceDisabledAudio', false);
    this.parseConfigElement(config, 'maxParallelDownloads', 16);
    if (config.parent) {
      this.parent = config.parent;
    }
    let state = null;
    if (config.state) {
      state = config.state;
    }
    this.state = new SceneManager(this, state);
  }

  /**
   * Called when the WebGL context is lost.
   * @param {WebGLContextEvent | Event} event - The WebGL context loss event.
   */
  contextLost(event) {
    this.logger.info('contextLost', event);
    event.preventDefault();
    if (this.renderer) {
      this.renderer.contextLost = true;
    }
  }

  /**
   * Called when the WebGL context is restored.
   * @param {WebGLContextEvent | Event} event - The WebGL context restore event.
   */
  contextRestored(event) {
    this.logger.info('contextRestored', event);
    if (this.renderer) {
      this.renderer.initContext(this);
      // this.cache.clearGLTextures();
      this.renderer.contextLost = false;
    }
  }

  /**
   * Updates the game state.
   * @param {number} time - The current timestamp.
   */
  update(time) {
    this.time.update(time);
    if (!this.isPaused) {
      this.scale.preUpdate();
      this.state.preUpdate();
      this.stage.preUpdate();
      this.state.update();
      this.stage.update();
      this.tweens.update();
      this.sound.update();
      this.input.update();
      this.stage.postUpdate();
    } else {
      this.scale.pauseUpdate();
      this.state.pauseUpdate();
    }
    this.stage.updateTransform();
    this.renderer.render(this.stage);
  }

  /**
   * Destroys the game and cleans up all resources.
   */
  destroy() {
    this.logger.info('destroy');
    this.isPaused = true;

    if (!this.cache) {
      return;
    }
    if (this.raf) {
      this.raf.stop();
    }

    this.time.destroy();
    this.state.destroy();
    this.sound.destroy();
    this.scale.destroy();
    this.stage.destroy();
    this.input.destroy();

    if (this.canvas) {
      if (this.contextLostBinded) {
        this.canvas.removeEventListener('webglcontextlost', this.contextLostBinded, false);
      }
      if (this.contextRestoredBinded) {
        this.canvas.removeEventListener('webglcontextlost', this.contextRestoredBinded, false);
      }
    }
    this.renderer.destroy(false);
    removeFromDOM(this.canvas);

    this.cache = null;
    this.load = null;
    this.time = null;
    this.world = null;
    this.state = null;
    this.sound = null;
    this.scale = null;
    this.stage = null;
    this.input = null;
    this.canvas = null;
    this.renderer = null;
  }
}
