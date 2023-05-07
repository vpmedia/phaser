export class GameObjectFactory {
    /**
     * TBD.
     * @param {import('./game').Game} game - TBD.
     */
    constructor(game: import('./game').Game);
    game: import("./game").Game;
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
     * @param {Group} parent - TBD.
     * @param {string} name - TBD.
     * @param {boolean} addToStage - TBD.
     * @returns {Group} TBD.
     */
    group(parent: Group, name: string, addToStage: boolean): Group;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} text - TBD.
     * @param {object} style - TBD.
     * @param {Group} group - TBD.
     * @returns {Text} TBD.
     */
    text(x: number, y: number, text: string, style: object, group?: Group): Text;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} key - TBD.
     * @param {Function} callback - TBD.
     * @param {object} callbackContext - TBD.
     * @param {string} overFrame - TBD.
     * @param {string} outFrame - TBD.
     * @param {string} downFrame - TBD.
     * @param {string} upFrame - TBD.
     * @param {Group} group - TBD.
     * @returns {Button} TBD.
     */
    button(x: number, y: number, key: string, callback: Function, callbackContext: object, overFrame: string, outFrame: string, downFrame: string, upFrame: string, group?: Group): Button;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {Group} group - TBD.
     * @returns {Graphics} TBD.
     */
    graphics(x: number, y: number, group?: Group): Graphics;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} font - TBD.
     * @param {string} text - TBD.
     * @param {number} size - TBD.
     * @param {Group} group - TBD.
     * @param {string} align - TBD.
     * @returns {BitmapText} TBD.
     */
    bitmapText(x: number, y: number, font: string, text: string, size: number, group?: Group, align?: string): BitmapText;
}
import { Group } from '../display/group';
import { Image } from '../display/image';
import { Text } from '../display/text';
import { Button } from '../display/button';
import { Graphics } from '../display/graphics';
import { BitmapText } from '../display/bitmap_text';
//# sourceMappingURL=factory.d.ts.map