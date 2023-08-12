<script>
    import Header from "./lib/global/Header.svelte";
    import Overlay from "./lib/global/Overlay.svelte";
    import FileAnalyzed from "./lib/views/FileAnalyzed.svelte";
    import ReadingFile from "./lib/views/ReadingFile.svelte";
    import Start from "./lib/views/Start.svelte";
    import Summary from "./lib/views/Summary.svelte";

    let view = 1;
    let overlayIsFocused = false;
    /** @type {FormData} */
    let formData;
    /** @type {FileUploadResponseData} */
    let responseData;
    /** @type {string} */
    let fileName;

    /**
     * Reset the app.
     */
    function reset() {
        overlayIsFocused = false;
        view = 1;
        formData = undefined;
    }

    /**
     * Opens second view.
     * @param {CustomEvent<FormData>} event
     */
    function openSecondView(event) {
        overlayIsFocused = true;
        formData = event.detail;
        //@ts-ignore
        fileName = formData.get("document").name;
        view = 2;
    }

    /**
     * Opens third view.
     * @param {CustomEvent<FileUploadResponseData>} event
     */
    function openThirdView(event) {
        overlayIsFocused = false;
        responseData = event.detail;
        view = 3;
    }

    function openSummary() {
        view = 4;
    }
</script>

<Overlay focused={overlayIsFocused} />
<Header />
<main class="CenterStage">
    {#if view === 1}
        <Start on:filechosen={openSecondView} />
    {:else if view === 2}
        <ReadingFile on:cancel={reset} on:analyzed={openThirdView} {formData} />
    {:else if view === 3}
        <FileAnalyzed
            on:summarize={openSummary}
            on:select-another={openSecondView}
            {fileName}
            {responseData}
        />
    {:else if view === 4}
        <Summary {formData} {responseData} />
    {/if}
</main>

<style>
    .CenterStage {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 17px;
        height: 100vh;
        min-width: 100vw;
        text-align: center;
    }
    @media (max-width: 1366px) {
        .CenterStage {
            gap: 10px;
        }
    }
    @media (max-width: 1024px) {
        .CenterStage {
            gap: 0px;
        }
    }
    @media (max-width: 1024px) {
        .CenterStage {
            gap: 10px;
        }
    }
    @media (max-width: 414px) {
        .CenterStage {
            gap: 5px;
        }
    }
</style>
