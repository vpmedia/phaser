/** What the current device and browser can do, as probed at boot. */
export class Device {
  public desktop = false;
  public iOS = false;
  public android = false;
  public chromeOS = false;
  public linux = false;
  public macOS = false;
  public windows = false;
  public windowsPhone = false;
  public canvas = false;
  public touch = false;
  public mspointer = false;
  public wheelEvent: string | null = null;
  public chrome = false;
  public firefox = false;
  public edge = false;
  public safari = false;
  public fullscreen = false;
  public requestFullscreen = '';
  public cancelFullscreen = '';
  public fullscreenKeyboard = false;
  public noAudioFormat = false;
  public supportedAudioFormats: Record<string, boolean> = {};
  public supportedImageFormats: Record<string, boolean> = {};
}
