import type { DEBOUNCE_DELAY } from '../constants';

export type TDebounceDelay = (typeof DEBOUNCE_DELAY)[keyof typeof DEBOUNCE_DELAY];
