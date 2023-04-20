export class GameObjectFactory {
    /**
     * TBD.
     * @param {object} game - TBD.
     */
    constructor(game: object);
    game: any;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} key - TBD.
     * @param frame - TBD.
     * @param group - TBD.
     * @returns {Image} TBD.
     */
    image(x: number, y: number, key: string, frame: any, group?: any): Image;
    /**
     * TBD.
     * @param parent - TBD.
     * @param name - TBD.
     * @param addToStage - TBD.
     * @returns {Group} TBD.
     */
    group(parent: any, name: any, addToStage: any): Group;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param text - TBD.
     * @param style - TBD.
     * @param group - TBD.
     * @returns {Text} TBD.
     */
    text(x: number, y: number, text: any, style: any, group?: any): Text;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} key - TBD.
     * @param callback - TBD.
     * @param callbackContext - TBD.
     * @param overFrame - TBD.
     * @param outFrame - TBD.
     * @param downFrame - TBD.
     * @param upFrame - TBD.
     * @param group - TBD.
     * @returns {Button} TBD.
     */
    button(x: number, y: number, key: string, callback: any, callbackContext: any, overFrame: any, outFrame: any, downFrame: any, upFrame: any, group?: any): Button;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param group - TBD.
     * @returns {Graphics} TBD.
     */
    graphics(x: number, y: number, group?: any): Graphics;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param font - TBD.
     * @param text - TBD.
     * @param size - TBD.
     * @param group - TBD.
     * @param align - TBD.
     * @returns {BitmapText} TBD.
     */
    bitmapText(x: number, y: number, font: any, text: any, size: any, group?: any, align?: string): BitmapText;
}
import { Image } from '../display/image';
import { Group } from '../display/group';
import { Text } from '../display/text';
import { Button } from '../display/button';
import { Graphics } from '../display/graphics';
import { BitmapText } from '../display/bitmap_text';
//# sourceMappingURL=factory.d.ts.map