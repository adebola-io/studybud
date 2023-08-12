<script>
    import CopyIcon from "@/assets/svg/copy-icon.svg";
    import ExportIcon from "@/assets/svg/download-icon.svg";
    import { Button, UploadIcon } from "@/lib/ui";
    import { uploadData } from "@/stores";
    import { onMount } from "svelte";
    import { params, push, pop } from "svelte-spa-router";

    let summary = { text: "" };
    const filename = $uploadData.name;

    onMount(() => {
        summary = {
            text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur.`,
        };
    });
</script>

<h1 class="Heading">Summary</h1>
<div class="Box">
    <div class="FileDetails">
        <div class="FileBox">{filename}</div>
        <Button layout="small" variant="filled-2">
            <div slot="icon">
                <UploadIcon />
            </div>

            Upload File
        </Button>
    </div>
    <div class="SummaryContent">
        {summary.text}
    </div>
    <div class="Toolbar">
        <img
            src={ExportIcon}
            alt="Export Summary Icon"
            title="Export Summary"
        />
        <img
            on:click={() => navigator.clipboard.writeText(summary.text)}
            src={CopyIcon}
            alt="Copy Text Icon"
            title="Copy Text"
        />
    </div>
</div>

<style lang="scss">
    .Heading {
        color: var(--pale-azure, #84d2f6);
        text-align: center;
        font-family: Alata;
        font-size: 2.68125rem;
        margin-bottom: 0;
        font-style: normal;
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
        display: flex;
        padding: 25px 2.8125rem 0 1.25rem;
        align-items: flex-start;
        flex: 1 0 0;
        align-self: stretch;

        width: 65%;
        height: calc(100% - 100px);
        color: #fff;
        font-family: Alata;
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-align: left;
        justify-content: center;
        overflow-y: scroll;
    }
    .SummaryContent::-webkit-scrollbar {
        background-color: transparent;
    }
    .SummaryContent::-webkit-scrollbar-track {
        background-color: var(--bice-blue, #386fa4);
        opacity: 0.5;
        border-radius: 30px;
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
    }
    .Toolbar > * {
        cursor: pointer;
    }
</style>
