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

    // return await deferred({ id: 1, detail: "Analyzed", name });
}

/**
 * Generates questions for document based on id.
 * @param {string} id
 * @returns {Promise<Question[]>}
 */
export async function generateQuestions(id) {
    const response = await axios.get(
        `${endpoint}/questions/${id}/generate_question/`
    );
    const { data } = response;
    return data;

    // /**@type {Question[]} */
    // const fakeResult = [
    //     {
    //         question: "What is 2+ 2?",
    //         correct_answer: 1,
    //         document: 1,
    //         id: 1,
    //         options: ["A. 3", "B. 4", "C. 5", "D. 6"],
    //     },
    //     {
    //         question: "What is the answer to everything?",
    //         correct_answer: 2,
    //         document: 1,
    //         id: 2,
    //         options: ["A. 89", "B. 23", "C. 42", "D. 45"],
    //     },
    // ];
    // return await deferred(fakeResult);
}

/**
 * @template T
 * Creates a delay before returning a value.
 * @param {T} input
 */
async function deferred(input, delay = 3000) {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return input;
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

/**
 * Retrieved feedback for quiz.
 * @param {QuestionAnswerResult} result
 * @return {Promise<FeedbackResponse>}
 */
export async function getQuestionAnswerFeedback(result) {
    const response = await axios.post(`${endpoint}/generate_feedback/`, result);

    const { data } = response;
    return data;
}
