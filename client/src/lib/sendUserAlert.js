/**
 * Send alert to the user.
 * @param {string} message
 * @param {"error"|"success"} type
 */
export function sendUserAlert(message, type) {
    const alertBox = document.createElement("div");
    alertBox.classList.add("AlertBox", type);
    alertBox.innerText = message;
    document.body.append(alertBox);

    setTimeout(() => {
        alertBox.style.opacity = "0";
        alertBox.ontransitionend = () => alertBox.remove();
    }, 2000);
}
