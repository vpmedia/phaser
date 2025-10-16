export class Game {
    /**
     * TBD.
     * @param {object} gameConfig - TBD.
     */
    constructor(gameConfig?: object);
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
    /** @type {RenderingContext} */
    context: RenderingContext;
    onPause: Signal;
    onResume: Signal;
    onBoot: Signal;
    isPaused: boolean;
    /**
     * TBD.
     */
    boot(): void;
    /**
     * TBD.
     */
    createRendererCanvas(): void;
    /**
     * TBD.
     */
    initRenderer(): void;
    contextLostBinded: (event: WebGLContextEvent | Event) => void;
    contextRestoredBinded: (event: WebGLContextEvent | Event) => void;
    /**
     * TBD.
     * @param {object} config - TBD.
     * @param {string} key - TBD.
     * @param {*} defaultValue - TBD.
     */
    parseConfigElement(config: object, key: string, defaultValue: any): void;
    /**
     * TBD.
     * @param {object} config - TBD.
     */
    parseConfig(config: object): void;
    /**
     * TBD.
     * @param {WebGLContextEvent | Event} event - TBD.
     */
    contextLost(event: WebGLContextEvent | Event): void;
    /**
     * TBD.
     * @param {WebGLContextEvent | Event} event - TBD.
     */
    contextRestored(event: WebGLContextEvent | Event): void;
    /**
     * TBD.
     * @param {number} time - TBD.
     */
    update(time: number): void;
    /**
     * TBD.
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