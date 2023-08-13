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

    type Writable<T> = import("svelte/store").Writable<T>;

    type InputChangeHandler =
        import("svelte/elements").HTMLInputAttributes["on:change"];
}
