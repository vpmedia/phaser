export class World extends Group {
    /**
     * Creates a new World instance.
     * @param {import('./game.js').Game} game - The game instance this world belongs to.
     */
    constructor(game: import("./game.js").Game);
    /**
     * Initialize the world.
     * This method is called when the game boots and sets up the world.
     */
    boot(): void;
}
import { Group } from '../display/group.js';
//# sourceMappingURL=world.d.ts.map