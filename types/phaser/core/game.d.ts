export default class _default {
    constructor(gameConfig?: {});
    config: {};
    id: number;
    parent: string;
    width: number;
    height: number;
    renderer: CanvasRenderer | WebGLRenderer | null;
    state: SceneManager | null;
    isBooted: boolean;
    raf: RequestAnimationFrame | null;
    add: GameObjectFactory | null;
    cache: Cache | null;
    input: Input | null;
    load: Loader | null;
    scale: ScaleManager | null;
    sound: SoundManager | null;
    stage: Stage | null;
    time: Time | null;
    tweens: TweenManager | null;
    world: World | null;
    device: Device;
    canvas: any;
    context: any;
    onPause: Signal;
    onResume: Signal;
    onBoot: Signal;
    isPaused: boolean;
    boot(): void;
    initRenderer(): void;
    contextLostBinded: ((event: any) => void) | undefined;
    contextRestoredBinded: (() => void) | undefined;
    parseConfigElement(config: any, key: any, defaultValue: any): void;
    parseConfig(config: any): void;
    exceptionHandler: any;
    contextLost(event: any): void;
    contextRestored(): void;
    update(time: any): void;
    destroy(): void;
}
import CanvasRenderer from '../display/canvas/renderer';
import WebGLRenderer from '../display/webgl/renderer';
import SceneManager from './scene_manager';
import RequestAnimationFrame from './raf';
import GameObjectFactory from './factory';
import Cache from './cache';
import Input from './input';
import Loader from './loader';
import ScaleManager from './scale_manager';
import SoundManager from './sound_manager';
import Stage from './stage';
import Time from './time';
import TweenManager from './tween_manager';
import World from './world';
import Device from './device';
import Signal from './signal';
//# sourceMappingURL=game.d.ts.map