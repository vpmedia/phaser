import { Group } from  '../display/group';

export class World extends Group {
  /**
   *
   * @param game
   */
  constructor(game) {
    super(game, null, '__world', false);
  }

  /**
   *
   */
  boot() {
    this.game.stage.addChild(this);
  }
}
