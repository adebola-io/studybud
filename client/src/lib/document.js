import { sendUserAlert } from "./sendUserAlert";

const VALID_FILES = ["docx", "pdf"];
/** @type {string} */
const FILE_API = import.meta.env.VITE_FILE_ENDPOINT;

/**
 * Validate that uploaded document is PDF or DOCX.
 * @param {File} file
 */
export async function validateDocument(file) {
    let fileName = file.name;
    let extension = fileName.split(".").slice(-1)[0];
    if (!VALID_FILES.includes(extension)) {
        throw new Error("Only PDF and DOCX files are supported.");
    }
    return file;
}

/**
 * Upload a document.
 * @param {string | ArrayBuffer} file The file to upload
 * @param {HTMLButtonElement & {icon: HTMLDivElement, text: HTMLSpanElement}} cancelButton
 */
export async function uploadFile(fileData, cancelButton) {
    const controller = new AbortController();
    function abortRequest() {
        controller.abort();
        cancelButton.removeEventListener("click", abortRequest);
    }
    cancelButton.addEventListener("click", abortRequest);
    let res;
    setTimeout(() => {
        res = new Response(
            JSON.stringify({ message: "Request completed successfully." }),
            {
                status: 200,
            }
        );
    }, 3000);
    // const res = await fetch(FILE_API, {
    //     method: "POST",
    //     mode: "no-cors",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Vary: "Accept",
    //     },
    //     body: JSON.stringify({ document: fileData }),
    //     signal: controller.signal,
    // });
    cancelButton.removeEventListener("click", abortRequest);
    return res;
}
