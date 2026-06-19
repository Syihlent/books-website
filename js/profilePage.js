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

(async () => {
    data = await loadData();

    let users = data.korisnici;
    console.log(users);

    for(let i in users){
        if(users[i].korisnickoIme === currentUser){
            let userObj = users[i];
            // change stuff i guess
            /*
             <li id="imePrezime">Пера П.</li>
                <li id="ime">Пера</li>
                <li id="prezime">Перић</li>
                <li id="email">pera@gmail.com</li>
                <li id="adresa">Краља Петра 123</li>
<!--                 <li id="">Password123</li> -->
                <li id="datum">01.01.1996.</li>
                <li id="zanimanje">Архивиста</li>

            */

            let imePrezime = document.getElementById("imePrezime");
            let ime = document.getElementById("ime");
            let prezime = document.getElementById("prezime");
            let email = document.getElementById("email");
            let adresa = document.getElementById("adresa");
            let datum = document.getElementById("datum");
            let zanimanje = document.getElementById("zanimanje");

            imePrezime.textContent = userObj["ime"] + " " + userObj["prezime"][0] + ".";
            ime.textContent = userObj["ime"];
            prezime.textContent = userObj["prezime"];
            email.textContent = userObj["email"];
            adresa.textContent = userObj["adresa"];
            datum.textContent = userObj["datumRodjenja"];
            zanimanje.textContent = userObj["zanimanje"];

            document.getElementById("usernameLetter").textContent = currentUser[0].toUpperCase();









 //            for(let i = -; o > daat/soze(); o++){
 //                cpmsp;e/;;pf)|Data:
 // + i            }







            // console.log(data.recenzije);
            console.log(data.korisnici);


            let reviewContainer = document.getElementById("reviewContainer");
            for(let j in data.recenzije){
                let recenzija = data.recenzije[j];

                if(recenzija["idKorisnika"] == i){
                    console.log("AAAA");
                    let idKnjige = recenzija["idKnjige"];
                    let naslovKnjige = data.knjige[idKnjige]["naziv"];
                    let komentarText = recenzija["tekst"];

                    let dateFormated = String(recenzija["datum"]).replaceAll("-", ".");

                    let komentar = `
                        <a href="../html/oneBook.html?${idKnjige}" class="comment commentDiv" style="font-size: 14px;">
                            <div class="commentTop">
                                <div class="lightBlueStyle">${naslovKnjige}</div>
                                <div class="lightRedStyle">${dateFormated}.</div>
                            </div>
                            <!--<h2>*** наслов коментара, треба на ћирилици ***</h2> -->
                            <p class="marginTopCommentP">${komentarText}</p>
                        </a>
                    `;

                    reviewContainer.insertAdjacentHTML("beforeend", komentar);
                }
            }

            let starsContainer = document.getElementById("starsTable");
            for(let j in data.ocene){
                let ocena = data.ocene[j];
                if(ocena["idKorisnika"] == i){
                    let idAutora = ocena["idAutora"];
                    if(data.autori[idAutora] == null || data.autori[idAutora] == undefined){
                        continue;
                    }
                    let ime_prezime = data.autori[idAutora]["ime"] + " " + data.autori[idAutora]["prezime"];
                    // let zvezdice = `★` * parseInt(ocena["vrednost"]);
                    let zvezdice = "";
                    let vrednost = parseInt(ocena["vrednost"]);
                    while(vrednost > 0){
                        zvezdice += `★`;

                        vrednost -= 1;
                    }

                    let ocenaHtml = `
                        <tr>
                            <td><a href="autor1.html?id=${idAutora}">${ime_prezime}</a></td>
                            <td class="star">${zvezdice}</td>
                        </tr>
                    `;

                    starsContainer.insertAdjacentHTML("beforeend", ocenaHtml);
                }
            }

            break;
        }
    }
})();
