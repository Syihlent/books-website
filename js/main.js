function addNav(){
    if(document.URL.includes("index.html")){
        return;
    }

    let nav = document.getElementsByClassName("nav")[0];
    if(nav != undefined){
        nav.remove();
    }

    let navElement = `
        <button class="hamburgerButton" onclick="bringMenu()">
            X
        </button>
        <nav class="nav">
            <a class="profilePageDiv" href="../html/profilePage.html">
                <img src="https://bukovero.com/wp-content/uploads/2016/07/Harry_Potter_and_the_Cursed_Child_Special_Rehearsal_Edition_Book_Cover.jpg" alt="Профил">
            </a>
            <a class="navItem" href="../index.html">Почетна</a>
            <a class="navItem" href="../html/autori/autori.html">Аутори</a>
            <a class="navItem" href="../html/bookAdmin.html">Админ - Књиге</a>
            <a class="navItem" href="../html/autori/autorAdmin.html">Админ - Аутори</a>
            <button id="loginButton" class="navItem logoutDiv" href="../html/profilePage.html">Одјава</button>

            <dialog id="loginDialog">
                <h3>Login</h3>
                <form onsubmit="loginUser(event)" class="loginForm">
                    <input name="username" id="username" type="text" value="" placeholder="Username">
                    <input name="password" id="password" type="password" value="" placeholder="Password">
                    <input id="login" type="submit" value="Login">
                    <input id="register" type="button" value="Registracija" onclick="showRegisterDialog()">
                </form>
                <button id="closeLoginDialog" class="closeDialog" onclick="closeLoginDialog()">X</button>
            </dialog>
        </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navElement);
}

addNav();

let menu = document.getElementsByClassName("nav")[0];
let currentUser = null;

async function loadData(){
    try{
        let response = await fetch("https://books-website-74fda-default-rtdb.europe-west1.firebasedatabase.app/.json");
        let data = await response.json();

        // console.log(data);

        return data;
    }
    catch(err){
        console.log(err);
    }
}

let data = null;
(async () => {
    data = await loadData();
})();

function bringMenu(){
    if(menu.classList.contains("active")){
        menu.classList.remove("active");
    }
    else{
        menu.classList.add("active");
    }
}

let loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", (event) => {
    if(currentUser == null){
        document.getElementById("loginDialog").showModal();
    }
    else{
        currentUser = null;
        loginSetup();
    }

    // document.getElementById("closeLoginDialog").addEventListener("click", (event) => {
    //     let innerHtmlRegister = `
    //         <h3>Login</h3>
    //         <input id="username" type="text" value="" placeholder="Username">
    //         <input id="password" type="password" value="" placeholder="Password">
    //         <input id="login" type="button" value="Login">
    //         <input id="register" type="button" value="Registracija">
    //         <button id="closeLoginDialog" class="closeDialog">X</button>
    //     `;
    //     document.getElementById("loginDialog").innerHTML = innerHtmlRegister;
    //     document.getElementById("loginDialog").close();
    // });
    //
    // document.getElementById("register").addEventListener("click", (event) => {
    //     let innerHtmlRegister = `
    //         <h3>Register</h3>
    //         <input id="username" type="text" value="" placeholder="Username">
    //         <input id="password" type="password" value="" placeholder="Password">
    //         <input id="confirmPassword" type="password" value="" placeholder="Confirm password">
    //         <input id="registerNewAccount" type="button" value="Potvrdi">
    //         <button id="closeLoginDialog" class="closeDialog">X</button>
    //     `;
    //     document.getElementById("loginDialog").innerHTML = innerHtmlRegister;
    // });
});

// document.getElementById("closeLoginDialog").addEventListener("click", (event) => {
//     let innerHtmlRegister = `
//         <h3>Login</h3>
//         <input id="username" type="text" value="" placeholder="Username">
//         <input id="password" type="password" value="" placeholder="Password">
//         <input id="login" type="button" value="Login">
//         <input id="register" type="button" value="Registracija">
//         <button id="closeLoginDialog" class="closeDialog">X</button>
//     `;
//     document.getElementById("loginDialog").innerHTML = innerHtmlRegister;
//     document.getElementById("loginDialog").close();
// });
//
// document.getElementById("register").addEventListener("click", (event) => {
//     let innerHtmlRegister = `
//         <h3>Register</h3>
//         <input id="username" type="text" value="" placeholder="Username">
//         <input id="password" type="password" value="" placeholder="Password">
//         <input id="confirmPassword" type="password" value="" placeholder="Confirm password">
//         <input id="registerNewAccount" type="button" value="Potvrdi">
//         <button id="closeLoginDialog" class="closeDialog">X</button>
//     `;
//     document.getElementById("loginDialog").innerHTML = innerHtmlRegister;
// });

function closeLoginDialog(){
    let innerHtmlLogin = `
        <h3>Login</h3>
        <input id="username" type="text" value="" placeholder="Username">
        <input id="password" type="password" value="" placeholder="Password">
        <input id="login" type="button" value="Login" onclick="login()">
        <input id="register" type="button" value="Registracija"  onclick="showRegisterDialog()">
        <button id="closeLoginDialog" class="closeDialog" onclick="closeLoginDialog()">X</button>
    `;

    innerHtmlLogin = `
            <h3>Login</h3>
            <form onsubmit="loginUser(event)" class="loginForm">
                <input name="username" id="username" type="text" value="" placeholder="Username">
                <input name="password" id="password" type="password" value="" placeholder="Password">
                <input id="login" type="submit" value="Login">
                <input id="register" type="button" value="Registracija" onclick="showRegisterDialog()">
            </form>
            <button id="closeLoginDialog" class="closeDialog" onclick="closeLoginDialog()">X</button>
    `;

    document.getElementById("loginDialog").innerHTML = innerHtmlLogin;
    document.getElementById("loginDialog").close();
};

function showRegisterDialog(){
    let innerHtmlRegister = `
        <h3>Register</h3>
        <input name="username" id="username" type="text" value="" placeholder="Username">
        <input name="password" id="password" type="password" value="" placeholder="Password">
        <input id="confirmPassword" type="password" value="" placeholder="Confirm password">
        <input id="registerNewAccount" type="button" value="Potvrdi" onclick="register()">
        <button id="closeLoginDialog" class="closeDialog" onclick="closeLoginDialog()">X</button>
    `;

    innerHtmlRegister = `
            <h3>Register</h3>
            <form onsubmit="loginUser(event)" class="loginForm">
                <input name="username" id="username" type="text" value="" placeholder="Username">
                <input name="password" id="password" type="password" value="" placeholder="Password">
        <input id="confirmPassword" type="password" value="" placeholder="Confirm password">
        <input id="registerNewAccount" type="submit" value="Potvrdi">
            </form>
            <button id="closeLoginDialog" class="closeDialog" onclick="closeLoginDialog()">X</button>
    `;
    document.getElementById("loginDialog").innerHTML = innerHtmlRegister;
};

function loginSetup(){
    loginButton.textContent = "Login";
    closeLoginDialog();

    if(currentUser != null){
        loginButton.classList.remove("loginDiv");
        loginButton.classList.add("logoutDiv");
        loginButton.textContent = "Одјава";
        // loginButton.textContent = currentUser.ime;
    }
    else{
        loginButton.classList.remove("logoutDiv");
        loginButton.classList.add("loginDiv");
        loginButton.textContent = "Login";
    }
}

function loginUser(event){
    event.preventDefault();

    let loginData = new FormData(event.target);
    console.log(loginData);

    let username = loginData.get("username");
    let password = loginData.get("password");

    console.log(data);

    console.log(data.korisnici["kor001"].korisnickoIme == username);
    console.log(data.korisnici["kor001"].korisnickoIme);
    console.log(username);

    for(let i in data.korisnici){
        console.log(data.korisnici[i].korisnickoIme + " - " + data.korisnici[i].lozinka);
        if(data.korisnici[i].korisnickoIme == username && data.korisnici[i].lozinka == password){
            currentUser = username;
            loginSetup();

            // save to local storage
        }
    }
}

function registerUser(event){

}

// document.getElementById("")

loginSetup();
