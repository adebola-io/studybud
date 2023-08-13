<script>
    import { onMount } from "svelte";
    import { Button } from "@/lib/ui";
    import { overlayIsFocused, uploadData } from "@/stores";
    import { cancelCurrentUpload } from "@/services";

    const filename = $uploadData.name;

    onMount(() => {
        overlayIsFocused.set(true);
        return () => overlayIsFocused.set(false);
    });
</script>

<div class="StageText Reading">Reading File...</div>
<div class="FileBox">
    {filename}
</div>
<Button variant="filled" on:click={cancelCurrentUpload}>Cancel</Button>

<style>
    .StageText.Reading {
        color: var(--pale-azure, #84d2f6);
        -webkit-background-clip: unset;
        -webkit-text-fill-color: unset;
        background-clip: unset;
        background: unset;
        width: fit-content;
    }
</style>
