const userName2 = document.querySelector("#input-username2");
const password2 = document.querySelector("#input-password2");
const loginBtn = document.querySelector("#login-btn");
const form = document.querySelector(".container");
const deleteAccountsBtn = document.querySelector("#delete-accounts-btn");
const loginbtn = document.querySelector("#login");

const login = loginbtn.addEventListener("click", function() {
    window.location.href = "signup.html"
});

//Para prevenir el evento de enviar
form.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("event prevent");
})

loginBtn.addEventListener("click", function() {
    if (!userName2.value || !password2.value) {
      return alert("Please fill in all fields");  
    } 

    //recuperar lista de users del localstorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    //buscar usuario com el mismo nombre y contraseña
    const userValidate = users.find(u =>
        u.userName === userName2.value && u.password === password2.value
    );

    if (userValidate) {
        alert("login successful");
        //aqui puedo redirecionar para otra pagina
        window.location.href = "../main.html"
    } else {
        alert("Invalid username or password");
    }
})

deleteAccountsBtn.addEventListener('click', function() {
    const confirmDelete = confirm("Are you sure you want to delete all accounts?");

    if (confirmDelete) {
        localStorage.removeItem("users");
        alert("All accounts were removed");
    }
});