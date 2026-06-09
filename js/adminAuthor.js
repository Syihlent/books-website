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

let ime = document.getElementsByName("ime")[0];
let prezime = document.getElementsByName("prezime")[0];
let datrodjj = document.getElementsByName("datrodj")[0];
let brojnag = document.getElementsByName("brojnag")[0];
let brojprim = document.getElementsByName("brojprim")[0];
let brojtel = document.getElementsByName("brojtel")[0];

function authorsform (autorid){
    let data = await loadData();
    selectedautrId = autorId;
    autoradminForm = document.getElementById("authorForm");

    let autorData = data.autori[autorid];
    

    // let Form = document.getElementsByName("")[0];
    // let Form = document.getElementsByName("")[0];
    // let Form = document.getElementsByName("")[0];

    titleForm.value =autorData.naziv;
    authorForm.value = bookData.idAutora;
    genreForm.value = bookData.zanr;
    formatForm.value = bookData.format;
    priceForm.value = bookData.cena;
    noPagesForm.value = bookData.brojStrana;
    isbnForm.value = bookData.isbn;
    descriptionForm.value = bookData.opis;
    // imagesForm.value = bookData.slike;

    let imageUrls = "";
    for(let i in bookData.slike){
        imageUrls += bookData.slike[i] + "\n\n";
    }
    imagesForm.value = imageUrls;

    location.href='#bookAdminForm';

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
