import { optColors, themeColors } from "./data";
import { createElement, createStar } from "./lib";

/**
 * @typedef {import('./types').Question} Question
 * @typedef {import("./types").OptionLetter} OptionLetter
 * @typedef {import("./lib").CompositeImage} CompositeImage
 */

/**
 * @adebola-io
 * The Question App.
 */
export class App {
    /**
     * App contructor.
     * @param {Question[]} questions
     */
    constructor(questions) {
        this.questions = questions;
    }
    //@ts-ignore
    primaryColor = themeColors.GREEN;
    /** @type {Question[]} */
    questions = [];
    /** The current open question, starting with 0 */
    currentQuestionId = 0;
    /** Relevant DOM elements. */
    dom = {
        /** @type {HTMLHtmlElement} */ // @ts-ignore
        root: document.querySelector("html"),
        /** @type {HTMLDivElement} */ // @ts-ignore
        content: document.querySelector(".form-content"),
        /** @type {HTMLButtonElement} */ // @ts-ignore
        continueButton: document.getElementById("continue-button"),
        /** @type {HTMLButtonElement} */ // @ts-ignore
        backButton: document.getElementById("back-button"),
        /** @type {HTMLElement} */ // @ts-ignore
        sidebar: document.querySelector(".sidebar"),
    };
    /**
     * Containers for the created questions.
     * @type {HTMLDivElement[]}
     */
    containers = [];

    /** Runs the app. */
    run() {
        this.dom.root.style.setProperty("--primary-color", this.primaryColor);
        this.questions
            .map((question, index) => {
                const questionElement = this.createQuestionElement(question);
                this.addQuestionPill(questionElement, index);
                return this.wrapInContainer(questionElement, index);
            })
            .forEach((questionContainer) => {
                this.containers.push(questionContainer);
                this.dom.content.append(questionContainer);
            });

        // Open first question.
        this.containers[this.currentQuestionId].style.display = "flex";

        this.dom.backButton.style.display =
            this.currentQuestionId === 0 ? "none" : "flex";

        this.dom.continueButton.onclick = () => this.nextQuestion();
        this.dom.backButton.onclick = () => this.previousQuestion();
    }

    /**
     * Wrap the question stage in a container element.
     * @param {HTMLElement} questionElement The question stage element.
     * @param {number} id The question id.
     * @returns {HTMLDivElement}
     */
    wrapInContainer(questionElement, id) {
        /** @type {HTMLDivElement} */
        const questionContainer = createElement("div");
        questionContainer.classList.add("question-container");
        questionContainer.id = `container-${id}`;
        questionContainer.append(questionElement);
        return questionContainer;
    }

    /**
     * Add a `Question _/_` pill to top of element
     * @param {HTMLElement} element The question stage element.
     * @param {number} id The question id.
     */
    addQuestionPill(element, id) {
        const pill = createElement("div");
        pill.classList.add("question-pill");
        pill.textContent = `Question ${id + 1}/${this.questions.length}`;
        element.prepend(pill);
    }

    /**
     * Generates a question.
     * @param {Question} question
     */
    createQuestionElement(question) {
        const questionElement = createElement("div");
        questionElement.classList.add("question-stage");
        const prompt = createElement("h2");
        prompt.classList.add("question-prompt");
        prompt.textContent = question.prompt;
        questionElement.append(prompt);

        if (question.subtext) {
            const subtext = createElement("h3");
            subtext.classList.add("question-subtext");
            subtext.innerText = question.subtext;
            questionElement.append(subtext);
        }

        const userActionArea = createElement("div");
        userActionArea.classList.add("user-input");

        switch (question.type) {
            case "optional": {
                const { options, id } = question;
                if (options instanceof Array) {
                    const optionContainers = this.createBoxOptions(id, options);
                    const grid = createElement("div");
                    grid.classList.add("box-option-grid");
                    grid.style.setProperty(
                        "--items",
                        options.length.toString()
                    );
                    grid.append(...optionContainers);
                    userActionArea.append(grid);
                } else {
                    const optionContainers = this.createLetterOptions(
                        id,
                        options
                    );
                    userActionArea.append(...optionContainers);
                }
                break;
            }
            case "textbox": {
                /** @type {HTMLTextAreaElement} */
                const textarea = createElement("textarea");
                textarea.classList.add("user-textbox");
                textarea.title = `question-${question.id}`;
                textarea.onkeyup = () => {
                    const questionContainer =
                        this.containers[this.currentQuestionId];
                    if (textarea.value.length > 0) {
                        if (!questionContainer.hasAttribute("answered")) {
                            questionContainer.setAttribute("answered", "true");
                        }
                    } else if (questionContainer.hasAttribute("answered")) {
                        questionContainer.removeAttribute("answered");
                    }
                };
                userActionArea.append(textarea);
                break;
            }
            case "rating": {
                const rating = createElement("div");
                rating.classList.add("user-rating-box");
                let i = 0;
                /**@type {SVGSVGElement[]} */
                const stars = [];
                const label = createElement("div");
                for (let i = 0; i < 5; i++) {
                    const star = createStar();
                    star.classList.add("star");
                    star.onclick = () => {
                        stars
                            .slice(0, i + 1)
                            .forEach((star) =>
                                star.setAttribute("fill", "#4ca566")
                            );
                        stars
                            .slice(i + 1)
                            .forEach((star) =>
                                star.setAttribute("fill", "none")
                            );
                        label.innerText = `You selected ${i + 1} ${
                            i + 1 == 1 ? "star" : "stars"
                        }`;
                        this.containers[this.currentQuestionId].setAttribute(
                            "answered",
                            "true"
                        );
                    };
                    star.setAttribute("value", `star-${i}`);
                    stars.push(star);
                }

                label.innerText = `You selected 0 stars`;
                label.classList.add("user-rating-label");
                rating.append(...stars);
                rating.append(label);
                userActionArea.append(rating);
                break;
            }
            case "select": {
                const { options, id, prompt } = question;
                /** @type {HTMLSelectElement} */
                const select = createElement("select");
                select.classList.add("user-select");
                select.name = `question-${id}`;
                select.title = prompt;
                select.append(createElement("option"));

                for (const option of options) {
                    /** @type {HTMLOptionElement} */
                    const optionElement = createElement("option");
                    optionElement.value = option;
                    optionElement.innerText = option;
                    select.append(optionElement);
                }

                select.onchange = () => {
                    if (select.value.length === 0) {
                        this.containers[this.currentQuestionId].removeAttribute(
                            "answered"
                        );
                    } else {
                        this.containers[this.currentQuestionId].setAttribute(
                            "answered",
                            "true"
                        );
                    }
                };

                userActionArea.append(select);
                break;
            }
        }

        questionElement.append(userActionArea);

        return questionElement;
    }

    /**
     * Create Boxed (Image) Options.
     * @param {number} id
     * @param {{ compositeImage: CompositeImage; description: string }[]} options
     * @returns {HTMLElement[]}
     */
    createBoxOptions = (id, options) =>
        options.map((option, index) => {
            const optionContainer = createElement("div");
            optionContainer.classList.add("box-option");
            const imagesContainer = createElement("div");
            imagesContainer.classList.add("image-container");
            option.compositeImage.images.forEach((image) => {
                /** @type {HTMLImageElement} */
                const img = createElement("img");
                img.src = image.src;
                img.alt = image.alt;
                imagesContainer.append(img);
            });
            optionContainer.append(imagesContainer);
            optionContainer.style.setProperty(
                "--animation-delay",
                `${index}00ms`
            );

            /** @type {HTMLInputElement} */
            const hiddenRadio = createElement("input");
            hiddenRadio.type = "radio";
            hiddenRadio.name = `question-${id}`;
            hiddenRadio.title = option.description;
            hiddenRadio.style.display = "none";
            optionContainer.append(hiddenRadio);

            let label = createElement("label");
            label.append(option.description);
            optionContainer.append(label);

            optionContainer.addEventListener("click", () => {
                optionContainer.classList.add("selected");

                const questionContainer =
                    this.containers[this.currentQuestionId];
                questionContainer.setAttribute("answered", "true");
                hiddenRadio.checked = true;
                questionContainer
                    .querySelectorAll(".box-option")
                    .forEach((option) => {
                        if (option !== optionContainer) {
                            console.log(option);
                            option.classList.remove("selected");
                            // @ts-ignore
                            option.children[1].checked = false;
                        }
                    });
            });

            return optionContainer;
        });

    /**
     * Create A, B, C and D Options.
     * @param {number} id
     * @param {{[key in OptionLetter]: string;}} options
     * @returns {HTMLElement[]}
     */
    createLetterOptions = (id, options) =>
        Object.entries(options).map((entry, index) => {
            /** The letter identfying this option.
             * @type {import("./types").OptionLetter} */ // @ts-ignore
            const letter = entry[0],
                /** The value within this option. */
                value = entry[1];

            const opt = createElement("div");
            opt.classList.add("lettered-option");
            const optColor = optColors[letter];
            opt.style.setProperty("--color", optColor.color);
            opt.style.setProperty("--background", optColor.background);
            opt.style.setProperty("--animation-delay", `${index}00ms`);

            /**@type {HTMLInputElement} */
            const radio = createElement("input");
            radio.type = "radio";
            radio.title = value;
            radio.name = `question-${id}`;
            radio.classList.add("user-input-radio");
            opt.append(radio);

            /**@type {HTMLLabelElement} */
            const label = createElement("label");
            label.setAttribute("for", value);
            label.innerHTML = `<span>${letter}</span> <span>${value}</span>`;
            opt.append(label);

            label.addEventListener("click", () => {
                radio.setAttribute("checked", "true");
                label.classList.add("selected");
                document
                    .querySelectorAll(`input[name=question-${id}]`)
                    ?.forEach((input) => {
                        if (input !== radio) {
                            input.removeAttribute("checked");
                            input.parentNode?.children[1].classList.remove(
                                "selected"
                            );
                        }
                    });
                this.containers[id].setAttribute("answered", "true");
            });

            return opt;
        });

    /**
     * Move to the next question, if there is any.
     */
    nextQuestion() {
        const currentQuestionIsAnswered =
            this.containers[this.currentQuestionId].hasAttribute("answered");
        if (!currentQuestionIsAnswered) {
            this.error("Answer question before proceeding!");
            return;
        }

        if (this.currentQuestionId === this.questions.length - 1) {
            this.promptSubmission();
        } else if (this.currentQuestionId < this.questions.length) {
            this.gotoQuestion(++this.currentQuestionId);
            this.dom.backButton.style.display = "flex";
        }
    }
    /**
     * Move to the last question, if there is any.
     */
    previousQuestion() {
        if (this.currentQuestionId > 0) {
            this.gotoQuestion(--this.currentQuestionId);
            if (this.currentQuestionId === 0) {
                this.dom.backButton.style.display = "none";
            }
        }
    }

    /**
     * Ask the user if submission should proceed.
     */
    promptSubmission() {
        alert("Submit?");
    }

    /**
     * Go to a question.
     * @param {number} index The id of the question.
     */
    gotoQuestion(index) {
        this.containers.forEach((questionContainer) => {
            if (questionContainer.id === `container-${index}`) {
                questionContainer.setAttribute("style", "display: block");
            } else {
                questionContainer.setAttribute("style", "display: none");
            }
        });
    }

    /**
     * Notify user of an error.
     * @param {string} message
     */
    error(message) {
        this.alertUser(message, "error");
    }

    /**
     * Notify user of a success.
     * @param {string} message
     */
    success(message) {
        this.alertUser(message, "success");
    }

    /**
     * Notify the user of a message,
     * @param {string} message
     * @param {"error"|"success"} messageType
     */
    alertUser(message, messageType, duration = 2000) {
        const container = createElement("div");
        container.classList.add("user-alert-container");
        const box = createElement("div");
        box.classList.add("user-alert", messageType);
        box.innerText = message;
        box.ontransitionend = () => box.remove();
        container.append(box);
        document.body.prepend(container);

        setTimeout(() => {
            box.style.opacity = "0";
        }, duration);
    }
}
