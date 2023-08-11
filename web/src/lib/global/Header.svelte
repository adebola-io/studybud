<header>
    <nav class="NavBar">
        <div class="Controls">
            <div class="BackButton">
                <img src="../../assets/svg/back-icon.svg" alt="back-icon" />
            </div>
            <button class="Lines">
                <div />
                <div />
                <div />
            </button>
        </div>
        <span class="Logo">StudyBud</span>
    </nav>
</header>

<style>
    .NavBar {
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        height: var(--NavBar-Height);
        width: 100%;
        padding-left: 0px;
        justify-content: center;
        align-items: center;
        gap: 38px;
        flex-shrink: 0;
        align-self: stretch;
        border-bottom: 3px solid var(--picton-blue, #59a5d8);
    }
    .NavBar .Controls {
        position: absolute;
        left: 3vw;
        display: flex;
        justify-content: center;
        align-content: center;
    }

    .NavBar .Controls .BackButton {
        cursor: pointer;
        display: none;
    }
    .NavBar .Controls .Lines {
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        gap: 10px;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
    @media (max-width: 1024px) {
        .NavBar .Controls .Lines {
            gap: 6px;
        }
    }
    .NavBar .Controls .Lines > * {
        background-color: var(--bice-blue);
        width: 50px;
        height: 5px;
        border-radius: 8px;
    }
    @media (max-width: 1024px) {
        .NavBar .Controls .Lines > * {
            width: 37px;
            height: 4px;
        }
    }
    .Logo {
        color: var(--pale-azure, #84d2f6);
        font-family: Andika;
        font-size: 31.263px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    @media (max-width: 1024px) {
        .Logo {
            font-size: 25px;
        }
    }
</style>
