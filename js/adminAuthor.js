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
    if (data == null){
        return;
    }

    let AuthorsTable = document.getElementById('tableAdmin');

    let a = "";

    for (let i in data.autori){
        ime = data.autori[i].ime;
        prezime = data.autori[i].prezime;
        brNag = data.autori[i].brojOsvojenihNagrada;
        brProd = data.autori[i].brojProdatihPrimeraka;
        kontaktTelefonMenadzera = data.autori[i].kontaktTelefonMenadzera;
        slike = data.autori[i].slike[0];
        datumRodjenja = data.autori[i].datumRodjenja;
        statuss = data.autori[i].status

        let tableCardHTML = `
        <tr>
            <th><img src="${slike}"></th>
            <td>${ime}</td>
            <td>${prezime}</td>
            <td>${datumRodjenja}</td>
            <td>${brNag}</td>
            <td>${brProd}</td>
            <td>${statuss}</td>
            <td>${kontaktTelefonMenadzera}</td>
        </tr>     
        `
        a += tableCardHTML;
    }

    AuthorsTable.insertAdjacentHTML('beforeend', a);

}

addAuthorsProfileToAuthors();
