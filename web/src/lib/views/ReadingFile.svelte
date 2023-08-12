<script>
    import { createEventDispatcher, onMount } from "svelte";
    import Button from "@/lib/Button.svelte";
    const endpoint = import.meta.env.VITE_FILE_ENDPOINT;

    /** @type {dispatchers.ReadingFileDispatcher}*/
    const dispatch = createEventDispatcher();

    /** @type {FormData} */
    export let formData;
    /**@type {File}*/ //@ts-ignore
    const file = formData.get("document");

    const controller = new AbortController();

    /**
     * Upload the file.
     */
    async function uploadFile() {
        // const response = await fetch(endpoint, {
        //     method: "POST",
        //     mode: "no-cors",
        //     body: formData,
        //     signal: controller.signal,
        // });
        // const data = await response.json();
        // return data;

        // TEST
        await new Promise((resolve) => {
            setTimeout(resolve, 5000);
        });
        return {
            id: 20,
            name: "CSC_420_FILE",
            detail: " File analyzed.",
        };
    }

    function cancelUpload() {
        controller.abort();
        dispatch("cancel");
    }

    onMount(() => {
        uploadFile().then((data) => {
            dispatch("analyzed", data);
        });
    });
</script>

<div class="StageText Reading">Reading File...</div>
<div class="FileBox">
    {file.name}
</div>
<Button variant="filled" on:click={cancelUpload}>Cancel</Button>

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
