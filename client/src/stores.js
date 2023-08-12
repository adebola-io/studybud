import { writable } from "svelte/store";

export const overlayIsFocused = writable(false);

/**
 * @type {Writable<{formData: FormData, name: string}>} */
export const uploadData = writable(null);

/**
 * @type {Writable<{message: string, type: string, duration: number}>}
 */
export const notification = writable({
    message: null,
    type: null,
    duration: null,
});
