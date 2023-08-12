<script>
    import { onMount } from "svelte";
    import { pop, push } from "svelte-spa-router";
    import { Button } from "@/lib/ui";
    import { overlayIsFocused, uploadData } from "@/stores";

    const controller = new AbortController();

    const filename = $uploadData.name;

    /**
     * Upload the file.
     * @param {FormData} formData
     */
    async function uploadFile(formData) {
        // const endpoint = import.meta.env.VITE_FILE_ENDPOINT;
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
            //@ts-ignore
            name: formData.get("document").name,
            detail: " File analyzed.",
        };
    }

    function cancelUpload() {
        controller.abort();
        pop();
    }

    onMount(() => {
        overlayIsFocused.set(true);
        uploadFile($uploadData.formData)
            .then((data) => {
                push(`/file-analyzed/${data.id}`);
            })
            .finally(() => overlayIsFocused.set(false));
    });
</script>

<div class="StageText Reading">Reading File...</div>
<div class="FileBox">
    {filename}
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
