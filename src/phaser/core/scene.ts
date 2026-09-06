export class Scene {
  public game: any = null;
  public key: any = '';
  /**
   * Creates a new Scene instance.
   */

  /**
   * Initialize the scene.
   * This method is called before preload() and create().
   */
  public init() {
    // inherit
  }

  /**
   * Load assets for the scene.
   * This method is called after init() and before create().
   */
  public preload() {
    // inherit
  }

  /**
   * Create the scene.
   * This method is called after preload() and is where you create your game objects.
   */
  public create() {
    // inherit
  }

  /**
   * Update the scene.
   * This method is called every frame while the scene is active.
   */
  public update() {
    // inherit
  }

  /**
   * Handle scene resize.
   * @param {number} _width - The new width of the scene.
   * @param {number} _height - The new height of the scene.
   */
  public resize(_width: number, _height: number) {
    // inherit
  }

  /**
   * Update the scene while paused.
   * This method is called every frame while the scene is paused.
   */
  public pauseUpdate() {
    // inherit
  }

  /**
   * Shutdown the scene.
   * This method is called when the scene is about to be destroyed.
   */
  public shutdown() {
    // inherit
  }
}
