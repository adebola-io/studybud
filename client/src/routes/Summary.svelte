<script>
    import CopyIcon from "@/assets/svg/copy-icon.svg";
    import ExportIcon from "@/assets/svg/download-icon.svg";
    import { Button, Loader, UploadIcon } from "@/lib/ui";
    import { getSummary, uploadFile } from "@/services";
    import { uploadData } from "@/stores";
    import { notify, openExplorer } from "@/utils";
    import { onMount } from "svelte";
    import { pop, replace, params } from "svelte-spa-router";

    /** @type {SummarizerResponseData}*/
    let summary = { document: 0, summarized_text: "" };
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
        navigator.clipboard.writeText(summary.summarized_text);
        notify("Summary copied", "success", 800);
    }

    function exportAsPDF() {}

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
            <div class="ButtonContainer">
                <Button
                    class="UploadButton"
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
            </div>
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
            <div class="ContentInner">
                {summary.summarized_text}
            </div>
        {/if}
    </div>
    <div class="Toolbar">
        {#if !(isLoading || isError)}
            <button
                title="Export Summary"
                type="button"
                class="Toolbar-Icon"
                on:click={exportAsPDF}
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
        @media (aspect-ratio < 0.7) {
            flex-direction: column;
            width: 85vw;
        }
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
        .ButtonContainer {
            margin-top: 30px;
        }
        @media (aspect-ratio < 0.7) {
            flex-direction: row;
            justify-content: space-between;
            padding-inline: 25px;
            border-right: none;
            border-bottom: 3.75px solid var(--pale-azure, #84d2f6);
            width: calc(100% - 50px);
            height: 15%;
            .ButtonContainer {
                margin-top: 0;
            }
        }
    }
    .SummaryContent {
        width: 65%;
        height: calc(100% - 100px);
        color: #fff;
        text-align: justify;
        font-family: Alata;
        font-size: 15pt;
        font-weight: 400;
        overflow-y: scroll;
        .ContentInner {
            padding: 25px;
            @media (aspect-ratio < 0.7) {
                padding: 15px;
            }
        }
        &::-webkit-scrollbar {
            background-color: transparent;
        }
        &::-webkit-scrollbar-track {
            background-color: var(--bice-blue, #386fa4);
            opacity: 0.5;
            border-radius: 30px;
        }
        @media (aspect-ratio < 0.7) {
            width: 100%;
            height: 85%;
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
        @media (aspect-ratio < 0.7) {
            width: 100%;
        }
    }
</style>
