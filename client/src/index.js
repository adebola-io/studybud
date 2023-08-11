import { sendUserAlert, validateDocument, uploadFile } from "./lib";

/** @type {HTMLButtonElement & {icon: HTMLDivElement, text: HTMLSpanElement}} */
const uploadButton = document.querySelector(".UploadButton");
uploadButton.icon = uploadButton.querySelector(".UploadIcon");
uploadButton.text = uploadButton.querySelector(".UploadButtonText");

/** @type {HTMLInputElement} */
const fileInput = document.querySelector(".FileInput");
/** @type {HTMLDivElement} */
const overlay = document.querySelector(".Icons-Overlay");
/** @type {HTMLDivElement} */
const stageText = document.querySelector(".StageText");
/**@type {HTMLDivElement} */
const centerText = document.querySelector(".ExplanationText");
/**@type {HTMLDivElement} */
const backButton = document.querySelector(".BackButton");
backButton.addEventListener("click", resetState);

const generateQuestionsButton = document.createElement("a");
generateQuestionsButton.classList.add("GenerateQuestionsButton");
generateQuestionsButton.innerText = "Generate Questions";
const summarizeButton = document.createElement("a");
summarizeButton.classList.add("SummarizeButton");
summarizeButton.innerText = "Summarize";

const buttonContainer = document.createElement("div");
buttonContainer.className = "ButtonContainer";
buttonContainer.append(generateQuestionsButton, summarizeButton);

function promptForFile() {
    fileInput.click();
}
function handleFile() {
    let file = fileInput.files[fileInput.files.length - 1];
    validateDocument(file)
        .then(openSecondView)
        .catch((error) => sendUserAlert(error.message, "error"));
}

function main() {
    uploadButton.addEventListener("click", promptForFile);
    fileInput.addEventListener("input", handleFile);
}

/**
 * Open the second user view.
 * @param {File} file
 */
function openSecondView(file) {
    overlay.style.scale = "1.35";

    stageText.replaceChildren("Reading file...");
    stageText.classList.add("Reading");

    centerText.classList.replace("ExplanationText", "FileBox");
    centerText.replaceChildren(file.name);

    uploadButton.removeEventListener("click", promptForFile);
    let cancelButton = uploadButton;

    cancelButton.classList.add("Cancel");
    cancelButton.icon.style.display = "none";
    cancelButton.text.textContent = "Cancel";
    cancelButton.addEventListener("click", resetState);

    const reader = new FileReader();
    reader.onload = (event) => {
        const fileData = event.target.result;
        uploadFile(fileData, cancelButton)
            .then(openThirdView)
            .catch((e) => {
                console.error(e);
                sendUserAlert("An error occurred", "error");
                resetState();
            })
            .finally(() => {
                cancelButton.removeEventListener("click", resetState);
            });
    };

    reader.readAsText(file);
}

function resetState() {
    overlay.style.scale = "1";
    backButton.style.display = "none";
    stageText.classList.remove("Reading");
    stageText.innerText = "Streamline, analyze and engage.";
    centerText.innerHTML = `<span class="Sentence-1">
                        Welcome to StudyBud, the ultimate companion for
                        unlocking knowledge's potential. </span
                    ><span class="Sentence-2">
                        This tool offers a groundbreaking solution to summarize
                        scholarly articles, school materials, and research
                        papers
                        <span class="Sentence-2-EndPhrase"
                            >, saving you valuable time and effort.</span
                        >
                    </span>
                    <span class="Sentence-3">
                        You can use StudyBud to extract core information, giving
                        you key insights at your fingertips.
                    </span>
                    <span class="Sentence-4">
                        You can also generate thought-provoking questions based
                        on the text, nurturing your inquisitive nature and
                        expanding your understanding.
                    </span>`;
    centerText.classList.replace("FileBox", "ExplanationText");
    buttonContainer.remove();
    uploadButton.classList.remove("Cancel");
    uploadButton.icon.removeAttribute("style");
    uploadButton.text.textContent = "Upload File";
    fileInput.value = "";
    uploadButton.addEventListener("click", promptForFile);
}

/**
 * Open the third user view.
 * @param {Response} response
 */
function openThirdView(response) {
    response.json().then((data) => console.log(data));
    summarizeButton.href = "";
    backButton.style.display = "flex";
    stageText.replaceChildren("File analyzed.");
    stageText.classList.add("analyzed");
    centerText.after(buttonContainer);
    uploadButton.classList.remove("Cancel");
    uploadButton.icon.removeAttribute("style");
    uploadButton.text.textContent = "Upload Another File";
}

main();
