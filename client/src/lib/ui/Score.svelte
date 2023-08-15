<script>
    export let obtained = 0;
    export let possible = 1;

    let score = (obtained / possible) * 100;
    const scoreApprox = score.toFixed(2);
    const truncate = scoreApprox.slice(-2) == "00";
</script>

<div class="Main-Circle {score > 59 ? 'passed' : score < 50 ? 'failed' : ''}">
    {truncate ? score : score.toFixed(2)}%
    <span class="Score-Obtained">{obtained}/{possible}</span>
</div>

<style lang="scss">
    .Main-Circle {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 19.07838rem;
        height: auto;
        aspect-ratio: 1;
        border-radius: 50%;
        text-align: center;
        font-family: Alata;
        font-size: 28pt;
        border: 7.495px solid var(--color);
        color: var(--color);
        --color: var(--picton-blue);
        &.passed {
            --color: #2af09d;
        }
        &.failed {
            --color: #ff4d00fe;
        }
        &::before {
            position: absolute;
            display: block;
            height: 80%;
            aspect-ratio: 1;
            content: "";
            border-radius: 50%;
            border: 6px solid var(--color);
        }
        .Score-Obtained {
            color: var(--color);
            font-family: Alata;
            font-size: 13pt;
        }
    }
</style>
