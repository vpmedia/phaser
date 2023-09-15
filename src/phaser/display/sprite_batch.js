import { DisplayObject } from './display_object.js';

export class SpriteBatch extends DisplayObject {
  /**
   * TBD.
   * @param {import('../core/game').Game} game - TBD.
   */
  constructor(game) {
    super();
    this.game = game;
  }
}
