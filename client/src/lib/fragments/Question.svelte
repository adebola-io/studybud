<script>
    import { createEventDispatcher } from "svelte";
    import { Button } from "../ui";

    /** @type {number} */
    export let maxQuestionsLength;
    /** @type {number} */
    export let index;
    /** @type {Question} */
    export let question;

    /** @type {import("svelte").EventDispatcher<{rewind: void, answer: Answer}>} */
    const dispatch = createEventDispatcher();

    /** @type {number} */
    let selected_answer;

    function lastQuestion() {
        dispatch("rewind");
    }

    function answerQuestion() {
        dispatch("answer", {
            expected: question.correct_answer,
            value: selected_answer,
        });
    }

    /**
     * Selects an option.
     * @param {MouseEvent} event
     */
    function selectOption(event) {
        /** @type {HTMLElement} */ //@ts-ignore
        const target = event.target;
        const button = target.closest("button");
        selected_answer = parseInt(button.id.slice(7));
    }
</script>

<form>
    <div class="Pill-Container">
        <span class="Pill">Question {index + 1} of {maxQuestionsLength}</span>
    </div>
    <h1 class="Prompt">
        <span
            style="display: inline-block; font-size: {question.question.length >
            60
                ? 'var(--smalltext)'
                : ''}"
        >
            {index + 1}. {question.question}
        </span>
    </h1>
    <div class="Options">
        {#each question.options as option, optionIndex}
            <button
                type="button"
                role="radio"
                aria-checked={optionIndex === selected_answer}
                on:click={selectOption}
                id="option-{optionIndex}"
                class="Option"
            >
                <span class="Letter">
                    {option.slice(0, 2).toUpperCase()}
                </span>
                <span class="Content">
                    {option.slice(3)}
                </span>
            </button>
        {/each}
    </div>
    <div class="Button-Row">
        {#if index > 0}
            <Button override class="Question-Button" on:click={lastQuestion}>
                Back
            </Button>
        {/if}
        <Button
            override
            class="Question-Button"
            on:click={answerQuestion}
            disabled={selected_answer === undefined}
        >
            Next
        </Button>
    </div>
</form>

<style lang="scss">
    .Pill-Container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        .Pill {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.43975rem;
            width: fit-content;
            border-radius: 1.05538rem;
            padding: 5px 20px;
            background: var(--picton-blue, #59a5d8);
            color: var(--indigo-dye, #133c55);
            text-align: center;
            font-family: Alata;
            font-size: 0.87256rem;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }
    .Prompt {
        max-width: 70vw;
        color: var(--pale-azure, #84d2f6);
        font-family: Alata;
        font-size: 34pt;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        @media (aspect-ratio < 0.7) {
            --smalltext: 12pt;
            max-width: 100%;
            text-align: center;
            span {
                width: 90%;
            }
        }
        @media (max-height: 900px) {
            --smalltext: 18pt;
            margin-top: 5px;
            margin-bottom: 10px;
        }
    }
    .Options {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .Option {
        display: flex;
        align-items: center;
        width: 50vw;
        max-width: 1000px;
        min-width: 700px;
        padding: 25px 36px;
        align-items: center;
        text-align: left;
        gap: 1.13806rem;
        background-color: transparent;
        border: none;
        border-bottom: 4.284px solid var(--bice-blue, #386fa4);
        cursor: pointer;
        transition-duration: 400ms;
        overflow-y: hidden;
        @media (max-height: 900px) {
            padding: 15px 36px;
            max-height: 150px;
            padding: 20px 36px;
        }
        @media (max-height: 700px) {
            padding: 15px 36px;
            max-height: 100px;
            .Letter {
                font-size: 11pt;
            }
            .Content {
                font-size: 10pt;
            }
        }
        @media (aspect-ratio < 0.7) {
            min-width: 90vw;
        }
        &[aria-checked="true"] {
            background-color: var(--picton-blue);
            & * {
                color: black;
            }
        }
    }
    .Button-Row {
        display: flex;
        justify-content: center;
        gap: 10vw;
        align-items: center;
        width: 100%;
        margin-top: 30px;
        :global(.Question-Button) {
            display: flex;
            height: 3.25rem;
            padding: 0 33px;
            justify-content: center;
            align-items: center;
            border-radius: 0.4375rem;
            background: var(--pale-azure, #84d2f6);
            color: var(--indigo-dye, #133c55);
            font-family: Alata;
            font-size: 12pt;
            transition-duration: 400ms;
            border: none;
            cursor: pointer;
            @media (aspect-ratio < 0.7) {
                height: fit-content;
                font-size: 15pt;
                padding: 25px 64px;
            }
            &:not(:disabled):hover {
                background-color: var(--picton-blue);
            }
            &:disabled {
                opacity: 0.5;
            }
        }
    }
</style>
