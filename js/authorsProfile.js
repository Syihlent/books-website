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

        ocena = ocenaa.vrednost;


        let authorsCardProfileHTML = `
        <div class="profile-info">
            <h1>${ime}</h1>
            <h1>${prezime}</h1>
            <h1>оцена: <span class="boja-ocene">${ocena}</span></h1>
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

        
        for (let i = 0; i < books.length; i++){
            nazivKnjige = books[i].naziv;
            slikaKnjige = books[i].slike[0];

            let authorsCardBooksHTML = `
                <div class="book-card">
                    <a href="../_knjiga1.html"><img src="${slikaKnjige}"></a>
                    <p>${nazivKnjige}</p>
                </div>
            `

            AuthorsContainerProfileBooks.insertAdjacentHTML('beforeend', authorsCardBooksHTML)
        }


        AuthorsContinerProfile.insertAdjacentHTML('beforeend', authorsCardProfileHTML);
        AuthorsContainerProfileBio.insertAdjacentHTML('beforeend', authorsCardBioHTML);

        
    }
}

addAuthorsProfileToAuthors();