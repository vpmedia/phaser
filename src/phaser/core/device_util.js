/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */

/**
 *
 * @param {object} device TBD
 * @param {string} type TBD
 * @returns {boolean} TBD
 */
export function canPlayAudio(device, type) {
  if (type === 'mp3' && device.mp3) {
    return true;
  } else if (type === 'ogg' && (device.ogg || device.opus)) {
    return true;
  } else if (type === 'm4a' && device.m4a) {
    return true;
  } else if (type === 'opus' && device.opus) {
    return true;
  } else if (type === 'wav' && device.wav) {
    return true;
  } else if (type === 'webm' && device.webm) {
    return true;
  } else if (type === 'mp4' && device.dolby) {
    return true;
  }
  return false;
}

/**
 *
 * @param {object} device TBD
 * @param {string} type TBD
 * @returns {boolean} TBD
 */
export function canPlayVideo(device, type) {
  if (type === 'webm' && (device.webmVideo || device.vp9Video)) {
    return true;
  } else if (type === 'mp4' && (device.mp4Video || device.h264Video)) {
    return true;
  } else if ((type === 'ogg' || type === 'ogv') && device.oggVideo) {
    return true;
  } else if (type === 'mpeg' && device.hlsVideo) {
    return true;
  }
  return false;
}

/**
 *
 * @param {object} device TBD
 */
export function checkOS(device) {
  const ua = navigator.userAgent;
  if (/Android/.test(ua)) {
    device.android = true;
  } else if (/CrOS/.test(ua)) {
    device.chromeOS = true;
  } else if (/iP[ao]d|iPhone/i.test(ua)) {
    device.iOS = true;
  } else if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
    device.iOS = true;
  } else if (/Mac OS/.test(ua)) {
    device.macOS = true;
  } else if (/Linux/.test(ua)) {
    device.linux = true;
  } else if (/Windows/.test(ua)) {
    device.windows = true;
  }
  if (/Windows Phone/i.test(ua) || /IEMobile/i.test(ua)) {
    device.android = false;
    device.iOS = false;
    device.macOS = false;
    device.windows = true;
    device.windowsPhone = true;
  }
  const silk = /Silk/.test(ua); // detected in browsers
  if (device.windows || device.macOS || (device.linux && !silk) || device.chromeOS) {
    device.desktop = true;
  }
  // iOS / Windows Phone / Tablet reset
  if (device.android || device.iOS || device.windowsPhone || ((/Windows NT/i.test(ua)) && (/Touch/i.test(ua)))) {
    device.desktop = false;
  }
}

/**
 *
 * @param {object} device TBD
 */
export function checkInput(device) {
  if ('ontouchstart' in document.documentElement || (window.navigator.maxTouchPoints && window.navigator.maxTouchPoints >= 1)) {
    device.touch = true;
  }
  // if (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) {
  //   device.mspointer = true;
  // }
  // See https://developer.mozilla.org/en-US/docs/Web/Events/wheel
  if ('onwheel' in window || 'WheelEvent' in window) {
    device.wheelEvent = 'wheel';
  }
}

/**
 *
 * @param {object} device TBD
 */
export function checkFullScreenSupport(device) {
  const fs = [
    'requestFullscreen',
    'requestFullScreen',
    'webkitRequestFullscreen',
    'webkitRequestFullScreen',
    'msRequestFullscreen',
    'msRequestFullScreen',
    'mozRequestFullScreen',
    'mozRequestFullscreen',
  ];
  const cfs = [
    'cancelFullScreen',
    'exitFullscreen',
    'webkitCancelFullScreen',
    'webkitExitFullscreen',
    'msCancelFullScreen',
    'msExitFullscreen',
    'mozCancelFullScreen',
    'mozExitFullscreen',
  ];
  const element = document.createElement('div');
  for (let i = 0; i < fs.length; i += 1) {
    if (element[fs[i]]) {
      device.fullscreen = true;
      device.requestFullscreen = fs[i];
      break;
    }
  }
  if (device.fullscreen) {
    for (let i = 0; i < cfs.length; i += 1) {
      if (document[cfs[i]]) {
        device.cancelFullscreen = cfs[i];
        break;
      }
    }
    if (window.Element && Element.ALLOW_KEYBOARD_INPUT) {
      device.fullscreenKeyboard = true;
    }
  }
}

/**
 *
 * @param {object} device TBD
 */
export function checkBrowser(device) {
  const ua = navigator.userAgent;
  if (/Edge\/\d+/.test(ua)) {
    device.edge = true;
  } else if (/Chrome\/(\d+)/.test(ua) && !device.windowsPhone) {
    device.chrome = true;
  } else if (/Firefox\D+(\d+)/.test(ua)) {
    device.firefox = true;
  } else if (/Safari\/(\d+)/.test(ua) && !device.windowsPhone) {
    device.safari = true;
  }
  //  Silk gets its own if clause because its ua also contains 'Safari'
  if (/Silk/.test(ua)) {
    device.silk = true;
  }
}

/**
 *
 * @param {object} device TBD
 */
export function checkVideo(device) {
  const videoElement = document.createElement('video');
  try {
    if (videoElement.canPlayType) {
      if (videoElement.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, '')) {
        device.oggVideo = true;
      }
      if (videoElement.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, '')) {
        // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
        device.h264Video = true;
        device.mp4Video = true;
      }
      if (videoElement.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, '')) {
        device.webmVideo = true;
      }
      if (videoElement.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, '')) {
        device.vp9Video = true;
      }
      if (videoElement.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, '')) {
        device.hlsVideo = true;
      }
    }
  } catch (e) {
    // pass
  }
}

/**
 *
 * @param {object} device TBD
 */
export function checkAudio(device) {
  const audioElement = document.createElement('audio');
  try {
    if (audioElement.canPlayType) {
      if (audioElement.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '')) {
        device.ogg = true;
      }
      if (audioElement.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, '') || audioElement.canPlayType('audio/opus;').replace(/^no$/, '')) {
        device.opus = true;
      }
      if (audioElement.canPlayType('audio/mpeg;').replace(/^no$/, '')) {
        device.mp3 = true;
      }
      // Mimetypes accepted:
      //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
      //   bit.ly/iphoneoscodecs
      if (audioElement.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '')) {
        device.wav = true;
      }
      if (audioElement.canPlayType('audio/x-m4a;') || audioElement.canPlayType('audio/aac;').replace(/^no$/, '')) {
        device.m4a = true;
      }
      if (audioElement.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')) {
        device.webm = true;
      }
      if (audioElement.canPlayType('audio/mp4;codecs="ec-3"') !== '') {
        if (device.edge || device.safari) {
          device.dolby = true;
        }
      }
    }
  } catch (e) {
    // pass
  }
}

/**
 *
 * @param {object} device TBD
 */
export function checkDevice(device) {
  device.pixelRatio = window.devicePixelRatio || 1;
  device.iPhone = navigator.userAgent.toLowerCase().indexOf('iphone') !== -1;
  device.iPad = navigator.userAgent.toLowerCase().indexOf('ipad') !== -1;
}

/**
 *
 * @param {object} device TBD
 */
export function initialize(device) {
  checkOS(device);
  checkBrowser(device);
  checkAudio(device);
  checkVideo(device);
  checkDevice(device);
  checkFullScreenSupport(device);
  checkInput(device);
}

/**
 * TBD
 */
export function readyCheck() {
  if (!document.body) {
    window.setTimeout(readyCheck._monitor, 20);
  } else if (!this.deviceReadyAt) {
    this.deviceReadyAt = Date.now();
    document.removeEventListener('deviceready', readyCheck._monitor);
    document.removeEventListener('DOMContentLoaded', readyCheck._monitor);
    window.removeEventListener('load', readyCheck._monitor);
    initialize(this);
    let item = readyCheck._queue.shift();
    while (item) {
      const callback = item[0];
      const context = item[1];
      callback.call(context, this);
      item = readyCheck._queue.shift();
    }
  }
}

/**
 *
 * @param {object} device TBD
 * @param {Function} callback TBD
 * @param {object} context TBD
 * @param {boolean} nonPrimer TBD
 */
export function whenReady(device, callback, context, nonPrimer) {
  if (device.deviceReadyAt) {
    callback.call(context, device);
  } else if (readyCheck._monitor || nonPrimer) {
    readyCheck._queue = readyCheck._queue || [];
    readyCheck._queue.push([callback, context]);
  } else {
    readyCheck._monitor = readyCheck.bind(device);
    readyCheck._queue = readyCheck._queue || [];
    readyCheck._queue.push([callback, context]);
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // Why is there an additional timeout here?
      window.setTimeout(readyCheck._monitor, 0);
    } else {
      document.addEventListener('DOMContentLoaded', readyCheck._monitor, false);
      window.addEventListener('load', readyCheck._monitor, false);
    }
  }
}
