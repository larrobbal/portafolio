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
            input.parentElement.querySelector(".error__alert").innerHTML = showErrorMsg(inputType, input);
    });
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
function showErrorMsgSend()
{

}
function validateName(name)
{
    if(name.validity.valueMissing)
    {
        if(!($("#name__form").hasClass("required__field")))
        {
            $("#name__form").addClass("required__field");
            name.setCustomValidity("");
        }    
    }
    else if(!characterRegName.test(name.value))
    {
        if(!($("#name__form").hasClass("required__field")))
        {
            $("#name__form").addClass("required__field");
            name.setCustomValidity("error");
        }
    } 
    else if(characterRegName.test(name.value) && !name.validity.valueMissing)
        name.setCustomValidity("");
}

function validateMail(email)
{
    if(email.validity.valueMissing)
    {
        if(!($("#email__form").hasClass("required__field")))
        {
            $("#email__form").addClass("required__field");
            email.setCustomValidity("");
        }    
    }
    else if(!emailRegEmail.test(email.value))
    {
        if(!($("#email__form").hasClass("required__field")))
        {
            $("#email__form").addClass("required__field");
            email.setCustomValidity("error");
        }
    }
    else if(emailRegEmail.test(email.value) && !email.validity.valueMissing)
    {
        email.setCustomValidity("");
    }
}

function validateSubject(subject)
{
    if(subject.validity.valueMissing)
    {
        if(!($("subject__form").hasClass("required__field")))
        {
            $("#subject__form").addClass("required__field");
        }    
    }
}

function validateMessage(message)
{
    if(message.validity.valueMissing)
    {
        if(!($("message__form").hasClass("required__field")))
        {
            $("#message__form").addClass("required__field");
        }
    }
}