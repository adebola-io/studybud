<script>
    import { push, params, replace } from "svelte-spa-router";
    import { Button, UploadIcon } from "@/lib/ui";
    import { uploadData } from "@/stores";
    import { openExplorer, uploadFile } from "@/utils";

    let filename = $uploadData.name;

    function handleFileSelect(event) {
        /** @type {HTMLFormElement}*/ //@ts-ignore
        const { form } = event.target;
        uploadFile(new FormData(form)).then((data) =>
            replace(`/file-analyzed/${data.id}`)
        );
    }

    function generateQuestions() {
        push(`/generate/${$params.id}`);
    }

    function summarize() {
        push(`/summarize/${$params.id}`);
    }
</script>

<div class="StageText Analyzed">File Analyzed.</div>
<div class="FileBox">
    {filename}
</div>
<div class="ButtonContainer">
    <Button on:click={generateQuestions} variant="filled-2">
        Generate Questions
    </Button>
    <Button on:click={summarize} variant="filled-2">Summarize</Button>
</div>
<form enctype="multipart/form-data" novalidate>
    <input
        on:change={handleFileSelect}
        class="FileInput"
        name="document"
        type="file"
        id="study-file"
        accept=".doc,.docx,.pdf,.txt"
        hidden
    />
    <Button on:click={openExplorer}>
        <div slot="icon">
            <UploadIcon />
        </div>
        Upload another file.
    </Button>
</form>

<style lang="scss">
    .StageText.Analyzed {
        color: var(--pale-azure, #84d2f6);
        -webkit-background-clip: unset;
        -webkit-text-fill-color: unset;
        background-clip: unset;
        background: unset;
        width: fit-content;
    }
    .ButtonContainer {
        display: flex;
        align-items: flex-start;
        gap: 1.1325rem;
        & > * {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 11.81844rem;
            height: 2.83044rem;
            padding: 0.49656rem;
            gap: 0.49656rem;
            border: none;
            border-radius: 0.306rem;
            background: var(--picton-blue, #59a5d8);
            color: var(--indigo-dye, #133c55);
            text-align: center;
            font-family: Inter;
            font-size: 0.99313rem;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }
    }
</style>
