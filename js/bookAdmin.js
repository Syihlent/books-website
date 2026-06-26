let dataGlobal = null;
let bookAdminForm = document.getElementById("bookAdminForm");
let dataUrl = "https://books-website-74fda-default-rtdb.europe-west1.firebasedatabase.app/.json";


let titleForm = document.getElementsByName("title")[0];
let authorForm = document.getElementsByName("author")[0];
let genreForm = document.getElementsByName("genre")[0];
let formatForm = document.getElementsByName("format")[0];
let priceForm = document.getElementsByName("price")[0];
let noPagesForm = document.getElementsByName("noPages")[0];
let isbnForm = document.getElementsByName("isbn")[0];
let descriptionForm = document.getElementsByName("description")[0];
let imagesForm = document.getElementsByName("images")[0];

let confirmDialog = document.getElementById("confirmDialog");

let selectedBookId = null;
let submitter = null;
let submitData = null;

async function loadData(){
    try{
        let response = await fetch(dataUrl);
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

        if(data.autori[authorId] == null || data.autori[authorId] == undefined){
            continue;
        }

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
    selectedBookId = bookId;
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
    event.preventDefault();

    // console.log(event.target);

    let formData = new FormData(event.target);
    // console.log(formData["entries"]);
    console.log("-----------------");
    let passed = true;
    for(let [key, value] of formData.entries()){
        // console.log(key + " - " + value);
        if(key === "price"){
            let reg = /^[1-9]\d*$/;
            if(reg.test(value) == false){
                passed = false;
                priceForm.style = "border: solid red 3px;";
            }
            else{
                priceForm.style = "";
            }
        }
        else if(key === "noPages"){
            let reg = /^[1-9]\d*$/;
            if(reg.test(value) == false){
                passed = false;
                noPagesForm.style = "border: solid red 3px;";
            }
            else{
                noPagesForm.style = "";
            }
        }
        else if(key === "isbn"){
            let noDashes = value.replaceAll("-", "");
            let reg = /^\d{13}$/;
            if(reg.test(noDashes) == false){
                passed = false;
                isbnForm.style = "border: solid red 3px;";
            }
            else{
                isbnForm.style = "";
            }
        }
    }

    submitter = event.submitter.value;
    submitData = formData;

    if(passed && event.submitter.value !== "delete"){

        //popup
        // confirmDialog.showModal();
        // add logic for add/edit
        if(event.submitter.value == "add"){
            addNewBook(formData);
        }
        else if(event.submitter.value == "update"){
            updateBook(selectedBookId, formData);
        }

        // event.target.reset();
        // location.reload();
    }
    else if(event.submitter.value === "delete"){
        if(selectedBookId === null){
            return;
        }

        //remove book
        console.log(selectedBookId);


        //popup
        confirmDialog.showModal();

        // event.target.reset();
        // location.reload();
    }
    // console.log(formData);
});

// async function addNewBook(form){
//     console.log(form);
//     alert(form);
// }

function addNewBook(bookData){
    // add new book
    console.log("Add: " + bookData.get("title"));

    let knjige = dataGlobal.knjige;
    let maxId = -1;
    for(let i in knjige){
        let n = i.substring(3);
        if(parseInt(n) > maxId){
            maxId = parseInt(n);
        }
    }
    maxId += 1;
    let key = "knj" + String(maxId).padStart(3, "0");
    let newUrl = `https://books-website-74fda-default-rtdb.europe-west1.firebasedatabase.app/knjige/${key}.json`;
    fetch(newUrl, {
        method: "PUT",
        body: JSON.stringify({
            brojStrana: bookData.get("noPages"),
            cena: bookData.get("price"),
            format: bookData.get("format"),
            idAutora: bookData.get("author"),
            isbn: bookData.get("isbn"),
            naziv: bookData.get("title"),
            opis: bookData.get("description"),
            slike: (bookData.get("images").split("\n").map(url => url.trim()).filter(url => url !== "")),
            zanr: bookData.get("genre")
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Book added sucesfully: ", data)
    })
    .catch(err => console.error("Firebase error: ", err));

    location.reload();
    // console.log(bookData.entries()["images"].split("\n"));
    // console.log(bookData.get("images").split("\n").map(url => url.trim()).filter(url => url !== ""));
}

function deleteBook(bookId){
    // bookId - isbn
    // delete book, pass bookId or maybeee isbn
    // console.log("Delete: " + bookId);
    // let key = "knj" + String(maxId).padStart(3, "0");

    let newUrl = `https://books-website-74fda-default-rtdb.europe-west1.firebasedatabase.app/knjige/${bookId}.json`;
    fetch(newUrl, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        console.log(`deleted: ${bookId}`);
    })
    .catch(err => console.error(`Error while deleting: ${bookdId}`));

    location.reload();
}

function updateBook(bookId, bookData){
    // edit book based on data provided
    // console.log("Update: " + bookData.get("title"));
    let newUrl = `https://books-website-74fda-default-rtdb.europe-west1.firebasedatabase.app/knjige/${bookId}.json`;
    fetch(newUrl, {
        method: "PATCH",
        body: JSON.stringify({
            brojStrana: bookData.get("noPages"),
            cena: bookData.get("price"),
            format: bookData.get("format"),
            idAutora: bookData.get("author"),
            isbn: bookData.get("isbn"),
            naziv: bookData.get("title"),
            opis: bookData.get("description"),
            slike: (bookData.get("images").split("\n").map(url => url.trim()).filter(url => url !== "")),
            zanr: bookData.get("genre")
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(`updated: ${bookId}`);
    })
    .catch(err => console.error(`Error while updating: ${bookId}`));

    location.reload();
}

document.getElementById("confirm").addEventListener("click", (event) => {
    if(submitter === "delete"){
        deleteBook(selectedBookId);
    }

    document.getElementById("confirmDialog").close();
});

document.getElementById("cancel").addEventListener("click", (event) => {
    document.getElementById("confirmDialog").close();
});
