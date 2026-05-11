import { DisplayObject } from './display_object.js';

export class SpriteBatch extends DisplayObject {
  /**
   * Creates a new SpriteBatch object.
   * @param {import('../core/game.js').Game} game - The game instance.
   */
  constructor(game: import('../core/game.js').Game) {
    super(game);
  }
}
