<!-- @component
    Loader for app.
 -->

<script>
    export let width = 60;
    export let speed = 1200;
</script>

<div class="Container" style="width: {width}px; --animation-speed: {speed}ms">
    <svg
        style="aspect-ratio: 1; width: 100%"
        viewBox="0 0 181 181"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.7594 142.877C-8.67577 106.387 -4.14488 55.0697 29.8567 23.8596C66.4749 -9.75224 123.408 -7.31516 157.019 29.303C190.631 65.9212 188.194 122.854 151.576 156.466C117.575 187.676 66.0579 187.805 31.96 158.348L40.6598 150.362C70.4333 175.288 114.794 174.898 144.176 147.928C176.149 118.58 178.277 68.8677 148.929 36.8938C119.58 4.91997 69.8677 2.79199 37.8939 32.1409C8.57361 59.054 4.35079 103.09 26.483 134.87L17.7594 142.877Z"
            fill="#84D2F6"
        />
    </svg>

    <svg
        style="aspect-ratio: 1; width: 40%;"
        viewBox="0 0 101 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M94.5707 27.1751C105.474 47.5202 101.102 73.4003 82.7745 88.9156C61.6987 106.758 30.1491 104.137 12.3067 83.061C-5.53582 61.9851 -2.91463 30.4356 18.1612 12.5931C36.4883 -2.92221 62.735 -2.96379 81.0019 11.1474L72.6815 18.1913C58.2192 8.41438 38.4753 8.98403 24.4967 20.818C7.65385 35.0769 5.55911 60.2899 19.818 77.1328C34.0769 93.9756 59.2898 96.0704 76.1327 81.8115C90.2929 69.8237 94.0289 50.0933 86.3866 34.1036L94.5707 27.1751Z"
            fill="#84D2F6"
        />
    </svg>
</div>

<style lang="scss">
    .Container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        aspect-ratio: 1;
        animation: fade-in-expand 900ms;
        --start: 0.7;
        & > * {
            position: absolute;
            animation-duration: var(--animation-speed);
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            &:first-child {
                animation-name: rotate;
            }
            &:nth-child(2) {
                animation-name: rotate-inverted;
            }
        }
    }
</style>
