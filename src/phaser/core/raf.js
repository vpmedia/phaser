export class RequestAnimationFrame {
  /**
   * Constructor.
   * @param {import('./game.js').Game} game - Reference to the game instance.
   */
  constructor(game) {
    this.game = game;
    this.rafId = 0;
  }

  /**
   * Starts an animation frame request.
   */
  start = () => {
    this.rafId = requestAnimationFrame(this.update);
  };

  /**
   * Cancels an animation frame request.
   */
  stop = () => {
    cancelAnimationFrame(this.rafId);
  };

  /**
   * Performs an animation frame request.
   * @param {number} rafTime - The timestamp provided by the browser's animation frame.
   */
  update = (rafTime) => {
    this.game.update(rafTime);
    this.rafId = requestAnimationFrame(this.update);
  };
}
