export class Device {
  /**
   * TBD.
   */
  constructor() {
    /**
     * @type {boolean}
     */
    this.desktop = false;
    /**
     * @type {boolean}
     */
    this.iOS = false;
    /**
     * @type {boolean}
     */
    this.android = false;
    /**
     * @type {boolean}
     */
    this.chromeOS = false;
    /**
     * @type {boolean}
     */
    this.linux = false;
    /**
     * @type {boolean}
     */
    this.macOS = false;
    /**
     * @type {boolean}
     */
    this.windows = false;
    /**
     * @type {boolean}
     */
    this.windowsPhone = false;
    /**
     * @type {boolean}
     */
    this.canvas = false;
    /**
     * @type {boolean}
     */
    this.touch = false;
    /**
     * @type {boolean}
     */
    this.mspointer = false;
    this.wheelEvent = null;
    /**
     * @type {boolean}
     */
    this.chrome = false;
    /**
     * @type {boolean}
     */
    this.firefox = false;
    /**
     * @type {boolean}
     */
    this.edge = false;
    /**
     * @type {boolean}
     */
    this.safari = false;
    /**
     * @type {boolean}
     */
    this.fullscreen = false;
    /**
     * @type {string}
     */
    this.requestFullscreen = '';
    /**
     * @type {string}
     */
    this.cancelFullscreen = '';
    /**
     * @type {boolean}
     */
    this.fullscreenKeyboard = false;
    /**
     * @type {boolean}
     */
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
