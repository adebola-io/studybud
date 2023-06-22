import { resolve } from "path";
/**@type {import('vite').UserConfig} */
export default {
    resolve: {
        alias: {
            "@": resolve(__dirname, "./"),
        },
    },
};
