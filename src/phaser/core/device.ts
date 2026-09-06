export class Device {
  desktop!: boolean;
  iOS!: boolean;
  android!: boolean;
  chromeOS!: boolean;
  linux!: boolean;
  macOS!: boolean;
  windows!: boolean;
  windowsPhone!: boolean;
  canvas!: boolean;
  touch!: boolean;
  mspointer!: boolean;
  wheelEvent!: string | null;
  chrome!: boolean;
  firefox!: boolean;
  edge!: boolean;
  safari!: boolean;
  fullscreen!: boolean;
  requestFullscreen!: string;
  cancelFullscreen!: string;
  fullscreenKeyboard!: boolean;
  noAudioFormat!: boolean;
  supportedAudioFormats!: Record<string, boolean>;
  supportedImageFormats!: Record<string, boolean>;
  /**
   * Creates a new Device instance.
   * This class provides information about the current device and browser capabilities.
   */
  constructor() {
    this.desktop = false;
    this.iOS = false;
    this.android = false;
    this.chromeOS = false;
    this.linux = false;
    this.macOS = false;
    this.windows = false;
    this.windowsPhone = false;
    this.canvas = false;
    this.touch = false;
    this.mspointer = false;
    this.wheelEvent = null;
    this.chrome = false;
    this.firefox = false;
    this.edge = false;
    this.safari = false;
    this.fullscreen = false;
    this.requestFullscreen = '';
    this.cancelFullscreen = '';
    this.fullscreenKeyboard = false;
    this.noAudioFormat = false;
    /**
     * @type {{[key: string]: boolean}}
     */
    this.supportedAudioFormats = {};
    /**
     * @type {{[key: string]: boolean}}
     */
    this.supportedImageFormats = {};
  }
}
