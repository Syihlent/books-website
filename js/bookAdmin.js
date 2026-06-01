let dataGlobal = null;
let bookAdminForm = document.getElementById("bookAdminForm");


let titleForm = document.getElementsByName("title")[0];
let authorForm = document.getElementsByName("author")[0];
let genreForm = document.getElementsByName("genre")[0];
let formatForm = document.getElementsByName("format")[0];
let priceForm = document.getElementsByName("price")[0];
let noPagesForm = document.getElementsByName("noPages")[0];
let isbnForm = document.getElementsByName("isbn")[0];
let descriptionForm = document.getElementsByName("description")[0];
let imagesForm = document.getElementsByName("images")[0];

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

async function addBooks(){
    let data = await loadData();

    console.log(data.knjige);
    if(data == null){
        return;
    }
    dataGlobal = data;

    let bookTable = document.getElementById("bookTable");

    let innerHtmlFull = "";

    for(let i in data.knjige){
        let bookData = data.knjige[i]

        // console.log(i);
        let title = bookData.naziv;
        let authorId = bookData.idAutora;
        let genre = bookData.zanr;
        let price = bookData.cena;
        let image = bookData.slike[0];
        let isbn = bookData.isbn;
        let format = bookData.format;
        let noPages = bookData.brojStrana;

        console.log(data.autori[authorId].ime);
        let authorString = data.autori[authorId].ime + " " + data.autori[authorId].prezime;

        innerHtml = `
            <tr onclick="toAdminForm('${i}')">
                <td>${isbn}</td>
                <td>${title}</td>
                <td>${genre}</td>
                <td>${format}</td>
                <td>${price}</td>
                <td>${noPages}</td>
                <td>${authorString}</td>
            </tr>
            `

        // bookTable.insertAdjacentHTML("beforeend", innerHtml);
        innerHtmlFull += innerHtml;
    }

    // bookTable.innerHTML = innerHtmlFull;
    bookTable.insertAdjacentHTML("beforeend", innerHtmlFull);
}

function toAdminForm(bookId){
    let img1 = bookAdminForm.getElementsByTagName("img")[0];
    if(img1 != undefined){
        img1.remove();
    }

    let bookData = dataGlobal.knjige[bookId];
    let img = `<img src="${bookData.slike[0]}" class="imgFull">`;
    bookAdminForm.insertAdjacentHTML("afterbegin", img);

    // let Form = document.getElementsByName("")[0];
    // let Form = document.getElementsByName("")[0];
    // let Form = document.getElementsByName("")[0];

    titleForm.value = bookData.naziv;
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

async function addAuthorsToForm(){
    while(dataGlobal == null || dataGlobal == undefined){
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    let innerHtml = `<option value="">-- Изаберите --</option>`;

    for(let i in dataGlobal.autori){
        let autHtml = `<option value="${i}">${dataGlobal.autori[i].ime + ' ' + dataGlobal.autori[i].prezime}</option>`;

        innerHtml += autHtml;
    }

    authorForm.innerHTML = innerHtml;
}

addBooks();

addAuthorsToForm();

document.getElementById("bookAdminForm").addEventListener("submit", (event) => {
    // console.log(event.target);

    let formData = new FormData(event.target);
    // console.log(formData["entries"]);
    console.log("-----------------");
    for(let [key, value] of formData.entries()){
        console.log(key + " - " + value);
    }
    // console.log(formData);


    alert(event);
});

// async function addNewBook(form){
//     console.log(form);
//     alert(form);
// }
