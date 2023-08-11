<script>
    import Button from "../lib/Button.svelte";
    import UploadIcon from "../assets/svg/upload-icon.svg";
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
<Button icon={UploadIcon}>
    <input
        class="FileInput"
        type="file"
        id="study-file"
        accept=".doc,.docx,.pdf,.txt"
        hidden
    />
    Upload File
</Button>

<style>
    .StageText {
        background: linear-gradient(to right, #c729ff, #4c83f4, #1be1fc);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: Alata;
        font-size: 85px;
        width: 60%;
        height: fit-content;
        font-style: normal;
        font-weight: 400;
        line-height: 64px;
        padding-bottom: 30px;
    }
    .StageText.Reading {
        color: var(--pale-azure, #84d2f6);
        -webkit-background-clip: unset;
        -webkit-text-fill-color: unset;
        background-clip: unset;
        background: unset;
        width: fit-content;
    }

    @media (max-width: 1440px) {
        .StageText {
            line-height: 75px;
        }
    }
    @media (max-width: 1366px) {
        .StageText {
            font-size: 75px;
            padding-bottom: 25px;
        }
    }
    @media (max-width: 1024px) {
        .StageText {
            line-height: 55px;
            font-size: 60px;
            padding-bottom: 15px;
        }
    }
    @media (max-width: 912px) {
        .StageText {
            width: 80%;
            line-height: 65px;
            font-size: 70px;
            padding-bottom: 15px;
        }
    }
    @media (max-width: 768px) {
        .StageText {
            width: 90%;
        }
        .StageText.analyzed {
            width: 80%;
        }
    }
    @media (max-width: 414px) {
        .StageText {
            font-size: 50px;
            line-height: 50px;
        }
    }
    @media (max-width: 360px) {
        .StageText {
            font-size: 45px;
            line-height: 45px;
        }
    }
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
