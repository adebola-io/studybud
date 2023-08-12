import { notification, uploadData } from "@/stores";
import { pop } from "svelte-spa-router";
import { push } from "svelte-spa-router";
import { get } from "svelte/store";

const controller = new AbortController();
let timeOut;
let previousUploadData;

/**
 * Upload a file to the server.
 * Adds a route change to `/reading-file`.
 * @param {FormData} formData
 * @return {Promise<FileUploadResponseData>}
 */
export async function uploadFile(formData) {
    /** @type {File} */ //@ts-ignore
    const { name } = formData.get("document");
    previousUploadData = get(uploadData);
    uploadData.set({ formData, name });

    await push("/reading-file");

    // const endpoint = import.meta.env.VITE_FILE_ENDPOINT;
    // const response = await fetch(endpoint, {
    //     method: "POST",
    //     mode: "no-cors",
    //     body: formData,
    //     signal: controller.signal,
    // });
    // const data = await response.json();
    // return data;

    // TEST
    await new Promise((resolve) => {
        timeOut = setTimeout(resolve, 6000);
    });

    return {
        id: 1,
        name: "",
        detail: "File uploaded.",
    };
}

export function cancelCurrentUpload() {
    controller.abort();
    if (timeOut) window.clearTimeout(timeOut);
    if (previousUploadData) uploadData.set(previousUploadData);
    pop();
}

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
 * Retrieves summary for a document.
 * @param {string} id
 * @return {Promise<{text: string}>}
 */
export async function getSummary(id) {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 6000);
    });
    return {
        text: `Summary for document ${id}.`,
    };
}

/**
 * Send a notification to the user.
 * @param {string} message
 * @param {"error"|"success"} type
 * @param {number}  duration
 */
export function notify(message, type = "success", duration = 3000) {
    notification.set({ message, type, duration });
}
