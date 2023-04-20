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
     * @param frame
     * @param group
     */
    image(x: number, y: number, key: string, frame: any, group?: any): any;
    /**
     * TBD.
     * @param parent
     * @param name
     * @param addToStage
     */
    group(parent: any, name: any, addToStage: any): Group;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param text
     * @param style
     * @param group
     */
    text(x: number, y: number, text: any, style: any, group?: any): any;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} key - TBD.
     * @param callback
     * @param callbackContext
     * @param overFrame
     * @param outFrame
     * @param downFrame
     * @param upFrame
     * @param group
     */
    button(x: number, y: number, key: string, callback: any, callbackContext: any, overFrame: any, outFrame: any, downFrame: any, upFrame: any, group?: any): any;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param group
     */
    graphics(x: number, y: number, group?: any): any;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param font
     * @param text
     * @param size
     * @param group
     * @param align
     */
    bitmapText(x: number, y: number, font: any, text: any, size: any, group?: any, align?: string): any;
}
import { Group } from '../display/group';
//# sourceMappingURL=factory.d.ts.map