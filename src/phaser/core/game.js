import { CanvasRenderer } from '../display/canvas/renderer';
import { WebGLRenderer } from '../display/webgl/renderer';
import { Signal } from  './signal';
import { Loader } from './loader';
import { Cache } from './cache';
import { Input } from './input';
import { Device } from './device';
import { GameObjectFactory } from './factory';
import { RequestAnimationFrame } from './raf';
import { ScaleManager } from './scale_manager';
import { SoundManager } from './sound_manager';
import { SceneManager } from './scene_manager';
import { Time } from './time';
import { TweenManager } from './tween_manager';
import { World } from './world';
import { Stage } from './stage';
import { RENDER_AUTO, RENDER_WEBGL } from './const';
import { create, removeFromDOM, addToDOM, setTouchAction } from '../display/canvas/util';
import { initialize, checkOS } from './device_util';

export class Game {
  /**
   * TBD.
   * @param {object} gameConfig - TBD.
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
    this.canvas = null;
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
   * TBD.
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
   * TBD.
   */
  initRenderer() {
    if (this.config.canvas) {
      this.canvas = this.config.canvas;
    } else {
      this.canvas = create(this, this.width, this.height, this.config.canvasID, true);
    }
    if (this.config.canvasStyle) {
      this.canvas.style = this.config.canvasStyle;
    } else {
      this.canvas.style['-webkit-full-screen'] = 'width: 100%; height: 100%';
    }
    let isWebGlReady = false;
    if (this.config.renderType === RENDER_AUTO || this.config.renderType === RENDER_WEBGL) {
      try {
        this.renderer = new WebGLRenderer(this);
        this.context = null;
        this.contextLostBinded = this.contextLost.bind(this);
        this.contextRestoredBinded = this.contextRestored.bind(this);
        this.canvas.addEventListener('webglcontextlost', this.contextLostBinded, false);
        this.canvas.addEventListener('webglcontextrestored', this.contextRestoredBinded, false);
        isWebGlReady = true;
      } catch (e) {
        isWebGlReady = false;
        const tags = {};
        if (window.PhaserRegistry?.GL_PROGRAM_INFO_LOG) {
          tags.gl_program_log = window.PhaserRegistry.GL_PROGRAM_INFO_LOG;
        }
        if (window.PhaserRegistry?.GL_SHADER_INFO_LOG) {
          tags.gl_shader_log = window.PhaserRegistry.GL_SHADER_INFO_LOG;
        }
        this.exceptionHandler(e, tags);
      }
      /*
      this.renderer = new WebGLRenderer(this);
      this.context = null;
      this.canvas.addEventListener('webglcontextlost', this.contextLost.bind(this), false);
      this.canvas.addEventListener('webglcontextrestored', this.contextRestored.bind(this), false);
      isWebGlReady = true;
      */
    }
    if (!isWebGlReady) {
      if (this.renderer) {
        if (this.contextLostBinded) {
          this.canvas.removeEventListener('webglcontextlost', this.contextLostBinded, false);
        }
        if (this.contextRestoredBinded) {
          this.canvas.removeEventListener('webglcontextlost', this.contextRestoredBinded, false);
        }
        this.renderer.destroy();
        removeFromDOM(this.canvas);
        this.canvas = create(this, this.width, this.height, this.config.canvasID, true);
      }
      this.renderer = new CanvasRenderer(this);
      this.context = this.renderer.context;
    }
    this.stage.smoothed = this.config.antialias;
    addToDOM(this.canvas, this.parent, false);
    setTouchAction(this.canvas);
  }

  /**
   * TBD.
   * @param {object} config - TBD.
   * @param {string} key - TBD.
   * @param {*} defaultValue - TBD.
   */
  parseConfigElement(config, key, defaultValue) {
    if (config[key] !== undefined) {
      this.config[key] = config[key];
    } else {
      this.config[key] = defaultValue;
    }
  }

  /**
   * TBD.
   * @param {object} config - TBD.
   */
  parseConfig(config) {
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
    if (config.exceptionHandler) {
      this.exceptionHandler = config.exceptionHandler;
    } else {
      this.exceptionHandler = (e, tags) => {
        console.error(e, tags);
      };
    }
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
   * TBD.
   * @param {Event} event - TBD.
   */
  contextLost(event) {
    event.preventDefault();
    if (this.renderer) {
      this.renderer.contextLost = true;
    }
  }

  /**
   * TBD.
   */
  contextRestored() {
    this.renderer.initContext();
    // this.cache.clearGLTextures();
    if (this.renderer) {
      this.renderer.contextLost = false;
    }
  }

  /**
   * TBD.
   * @param {number} time - TBD.
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
   * TBD.
   */
  destroy() {
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
