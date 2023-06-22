import { QuestionApp } from "@/lib";
import { questions } from "@/data";

const domElements = {
    root: document.querySelector("html"),
    content: document.querySelector(".form-content"),
    continueButton: document.getElementById("continue-button"),
    backButton: document.getElementById("back-button"),
    sidebar: document.querySelector(".sidebar"),
    body: document.body,
};

const app = new QuestionApp(questions, domElements);

app.run();
