import { resolve, parse, join } from "path";
/**@type {import('vite').UserConfig} */
export default {
    root: "src",
    build: {
        outDir: resolve(__dirname, "dist"),
        emptyOutDir: true,
        rollupOptions: {
            input: entryPoints("index.html", "questions.html"),
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src/"),
        },
    },
};

/**
 *
 * @param  {...string[]} paths
 * @returns
 */
function entryPoints(...paths) {
    const entries = paths.map(parse).map((entry) => {
        const { dir, base, name, ext } = entry;
        const key = join(dir, name);
        const path = resolve(__dirname, dir, base);
        return [key, path];
    });

    const config = Object.fromEntries(entries);
    return config;
}
