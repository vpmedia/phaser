/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */

export default class {

  constructor() {
    this.deviceReadyAt = 0;
    this.desktop = false;
    this.iOS = false;
    this.iOSVersion = 0;
    this.node = false;
    this.android = false;
    this.chromeOS = false;
    this.linux = false;
    this.macOS = false;
    this.windows = false;
    this.windowsPhone = false;
    this.canvas = false;
    this.pointerLock = false;
    this.touch = false;
    this.mspointer = false;
    this.wheelEvent = null;
    this.chrome = false;
    this.chromeVersion = 0;
    this.firefox = false;
    this.firefoxVersion = 0;
    this.edge = false;
    this.mobileSafari = false;
    this.safari = false;
    this.safariVersion = 0;
    this.webApp = false;
    this.silk = false;
    this.audioData = false;
    this.webAudio = false;
    this.ogg = false;
    this.opus = false;
    this.mp3 = false;
    this.wav = false;
    this.m4a = false;
    this.webm = false;
    this.dolby = false;
    this.oggVideo = false;
    this.h264Video = false;
    this.mp4Video = false;
    this.webmVideo = false;
    this.vp9Video = false;
    this.hlsVideo = false;
    this.iPhone = false;
    this.iPad = false;
    this.pixelRatio = 1;
    this.fullscreen = false;
    this.requestFullscreen = '';
    this.cancelFullscreen = '';
    this.fullscreenKeyboard = false;
  }

}
