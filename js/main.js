function addNav(){
    if(document.URL.includes("index.html")){
        let prvoSlovo = "T_T";
        let currentUser = localStorage.getItem("username");
        if(currentUser != null && currentUser != undefined){
            // pre pisalo prvoSlovo = currentUser[0].toUpperCase(); stvaralo gresku
            prvoSlovo = currentUser?.[0]?.toUpperCase() || "T_T";
        }

        document.getElementById("usernameLetterNav").textContent = prvoSlovo;

        return;
    }

    let nav = document.getElementsByClassName("nav")[0];
    if(nav != undefined){
        nav.remove();
    }

    let prvoSlovo = "T_T";
    let currentUser = localStorage.getItem("username");
    if(currentUser != null && currentUser != undefined){
        prvoSlovo = currentUser?.[0]?.toUpperCase() || "T_T";
    }

    let navElement = `
        <button class="hamburgerButton" onclick="bringMenu()">
            X
        </button>
        <nav class="nav">
            <a class="profilePageDiv" href="../html/profilePage.html">
                <!--<img src="https://bukovero.com/wp-content/uploads/2016/07/Harry_Potter_and_the_Cursed_Child_Special_Rehearsal_Edition_Book_Cover.jpg" alt="Профил">-->
                <div id="usernameLetterNav" style="font-size: 1.67em;">${prvoSlovo}</div>
            </a>
            <a class="navItem" href="../index.html">Почетна</a>
            <a class="navItem" href="../html/autori.html">Аутори</a>
            <a class="navItem" href="../html/bookAdmin.html">Админ - Књиге</a>
            <a class="navItem" href="../html/autorAdmin.html">Админ - Аутори</a>
            <button id="loginButton" class="navItem logoutDiv" href="../html/profilePage.html">Одјава</button>

            <dialog id="loginDialog">
                <h3>Login</h3>
                <form onsubmit="loginUser(event)" class="loginForm">
                    <input name="username" id="username" type="text" value="" placeholder="Корисничко име">
                    <input name="password" id="password" type="password" value="" placeholder="Лозинка">
                    <input id="login" type="submit" value="Пријава">
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

// dodala loginsetup, stvaralo gresku
let data = null;
(async () => {
    data = await loadData();
    loginSetup();
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
        // localstorage.setItem("username", null);
        localStorage.removeItem("username");
        currentUser = null;
        loginSetup();

        location.reload();
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
            <h3>Пријава</h3>
            <form onsubmit="loginUser(event)" class="loginForm">
                <input name="username" id="username" type="text" value="" placeholder="Корисничко име">
                <input name="password" id="password" type="password" value="" placeholder="Лозинка">
                <input id="login" type="submit" value="Пријава">
                <input id="register" type="button" value="Регистрација" onclick="showRegisterDialog()">
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
            <h3>Регистрација</h3>
            <form onsubmit="registerUser(event)" class="loginForm">
                <input name="username" id="username" type="text" value="" placeholder="Корисничко име">
                <input name="password" id="password" type=" password" value="" placeholder="Лозинка">
                <input id="confirmPassword" name="confirmPassword" type="password" value="" placeholder="Погрешна лозинка"
                    style="background-color: #ff7171;"
                    oninput="this.style.backgroundColor=''">
                <input name="adresa" id="adresa" type="text" value="" placeholder="adresa">
                <input name="datumRodjenja" id="datumRodjenja" type="text" value="" placeholder="datumRodjenja">
                <input name="email" id="email" type="text" value="" placeholder="email">
                <input name="ime" id="ime" type="text" value="" placeholder="ime">
                <input name="prezime" id="prezime" type="text" value="" placeholder="prezime">
                <input name="zanimanje" id="zanimanje" type="text" value="" placeholder="zanimanje">
                <input id="registerNewAccount" type="submit" value="Потврди">
            </form>
            <button id="closeLoginDialog" class="closeDialog" onclick="closeLoginDialog()">X</button>
        `;
    document.getElementById("loginDialog").innerHTML = innerHtmlRegister;
};

async function loginSetup(){
    // izbrisala await, stvaralo gresku
    let username = localStorage.getItem("username");
    console.log(`username: ${username}`);
    if(username != null && username != undefined){
        currentUser = username;
    }

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
        loginButton.textContent = "Пријава";
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
            localStorage.setItem("username", username);
            localStorage.setItem("userId", i);
            loginSetup();

            // save to local storage
        }
    }

    if(currentUser == null){
        document.getElementById("username").placeholder = "Погрешно унети подаци";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("username").style.borderColor = "red";
        document.getElementById("username").style.borderWidth = "5px";
    }
    else{
        location.reload();
    }
}


// registracija

async function registerUser(event){
    event.preventDefault();
    //console.log("s");
    let registerData = new FormData(event.target);
    let username = registerData.get("username");
    let password = registerData.get("password");
    let confirmPassword = registerData.get("confirmPassword");

    

    if(password !== confirmPassword){
        console.log("!");
        loginDialog.innerHTML = "";
        
        innerHtmlRegister = `
            <h3>Регистрација</h3>
            <form onsubmit="registerUser(event)" class="loginForm">
                <input name="username" id="username" required type="text" value="" placeholder="Корисничко име">
                <input name="password" id="password" required type=" password" value="" placeholder="Лозинка">
                <input id="confirmPassword" name="confirmPassword" required type="password" value="" placeholder="Погрешна лозинка"
                    style="background-color: #ff7171;" 
                    oninput="this.style.backgroundColor=''">
                <input name="adresa" id="adresa" type="text" value="" placeholder="adresa">
                <input name="datumRodjenja" id="datumRodjenja" type="text" value="" placeholder="datumRodjenja">
                <input name="email" id="email" type="text" value="" placeholder="email">
                <input name="ime" id="ime" type="text" value="" placeholder="ime">
                <input name="prezime" id="prezime" type="text" value="" placeholder="prezime">
                <input name="zanimanje" id="zanimanje" type="text" value="" placeholder="zanimanje">
                <input id="registerNewAccount" type="submit" value="Потврди">
            </form>
            <button id="closeLoginDialog" class="closeDialog" onclick="closeLoginDialog()">X</button>
        `;
        document.getElementById("loginDialog").innerHTML = innerHtmlRegister;
        return;
    }

    let newUser = {
        korisnickoIme: username,
        lozinka: password
    }

    let sledeciBroj = 1;

    if (data && data.korisnici) {
        let sviKljucevi = Object.keys(data.korisnici);
       
        let sviBrojevi = sviKljucevi.map(kljuc => {
            let brojka = kljuc.replace(/\D/g, ""); 
            let parsiran = parseInt(brojka, 10);
            return isNaN(parsiran) ? 0 : parsiran;
        });
        // ?
        let najveciBroj = Math.max(...sviBrojevi);
        if (isFinite(najveciBroj)) {
            sledeciBroj = najveciBroj + 1;
        }
    }

    let regis = "kor" + String(sledeciBroj).padStart(3, '0');
    let response = await fetch(`https://books-website-74fda-default-rtdb.europe-west1.firebasedatabase.app/korisnici/${regis}.json`,{
        method: "PUT",
        body: JSON.stringify(newUser),
        headers: {
            "Content-Type":"application/json"
        }
    })

    if (response.ok) {
            console.log("regis");        
            localStorage.setItem("username", username);
            localStorage.setItem("userId", regis);
            location.reload();
    } else {
        console.log("nije regis");
    }
    console.log(response);
}

// document.getElementById("")
// loginsetup stvarao gresku, napisan u await
// loginSetup();
