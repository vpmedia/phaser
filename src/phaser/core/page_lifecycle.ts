/**
 * A minimal page lifecycle observer.
 * @see https://developer.chrome.com/docs/web-platform/page-lifecycle-api
 */

/** The page is visible and has focus. */
export const PAGE_STATE_ACTIVE = 'active';
/** The page is visible but does not have focus. */
export const PAGE_STATE_PASSIVE = 'passive';
/** The page is not visible. */
export const PAGE_STATE_HIDDEN = 'hidden';
/** The browser has frozen the page to reclaim its resources. */
export const PAGE_STATE_FROZEN = 'frozen';
/** The page is being unloaded. */
export const PAGE_STATE_TERMINATED = 'terminated';

/** One of the states a page can be in. */
export type PageState =
  | typeof PAGE_STATE_ACTIVE
  | typeof PAGE_STATE_PASSIVE
  | typeof PAGE_STATE_HIDDEN
  | typeof PAGE_STATE_FROZEN
  | typeof PAGE_STATE_TERMINATED;

/** Called with the state the page has just entered and the one it left. */
export type PageStateListener = (state: PageState, previous: PageState) => void;

const listeners = new Set<PageStateListener>();
let currentState: PageState | null = null;
let started = false;

/**
 * Reads the state the page is in right now.
 * @returns {PageState} The current page state.
 */
export const readPageState = (): PageState => {
  if (document.visibilityState === 'hidden') {
    return PAGE_STATE_HIDDEN;
  }
  return document.hasFocus() ? PAGE_STATE_ACTIVE : PAGE_STATE_PASSIVE;
};

/**
 * Records a new state and tells the listeners, ignoring transitions to the state already held.
 * @param {PageState} next - The state the page has entered.
 */
const enterState = (next: PageState): void => {
  const previous = currentState ?? readPageState();
  if (next === previous) {
    return;
  }
  currentState = next;
  const current = [...listeners];
  for (const listener of current) {
    listener(next, previous);
  }
};

/**
 * Starts observing the page, if it is not observed already.
 */
export const startPageLifecycle = (): void => {
  if (started) {
    return;
  }
  started = true;
  currentState = readPageState();
  for (const type of ['pageshow', 'focus', 'blur', 'visibilitychange', 'resume']) {
    globalThis.addEventListener(
      type,
      (event: Event): void => {
        // blur and focus also fire for elements inside the page, which say nothing about the page
        const fromElement = event.target !== globalThis && event.target !== document;
        if ((event.type === 'blur' || event.type === 'focus') && fromElement) {
          return;
        }
        enterState(readPageState());
      },
      true
    );
  }
  globalThis.addEventListener(
    'freeze',
    (): void => {
      enterState(PAGE_STATE_FROZEN);
    },
    true
  );
  globalThis.addEventListener(
    'pagehide',
    (event: Event): void => {
      enterState((event as PageTransitionEvent).persisted ? PAGE_STATE_FROZEN : PAGE_STATE_TERMINATED);
    },
    true
  );
};

/**
 * Returns the state the page is in, starting the observer on first use.
 * @returns {PageState} The current page state.
 */
export const getPageState = (): PageState => {
  startPageLifecycle();
  return currentState ?? readPageState();
};

/**
 * Registers a listener for every state change.
 * @param {PageStateListener} listener - The listener to call on each change.
 * @returns {() => void} A function that removes the listener again.
 */
export const onPageStateChange = (listener: PageStateListener): (() => void) => {
  startPageLifecycle();
  listeners.add(listener);
  return (): void => {
    listeners.delete(listener);
  };
};

/**
 * Runs a callback the next time the page becomes active, once.
 * @param {() => void} callback - The callback to run.
 * @returns {() => void} A function that cancels the pending callback.
 */
export const oncePageActive = (callback: () => void): (() => void) => {
  const stop = onPageStateChange((state: PageState): void => {
    if (state === PAGE_STATE_ACTIVE) {
      stop();
      callback();
    }
  });
  return stop;
};

/**
 * Drops every listener and stops tracking. Only the tests need this.
 */
export const resetPageLifecycle = (): void => {
  listeners.clear();
  currentState = null;
  started = false;
};
