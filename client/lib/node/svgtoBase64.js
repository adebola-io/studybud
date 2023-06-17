const { readFileSync } = require("fs");
const { extname } = require("path");

/**
 * Transform a file to a base 64 string.
 * @param {fs.PathLike} file The file to transform.
 */
function stringifytoBase64(file) {
    return `data:image/svg+xml;base64,${readFileSync(file, {
        encoding: "base64",
    })}`;
}

console.log(
    stringifytoBase64("client/assets/arrow-toggle-down-svgrepo-com.svg")
);
