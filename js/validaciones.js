export function validateData(input)
{
    const inputType = input.dataset.tipo;
    if(valuer[inputType])
    {
        valuer[inputType](input)
    }

    if(input.validity.valid)
    {
        input.classList.remove("required__field");
        input.parentElement.querySelector(".error__alert").innerHTML = "";
    }
    else
    {
        input.parentElement.querySelector(".error__alert").innerHTML = showErrorMsg(inputType, input);
    }
}

export function validateDataSend(inputs)
{
    inputs.forEach(input => {
        const inputType = input.dataset.tipo;
        if(valuer[inputType])
        {
            valuer[inputType](input)
        }
        if(!input.validity.valid)
        {
            input.parentElement.querySelector(".error__alert").innerHTML = showErrorMsg(inputType, input);
        }
    });
}

export function showModal()
{
    if(Object.values(validArray).every(item => item === true))
    {
        let modalLayout = document.querySelector("#modal__layout");
        let modalDiv = document.querySelector("#modal__div");
        modalDiv.style.display = "flex";
        modalLayout.style.display = "flex";
        modalDiv.style.top = (window.scrollY+100)+"px";
    }
}

export function closeModal(inputs)
{
    document.querySelector("#modal__div").style.display = "none";
    document.querySelector("#modal__layout").style.display = "none";
    inputs.forEach(input => {
        input.value = "";
    })

}

var characterRegName = new RegExp("^[a-zA-Z0-9\u00F1\u00D1]{3,50}$");
var emailRegEmail = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

const valuer = {
    name: input => validateName(input),
    email: input => validateMail(input),
    subject: input => validateSubject(input),
    message: input => validateMessage(input)
}

const errorTypes = [
    "valueMissing",
    "customError"
];

const errorMessages = {
    name: {
        valueMissing: "Introduzca su nombre",
        customError: "No se permiten caracteres especiales en el nombre"
    },
    email: {
        valueMissing: "Introduzca su correo electrónico",
        customError: "Introduzca una dirección de correo electrónico valida. Utilize el formato \'example@mail.com\'"
    },
    subject: {
        valueMissing: "Introduzca el asunto del mensaje"
    },
    message: {
        valueMissing: "Introduzca su mensaje"
    }
}

const validArray =
{
    name: false,
    email: false,
    subject: false,
    message: false
}

function showErrorMsg(inputType, input)
{
    let text = "";
    errorTypes.forEach((error) => {
        if(input.validity[error])
        {
            text = errorMessages[inputType][error];
        }
    })
    return text;
}

function validateName(name)
{
    if(name.validity.valueMissing)
    {
        if(!(document.querySelector("#name__form").classList.contains("required__field")))
        {
            document.querySelector("#name__form").classList.add("required__field");
            name.setCustomValidity("");
            validArray.name=false;
        }    
    }
    else if(!characterRegName.test(name.value))
    {
        if(!(document.querySelector("#name__form").classList.contains("required__field")))
        {
            document.querySelector("#name__form").classList.add("required__field");
            name.setCustomValidity("error");
            validArray.name=false;
        }
    } 
    else if(characterRegName.test(name.value) && !name.validity.valueMissing)
    {
        name.setCustomValidity("");
        validArray.name=true;
    }
}

function validateMail(email)
{
    if(email.validity.valueMissing)
    {
        if(!(document.querySelector("#email__form").classList.contains("required__field")))
        {
            document.querySelector("#email__form").classList.add("required__field");
            email.setCustomValidity("");
            validArray.email=false;
        }    
    }
    else if(!emailRegEmail.test(email.value))
    {
        if(!(document.querySelector("#email__form").classList.contains("required__field")))
        {
            document.querySelector("#email__form").classList.add("required__field");
            email.setCustomValidity("error");
            validArray.email=false;
        }
    }
    else if(emailRegEmail.test(email.value) && !email.validity.valueMissing)
    {
        email.setCustomValidity("");
        validArray.email=true;
    }
}

function validateSubject(subject)
{
    if(subject.validity.valueMissing)
    {
        if(!(document.querySelector("#subject__form").classList.contains("required__field")))
        {
            document.querySelector("#subject__form").classList.add("required__field");
            validArray.subject = false;
        }    
    }
    else
        validArray.subject = true;
}

function validateMessage(message)
{
    if(message.validity.valueMissing)
    {
        if(!(document.querySelector("#message__form").classList.contains("required__field")))
        {
            document.querySelector("#message__form").classList.add("required__field");
            validArray.message = false;
        }
    }
    else
        validArray.message = true;
}