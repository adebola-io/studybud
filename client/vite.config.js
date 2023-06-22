import { resolve } from "path";
/**@type {import('vite').UserConfig} */
export default {
    root: "src",
    build: {
        outDir: resolve(__dirname, "dist"),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: "src/index.html",
                questions: "src/questions.html",
            },
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src/"),
        },
    },
};
