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

async function addAuthorsToAuthors() {
    let data = await loadData();
    console.log(data.autori);
    if (data == null){
        return;
    }


    for (let i in data.autori){
        ime = data.autori[i].ime;
        prezime = data.autori[i].prezime;
        biografija = data.autori[i].biografija;
        kontaktTelefonMenadzera = data.autori[i].kontaktTelefonMenadzera;
    }

}

addAuthorsToAuthors();