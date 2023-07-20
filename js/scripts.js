import {validateData} from "./validaciones.js";
import {validateDataSend} from "./validaciones.js";
import {showModal} from "./validaciones.js";
import {closeModal} from "./validaciones.js";

(() => {
    const mobileMenuToggle = document.querySelector("#mobile__menu__button");
    const closeModalBtn = document.querySelector("#modal__close__button");
    const form = document.getElementById("contact__form");
    const mobileMenu = document.getElementById("mobile__menu");
    const mobileMenuOptions = mobileMenu.querySelectorAll(":scope > li > a");

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
        showModal();
    });

    closeModalBtn.addEventListener("click", (closeModalBtn) => {
        closeModalBtn.preventDefault();
        closeModal(inputs);
    });

    mobileMenuToggle.addEventListener("click", (mobileMenuToggle) => {
        const menuToggle = document.querySelector("#mobile__menu__button");
        const mobileMenu = document.querySelector("#mobile__menu");
        if(!menuToggle.classList.contains("is-active"))
        {
            menuToggle.classList.add("is-active");
            mobileMenu.style.left="0px";
        }
            
        else
        {
            menuToggle.classList.remove("is-active");
            mobileMenu.style.left="-300px";
        }
    });
    mobileMenuOptions.forEach(option => {
        option.addEventListener("click", ()=>{
            const menuToggle = document.querySelector("#mobile__menu__button");
            const mobileMenu = document.querySelector("#mobile__menu");
            if(!menuToggle.classList.contains("is-active"))
            {
                menuToggle.classList.add("is-active");
                mobileMenu.style.left="0px";
            }
                
            else
            {
                menuToggle.classList.remove("is-active");
                mobileMenu.style.left="-300px";
            }
        })
    });
})();