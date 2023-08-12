export {};

declare global {
    interface FileUploadResponseData {
        id: number;
        name: string;
        detail: string;
    }

    namespace dispatchers {
        type StartDispatcher = import("svelte").EventDispatcher<{
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
