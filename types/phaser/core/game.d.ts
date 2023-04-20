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
    canvas: any;
    context: any;
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
    initRenderer(): void;
    contextLostBinded: (event: Event) => void;
    contextRestoredBinded: () => void;
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
    exceptionHandler: any;
    /**
     * TBD.
     * @param {Event} event - TBD.
     */
    contextLost(event: Event): void;
    /**
     * TBD.
     */
    contextRestored(): void;
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
import { CanvasRenderer } from '../display/canvas/renderer';
import { WebGLRenderer } from '../display/webgl/renderer';
import { SceneManager } from './scene_manager';
import { RequestAnimationFrame } from './raf';
import { GameObjectFactory } from './factory';
import { Cache } from './cache';
import { Input } from './input';
import { Loader } from './loader';
import { ScaleManager } from './scale_manager';
import { SoundManager } from './sound_manager';
import { Stage } from './stage';
import { Time } from './time';
import { TweenManager } from './tween_manager';
import { World } from './world';
import { Device } from './device';
import { Signal } from './signal';
//# sourceMappingURL=game.d.ts.map