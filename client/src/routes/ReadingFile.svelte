<script>
    import { onMount } from "svelte";
    import { pop, push } from "svelte-spa-router";
    import { Button } from "@/lib/ui";
    import { formData, overlayIsFocused, responseData } from "@/stores";
    import { MainLayout } from "@/layouts";

    const controller = new AbortController();

    /** @type {File} */ //@ts-ignore
    const file = $formData.get("document").name;

    /**
     * Upload the file.
     */
    async function uploadFile() {
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
            name: "CSC_420_FILE",
            detail: " File analyzed.",
        };
    }

    function cancelUpload() {
        controller.abort();
        pop();
    }

    onMount(() => {
        overlayIsFocused.set(true);
        uploadFile()
            .then((data) => {
                responseData.set(data);
                push("/file-analyzed");
            })
            .catch(() => overlayIsFocused.set(false));
    });
</script>

<MainLayout disallowWithoutFile>
    <div class="StageText Reading">Reading File...</div>
    <div class="FileBox">
        {file.name}
    </div>
    <Button variant="filled" on:click={cancelUpload}>Cancel</Button>
</MainLayout>

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
