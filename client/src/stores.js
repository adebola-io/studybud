import { writable } from "svelte/store";

export const overlayIsFocused = writable(false);

/** @type {Writable<FormData|null>} */
export const formData = writable(null);

/** @type {Writable<FileUploadResponseData>} */
export const responseData = writable(null);
