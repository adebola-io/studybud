import { writable } from "svelte/store";

export const overlayIsFocused = writable(false);

/**
 * @type {Writable<{formData: FormData, name: string}>} */
export const uploadData = writable(null);
