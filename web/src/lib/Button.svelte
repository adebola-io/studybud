<!-- A generic button component. -->
<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    /** @type {"button" | "submit" | "reset"}*/
    export let type = "button";

    let _class = "";
    export { _class as class };

    /*** @type {string |undefined}*/
    export let icon = undefined;

    /** @type {string} */
    export let style = undefined;

    export let iconAlt = undefined;

    /** @type {"outlined"|"filled"|"filled-2"}*/
    export let variant = "outlined";

    /** @type {"normal"|"small"|"big"}*/
    export let layout = "normal";

    /**
     * @param {MouseEvent} e
     */
    const handleClick = (e) => {
        dispatch("click", {
            forwarded: e,
        });
    };
</script>

<button
    {style}
    on:click={handleClick}
    {type}
    class={`${_class} ${variant} ${layout}`}
>
    <div class="icon">
        <slot name="icon" />
    </div>
    <div class="text">
        <slot />
    </div>
</button>

<style scoped>
    button {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        cursor: pointer;
        transition-duration: var(--TransitionSpeed-Fast);
        margin-top: 20px;
    }
    button.normal {
        width: 291.294px;
        aspect-ratio: 4.175419987386;
        padding: 12.239px;
        gap: 12.239px;
        border-radius: 7.542px;
    }
    button.small {
        width: 8.74944rem;
        height: 2.09544rem;
        padding: 0.36763rem;
        gap: 0.36763rem;
        border-radius: 0.22656rem;
    }
    button.outlined {
        border: 4.714px solid var(--picton-blue, #59a5d8);
        box-shadow: 2.828256845474243px 3.7710092067718506px 0px 0px
            rgba(67, 82, 216, 0.72);
        background-color: transparent;
        color: var(--picton-blue, #59a5d8);
    }
    button.filled {
        color: var(--text);
        background-color: #003c57;
        box-shadow: 3px 4px 0px 0px rgba(67, 82, 216, 0.72);
        border: none;
    }
    button.filled-2 {
        color: var(--indigo-dye, #133c55);
        background: var(--picton-blue, #59a5d8);
        text-align: center;
        font-family: Inter;
        font-size: 0.99313rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
    button:hover {
        background-color: var(--picton-blue);
        box-shadow: none;
        transform: scale(0.95);
        color: var(--background);
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
    button .text {
        text-align: center;
        font-family: Alata;
        font-size: 20.707px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
    button.small .text {
        font-family: Inter;
        font-size: 10pt;
    }
    button.small .icon {
        transform: scale(0.5);
    }
    @media (max-width: 1024px) {
        .text {
            font-size: 15px;
        }
        .icon {
            transform: scale(0.9);
        }
    }
    @media (max-width: 1024px) {
        .text {
            font-size: 17px;
        }
        .icon {
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
