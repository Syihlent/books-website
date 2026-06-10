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

let ime1 = document.getElementsByName("ime")[0];
let prezime1 = document.getElementsByName("prezime")[0];
let datrodjj = document.getElementsByName("datrodj")[0];
let brojnag = document.getElementsByName("brojnag")[0];
let brojprim1 = document.getElementsByName("brojprim")[0];
let brojtel1 = document.getElementsByName("brojtel")[0];

async function authorsform (autorid){
    let data = await loadData();
    selectedautrId = autorid;
    autoradminForm = document.getElementById("authorForm");

    let autorData = data.autori[autorid];
    console.log(autorData);
    ime1.value = autorData.ime;
    prezime1.value = autorData.prezime;
    datrodjj.value = autorData.datumRodjenja;
    brojnag.value = autorData.brojOsvojenihNagrada;
    brojprim1.value = autorData.brojProdatihPrimeraka;
    brojtel1.value = autorData.kontaktTelefonMenadzera;



    location.href='#authorForm';

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
        <tr onclick="authorsform('${i}')">
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
