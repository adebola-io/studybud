<!-- A generic button component. -->
<script>
    /** @type {"button" | "submit" | "reset"}*/
    export let type = "button";

    let _class = "";
    export { _class as class };

    /*** @type {string |undefined}*/
    export let icon = undefined;

    export let iconAlt = undefined;
</script>

<button on:click={() => console.log("Hello")} {type} class={_class}>
    {#if icon !== undefined}
        <img class="icon" src={icon} alt={iconAlt} />
    {/if}
    <div class="text">
        <slot />
    </div>
</button>

<style scoped>
    button {
        position: relative;
        display: flex;
        width: 291.294px;
        aspect-ratio: 4.175419987386;
        padding: 12.239px;
        justify-content: center;
        align-items: center;
        gap: 12.239px;
        border-radius: 7.542px;
        border: 4.714px solid var(--picton-blue, #59a5d8);
        box-shadow: 2.828256845474243px 3.7710092067718506px 0px 0px
            rgba(67, 82, 216, 0.72);
        margin-top: 20px;
        background-color: transparent;
        color: var(--picton-blue, #59a5d8);
        cursor: pointer;
        transition-duration: var(--TransitionSpeed-Fast);
    }
    button:hover {
        background-color: var(--picton-blue);
        box-shadow: none;
        transform: scale(0.95);
        color: var(--background);
    }
    button.cancel {
        color: var(--text);
        background-color: #003c57;
        box-shadow: 3px 4px 0px 0px rgba(67, 82, 216, 0.72);
        border: none;
    }
    .icon {
        color: inherit;
    }
    @media (max-width: 1024px) {
        button {
            width: 220px;
            gap: 7px;
        }
    }
    @media (max-width: 912px) {
        button {
            width: 300px;
        }
    }
    @media (max-width: 414px) {
        button {
            width: 220px;
        }
    }
    button > .text {
        text-align: center;
        font-family: Alata;
        font-size: 20.707px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
    @media (max-width: 1024px) {
        .text {
            font-size: 15px;
        }
        .button-icon {
            transform: scale(0.9);
        }
    }
    @media (max-width: 1024px) {
        .text {
            font-size: 17px;
        }
        .button-icon {
            transform: none;
        }
    }
    @media (max-width: 414px) {
        .text {
            font-size: 15px;
        }
    }
    @media (max-width: 360px) {
        .text {
            font-size: 12px;
        }
    }
</style>
