export class GameObjectFactory {
    constructor(game: any);
    game: any;
    image(x: any, y: any, key: any, frame: any, group?: null): any;
    group(parent: any, name: any, addToStage: any): Group;
    text(x: any, y: any, text: any, style: any, group?: null): any;
    button(x: any, y: any, key: any, callback: any, callbackContext: any, overFrame: any, outFrame: any, downFrame: any, upFrame: any, group?: null): any;
    graphics(x: any, y: any, group?: null): any;
    bitmapText(x: any, y: any, font: any, text: any, size: any, group?: null, align?: string): any;
}
import { Group } from '../display/group';
//# sourceMappingURL=factory.d.ts.map