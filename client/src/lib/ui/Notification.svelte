<script>
    import { notification } from "@/stores";
    import { onMount } from "svelte";

    export let message = "Notification message.";
    export let type;

    /** @type {HTMLElement}*/
    let alertBox;

    onMount(() => {
        setTimeout(() => {
            alertBox.classList.add("hidden");
            alertBox.ontransitionend = () =>
                notification.set({ message: null, type: null, duration: null });
        }, $notification.duration);
    });
</script>

<container>
    <alert bind:this={alertBox} class={type}>{message}</alert>
</container>

<style lang="scss">
    container {
        position: fixed;
        z-index: 999;
        width: 100%;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        alert {
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 200px;
            padding: 20px 25px;
            font-size: 11pt;
            margin-bottom: 30px;
            font-family: Alata;
            border-radius: 5px;
            transition-duration: 300ms;
            &.success {
                border: 2px solid var(--non-photo-blue);
                background-color: var(--indigo-dye);
            }
            &.error {
                border: 2px solid rgb(255, 69, 69);
                background-color: rgb(179, 0, 0);
            }
            &.hidden {
                opacity: 0;
                transform: translateY(40%) scale(0.6);
            }
            color: white;
            animation: alert 300ms;
        }
    }
    @keyframes alert {
        from {
            opacity: 0;
            transform: translateY(20%) scale(0.6);
        }
    }
</style>
