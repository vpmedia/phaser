export class SceneManager {
    constructor(game: any, pendingState: any);
    game: any;
    states: {};
    _pendingState: any;
    _clearWorld: boolean;
    _clearCache: boolean;
    _created: boolean;
    _args: any[];
    current: string;
    onInitCallback: any;
    onPreloadCallback: any;
    onCreateCallback: any;
    onUpdateCallback: any;
    onResizeCallback: any;
    onPauseUpdateCallback: any;
    onShutDownCallback: any;
    boot(): void;
    add(key: any, state: any, autoStart?: boolean): any;
    remove(key: any): void;
    callbackContext: any;
    start(key: any, clearWorld?: boolean, clearCache?: boolean, ...args: any[]): void;
    restart(clearWorld?: boolean, clearCache?: boolean, ...args: any[]): void;
    preUpdate(): void;
    clearCurrentState(): void;
    checkState(key: any): boolean;
    link(key: any): void;
    unlink(key: any): void;
    setCurrentState(key: any): void;
    getCurrentState(): any;
    loadComplete(): void;
    update(): void;
    pauseUpdate(): void;
    resize(width: any, height: any): void;
    destroy(): void;
    dummy(): void;
    get created(): boolean;
}
//# sourceMappingURL=scene_manager.d.ts.map