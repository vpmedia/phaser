import { Group } from '../display/group';
import { Game } from './game';

export class World extends Group {
  /**
   * TBD.
   * @param {Game} game - TBD.
   */
  constructor(game) {
    super(game, null, '__world', false);
  }

  /**
   * TBD.
   */
  boot() {
    this.game.stage.addChild(this);
  }
}
