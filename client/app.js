import { optColors } from "./data";

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
   /** @type {Question[]} */
   questions = [];
   /** The current open question. */
   currentQuestionId = 0;
   /** Relevant DOM elements. */
   dom = {
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
      /** @type {HTMLDivElement} */ //@ts-ignore
      const questionContainer = document.createElement("div");
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
      const pill = document.createElement("div");
      pill.classList.add("question-pill");
      pill.textContent = `Question ${id + 1}/${this.questions.length}`;
      element.prepend(pill);
   }

   /**
    * Generates a question.
    * @param {Question} question
    */
   createQuestionElement(question) {
      const questionElement = document.createElement("div");
      questionElement.classList.add("question-stage");
      const prompt = document.createElement("h2");
      prompt.classList.add("question-prompt");
      prompt.textContent = question.prompt;
      questionElement.append(prompt);

      const userActionArea = document.createElement("div");
      userActionArea.classList.add("user-input");

      switch (question.type) {
         case "optional": {
            const { options, id } = question;
            if (options instanceof Array) {
               const optionContainers = this.createBoxedOptions(id, options);
               const grid = document.createElement("div");
               grid.classList.add("box-option-grid");
               grid.style.grid = `auto / ${"auto ".repeat(options.length)}`;
               grid.append(...optionContainers);
               userActionArea.append(grid);
            } else {
               const optionContainers = this.createLetteredOptions(id, options);
               userActionArea.append(...optionContainers);
            }
            break;
         }
         case "textbox": {
            const textarea = document.createElement("textarea");
            userActionArea.append(textarea);
            break;
         }
         case "rating": {
            const rating = document.createElement("div");
            const a = [];
            a.length = 5;
            a.forEach((_) => {
               const icon = document.createElement("i");
               icon.classList.add("star", "fa-star");
               rating.append(icon);
            });
            userActionArea.append(rating);
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
   createBoxedOptions = (id, options) =>
      options.map((option, index) => {
         const optionContainer = document.createElement("div");
         optionContainer.classList.add("box-option");
         option.compositeImage.images.forEach((image) => {
            console.log(image);
            /** @type {HTMLImageElement} */ //@ts-ignore
            const img = document.createElement("img");
            img.src = image.src;
            img.alt = image.alt;
            optionContainer.append(img);
         });
         const text = document.createTextNode(option.description);
         optionContainer.append(text);

         return optionContainer;
      });

   /**
    * Create A, B, C and D Options.
    * @param {number} id
    * @param {{[key in OptionLetter]: string;}} options
    * @returns {HTMLElement[]}
    */
   createLetteredOptions = (id, options) =>
      Object.entries(options).map((entry, index) => {
         /** The letter identfying this option.
          * @type {import("./types").OptionLetter} */ // @ts-ignore
         const letter = entry[0],
            /** The value within this option. */
            value = entry[1];

         const opt = document.createElement("div");
         opt.classList.add("lettered-option");
         const optColor = optColors[letter];
         opt.style.setProperty("--color", optColor.color);
         opt.style.setProperty("--background", optColor.background);
         opt.style.setProperty("--animation-delay", `${index}00ms`);

         /**@type {HTMLInputElement} */ // @ts-ignore
         const radio = document.createElement("input");
         radio.type = "radio";
         radio.title = value;
         radio.name = `question-${id}`;
         radio.classList.add("user-input-radio");
         opt.append(radio);

         /**@type {HTMLLabelElement} */ // @ts-ignore
         const label = document.createElement("label");
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
                     input.parentNode?.children[1].classList.remove("selected");
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
      if (this.currentQuestionId < this.questions.length) {
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
    * Notify the user of a message,
    * @param {string} message
    * @param {"error"|"success"} messageType
    */
   alertUser(message, messageType, duration = 2000) {
      const box = document.createElement("div");
      box.classList.add("user-alert", messageType);
      box.innerText = message;
      box.ontransitionend = () => box.remove();
      this.dom.sidebar.prepend(box);

      setTimeout(() => {
         box.style.opacity = "0";
      }, duration);
   }
}
