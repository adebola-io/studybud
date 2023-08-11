<script>
    import Header from "./lib/global/Header.svelte";
    import Overlay from "./lib/global/Overlay.svelte";
    import ReadingFile from "./views/ReadingFile.svelte";
    import Start from "./views/Start.svelte";

    let view = 1;
</script>

<Overlay />
<Header />
<main class="CenterStage">
    {#if view === 1}
        <Start />
    {:else if view === 2}
        <ReadingFile />
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
