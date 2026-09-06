import { DisplayObject } from './display_object.js';
import type { Game } from '../core/game.js';

export class SpriteBatch extends DisplayObject {
  /**
   * Creates a new SpriteBatch object.
   * @param {Game} game - The game instance.
   */
  public constructor(game: Game) {
    super(game);
  }
}
