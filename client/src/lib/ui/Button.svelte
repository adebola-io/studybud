<!-- 
    @component
    This is a generic button component.
 -->
<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    /** Whether or not to disable default styles. */
    export let override = false;

    /** @type {"button" | "submit" | "reset"} */
    export let type = "button";

    let _class = "";
    export { _class as class };

    /** @type {string} */
    export let style = undefined;

    /** @type {"outlined" | "filled" | "filled-2"} */
    export let variant = "outlined";

    /** @type {"normal" | "small" | "big"} */
    export let layout = "normal";

    export let disabled = false;

    /**
     * Foward button click events.
     * @param {MouseEvent} event
     */
    function handleClick(event) {
        dispatch("click", {
            forwarded: event,
        });
    }
</script>

<button
    {disabled}
    {type}
    {style}
    class={`${override ? "" : `Default ${variant} ${layout}`} ${_class}`}
    on:click={disabled ? undefined : handleClick}
>
    <div class="icon">
        <slot name="icon" />
    </div>
    <div class="text">
        <slot />
    </div>
</button>

<style lang="scss">
    .Default {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        cursor: pointer;
        transition-duration: var(--TransitionSpeed-Fast);
        &:disabled {
            opacity: 0.4;
        }
        &.normal {
            width: 291.294px;
            aspect-ratio: 4.175419987386;
            padding: 12.239px;
            gap: 12.239px;
            border-radius: 7.542px;
        }
        &.small {
            width: 8.74944rem;
            height: 2.09544rem;
            padding: 0.36763rem;
            gap: 0.36763rem;
            border-radius: 0.22656rem;
        }
        &.outlined {
            border: 4.714px solid var(--picton-blue, #59a5d8);
            box-shadow: 2.828256845474243px 3.7710092067718506px 0px 0px
                rgba(67, 82, 216, 0.72);
            background-color: transparent;
            color: var(--picton-blue, #59a5d8);
        }
        &.filled {
            color: var(--text);
            background-color: #003c57;
            box-shadow: 3px 4px 0px 0px rgba(67, 82, 216, 0.72);
            border: none;
        }
        &.filled-2 {
            color: var(--indigo-dye, #133c55);
            background: var(--picton-blue, #59a5d8);
            text-align: center;
            font-family: Inter;
            font-size: 0.99313rem;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }
        &:hover:not(:disabled) {
            background-color: var(--picton-blue);
            box-shadow: none;
            transform: scale(0.95);
            color: var(--background);
        }

        @media (max-width: 1024px) {
            width: 220px;
            gap: 7px;
        }
        @media (max-width: 912px) {
            width: 300px;
        }
        @media (max-width: 414px) {
            width: 220px;
        }
        .text {
            text-align: center;
            font-family: Alata;
            font-size: 20.707px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }
        .icon {
            color: inherit;
        }
        &.small .text {
            font-family: Inter;
            font-size: 10pt;
        }
        &.small .icon {
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
    }
</style>
