let authorsCardProfileHTML = `
        <div class="profile-info">
            <h1>Име</h1>
            <h1>Презиме</h1>
            <h1>Оцена: (js)</h1>
        </div>
        <div class="profile-image">
            <img src="../../images/icon.png" alt="Author">
        </div>
`

async function loadData() {
    try{
        let response = await fetch("https://books-website-74fda-default-rtdb.europe-west1.firebasedatabase.app/.json");
        let data = await response.json();
        return data;
    }
    catch(err){
        console.log(err);
    }
}

async function addAuthorsProfileToAuthors() {
    let data = await loadData();
    console.log(data.autori);

    const urlParams = new URLSearchParams(window.location.search);
    const authorId = urlParams.get('id');


    if (data == null){
        return;
    }

    let AuthorsContinerProfile = document.getElementById('profileAu');
    let AuthorsContainerProfileBio = document.getElementById('author-bio');
    let AuthorsContainerProfileBooks = document.getElementById('author-books');
    let AuthorsContainerProfileBooksImages = document.getElementById('autor-slike');

    let autor = data.autori[authorId];
    let ratingId = authorId.replace('aut', 'oce'); 
    let ocenaa = data.ocene[ratingId];
    let books = [];
    let book = data.knjige;
    
    for (let i in data.knjige) {
        let knjiga = data.knjige[i];
        if (knjiga.idAutora == authorId) {
            books.push(knjiga);
        }
    }


    if (autor){
        ime = autor.ime;
        prezime = autor.prezime;
        slike = autor.slike;
        slikeProf = autor.slike[0];
        datumRodj = autor.datumRodjenja;
        autorStatus = autor.status;
        brPrim = autor.brojProdatihPrimeraka;
        brNag = autor.brojOsvojenihNagrada;
        biografija = autor.biografija;
        tel = autor.kontaktTelefonMenadzera;

        let pocetniProsek = 0;
        if (ocenaa && ocenaa.brojGlasova > 0) {
            pocetniProsek = (ocenaa.zbirOcena / ocenaa.brojGlasova).toFixed(1);
        } else if (ocenaa && ocenaa.vrednost) { 
            pocetniProsek = ocenaa.vrednost; 
        }


        let authorsCardProfileHTML = `
        <div class="profile-info">
            <h1>${ime}</h1>
            <h1>${prezime}</h1>
            <h1>оцена: <span class="boja-ocene" id="prikaziOcene">${pocetniProsek}</span></h1>
        </div>
        <div class="profile-image">
            <img src="${slikeProf}" alt="Author">
        </div>`


        let authorsCardBioHTML = `
            <p>
            <strong>${ime} ${prezime}</strong> је рођен ${datumRodj} године.
            До сада је продао <strong>${brPrim} примерака</strong> 
            и освојио <strong>${brNag} књижевне награде</strong>.
            <p>
            Статус: <strong>${autorStatus}</strong>.
            </p>
            <br>
            <p>
            Биографија: ${biografija}
            </p>
            <br><br>
            <p><strong>Контакт менаџера:</strong> ${tel}</p>
        `

        for (let j = 0; j < slike.length; j++) {
            let pojedinacnaSlika = slike[j];
    
            let authosCardBioImagesHTML = `
                <img src="${pojedinacnaSlika}" alt="Слика аутора">
            `;
    
        AuthorsContainerProfileBooksImages.insertAdjacentHTML('beforeend', authosCardBioImagesHTML);
        }

        
        for (let i in book){
            if(book[i].idAutora == authorId){
                nazivKnjige = book[i].naziv;
                slikaKnjige = book[i].slike[0];

                console.log(book[i]);

                let authorsCardBooksHTML = `
                    <div class="book-card">
                        <a href="../html/oneBook.html?${i}"><img src="${slikaKnjige}"></a>
                        <p>${nazivKnjige}</p>
                    </div>
                `

                AuthorsContainerProfileBooks.insertAdjacentHTML('beforeend', authorsCardBooksHTML)}
        }


        AuthorsContinerProfile.insertAdjacentHTML('beforeend', authorsCardProfileHTML);
        AuthorsContainerProfileBio.insertAdjacentHTML('beforeend', authorsCardBioHTML);

        
    }
}


// sad zvezde


let zvezdeKontejner = document.getElementById("ocena");

if (zvezdeKontejner) {
    zvezdeKontejner.addEventListener("click", async function (event) {
        if (event.target.tagName === "INPUT") {
            let novaOcenaVrednost = Number(event.target.id.replace("star", ""));
            console.log("ocena", novaOcenaVrednost);

            const urlParams = new URLSearchParams(window.location.search);
            const authorId = urlParams.get('id');
            if (!authorId) return;

            //ddodatp
            if (!currentUser) {
                console.log("regis");
                return;
            }

            const currentUserId = localStorage.getItem("userId"); 
            if (!currentUserId) {
                console.log("regis");
                return;
            }

            let ratingId = authorId.replace('aut', 'oce');
            let url = `https://books-website-74fda-default-rtdb.europe-west1.firebasedatabase.app/ocene/${ratingId}.json`;

            try {
                let responeGet = await fetch(url);
                let trenutnaOcenaBaza = await responeGet.json();

                let trenutniZbir = (trenutnaOcenaBaza && trenutnaOcenaBaza.zbirOcena) ? trenutnaOcenaBaza.zbirOcena : 0;
                let trenutniBrojGlasova = (trenutnaOcenaBaza && trenutnaOcenaBaza.brojGlasova) ? trenutnaOcenaBaza.brojGlasova : 0;

                let noviZbir = trenutniZbir + novaOcenaVrednost;
                let noviBrojGlasova = trenutniBrojGlasova + 1;

                let noviProsek = (noviZbir/noviBrojGlasova)

                const azuriraniPodaci = {
                    zbirOcena: noviZbir,
                    brojGlasova: noviBrojGlasova,
                    //sad
                    idAutora: authorId,
                    idKorisnika: currentUserId,
                    vrednost: novaOcenaVrednost
                };

                let responsePatch = await fetch(url, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(azuriraniPodaci)
                });

                if (responsePatch.ok){
                    let prikaziOcene = document.getElementById("prikazi-ocene");
                    if (prikaziOcene) {
                        prikaziOcene.innerText = noviProsek.toFixed(1);
                    }
                    console.log("aa");
                    
                }
                location.reload();
            }
            catch (err){
                console.log(err);
            }
        }
    });
}

addAuthorsProfileToAuthors();