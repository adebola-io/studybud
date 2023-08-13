import { notification } from "@/stores";

/**
 * Opens the file uploader.
 * @param {CustomEvent<{forwarded: MouseEvent & {target: HTMLButtonElement}}>} event
 */
export function openExplorer(event) {
    /** @type {HTMLInputElement} */
    const input = event.detail.forwarded.target.form["study-file"];
    input.click();
}

/**
 * Send a notification to the user.
 * @param {string} message
 * @param {"error"|"success"} type
 * @param {number}  duration
 */
export function notify(message, type = "success", duration = 3000) {
    return new Promise((resolve) => {
        notification.set({ message, type, duration });
        notification.subscribe(resolve);
    });
}
