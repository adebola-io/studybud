<script>
    import { Evaluator, QuestionComponent } from "@/lib/fragments";
    import { Button, Loader } from "@/lib/ui";
    import { generateQuestions } from "@/services";
    import { notify } from "@/utils";
    import { params } from "svelte-spa-router";

    let currentQuestion = 0,
        questionsRequest = generateQuestions($params.id),
        /** @type {"questions"|"evaluating"|"evaluated"}*/ mode = "questions",
        /** @type {Question[]}*/ questions = [],
        /** @type {Answer[]}*/ answers = [];

    $: questionsRequest.then((data) => (questions = data));

    function retry() {
        questionsRequest = generateQuestions($params.id);
    }

    function lastQuestion() {
        if (answers.length && answers.length === currentQuestion) answers.pop();
        currentQuestion -= 1;
    }

    /**
     * Handle the answering of a question.
     * @param {CustomEvent<Answer>} event
     */
    function handleQuestionAnswering(event) {
        answers.push(event.detail);
        if (currentQuestion === questions.length - 1) {
            end();
        } else currentQuestion += 1;
    }

    /**
     * End a test.
     */
    function end() {
        mode = "evaluating";
        setTimeout(() => {
            mode = "evaluated";
        }, 2000);
    }
</script>

{#if mode === "questions"}
    {#await questionsRequest}
        <div class="Full-Center Flex-Col">
            <h1 class="StageText Generating">Generating Questions...</h1>
            <Loader />
        </div>
    {:then}
        {#key currentQuestion}
            <QuestionComponent
                on:rewind={lastQuestion}
                on:answer={handleQuestionAnswering}
                index={currentQuestion}
                maxQuestionsLength={questions.length}
                question={questions[currentQuestion]}
            />
        {/key}
    {:catch error}
        {(notify(error, "error"), "")}
        <div class="Full-Center Flex-Col">
            <span class="Error-Text">
                Something went wrong. Please try again.</span
            >
            <Button on:click={retry}>Retry</Button>
        </div>
    {/await}
{:else if mode === "evaluating"}
    <div class="Full-Center Flex-Col">
        <h1 class="StageText Generating">Evaluating Results...</h1>
        <Loader />
    </div>
{:else}
    <Evaluator {questions} {answers} />
{/if}

<style lang="scss">
    .StageText.Generating {
        color: var(--pale-azure, #84d2f6);
        -webkit-background-clip: unset;
        -webkit-text-fill-color: unset;
        background-clip: unset;
        background: unset;
        width: fit-content;
        animation: fade-in-expand 500ms;
    }
    .Error-Text {
        color: white;
        margin-bottom: 15px;
        font-family: Alata;
    }
</style>
