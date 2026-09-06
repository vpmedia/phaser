import { Group } from '../display/group.js';
import type { Game } from './game.js';

export class World extends Group {
  /**
   * Creates a new World instance.
   * @param {Game} game - The game instance this world belongs to.
   */
  public constructor(game: Game) {
    super(game, null, '__world', false);
  }

  /**
   * Initialize the world.
   * This method is called when the game boots and sets up the world.
   */
  public boot() {
    this.game.stage.addChild(this);
  }
}
