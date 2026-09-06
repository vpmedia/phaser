declare global {
  /** Who a pooled canvas is on loan to: the object using it, or a label for a shared scratch one. */
  type CanvasOwner = object | string | null;

  type CanvasPoolEntry = {
    canvas: HTMLCanvasElement;
    parent: CanvasOwner;
  };

  type CanvasTintMethod = (
    texture: import('../src/phaser/display/webgl/texture.js').Texture,
    color: number,
    canvas: HTMLCanvasElement
  ) => void;

  type FontProperties = {
    ascent: number;
    descent: number;
    fontSize: number;
  };

  interface PhaserRegistryState {
    CACHE_DEFAULT_IMAGE: import('../src/phaser/display/webgl/texture.js').Texture;
    CACHE_MISSING_IMAGE: import('../src/phaser/display/webgl/texture.js').Texture;
    CANVAS_POOL: CanvasPoolEntry[];
    CANVAS_TINT_METHOD: CanvasTintMethod;
    CAN_CANVAS_HANDLE_ALPHA: boolean;
    CAN_CANVAS_USE_MULTIPLY: boolean;
    EMPTY_RECTANGLE: import('../src/phaser/geom/rectangle.js').Rectangle;
    GL_CONTEXTS: (WebGLRenderingContext | null)[];
    GL_CONTEXT_ID: number;
    GL_PROGRAM_INFO_LOG: string | null;
    GL_SHADER_INFO_LOG: string | null;
    IDENTITY_MATRIX: import('../src/phaser/geom/matrix.js').Matrix;
    INSTANCES: (import('../src/phaser/display/webgl/renderer.js').WebGLRenderer | null)[];
    TEMP_MATRIX: import('../src/phaser/geom/matrix.js').Matrix;
    TEXTURE_SCALE_MODE: number;
    blendModesCanvas: GlobalCompositeOperation[];
    blendModesWebGL: number[][];
    fontPropertiesCache: Record<string, FontProperties>;
    fontPropertiesCanvas: HTMLCanvasElement;
    fontPropertiesContext: CanvasRenderingContext2D;
    graphicsDataPool: import('../src/phaser/display/webgl/graphics_data.js').WebGLGraphicsData[];
    stencilBufferLimit: number;
  }

  // Safari shipped the prefixed constructor years before the standard one and still exposes it
  var webkitAudioContext: typeof AudioContext | undefined;

  interface Document {
    webkitFullscreenElement?: Element | null;
    mozFullScreenElement?: Element | null;
    msFullscreenElement?: Element | null;
  }

  interface Window {
    PhaserRegistry: PhaserRegistryState;
  }

  // eslint-disable-next-line no-var
  var PhaserRegistry: PhaserRegistryState;
}

export {};
