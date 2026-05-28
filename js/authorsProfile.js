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
        console.log(data);
        return data;
    }
    catch(err){
        console.log(err);
    }
}

async function addAuthorsProfileToAuthors() {
    let data = await loadData();
    console.log(data.autori);
    if (data == null){
        return;
    }

    let AuthorsContinerProfile = document.getElementById('profile');

    for (let i in data.autori[1]){
        ime = data.autori[i].ime;
        prezime = data.autori[i].prezime[1];
        slike = data.autori[i].slike[0];
        ocena = data.autori[i].ocena[1];

        let authorsCardProfileHTML = `
        <div class="profile-info">
            <h1>${ime}</h1>
            <h1>${prezime}</h1>
            <h1>оцена: ${ocena}</h1>
        </div>
        <div class="profile-image">
            <img src="${slike}" alt="Author">
        </div>`

        AuthorsContinerProfile.insertAdjacentHTML('beforeend', authorsCardProfileHTML);
    }
}

addAuthorsProfileToAuthors();