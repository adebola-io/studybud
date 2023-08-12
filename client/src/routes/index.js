//@ts-nocheck

import { wrap } from "svelte-spa-router/wrap";
import { get } from "svelte/store";

import { uploadData } from "@/stores";

import FileAnalyzed from "./FileAnalyzed.svelte";
import GenerateQuestions from "./GenerateQuestions.svelte";
import Home from "./Home.svelte";
import NotFound from "./NotFound.svelte";
import Summary from "./Summary.svelte";
import ReadingFile from "./ReadingFile.svelte";

function formDataIsAvailable() {
    return get(uploadData) !== null;
}

const routes = {
    "/": Home,
    "/reading-file": wrap({
        component: ReadingFile,
        conditions: [formDataIsAvailable],
    }),
    "/file-analyzed/:id": wrap({
        component: FileAnalyzed,
        conditions: [formDataIsAvailable],
    }),
    "/generate/:id": wrap({
        component: GenerateQuestions,
        conditions: [formDataIsAvailable],
    }),
    "/summarize/:id": wrap({
        component: Summary,
        conditions: [formDataIsAvailable],
    }),
    "*": NotFound,
};

export default routes;
