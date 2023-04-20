import { Game } from '../core/game';
import { DisplayObject } from './display_object';

export class SpriteBatch extends DisplayObject {
  /**
   * TBD.
   * @param {Game} game - TBD.
   */
  constructor(game) {
    super();
    this.game = game;
  }
}
