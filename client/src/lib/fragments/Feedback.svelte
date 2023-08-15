<script>
    import { getQuestionAnswerFeedback } from "@/services";
    import { notify } from "@/utils";
    import { onMount } from "svelte";
    import { Button, Loader } from "../ui";

    export let questionId;
    export let wrongAnswer;
    export let get;

    let isLoading = true,
        isError = false;

    let feedback_text = "The selected answer was correct.";

    function getFeedback() {
        isLoading = true;
        isError = false;
        getQuestionAnswerFeedback({
            question: questionId,
            wrong_answer: wrongAnswer,
        })
            .then((data) => {
                feedback_text = data.feedback_text;
            })
            .catch((error) => {
                notify(error.message, "error");
                isError = true;
            })
            .finally(() => (isLoading = false));
    }

    onMount(get ? getFeedback : () => {});
</script>

<div class="Feedback">
    <h4 class="Feedback-Heading">Feedback</h4>
    {#if isLoading}
        <div class="Full-Center Feedback-Content">
            <Loader width={30} />
        </div>
    {:else if isError}
        <div class="Full-Center Flex-Col Feedback-Content">
            <div style="margin-bottom: 10px;">Something went wrong.</div>
            <Button layout="small" on:click={getFeedback}>Retry</Button>
        </div>
    {:else}
        <div class="Feedback-Content">
            {feedback_text}
        </div>
    {/if}
</div>

<style lang="scss">
    .Feedback {
        width: 100%;
        text-align: left;
        margin-bottom: 50px;
        .Feedback-Heading {
            color: var(--pale-azure, #84d2f6);
            font-family: Alata;
            font-size: 22pt;
        }
        .Feedback-Content {
            width: 100%;
            height: 90px;
            overflow-y: scroll;
            color: #e8f9fd;
            font-family: Alata;
            font-size: 0.87363rem;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            &::-webkit-scrollbar {
                background-color: transparent;
            }
        }
    }
</style>
