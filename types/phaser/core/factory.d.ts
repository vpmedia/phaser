export class GameObjectFactory {
    /**
     * TBD.
     * @param {import('./game.js').Game} game - TBD.
     */
    constructor(game: import("./game.js").Game);
    game: import("./game.js").Game;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} key - TBD.
     * @param {string|number} frame - TBD.
     * @param {Group} group - TBD.
     * @returns {Image} TBD.
     */
    image(x: number, y: number, key: string, frame: string | number, group?: Group): Image;
    /**
     * TBD.
     * @param {Group | null} parent - TBD.
     * @param {string | null} name - TBD.
     * @param {boolean} addToStage - TBD.
     * @returns {Group} TBD.
     */
    group(parent?: Group | null, name?: string | null, addToStage?: boolean): Group;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} text - TBD.
     * @param {object} style - TBD.
     * @param {Group | null} group - TBD.
     * @returns {Text} TBD.
     */
    text(x: number, y: number, text: string, style: object, group?: Group | null): Text;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} key - TBD.
     * @param {Function | null} callback - TBD.
     * @param {object | null} callbackContext - TBD.
     * @param {string | null} overFrame - TBD.
     * @param {string | null} outFrame - TBD.
     * @param {string | null} downFrame - TBD.
     * @param {string | null} upFrame - TBD.
     * @param {Group | null} group - TBD.
     * @returns {Button} TBD.
     */
    button(x: number, y: number, key: string, callback?: Function | null, callbackContext?: object | null, overFrame?: string | null, outFrame?: string | null, downFrame?: string | null, upFrame?: string | null, group?: Group | null): Button;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {Group | null} group - TBD.
     * @returns {Graphics} TBD.
     */
    graphics(x?: number, y?: number, group?: Group | null): Graphics;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} font - TBD.
     * @param {string} text - TBD.
     * @param {number} size - TBD.
     * @param {Group | null} group - TBD.
     * @param {string} align - TBD.
     * @returns {BitmapText} TBD.
     */
    bitmapText(x: number, y: number, font: string, text: string, size: number, group?: Group | null, align?: string): BitmapText;
}
import { Group } from '../display/group.js';
import { Image } from '../display/image.js';
import { Text } from '../display/text.js';
import { Button } from '../display/button.js';
import { Graphics } from '../display/graphics.js';
import { BitmapText } from '../display/bitmap_text.js';
//# sourceMappingURL=factory.d.ts.map