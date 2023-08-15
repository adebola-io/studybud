export {};

declare global {
    interface FileUploadResponseData {
        id: number;
        name: string;
        detail: string;
    }

    interface SummarizerResponseData {
        document: number;
        summarized_text: string;
    }

    interface Question {
        id: number;
        document: number;
        question: string;
        options: string[];
        correct_answer: number;
    }

    interface Answer {
        expected: number;
        value: number;
    }

    interface QuestionAnswerResult {
        question: number;
        wrong_answer: string;
    }

    interface FeedbackResponse {
        question: number;
        feedback_text: string;
    }

    type Writable<T> = import("svelte/store").Writable<T>;

    type InputChangeHandler =
        import("svelte/elements").HTMLInputAttributes["on:change"];
}
