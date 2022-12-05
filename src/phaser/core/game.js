/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import CanvasRenderer from '../display/canvas/renderer';
import WebGLRenderer from '../display/webgl/renderer';
import Signal from './signal';
import Loader from './loader';
import Cache from './cache';
import Input from './input';
import Device from './device';
import GameObjectFactory from './factory';
import RequestAnimationFrame from './raf';
import ScaleManager from './scale_manager';
import SoundManager from './sound_manager';
import SceneManager from './scene_manager';
import Time from './time';
import TweenManager from './tween_manager';
import World from './world';
import Stage from './stage';
import { RENDER_AUTO, RENDER_WEBGL } from './const';
import { create, removeFromDOM, addToDOM, setTouchAction } from '../display/canvas/util';
import { initialize, checkOS } from './device_util';

export default class {

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
    this.currentUpdateID = 0;
    this.updatesThisFrame = 1;
    this._deltaTime = 0;
    this._lastCount = 0;
    this._spiraling = 0;
    this.isKickStart = true;
    this.fpsProblemNotifier = new Signal();
    this._nextFpsNotification = 0;
    this.parseConfig(gameConfig);
    checkOS(this.device);
    if (document.readyState === 'complete') {
      initialize(this.device);
      this.boot();
    } else {
      window.addEventListener('load', () => {
        initialize(this.device);
        this.boot();
      }, false);
    }
  }

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
    this.isKickStart = true;
    if (window.focus) {
      window.focus();
    }
    if (!this.config.isSkipTicker) {
      this.raf = new RequestAnimationFrame(this);
      this.raf.start();
    }
    this.onBoot.dispatch(this);
  }

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

  parseConfigElement(config, key, defaultValue) {
    if (config[key] !== undefined) {
      this.config[key] = config[key];
    } else {
      this.config[key] = defaultValue;
    }
  }

  parseConfig(config) {
    /* game */
    this.parseConfigElement(config, 'width', 800);
    this.parseConfigElement(config, 'height', 600);
    this.parseConfigElement(config, 'backgroundColor', 0x000000);
    // Should the game loop force a logic update, regardless of the delta timer? Set to true if you know you need this. You can toggle it on the fly.
    this.parseConfigElement(config, 'forceSingleUpdate', true);
    /* canvas */
    this.parseConfigElement(config, 'canvasID', '');
    this.parseConfigElement(config, 'canvasStyle', undefined);
    /* renderer */
    // The resolution of your game.
    this.parseConfigElement(config, 'resolution', 1);
    // Use a transparent canvas background or not.
    this.parseConfigElement(config, 'transparent', false);
    // Anti-alias graphics. By default scaled images are smoothed in Canvas and WebGL, set anti-alias to false to disable this globally.
    this.parseConfigElement(config, 'antialias', false);
    // The value of the preserveDrawingBuffer flag affects whether or not the contents of the stencil buffer is retained after rendering.
    this.parseConfigElement(config, 'preserveDrawingBuffer', false);
    // Clear the Canvas each frame before rendering the display list.
    // You can set this to `false` to gain some performance if your game always contains a background that completely fills the display.
    this.parseConfigElement(config, 'clearBeforeRender', false);
    // The Renderer this game will use. Either Const.RENDER_AUTO, Const.RENDER_CANVAS, Const.RENDER_WEBGL
    this.parseConfigElement(config, 'renderType', RENDER_AUTO);
    // Force audio disabled
    this.parseConfigElement(config, 'isForceDisabledAudio', false);
    // Sets the number of maximum parallel requests for the loaded (in case of HTTP/2 you can raise this)
    this.parseConfigElement(config, 'maxParallelDownloads', 16);
    if (config.renderer) {
      this.config.renderType = config.renderer;
    }
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

  contextLost(event) {
    event.preventDefault();
    if (this.renderer) {
      this.renderer.contextLost = true;
    }
  }

  contextRestored() {
    this.renderer.initContext();
    // this.cache.clearGLTextures();
    if (this.renderer) {
      this.renderer.contextLost = false;
    }
  }

  update(time) {
    this.time.update(time);
    if (this.isKickStart) {
      this.updateLogic(this.time.desiredFpsMult);
      this.renderer.render(this.stage);
      this.isKickStart = false;
      return;
    }
    if (!this.config.forceSingleUpdate && this._spiraling > 1) {
      if (this.time.time > this._nextFpsNotification) {
        this._nextFpsNotification = this.time.time + 10000;
        this.fpsProblemNotifier.dispatch();
      }
      this._deltaTime = 0;
      this._spiraling = 0;
      this.renderer.render(this.stage);
    } else {
      const slowStep = this.time.slowMotion * 1000.0 / this.time.desiredFps;
      this._deltaTime += Math.max(Math.min(slowStep * 3, this.time.elapsed), 0);
      let count = 0;
      this.updatesThisFrame = Math.floor(this._deltaTime / slowStep);
      if (this.config.forceSingleUpdate) {
        this.updatesThisFrame = Math.min(1, this.updatesThisFrame);
      }
      while (this._deltaTime >= slowStep) {
        this._deltaTime -= slowStep;
        this.currentUpdateID = count;
        this.updateLogic(this.time.desiredFpsMult);
        count += 1;
        if (this.config.forceSingleUpdate && count === 1) {
          break;
        } else {
          this.time.refresh();
        }
      }
      if (count > this._lastCount) {
        this._spiraling += 1;
      } else if (count < this._lastCount) {
        this._spiraling = 0;
      }
      this._lastCount = count;
      this.renderer.render(this.stage);
    }
  }

  updateLogic(timeStep) {
    if (!this.isPaused) {
      this.scale.preUpdate();
      this.state.preUpdate(timeStep);
      this.stage.preUpdate();
      this.state.update();
      this.stage.update();
      this.tweens.update();
      this.sound.update();
      this.input.update();
      this.stage.postUpdate();
    } else {
      // Scaling and device orientation changes are still reflected when paused.
      this.scale.pauseUpdate();
      this.state.pauseUpdate();
    }
    this.stage.updateTransform();
  }

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
