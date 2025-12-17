export class GameObjectFactory {
    /**
     * Creates a new GameObjectFactory instance.
     * @param {import('./game.js').Game} game - The game instance this factory belongs to.
     */
    constructor(game: import("./game.js").Game);
    game: import("./game.js").Game;
    /**
     * Creates a new Image object.
     * @param {number} x - The x coordinate of the image.
     * @param {number} y - The y coordinate of the image.
     * @param {string} key - The texture key for the image.
     * @param {string|number} frame - The frame to display.
     * @param {Group} group - The parent group for the image.
     * @returns {Image} The created Image object.
     */
    image(x: number, y: number, key: string, frame: string | number, group?: Group): Image;
    /**
     * Creates a new Group object.
     * @param {Group | null} parent - The parent group for the new group.
     * @param {string | null} name - The name of the group.
     * @param {boolean} addToStage - Whether to add the group to the stage.
     * @returns {Group} The created Group object.
     */
    group(parent?: Group | null, name?: string | null, addToStage?: boolean): Group;
    /**
     * Creates a new Text object.
     * @param {number} x - The x coordinate of the text.
     * @param {number} y - The y coordinate of the text.
     * @param {string} text - The text content to display.
     * @param {object} style - The style configuration for the text.
     * @param {Group | null} group - The parent group for the text.
     * @returns {Text} The created Text object.
     */
    text(x: number, y: number, text: string, style: object, group?: Group | null): Text;
    /**
     * Creates a new Button object.
     * @param {number} x - The x coordinate of the button.
     * @param {number} y - The y coordinate of the button.
     * @param {string} key - The texture key for the button.
     * @param {Function | null} callback - The function to call when the button is clicked.
     * @param {object | null} callbackContext - The context to apply when calling the callback.
     * @param {string | null} overFrame - The frame to display when the mouse is over the button.
     * @param {string | null} outFrame - The frame to display when the mouse is not over the button.
     * @param {string | null} downFrame - The frame to display when the button is pressed.
     * @param {string | null} upFrame - The frame to display when the button is released.
     * @param {Group | null} group - The parent group for the button.
     * @returns {Button} The created Button object.
     */
    button(x: number, y: number, key: string, callback?: Function | null, callbackContext?: object | null, overFrame?: string | null, outFrame?: string | null, downFrame?: string | null, upFrame?: string | null, group?: Group | null): Button;
    /**
     * Creates a new Graphics object.
     * @param {number} x - The x coordinate of the graphics object.
     * @param {number} y - The y coordinate of the graphics object.
     * @param {Group | null} group - The parent group for the graphics object.
     * @returns {Graphics} The created Graphics object.
     */
    graphics(x?: number, y?: number, group?: Group | null): Graphics;
    /**
     * Creates a new BitmapText object.
     * @param {number} x - The x coordinate of the bitmap text.
     * @param {number} y - The y coordinate of the bitmap text.
     * @param {string} font - The font key for the bitmap text.
     * @param {string} text - The text content to display.
     * @param {number} size - The font size.
     * @param {Group | null} group - The parent group for the bitmap text.
     * @param {string} align - The alignment of the text.
     * @returns {BitmapText} The created BitmapText object.
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