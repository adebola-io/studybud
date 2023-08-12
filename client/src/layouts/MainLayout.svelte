<script>
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import { Header, Overlay } from "@/lib/global";
    import { overlayIsFocused, formData } from "@/stores";

    export let disallowWithoutFile = false;

    onMount(() => {
        if (disallowWithoutFile && $formData === null) {
            push("/");
        }
    });
</script>

<Overlay focused={$overlayIsFocused} />
<Header />
<main class="CenterStage">
    <slot />
</main>

<style lang="scss">
    .CenterStage {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 17px;
        height: 100vh;
        min-width: 100vw;
        text-align: center;
        @media (max-width: 1366px) {
            gap: 10px;
        }
        @media (max-width: 1024px) {
            gap: 0px;
        }
        @media (max-width: 1024px) {
            gap: 10px;
        }
        @media (max-width: 414px) {
            gap: 5px;
        }
    }
</style>
