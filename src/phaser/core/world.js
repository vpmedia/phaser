import { Group } from '../display/group.js';

export class World extends Group {
  /**
   * Creates a new World instance.
   * @param {import('./game.js').Game} game - The game instance this world belongs to.
   */
  constructor(game) {
    super(game, null, '__world', false);
  }

  /**
   * Initialize the world.
   * This method is called when the game boots and sets up the world.
   */
  boot() {
    this.game.stage.addChild(this);
  }
}
