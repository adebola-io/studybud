<!-- 
    @component
    Icon Overlay. 
-->
<script>
    /** Whether overlay should be focused. */
    export let focused = false;
</script>

<div class="Overlay-Container">
    <div class={"Icons-Overlay" + (focused ? " Focused" : "")} />
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
        background-size: 100%;
        animation-fill-mode: both;
        --start: 0.9;
        animation: fade-in-expand 700ms, rotate 480000ms infinite linear;
        transition-duration: 600ms;
    }
    .Icons-Overlay.Focused {
        scale: 1.35;
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
