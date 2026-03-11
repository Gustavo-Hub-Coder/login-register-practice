const userName = document.querySelector("#input-username");
const email = document.querySelector("#input-email");
const password = document.querySelector("#input-password");
const confirmPassword = document.querySelector("#input-confirm-password");
const signUpBtn = document.querySelector("#signup-btn");
const form = document.querySelector(".container");
const deleteAccountsBtn = document.querySelector("#delete-accounts-btn");
const res = document.querySelector("#res");
const loginbtn = document.querySelector("#login");
//crear cuentas nuevas
function createAccount() {
    const newUser = {
    userName: userName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    }
    //leer usuarios guardados
    //users variavle donde se guardará la lista de usuarios
    let users = JSON.parse(localStorage.getItem("users")) || [];
    //agregar el nuevo usuario
    users.push(newUser);
    //guardar los datos en el localstorage
    localStorage.setItem("users", JSON.stringify(users));
};

//Para prevenir el evento de enviar
form.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("event prevent")
})

//validar inputs
function validateInputs() {
    if (!userName.value) return false, alert("Username is required");
    if (!email.value) return false, alert("Email is required");
    if (!password.value) return false, alert("Password is required");
    if (!confirmPassword.value) return false, alert("Please confirm your password");

    if (password.value !== confirmPassword.value){
        alert("Password do not match");
        return false;
    }
    return true;
}

//limpiar inputs cuando se crea la cuenta
function clearInputs() {
    userName.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
}

const login = loginbtn.addEventListener("click", function() {
    window.location.href = "../login.html"
});

//verificando si se captura los valores delos inputs
//click de boton
signUpBtn.addEventListener("click", function() {
    if (!validateInputs()) return;
    createAccount();
    clearInputs();
    alert("account created.")
    res.style.display = "block";
    res.innerHTML = "Account created"
});

deleteAccountsBtn.addEventListener('click', function() {
    const confirmDelete = confirm("Are you sure you want to delete all accounts?");
    console.log("clicked")
    if (confirmDelete) {
        localStorage.removeItem("users");
        alert("All accounts were removed");
        res.style.display = "none";
    }
});
