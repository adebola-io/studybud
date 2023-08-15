<script>
    import { Button, Score } from "../ui";
    import AnsweredQuestion from "./AnsweredQuestion.svelte";
    import Feedback from "./Feedback.svelte";

    /** @type {Question[]}*/
    export let questions;
    /** @type {Answer[]} */
    export let answers;

    let currentQuestion = 0;
    let obtainedAnswers = answers.filter(
        (answer) => answer.expected === answer.value
    ).length;
    $: question = questions[currentQuestion];
    $: answer = answers[currentQuestion];

    function goForward() {
        if (currentQuestion < questions.length - 1) currentQuestion += 1;
    }
    function goBack() {
        if (currentQuestion > 0) currentQuestion -= 1;
    }
</script>

<div class="Container">
    <h1 class="Heading">Results</h1>
    <div class="Results-Container">
        <div class="Questions">
            <AnsweredQuestion {question} {answer} />
            <div class="Button-Row">
                <button
                    type="button"
                    on:click={goBack}
                    disabled={currentQuestion === 0}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="33"
                        viewBox="0 0 20 33"
                        fill="none"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M1.40461 14.4202C0.376793 15.4481 0.376793 17.1147 1.40461 18.1425L14.5649 31.3028C15.5928 32.3307 17.2593 32.3307 18.2872 31.3028C19.3151 30.2749 19.3151 28.6084 18.2872 27.5805L6.988 16.2814L18.2872 4.9822C19.3151 3.95438 19.3151 2.28776 18.2872 1.25994C17.2593 0.232119 15.5928 0.232119 14.5649 1.25994L1.40461 14.4202Z"
                            fill="#59A5D8"
                        />
                    </svg>
                </button>
                <button
                    type="button"
                    on:click={goForward}
                    disabled={currentQuestion === questions.length - 1}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="34"
                        viewBox="0 0 20 34"
                        fill="none"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M18.6123 15.334C19.6877 16.4095 19.6877 18.1533 18.6123 19.2288L4.84208 32.999C3.76655 34.0745 2.02279 34.0745 0.947257 32.999C-0.128252 31.9235 -0.128252 30.1797 0.947257 29.1042L12.7701 17.2814L0.947257 5.45856C-0.128252 4.3831 -0.128252 2.63924 0.947257 1.56379C2.02279 0.488331 3.76655 0.488331 4.84208 1.56379L18.6123 15.334Z"
                            fill="#59A5D8"
                        />
                    </svg>
                </button>
            </div>
        </div>
        <div class="Score-and-Feedback">
            <Score obtained={obtainedAnswers} possible={questions.length} />
            <div>
                {#key currentQuestion}
                    <Feedback
                        questionId={question.id}
                        wrongAnswer={question.options[answer.value]}
                        get={answer.expected !== answer.value}
                    />
                {/key}
                <Button override class="RetakeQuizButton">Retake Quiz</Button>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .Container {
        @media (aspect-ratio < 0.7) {
            padding-top: var(--Navbar-Height);
        }
    }
    .Results-Container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 3vw;
        @media (max-width: 1024px) {
            gap: 0;
            padding-inline: 6vw;
            width: 88vw;
            align-items: start;
            overflow: hidden;
        }
        @media (aspect-ratio < 0.7) {
            flex-direction: column-reverse;
        }
        .Questions {
            .Button-Row {
                color: white;
                display: flex;
                justify-content: end;
                width: 100%;
                gap: 29px;
                margin-top: 30px;
                button {
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                    &:disabled {
                        opacity: 0.4;
                        cursor: initial;
                    }
                }
            }
        }
        .Score-and-Feedback {
            display: flex;
            align-items: center;
            flex-direction: column;
            :global(.RetakeQuizButton) {
                display: flex;
                width: 13.20956rem;
                height: 3.16363rem;
                padding: 0.555rem;
                justify-content: center;
                align-items: center;
                gap: 0.555rem;
                flex-shrink: 0;
                border-radius: 0.342rem;
                border: 3.42px solid var(--indigo-dye, #133c55);
                background: var(--picton-blue, #59a5d8);
                box-shadow: 2.05208420753479px 2.736112356185913px 0px 0px
                    rgba(67, 82, 216, 0.72);
                color: var(--indigo-dye, #133c55);
                text-align: center;
                font-family: Inter;
                font-size: 0.93906rem;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
            }
        }
    }
</style>
