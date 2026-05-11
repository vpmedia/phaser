export class RequestAnimationFrame {
  game: any;
  rafId: number;

  /**
   * Constructor.
   * @param {import('./game.js').Game} game - Reference to the game instance.
   */
  constructor(game: import('./game.js').Game) {
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
  update = (rafTime: number) => {
    this.game.update(rafTime);
    this.rafId = requestAnimationFrame(this.update);
  };
}
