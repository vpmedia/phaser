export class Scene {
  /**
   * Creates a new Scene instance.
   */
  constructor() {
    this.game = null;
    this.key = '';
  }

  /**
   * Initialize the scene.
   * This method is called before preload() and create().
   */
  init() {
    // inherit
  }

  /**
   * Load assets for the scene.
   * This method is called after init() and before create().
   */
  preload() {
    // inherit
  }

  /**
   * Create the scene.
   * This method is called after preload() and is where you create your game objects.
   */
  create() {
    // inherit
  }

  /**
   * Update the scene.
   * This method is called every frame while the scene is active.
   */
  update() {
    // inherit
  }

  /**
   * Handle scene resize.
   * @param {number} width - The new width of the scene.
   * @param {number} height - The new height of the scene.
   */
  resize(width, height) {
    // inherit
  }

  /**
   * Update the scene while paused.
   * This method is called every frame while the scene is paused.
   */
  pauseUpdate() {
    // inherit
  }

  /**
   * Shutdown the scene.
   * This method is called when the scene is about to be destroyed.
   */
  shutdown() {
    // inherit
  }
}
