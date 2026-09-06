import type { Game } from './game.js';
export class RequestAnimationFrame {
  public game: any;
  public rafId: number;

  /**
   * Constructor.
   * @param {Game} game - Reference to the game instance.
   */
  public constructor(game: Game) {
    this.game = game;
    this.rafId = 0;
  }

  /**
   * Starts an animation frame request.
   */
  public start = (): void => {
    this.rafId = requestAnimationFrame(this.update);
  };

  /**
   * Cancels an animation frame request.
   */
  public stop = (): void => {
    cancelAnimationFrame(this.rafId);
  };

  /**
   * Performs an animation frame request.
   * @param {number} rafTime - The timestamp provided by the browser's animation frame.
   */
  public update = (rafTime: number): void => {
    this.game.update(rafTime);
    this.rafId = requestAnimationFrame(this.update);
  };
}
