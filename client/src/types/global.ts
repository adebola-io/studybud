export {};

declare global {
    interface FileUploadResponseData {
        id: number;
        name: string;
        detail: string;
    }

    type Writable<T> = import("svelte/store").Writable<T>;

    type InputChangeHandler =
        import("svelte/elements").HTMLInputAttributes["on:change"];

    namespace dispatchers {
        type HomeDispatcher = import("svelte").EventDispatcher<{
            filechosen: FormData;
        }>;
        type ReadingFileDispatcher = import("svelte").EventDispatcher<{
            cancel: void;
            analyzed: FileUploadResponseData;
        }>;
        type FileAnalyzedDispatcher = import("svelte").EventDispatcher<{
            "select-another": FormData;
            summarize: void;
            generate: void;
        }>;
    }
}
