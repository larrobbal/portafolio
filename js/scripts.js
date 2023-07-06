import {validateData} from "./validaciones.js";
import {validateDataSend} from "./validaciones.js";

(() => {
    const form = document.getElementById("contact__form");

    const inputs = form.querySelectorAll(":scope > div > .input__form");
    const sendButton = form.querySelector("#send__button");

    inputs.forEach(input => {
        input.addEventListener("blur",(input) =>{
            validateData(input.target);
        });
    });
    
    
    sendButton.addEventListener("click", (sendButton) =>{
        sendButton.preventDefault();
        validateDataSend(inputs);
    });
})();