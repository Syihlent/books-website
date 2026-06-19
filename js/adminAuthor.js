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
let status1 = document.getElementById("status");
let selected = null;

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
    status1.value = autorData.status;
    
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

        let autor = data.autori[i];
        let slikaSrc = (autor.slike && autor.slike[0]) ? autor.slike[0] : "https://via.placeholder.com/150";

        let ime = data.autori[i].ime;
        let prezime = data.autori[i].prezime;
        let brNag = data.autori[i].brojOsvojenihNagrada;
        let brProd = data.autori[i].brojProdatihPrimeraka;
        let kontaktTelefonMenadzera = data.autori[i].kontaktTelefonMenadzera;
        
        let datumRodjenja = data.autori[i].datumRodjenja;
        let statuss = data.autori[i].status;
        
        let tableCardHTML = `
        <tr onclick="authorsform('${i}')">
            <th><img src="${slikaSrc}"></th>
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


const updateBTN = document.getElementById("updateBtn");
const addBTN = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener("click", async function (event) {
    console.log("dddd");
    event.preventDefault();
    console.log("d");
    const forma = document.getElementById("authorForm");
    if(!forma.checkValidity()){
        forma.reportValidity();
        return;
    }

    const changeAuthorData = {
        ime: ime1.value,
        prezime: prezime1.value,
        datumRodjenja: datrodjj.value,
        brojOsvojenihNagrada: brojnag.value,
        brojProdatihPrimeraka: brojprim1.value,
        kontaktTelefonMenadzera: brojtel1.value,
        status: status1.value
    }

    try{
        let url = `https://books-website-74fda-default-rtdb.europe-west1.firebasedatabase.app/autori/${selectedautrId}.json`;
        let response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(changeAuthorData)

        })

        ;


        if (response.ok){
            console.log(" jejj");
            forma.reset();
            selectedautrId = null;

            let table = document.getElementById('tableAdmin');
            table.innerHTML = `
                <tr>
                    <th></th>
                    <th>Име</th>
                    <th>Презиме</th>
                    <th>Датум рођења</th>
                    <th>Број освојених награда</th>
                    <th>Број продатих примерака</th>
                    <th>Статус аутора</th>
                    <th>Број телефона менаџера</th>
                </tr>`;

            await addAuthorsProfileToAuthors();
            
        }
        else{
            console.log("neeee");
        }
    }
     catch (err){
            console.log(err);
        }
})

updateBTN.addEventListener("click", async function (event) {
    console.log("aaaa");
    event.preventDefault();
    console.log("a");
    const forma = document.getElementById("authorForm");
    if(!forma.checkValidity()){
        forma.reportValidity();
        return;
    }

    const changeAuthorData = {
        ime: ime1.value,
        prezime: prezime1.value,
        datumRodjenja: datrodjj.value,
        brojOsvojenihNagrada: brojnag.value,
        brojProdatihPrimeraka: brojprim1.value,
        kontaktTelefonMenadzera: brojtel1.value,
        status: status1.value
    }

    try{
        let url = `https://books-website-74fda-default-rtdb.europe-west1.firebasedatabase.app/autori/${selectedautrId}.json`;
        let response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(changeAuthorData)

        })

        ;


        if (response.ok){
            console.log("izmenjeni jejj");
            forma.reset();
            selectedautrId = null;

            let table = document.getElementById('tableAdmin');
            table.innerHTML = `
                <tr>
                    <th></th>
                    <th>Име</th>
                    <th>Презиме</th>
                    <th>Датум рођења</th>
                    <th>Број освојених награда</th>
                    <th>Број продатих примерака</th>
                    <th>Статус аутора</th>
                    <th>Број телефона менаџера</th>
                </tr>`;

            await addAuthorsProfileToAuthors();
            
        }
        else{
            console.log("neeee");
        }
    }
     catch (err){
            console.log(err);
        }
})


addBTN.addEventListener("click", async function (event) {
    console.log("bbbb");
    event.preventDefault();
    console.log("b");
    const forma = document.getElementById("authorForm");
    if(!forma.checkValidity()){
        forma.reportValidity();
        return;
    }

    const changeAuthorData = {
        
        ime: ime1.value,
        prezime: prezime1.value,
        datumRodjenja: datrodjj.value,
        brojOsvojenihNagrada: brojnag.value,
        brojProdatihPrimeraka: brojprim1.value,
        kontaktTelefonMenadzera: brojtel1.value,
        status: status1.value,
       // slike: ["https://via.placeholder.com/150"]
    }

    try{
        let url = `https://books-website-74fda-default-rtdb.europe-west1.firebasedatabase.app/autori.json`;
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(changeAuthorData)

        });


        if (response.ok){
            console.log("dodat jejj");
            forma.reset();
            selectedautrId = null;

            let table = document.getElementById('tableAdmin');
            table.innerHTML = `
                <tr>
                    <th></th>
                    <th>Име</th>
                    <th>Презиме</th>
                    <th>Датум рођења</th>
                    <th>Број освојених награда</th>
                    <th>Број продатих примерака</th>
                    <th>Статус аутора</th>
                    <th>Број телефона менаџера</th>
                </tr>`;

            await addAuthorsProfileToAuthors();
            
        }
        else{
            console.log("neeee");
        }
    }
     catch (err){
            console.log(err);
        }
});


addAuthorsProfileToAuthors();
