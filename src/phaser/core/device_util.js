/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */

/**
 *
 * @param device
 * @param type
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
 * @param device
 * @param type
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
 * @param device
 */
export function checkOS(device) {
  const ua = navigator.userAgent;
  if (/Android/.test(ua)) {
    device.android = true;
  } else if (/CrOS/.test(ua)) {
    device.chromeOS = true;
  } else if (/iP[ao]d|iPhone/i.test(ua)) {
    device.iOS = true;
    (navigator.appVersion).match(/OS (\d+)/);
    device.iOSVersion = parseInt(RegExp.$1, 10);
  } else if (/Linux/.test(ua)) {
    device.linux = true;
  } else if (/Mac OS/.test(ua)) {
    device.macOS = true;
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
  //  Windows Phone / Table reset
  if (device.windowsPhone || ((/Windows NT/i.test(ua)) && (/Touch/i.test(ua)))) {
    device.desktop = false;
  }
  // VPMedia Special override
  if (window.location.pathname.indexOf('/mobile/') > -1) {
    device.desktop = false;
  }
}

/**
 *
 * @param device
 */
export function checkFeatures(device) {
  device.pointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
}

/**
 *
 * @param device
 */
export function checkInput(device) {
  if ('ontouchstart' in document.documentElement || (window.navigator.maxTouchPoints && window.navigator.maxTouchPoints >= 1)) {
    device.touch = true;
  }
  if (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) {
    device.mspointer = true;
  }
  if (!device.cocoonJS) {
    // See https://developer.mozilla.org/en-US/docs/Web/Events/wheel
    if ('onwheel' in window || (device.ie && 'WheelEvent' in window)) {
      // DOM3 Wheel Event: FF 17+, IE 9+, Chrome 31+, Safari 7+
      device.wheelEvent = 'wheel';
    } else if ('onmousewheel' in window) {
      // Non-FF legacy: IE 6-9, Chrome 1-31, Safari 5-7.
      device.wheelEvent = 'mousewheel';
    } else if (device.firefox && 'MouseScrollEvent' in window) {
      // FF prior to 17. This should probably be scrubbed.
      device.wheelEvent = 'DOMMouseScroll';
    }
  }
}

/**
 *
 * @param device
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
 * @param device
 */
export function checkBrowser(device) {
  const ua = navigator.userAgent;
  if (/Edge\/\d+/.test(ua)) {
    device.edge = true;
  } else if (/Chrome\/(\d+)/.test(ua) && !device.windowsPhone) {
    device.chrome = true;
    device.chromeVersion = parseInt(RegExp.$1, 10);
  } else if (/Firefox\D+(\d+)/.test(ua)) {
    device.firefox = true;
    device.firefoxVersion = parseInt(RegExp.$1, 10);
  } else if (/AppleWebKit/.test(ua) && device.iOS) {
    device.mobileSafari = true;
  } else if (/MSIE (\d+\.\d+);/.test(ua)) {
    device.ie = true;
    device.ieVersion = parseInt(RegExp.$1, 10);
  } else if (/Safari\/(\d+)/.test(ua) && !device.windowsPhone) {
    device.safari = true;
    if (/Version\/(\d+)\./.test(ua)) {
      device.safariVersion = parseInt(RegExp.$1, 10);
    }
  } else if (/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/.test(ua)) {
    device.ie = true;
    device.trident = true;
    device.tridentVersion = parseInt(RegExp.$1, 10);
    device.ieVersion = parseInt(RegExp.$3, 10);
  }
  //  Silk gets its own if clause because its ua also contains 'Safari'
  if (/Silk/.test(ua)) {
    device.silk = true;
  }
  //  WebApp mode in iOS
  if (navigator.standalone) {
    device.webApp = true;
  }
  if (typeof window.cordova !== 'undefined') {
    device.cordova = true;
  }
  if (typeof process !== 'undefined' && typeof require !== 'undefined') {
    device.node = true;
  }
  if (navigator.isCocoonJS) {
    device.cocoonJS = true;
  }
  if (device.cocoonJS) {
    try {
      device.cocoonJSApp = (typeof CocoonJS !== 'undefined');
    } catch (error) {
      device.cocoonJSApp = false;
    }
  }
}

/**
 *
 * @param device
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
 * @param device
 */
export function checkAudio(device) {
  device.audioData = !!(window.Audio);
  device.webAudio = !!(window.AudioContext || window.webkitAudioContext);
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
        if (device.edge) {
          device.dolby = true;
        } else if (device.safari && device.safariVersion >= 9) {
          if (/Mac OS X (\d+)_(\d+)/.test(navigator.userAgent)) {
            const major = parseInt(RegExp.$1, 10);
            const minor = parseInt(RegExp.$2, 10);
            if ((major === 10 && minor >= 11) || major > 10) {
              device.dolby = true;
            }
          }
        }
      }
    }
  } catch (e) {
    // pass
  }
}

/**
 *
 * @param device
 */
export function checkDevice(device) {
  device.pixelRatio = window.devicePixelRatio || 1;
  device.iPhone = navigator.userAgent.toLowerCase().indexOf('iphone') !== -1;
  device.iPad = navigator.userAgent.toLowerCase().indexOf('ipad') !== -1;
}

/**
 *
 * @param device
 */
export function initialize(device) {
  checkOS(device);
  checkBrowser(device);
  checkAudio(device);
  checkVideo(device);
  checkDevice(device);
  checkFeatures(device);
  checkFullScreenSupport(device);
  checkInput(device);
}

/**
 *
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
 * @param device
 * @param callback
 * @param context
 * @param nonPrimer
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
    const cordova = typeof window.cordova !== 'undefined';
    const cocoonJS = navigator.isCocoonJS;
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // Why is there an additional timeout here?
      window.setTimeout(readyCheck._monitor, 0);
    } else if (cordova && !cocoonJS) {
      // Ref. http://docs.phonegap.com/en/3.5.0/cordova_events_events.md.html#deviceready
      //  Cordova, but NOT Cocoon?
      document.addEventListener('deviceready', readyCheck._monitor, false);
    } else {
      document.addEventListener('DOMContentLoaded', readyCheck._monitor, false);
      window.addEventListener('load', readyCheck._monitor, false);
    }
  }
}
