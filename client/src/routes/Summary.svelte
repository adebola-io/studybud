<script>
    import CopyIcon from "@/assets/svg/copy-icon.svg";
    import ExportIcon from "@/assets/svg/download-icon.svg";
    import { Button, Loader, UploadIcon } from "@/lib/ui";
    import { uploadData } from "@/stores";
    import { getSummary, notify, openExplorer, uploadFile } from "@/utils";
    import { onMount } from "svelte";
    import { pop, replace, params } from "svelte-spa-router";

    let summary = { text: "" };
    let isLoading = true;
    let isError = false;

    const filename = $uploadData.name;

    function queryForSummary() {
        isLoading = true;
        isError = false;
        getSummary($params.id)
            .then((_summary) => {
                summary = _summary;
            })
            .catch((error) => {
                notify(error.message, "error");
                isError = true;
            })
            .finally(() => (isLoading = false));
    }

    function handleFileSelect(event) {
        /** @type {HTMLFormElement}*/ //@ts-ignore
        const { form } = event.target;
        uploadFile(new FormData(form)).then((data) =>
            pop().then(() => replace(`/file-analyzed/${data.id}`))
        );
    }

    function copySummary() {
        navigator.clipboard.writeText(summary.text);
        notify("Summary copied", "success", 800);
    }

    onMount(queryForSummary);
</script>

<h1 class="Heading">Summary</h1>
<div class="Box">
    <div class="FileDetails">
        <div class="FileBox">{filename}</div>
        <form enctype="multipart/form-data">
            <input
                class="FileInput"
                on:change={handleFileSelect}
                name="document"
                type="file"
                id="study-file"
                accept=".docx,.pdf,.txt"
                hidden
            />
            <Button
                type="button"
                layout="small"
                variant="filled"
                on:click={openExplorer}
            >
                <div slot="icon">
                    <UploadIcon />
                </div>
                Upload File
            </Button>
        </form>
    </div>

    <div class="SummaryContent">
        {#if isLoading}
            <div class="Full-Center"><Loader width={50} /></div>
        {:else if isError}
            <div class="Full-Center Flex-Col">
                Something went wrong.
                <Button on:click={queryForSummary}>Retry</Button>
            </div>
        {:else}
            {summary.text}
        {/if}
    </div>
    <div class="Toolbar">
        {#if !(isLoading || isError)}
            <button
                title="Export Summary"
                type="button"
                class="Toolbar-Icon"
                on:click={() => navigator.clipboard.writeText(summary.text)}
            >
                <img src={ExportIcon} alt="Export Summary Icon" />
            </button>
            <button
                title="Copy Text"
                type="button"
                class="Toolbar-Icon"
                on:click={copySummary}
            >
                <img src={CopyIcon} alt="Copy Text Icon" />
            </button>
        {/if}
    </div>
</div>

<style lang="scss">
    .Heading {
        color: var(--pale-azure, #84d2f6);
        text-align: center;
        font-family: Alata;
        font-size: 2.68125rem;
        margin-bottom: 0;
        font-weight: 400;
        line-height: 4rem; /* 149.184% */
    }
    .Box {
        position: relative;
        display: flex;
        width: 75vw;
        height: 70vh;
        overflow: hidden;
        border-radius: 2.0725rem;
        border: 3.747px solid var(--pale-azure, #84d2f6);
        background: var(--background, #131313);
        box-shadow: 8px 8px 7px 0px #003f53;
        --start: 0.5;
        animation: fade-in-expand 500ms;
    }
    .FileDetails {
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 35%;
        height: 100%;
        background: var(--background, #131313);
        border-right: 3.75px solid var(--pale-azure, #84d2f6);
    }
    .SummaryContent {
        padding: 25px 2.8125rem 0 1.25rem;
        width: 65%;
        height: calc(100% - 100px);
        color: #fff;
        text-align: start;
        font-family: Alata;
        font-size: 1rem;
        font-weight: 400;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            background-color: transparent;
        }
        &::-webkit-scrollbar-track {
            background-color: var(--bice-blue, #386fa4);
            opacity: 0.5;
            border-radius: 30px;
        }
    }

    .Toolbar {
        position: absolute;
        z-index: 0;
        bottom: 0;
        right: 0;
        display: flex;
        height: 70px;
        padding-right: 50px;
        width: 65%;
        justify-content: flex-end;
        align-items: center;
        gap: 50px;
        align-self: stretch;
        background: var(--background, #131313);
        border-top: 1.95px solid var(--pale-azure, #84d2f6);
        .Toolbar-Icon {
            background-color: transparent;
            border: none;
            cursor: pointer;
        }
    }
</style>
