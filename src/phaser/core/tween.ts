import type { TweenTarget } from './tween_manager.js';
import * as MathUtils from '../util/math.js';
import { TWEEN_COMPLETE, TWEEN_LOOPED, TWEEN_PENDING, TWEEN_RUNNING } from './const.js';
import { Signal } from './signal.js';
import { TweenData } from './tween_data.js';
import type { Game } from './game.js';
import type { TweenManager } from './tween_manager.js';
import type { AppliedCallback, Callback, EasingFunction, InterpolationFunction } from './callback.js';
import type { TweenValues } from './tween_data.js';

export class Tween {
  public game!: Game;
  public target!: TweenTarget;
  public manager!: TweenManager;
  public timeline!: TweenData[];
  public reverse!: boolean;
  public timeScale!: number;
  public repeatCounter!: number;
  public pendingDelete!: boolean;
  public onStart!: Signal;
  public onLoop!: Signal;
  public onRepeat!: Signal;
  public onChildComplete!: Signal;
  public onComplete!: Signal;
  public isRunning!: boolean;
  public current!: number;
  public properties!: TweenValues;
  public chainedTween!: Tween | null;
  public isPaused!: boolean;
  public _onUpdateCallback!: Callback | null;
  public _onUpdateCallbackContext!: unknown;
  public _pausedTime!: number;
  public _codePaused!: boolean;
  public _hasStarted!: boolean;
  /**
   * Creates a new Tween instance.
   * @param {DisplayObject} target - The object to tween.
   * @param {Game} game - Reference to the Phaser Game instance.
   * @param {TweenManager} manager - Reference to the Tween Manager.
   */
  public constructor(target: TweenTarget, game: Game, manager: TweenManager) {
    this.game = game;
    this.target = target;
    /** @type {TweenManager} */
    this.manager = manager;
    /** @type {TweenData[]} */
    this.timeline = [];
    /** @type {boolean} */
    this.reverse = false;
    /** @type {number} */
    this.timeScale = 1;
    /** @type {number} */
    this.repeatCounter = 0;
    /** @type {boolean} */
    this.pendingDelete = false;
    /** @type {Signal} */
    this.onStart = new Signal();
    /** @type {Signal} */
    this.onLoop = new Signal();
    /** @type {Signal} */
    this.onRepeat = new Signal();
    /** @type {Signal} */
    this.onChildComplete = new Signal();
    /** @type {Signal} */
    this.onComplete = new Signal();
    /** @type {boolean} */
    this.isRunning = false;
    /** @type {number} */
    this.current = 0;
    this.properties = {};
    this.chainedTween = null;
    /** @type {boolean} */
    this.isPaused = false;
    this._onUpdateCallback = null;
    this._onUpdateCallbackContext = null;
    /** @type {number} */
    this._pausedTime = 0;
    /** @type {boolean} */
    this._codePaused = false;
    /** @type {boolean} */
    this._hasStarted = false;
  }

  /**
   * Adds a tween to the timeline that animates properties to their target values.
   * @param {object} properties - The properties to tween and their target values.
   * @param {number} duration - The duration of the tween in milliseconds.
   * @param {string | Function} ease - The easing function to use.
   * @param {boolean} autoStart - Whether to start the tween immediately.
   * @param {number} delay - The delay before starting the tween in milliseconds.
   * @param {number} repeat - Number of times to repeat the tween.
   * @param {boolean} yoyo - Whether to reverse the tween on repeat.
   * @returns {Tween} This Tween object for chaining.
   */
  public to(
    properties: TweenValues,
    duration = 1000,
    ease: string | EasingFunction = 'Linear',
    autoStart = false,
    delay = 0,
    repeat = 0,
    yoyo = false
  ): this {
    const easing = this.resolveEasing(ease);
    if (this.isRunning) {
      return this;
    }
    this.timeline.push(new TweenData(this).to(properties, duration, easing, delay, repeat, yoyo));
    if (autoStart) {
      this.start();
    }
    return this;
  }

  /**
   * Adds a tween to the timeline that animates properties from their current values.
   * @param {object} properties - The properties to tween and their target values.
   * @param {number} duration - The duration of the tween in milliseconds.
   * @param {string | Function} ease - The easing function to use.
   * @param {boolean} autoStart - Whether to start the tween immediately.
   * @param {number} delay - The delay before starting the tween in milliseconds.
   * @param {number} repeat - Number of times to repeat the tween.
   * @param {boolean} yoyo - Whether to reverse the tween on repeat.
   * @returns {Tween} This Tween object for chaining.
   */
  public from(
    properties: TweenValues,
    duration = 1000,
    ease: string | EasingFunction = 'Linear',
    autoStart = false,
    delay = 0,
    repeat = 0,
    yoyo = false
  ): this {
    if (this.isRunning) {
      this.game.logger.warn('Tween.from cannot be called after Tween.start');
      return this;
    }
    this.timeline.push(new TweenData(this).from(properties, duration, this.resolveEasing(ease), delay, repeat, yoyo));
    if (autoStart) {
      this.start();
    }
    return this;
  }

  /**
   * Starts the tween timeline from a specific index.
   * @param {number} index - The index to start from in the timeline.
   * @returns {Tween} This Tween object for chaining.
   */
  public start(index = 0): this {
    if (this.game === null || this.target === null || this.timeline.length === 0 || this.isRunning) {
      return this;
    }
    //  Populate the tween data
    for (const tweenData of this.timeline) {
      //  Build our master property list with the starting values
      const keys = Object.keys(tweenData.vEnd);
      for (const property of keys) {
        const targetProperties = this.target as unknown as Record<string, number | string | undefined>;
        //  Ensures we're using numbers, not strings
        this.properties[property] = Number(targetProperties[property] ?? 0);
      }
    }
    for (const tweenData of this.timeline) {
      tweenData.loadValues();
    }
    this.manager.add(this);
    this.isRunning = true;
    this.current = index < 0 || index > this.timeline.length - 1 ? 0 : index;
    this.timeline[this.current]!.start();
    return this;
  }

  /**
   * Stops the tween and optionally completes it.
   * @param {boolean} complete - Whether to dispatch the complete event.
   * @returns {Tween} This Tween object for chaining.
   */
  public stop(complete = false): this {
    this.isRunning = false;
    this._onUpdateCallback = null;
    this._onUpdateCallbackContext = null;
    if (complete) {
      this.onComplete.dispatch(this.target, this);
      this._hasStarted = false;
      if (this.chainedTween) {
        this.chainedTween.start();
      }
    }
    this.manager.remove(this);
    return this;
  }

  /**
   * Updates a property in the tween data.
   * @param {string} property - The property name to update.
   * @param {object} value - The new value for the property.
   * @param {number} index - The index in the timeline to update.
   * @returns {Tween} This Tween object for chaining.
   */
  public updateTweenData(property: string, value: unknown, index = 0): this {
    if (this.timeline.length === 0) {
      return this;
    }
    if (index === -1) {
      for (const timelineEntry of this.timeline) {
        (timelineEntry as unknown as Record<string, unknown>)[property] = value;
      }
    } else {
      (this.timeline[index] as unknown as Record<string, unknown>)[property] = value;
    }
    return this;
  }

  /**
   * Sets a delay for a specific timeline entry.
   * @param {number} duration - The delay in milliseconds.
   * @param {number} index - The index in the timeline to apply the delay to.
   * @returns {Tween} This Tween object for chaining.
   */
  public delay(duration: number, index: number): this {
    return this.updateTweenData('delay', duration, index);
  }

  /**
   * Sets how many times to repeat the tween.
   * @param {number} total - The number of times to repeat (-1 for infinite).
   * @param {number} repeatDelay - Delay between repeats in milliseconds.
   * @param {number} index - The index in the timeline to apply the repeat to.
   * @returns {Tween} This Tween object for chaining.
   */
  public repeat(total: number, repeatDelay = 0, index = 0): this {
    this.updateTweenData('repeatCounter', total, index);
    return this.updateTweenData('repeatDelay', repeatDelay, index);
  }

  /**
   * Sets the repeat delay for a specific timeline entry.
   * @param {number} duration - The delay between repeats in milliseconds.
   * @param {number} index - The index in the timeline to apply the delay to.
   * @returns {Tween} This Tween object for chaining.
   */
  public repeatDelay(duration: number, index: number): this {
    return this.updateTweenData('repeatDelay', duration, index);
  }

  /**
   * Enables or disables yoyo behavior for a timeline entry.
   * @param {boolean} enable - Whether to enable yoyo behavior.
   * @param {number} yoyoDelay - Delay between yoyo cycles in milliseconds.
   * @param {number} index - The index in the timeline to apply yoyo to.
   * @returns {Tween} This Tween object for chaining.
   */
  public yoyo(enable: boolean, yoyoDelay = 0, index = 0): this {
    this.updateTweenData('yoyo', enable, index);
    return this.updateTweenData('yoyoDelay', yoyoDelay, index);
  }

  /**
   * Sets the yoyo delay for a specific timeline entry.
   * @param {number} duration - The delay between yoyo cycles in milliseconds.
   * @param {number} index - The index in the timeline to apply the delay to.
   * @returns {Tween} This Tween object for chaining.
   */
  public yoyoDelay(duration: number, index: number): this {
    return this.updateTweenData('yoyoDelay', duration, index);
  }

  /**
   * Sets the easing function for a timeline entry.
   * @param {string|Function} ease - The easing function to use.
   * @param {number} index - The index in the timeline to apply easing to.
   * @returns {Tween} This Tween object for chaining.
   */
  public resolveEasing(ease: string | EasingFunction): EasingFunction {
    if (typeof ease !== 'string') {
      return ease;
    }
    return this.manager.easeMap[ease] ?? this.manager.easeMap['Linear']!;
  }

  /**
   * Sets the easing function for a tween in the timeline.
   * @param {string | Function} ease - The easing function or its name.
   * @param {number} index - The index of the tween in the timeline.
   * @returns {Tween} This Tween object for chaining.
   */
  public easing(ease: string | EasingFunction, index: number): this {
    return this.updateTweenData('easingFunction', this.resolveEasing(ease), index);
  }

  /**
   * Sets the interpolation function for a timeline entry.
   * @param {Function} interpolation - The interpolation function to use.
   * @param {object} context - The context in which to call the interpolation function.
   * @param {number} index - The index in the timeline to apply interpolation to.
   * @returns {Tween} This Tween object for chaining.
   */
  public interpolation(interpolation: InterpolationFunction, context: unknown = MathUtils, index = 0): this {
    this.updateTweenData('interpolationFunction', interpolation, index);
    return this.updateTweenData('interpolationContext', context, index);
  }

  /**
   * Sets how many times to repeat all timeline entries.
   * @param {number} total - The number of times to repeat (-1 for infinite).
   * @returns {Tween} This Tween object for chaining.
   */
  public repeatAll(total = 0): this {
    this.repeatCounter = total;
    return this;
  }

  /**
   * Chains one or more tweens to this tween.
   * @param {...any} args - The tweens to chain.
   * @returns {Tween} This Tween object for chaining.
   */
  public chain(...args: Tween[]): this {
    let i = args.length;
    while (i) {
      i -= 1;
      if (i > 0) {
        args[i - 1]!.chainedTween = args[i] ?? null;
      } else {
        this.chainedTween = args[i] ?? null;
      }
    }
    return this;
  }

  /**
   * Sets whether the tween should loop infinitely.
   * @param {boolean} value - Whether to loop infinitely.
   * @returns {Tween} This Tween object for chaining.
   */
  public loop(value = true): this {
    this.repeatCounter = value ? -1 : 0;
    return this;
  }

  /**
   * Sets a callback to be called when the tween updates.
   * @param {Function} callback - The callback function to call.
   * @param {object} callbackContext - The context in which to call the callback.
   * @returns {Tween} This Tween object for chaining.
   */
  public onUpdateCallback(callback: Callback, callbackContext: unknown): this {
    this._onUpdateCallback = callback;
    this._onUpdateCallbackContext = callbackContext;
    return this;
  }

  /**
   * Pauses the tween.
   */
  public pause(): void {
    this.isPaused = true;
    this._codePaused = true;
    this._pausedTime = this.game.time.time;
  }

  /**
   * Internal method to pause the tween.
   */
  public _pause(): void {
    if (!this._codePaused) {
      this.isPaused = true;
      this._pausedTime = this.game.time.time;
    }
  }

  /**
   * Resumes the tween.
   */
  public resume(): void {
    if (this.isPaused) {
      this.isPaused = false;
      this._codePaused = false;
      for (const tweenData of this.timeline) {
        if (!tweenData.isRunning) {
          tweenData.startTime = (tweenData.startTime ?? 0) + (this.game.time.time - this._pausedTime);
        }
      }
    }
  }

  /**
   * Internal method to resume the tween.
   */
  public _resume(): void {
    if (!this._codePaused) {
      this.resume();
    }
  }

  /**
   * Updates the tween state at a given time.
   * @param {number} time - The current game time.
   * @returns {boolean} True if the tween should continue running, false if it's complete.
   */
  public update(time: number): boolean {
    if (this.pendingDelete || !this.target) {
      return false;
    }
    if (this.isPaused) {
      return true;
    }
    const status = this.timeline[this.current]!.update(time);
    if (status === TWEEN_PENDING) {
      return true;
    } else if (status === TWEEN_RUNNING) {
      if (!this._hasStarted) {
        this.onStart.dispatch(this.target, this);
        this._hasStarted = true;
      }
      if (this._onUpdateCallback !== null) {
        (this._onUpdateCallback as AppliedCallback).call(
          this._onUpdateCallbackContext,
          this,
          this.timeline[this.current]!.value,
          this.timeline[this.current]
        );
      }
      //  In case the update callback modifies this tween
      return this.isRunning;
    } else if (status === TWEEN_LOOPED) {
      if (this.timeline[this.current]!.repeatCounter === -1) {
        this.onLoop.dispatch(this.target, this);
      } else {
        this.onRepeat.dispatch(this.target, this);
      }
      return true;
    } else if (status === TWEEN_COMPLETE) {
      let complete = false;
      //  What now?
      if (this.reverse) {
        this.current -= 1;
        if (this.current < 0) {
          this.current = this.timeline.length - 1;
          complete = true;
        }
      } else {
        this.current += 1;
        if (this.current === this.timeline.length) {
          this.current = 0;
          complete = true;
        }
      }
      if (complete) {
        //  We've reached the start or end of the child tweens (depending on Tween.reverse), should we repeat it?
        if (this.repeatCounter === -1) {
          this.timeline[this.current]!.start();
          this.onLoop.dispatch(this.target, this);
          return true;
        } else if (this.repeatCounter > 0) {
          this.repeatCounter -= 1;

          this.timeline[this.current]!.start();
          this.onRepeat.dispatch(this.target, this);
          return true;
        }
        //  No more repeats and no more children, so we're done
        this.isRunning = false;
        this.onComplete.dispatch(this.target, this);
        this._hasStarted = false;
        if (this.chainedTween) {
          this.chainedTween.start();
        }
        return false;
      }
      //  We've still got some children to go
      this.onChildComplete.dispatch(this.target, this);
      this.timeline[this.current]!.start();
      return true;
    }
    return false;
  }

  /**
   * Generates animation data for a given frame rate.
   * @param {number} frameRate - The target frame rate.
   * @param {object[]} data - The array to store the generated data in.
   * @returns {object[]} The populated data array.
   */
  public generateData(frameRate = 60, data: Record<string, number>[] = []): Record<string, number>[] | null {
    if (this.game === null || this.target === null) {
      return null;
    }
    //  Populate the tween data
    for (const tweenData of this.timeline) {
      //  Build our master property list with the starting values
      const keys = Object.keys(tweenData.vEnd);
      for (const property of keys) {
        const targetProperties = this.target as unknown as Record<string, number | string | undefined>;
        //  Ensures we're using numbers, not strings
        this.properties[property] = Number(targetProperties[property] ?? 0);
      }
    }
    for (const tweenData of this.timeline) {
      tweenData.loadValues();
    }
    const frames = [...data];
    for (const tweenData of this.timeline) {
      frames.push(...tweenData.generateData(frameRate));
    }
    return frames;
  }

  /**
   * Gets the total duration of all timeline entries.
   * @returns {number} The total duration in milliseconds.
   */
  public get totalDuration(): number {
    let total = 0;
    for (const tweenData of this.timeline) {
      total += tweenData.duration;
    }
    return total;
  }
}
