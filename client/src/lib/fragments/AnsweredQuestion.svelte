<script>
    import { Cancel } from "../ui";
    import Checkmark from "../ui/Checkmark.svelte";

    /** @type {Question} */
    export let question;
    /** @type {Answer} */
    export let answer;
</script>

<div class="AnsweredQuestion">
    <h3>{question.question}</h3>
    <ul>
        {#each question.options as option, index}
            <li
                class="Option {answer.expected === answer.value &&
                answer.value === index
                    ? 'success'
                    : answer.value === index
                    ? 'error'
                    : answer.expected === index
                    ? 'expected'
                    : ''}"
            >
                {#if answer.expected === index}
                    <Checkmark
                        color={answer.value === index
                            ? "#2AF09D"
                            : "var(--picton-blue)"}
                    />
                {:else if answer.value === index}
                    <Cancel />
                {:else}
                    <span class="Letter">
                        {option.slice(0, 2).toUpperCase()}
                    </span>
                {/if}
                <span class="Content">
                    {option.slice(3)}
                </span>
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">
    .AnsweredQuestion {
        text-align: left;
    }
    ul {
        padding: 0;
    }
    h3 {
        color: var(--pale-azure, #84d2f6);
        font-family: Alata;
        font-size: 22pt;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    .Option {
        display: flex;
        min-width: 49vw;
        height: 90px;
        padding: 0.6075rem 3.0375rem 0.6075rem 1.5795rem;
        align-items: center;
        gap: 1.03275rem;
        opacity: 0.6;
        &.success {
            border-bottom: 3.888px solid #2af09d;
            opacity: 1;
        }
        &.error {
            border-bottom: 3.888px solid #ff4d00fe;
            opacity: 1;
        }
        &.expected {
            border-bottom: 3.888px solid var(--picton-blue);
            opacity: 1;
        }
    }
</style>
