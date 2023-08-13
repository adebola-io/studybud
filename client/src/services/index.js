import axios from "axios";
import { pop, push } from "svelte-spa-router";
import { get } from "svelte/store";
import { uploadData } from "@/stores";

const endpoint = import.meta.env.VITE_ENDPOINT;
// let timeOut;
let uploadController, previousUploadData;

/**
 * Upload a file to the server.
 * Adds a route change to `/reading-file`.
 * @param {FormData} formData
 * @return {Promise<FileUploadResponseData>}
 */
export async function uploadFile(formData) {
    uploadController = new AbortController();
    /** @type {File} */ //@ts-ignore
    const { name } = formData.get("document");
    previousUploadData = get(uploadData);
    uploadData.set({ formData, name });

    await push("/reading-file");

    const response = await axios.post(`${endpoint}/file/`, formData, {
        signal: uploadController.signal,
    });
    return response.data;
}

/**
 * Cancels the current file that is being uploaded.
 */
export function cancelCurrentUpload() {
    uploadController.abort();
    // if (timeOut) window.clearTimeout(timeOut);
    if (previousUploadData) uploadData.set(previousUploadData);
    pop();
}

/**
 * Retrieves summary for a document.
 * @param {string} id
 * @return {Promise<SummarizerResponseData>}
 */
export async function getSummary(id) {
    const response = await axios.get(
        `${endpoint}/summaries/${id}/generate_summary`
    );
    const { data } = response;
    return data;
}
