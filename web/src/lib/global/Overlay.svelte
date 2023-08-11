<!-- Icon Overlay. -->

<div class="Overlay-Container">
    <div class="Icons-Overlay" />
</div>

<style>
    .Overlay-Container {
        position: fixed;
        z-index: -1;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
    }
    .Icons-Overlay {
        position: absolute;
        width: 100%;
        aspect-ratio: 1;
        background-image: url(../../assets//backgrounds/icon-background.png);
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100%;
        animation-fill-mode: both;
        animation: animate-overlay 700ms, rotate 480000ms infinite linear;
        transition-duration: 600ms;
    }
    @keyframes animate-overlay {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
    }

    @media (max-width: 912px) {
        .Icons-Overlay {
            width: auto;
            height: 150%;
        }
    }
    @media (max-width: 414px) {
        .Icons-Overlay {
            height: 120%;
        }
    }
</style>
