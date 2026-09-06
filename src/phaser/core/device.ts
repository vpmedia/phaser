export class Device {
  public desktop: boolean = false;
  public iOS: boolean = false;
  public android: boolean = false;
  public chromeOS: boolean = false;
  public linux: boolean = false;
  public macOS!: boolean;
  public windows!: boolean;
  public windowsPhone!: boolean;
  public canvas!: boolean;
  public touch!: boolean;
  public mspointer!: boolean;
  public wheelEvent!: string | null;
  public chrome!: boolean;
  public firefox!: boolean;
  public edge!: boolean;
  public safari!: boolean;
  public fullscreen!: boolean;
  public requestFullscreen!: string;
  public cancelFullscreen!: string;
  public fullscreenKeyboard!: boolean;
  public noAudioFormat!: boolean;
  public supportedAudioFormats!: Record<string, boolean>;
  public supportedImageFormats!: Record<string, boolean>;
  /**
   * Creates a new Device instance.
   * This class provides information about the current device and browser capabilities.
   */
  public constructor() {
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
