<script>
    import UploadIcon from "@/lib/UploadIcon.svelte";
    import Button from "../Button.svelte";

    import { createEventDispatcher } from "svelte";

    /** @type {dispatchers.StartDispatcher} */
    const dispatch = createEventDispatcher();

    /** @type {HTMLInputElement}*/
    let fileInput;

    /**
     * Handles file select.
     * @type {import("svelte/elements").HTMLInputAttributes['on:change']}
     */
    const handleFileSelect = (event) => {
        /** @type {HTMLFormElement}*/ //@ts-ignore
        const { form } = event.target;
        const formData = new FormData(form);
        dispatch("filechosen", formData);
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
<form enctype="multipart/form-data" novalidate>
    <input
        bind:this={fileInput}
        on:change={handleFileSelect}
        class="FileInput"
        name="document"
        type="file"
        id="study-file"
        accept=".doc,.docx,.pdf,.txt"
        hidden
    />
    <Button type="button" on:click={openExplorer} icon={UploadIcon}>
        <div slot="icon">
            <UploadIcon />
        </div>
        Upload File
    </Button>
</form>

<style>
    .ExplanationText {
        color: var(--text, #dedede);
        width: 50%;
        text-align: center;
        font-family: Lato;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    @media (max-width: 1440px) {
        .ExplanationText {
            width: 70%;
            line-height: 25px;
        }
    }
    @media (max-width: 1024px) {
        .ExplanationText {
            width: 60%;
            font-size: 14px;
            line-height: 20px;
        }
    }
    @media (max-width: 912px) {
        .ExplanationText {
            width: 80%;
            font-size: 16px;
        }
    }
    @media (max-width: 414px) {
        .ExplanationText {
            width: 85%;
            font-size: 14px;
        }
        .ExplanationText .Sentence-3 {
            display: none;
        }
    }
    @media (max-width: 360px) {
        .ExplanationText {
            font-size: 12px;
        }
        .ExplanationText .Sentence-2-EndPhrase {
            display: none;
        }
    }
</style>
