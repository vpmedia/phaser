export class GameObjectFactory {
    /**
     * TBD.
     * @param {Game} game - TBD.
     */
    constructor(game: Game);
    game: Game;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} key - TBD.
     * @param frame - TBD.
     * @param {Group} group - TBD.
     * @returns {Image} TBD.
     */
    image(x: number, y: number, key: string, frame: any, group?: Group): Image;
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
     * @param text - TBD.
     * @param style - TBD.
     * @param {Group} group - TBD.
     * @returns {Text} TBD.
     */
    text(x: number, y: number, text: any, style: any, group?: Group): Text;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} key - TBD.
     * @param {Function} callback - TBD.
     * @param {object} callbackContext - TBD.
     * @param overFrame - TBD.
     * @param outFrame - TBD.
     * @param downFrame - TBD.
     * @param upFrame - TBD.
     * @param {Group} group - TBD.
     * @returns {Button} TBD.
     */
    button(x: number, y: number, key: string, callback: Function, callbackContext: object, overFrame: any, outFrame: any, downFrame: any, upFrame: any, group?: Group): Button;
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
     * @param font - TBD.
     * @param text - TBD.
     * @param size - TBD.
     * @param {Group} group - TBD.
     * @param align - TBD.
     * @returns {BitmapText} TBD.
     */
    bitmapText(x: number, y: number, font: any, text: any, size: any, group?: Group, align?: string): BitmapText;
}
import { Game } from './game';
import { Group } from '../display/group';
import { Image } from '../display/image';
import { Text } from '../display/text';
import { Button } from '../display/button';
import { Graphics } from '../display/graphics';
import { BitmapText } from '../display/bitmap_text';
//# sourceMappingURL=factory.d.ts.map