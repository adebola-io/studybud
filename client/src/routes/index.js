import FileAnalyzed from "./FileAnalyzed.svelte";
import GenerateQuestions from "./GenerateQuestions.svelte";
import Home from "./Home.svelte";
import NotFound from "./NotFound.svelte";
import ReadingFile from "./ReadingFile.svelte";
import Summary from "./Summary.svelte";

const routes = {
    "/": Home,
    "/reading-file": ReadingFile,
    "/file-analyzed": FileAnalyzed,
    "/generate/:id": GenerateQuestions,
    "/summarize/:id": Summary,
    "*": NotFound,
};

export default routes;
