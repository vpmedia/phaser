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
    constructor(gameConfig?: {
        width: number;
        height: number;
        backgroundColor: string;
        canvasID: string;
        canvasStyle: object;
        resolution: number;
        transparent: boolean;
        antialias: boolean;
        preserveDrawingBuffer: boolean;
        clearBeforeRender: boolean;
        roundPixels: boolean;
        renderType: number;
        isForceDisabledAudio: boolean;
        maxParallelDownloads: number;
        parent: string | HTMLElement;
        state: object;
    });
    config: {};
    id: number;
    parent: string;
    width: number;
    height: number;
    renderer: CanvasRenderer | WebGLRenderer;
    state: SceneManager;
    isBooted: boolean;
    paused: boolean;
    raf: RequestAnimationFrame;
    add: GameObjectFactory;
    cache: Cache;
    input: Input;
    load: Loader;
    scale: ScaleManager;
    sound: SoundManager;
    stage: Stage;
    time: Time;
    tweens: TweenManager;
    world: World;
    device: Device;
    /** @type {Logger} */
    logger: Logger;
    /** @type {HTMLCanvasElement} */
    canvas: HTMLCanvasElement;
    /** @type {CanvasRenderingContext2D | ImageBitmapRenderingContext | WebGLRenderingContext | WebGL2RenderingContext} */
    context: CanvasRenderingContext2D | ImageBitmapRenderingContext | WebGLRenderingContext | WebGL2RenderingContext;
    onPause: Signal;
    onResume: Signal;
    onBoot: Signal;
    isPaused: boolean;
    /**
     * Boots the game and initializes all systems.
     */
    boot(): void;
    /**
     * Creates the renderer canvas element.
     */
    createRendererCanvas(): void;
    /**
     * Initializes the renderer and sets up the rendering context.
     */
    initRenderer(): void;
    contextLostBinded: (event: WebGLContextEvent | Event) => void;
    contextRestoredBinded: (event: WebGLContextEvent | Event) => void;
    /**
     * Parses a configuration element and sets it on the game config.
     * @param {object} config - The configuration object to parse from.
     * @param {string} key - The configuration key to parse.
     * @param {*} defaultValue - The default value if the key is not found in config.
     */
    parseConfigElement(config: object, key: string, defaultValue: any): void;
    /**
     * Parses the configuration object and sets up game properties.
     * @param {object} config - The configuration object to parse.
     */
    parseConfig(config: object): void;
    /**
     * Called when the WebGL context is lost.
     * @param {WebGLContextEvent | Event} event - The WebGL context loss event.
     */
    contextLost(event: WebGLContextEvent | Event): void;
    /**
     * Called when the WebGL context is restored.
     * @param {WebGLContextEvent | Event} event - The WebGL context restore event.
     */
    contextRestored(event: WebGLContextEvent | Event): void;
    /**
     * Updates the game state.
     * @param {number} time - The current timestamp.
     */
    update(time: number): void;
    /**
     * Destroys the game and cleans up all resources.
     */
    destroy(): void;
}
import { CanvasRenderer } from '../display/canvas/renderer.js';
import { WebGLRenderer } from '../display/webgl/renderer.js';
import { SceneManager } from './scene_manager.js';
import { RequestAnimationFrame } from './raf.js';
import { GameObjectFactory } from './factory.js';
import { Cache } from './cache.js';
import { Input } from './input.js';
import { Loader } from './loader.js';
import { ScaleManager } from './scale_manager.js';
import { SoundManager } from './sound_manager.js';
import { Stage } from './stage.js';
import { Time } from './time.js';
import { TweenManager } from './tween_manager.js';
import { World } from './world.js';
import { Device } from './device.js';
import { Logger } from '@vpmedia/simplify';
import { Signal } from './signal.js';
//# sourceMappingURL=game.d.ts.map