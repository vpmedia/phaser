export class Scene {
    game: any;
    key: string;
    /**
     * Initialize the scene.
     * This method is called before preload() and create().
     */
    init(): void;
    /**
     * Load assets for the scene.
     * This method is called after init() and before create().
     */
    preload(): void;
    /**
     * Create the scene.
     * This method is called after preload() and is where you create your game objects.
     */
    create(): void;
    /**
     * Update the scene.
     * This method is called every frame while the scene is active.
     */
    update(): void;
    /**
     * Handle scene resize.
     * @param {number} width - The new width of the scene.
     * @param {number} height - The new height of the scene.
     */
    resize(width: number, height: number): void;
    /**
     * Update the scene while paused.
     * This method is called every frame while the scene is paused.
     */
    pauseUpdate(): void;
    /**
     * Shutdown the scene.
     * This method is called when the scene is about to be destroyed.
     */
    shutdown(): void;
}
//# sourceMappingURL=scene.d.ts.map