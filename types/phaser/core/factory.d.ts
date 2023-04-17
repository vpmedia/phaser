export class GameObjectFactory {
    constructor(game: any);
    game: any;
    image(x: any, y: any, key: any, frame: any, group?: any): any;
    group(parent: any, name: any, addToStage: any): Group;
    text(x: any, y: any, text: any, style: any, group?: any): any;
    button(x: any, y: any, key: any, callback: any, callbackContext: any, overFrame: any, outFrame: any, downFrame: any, upFrame: any, group?: any): any;
    graphics(x: any, y: any, group?: any): any;
    bitmapText(x: any, y: any, font: any, text: any, size: any, group?: any, align?: string): any;
}
import { Group } from '../display/group';
//# sourceMappingURL=factory.d.ts.map