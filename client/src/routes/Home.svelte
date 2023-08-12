<script>
    import { replace } from "svelte-spa-router";
    import { Button, UploadIcon } from "@/lib/ui";
    import { uploadFile } from "@/utils";
    import { uploadData } from "@/stores";

    /** @type {HTMLInputElement}*/
    let fileInput;

    uploadData.set(null);

    const handleFileSelect = (event) => {
        /** @type {HTMLFormElement}*/ //@ts-ignore
        const { form } = event.target;
        uploadFile(new FormData(form)).then((data) => {
            replace(`/file-analyzed/${data.id}`);
        });
    };

    const openExplorer = () => {
        fileInput.click();
    };
</script>

<div class="StageText">Streamline, analyze and engage.</div>
<div class="ExplanationText">
    <span class="Sentence-1">
        Welcome to StudyBud, the ultimate companion for unlocking knowledge's
        potential.
    </span><span class="Sentence-2">
        This tool offers a groundbreaking solution to summarize scholarly
        articles, school materials, and research papers
        <span class="Sentence-2-EndPhrase"
            >, saving you valuable time and effort.</span
        >
    </span>
    <span class="Sentence-3">
        You can use StudyBud to extract core information, giving you key
        insights at your fingertips.
    </span>
    <span class="Sentence-4">
        You can also generate thought-provoking questions based on the text,
        nurturing your inquisitive nature and expanding your understanding.
    </span>
</div>
<form enctype="multipart/form-data">
    <input
        bind:this={fileInput}
        on:change={handleFileSelect}
        class="FileInput"
        name="document"
        type="file"
        id="study-file"
        accept=".docx,.pdf,.txt"
        hidden
    />
    <div style="margin-top: 30px;">
        <Button type="button" on:click={openExplorer}>
            <div slot="icon">
                <UploadIcon />
            </div>
            Upload File
        </Button>
    </div>
</form>

<style lang="scss">
    .ExplanationText {
        color: var(--text, #dedede);
        width: 50%;
        text-align: center;
        font-family: Lato;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        @media (max-width: 1440px) {
            width: 70%;
            line-height: 25px;
        }
        @media (max-width: 1024px) {
            width: 60%;
            font-size: 14px;
            line-height: 20px;
        }
        @media (max-width: 912px) {
            width: 80%;
            font-size: 16px;
        }
        @media (max-width: 414px) {
            width: 85%;
            font-size: 14px;
            & .Sentence-3 {
                display: none;
            }
        }
        @media (max-width: 360px) {
            font-size: 12px;
            & .Sentence-2-EndPhrase {
                display: none;
            }
        }
    }
</style>
