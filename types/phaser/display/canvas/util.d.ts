export function create(parent: object, width: number, height: number, id: string, skipPool: boolean): HTMLCanvasElement;
export function setBackgroundColor(canvas: HTMLCanvasElement, color: string): HTMLCanvasElement;
export function setTouchAction(canvas: HTMLCanvasElement, value?: string): HTMLCanvasElement;
export function setUserSelect(canvas: HTMLCanvasElement, value?: string): HTMLCanvasElement;
export function addToDOM(canvas: HTMLCanvasElement, parent: object, overflowHidden?: boolean): HTMLCanvasElement;
export function removeFromDOM(canvas: HTMLCanvasElement): void;
export function setTransform(context: CanvasRenderingContext2D, translateX: number, translateY: number, scaleX: number, scaleY: number, skewX: number, skewY: number): CanvasRenderingContext2D;
export function getSmoothingPrefix(context: CanvasRenderingContext2D): string | null;
export function setSmoothingEnabled(context: object, value: number): object;
//# sourceMappingURL=util.d.ts.map