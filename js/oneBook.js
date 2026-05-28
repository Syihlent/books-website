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

async function addBooksToIndex(){
    let data = await loadData();

    console.log(data.knjige);
    if(data == null){
        return;
    }

    let url = document.URL;
    let idStringIndex = url.lastIndexOf("?") + 1;
    let id = url.substring(idStringIndex);
    // console.log(id);

    let bookData = data.knjige[id];

    let title = bookData.naziv;
    let authorId = bookData.idAutora;
    let price = bookData.cena;
    let genre = bookData.zanr;
    let image = bookData.slike[0];

    let author = data.autori[authorId].ime + " " + data.autori[authorId].prezime;

    let titleElement = document.getElementById("title");
    let priceElement = document.getElementById("price");
    let genreElement = document.getElementById("genre");
    let authorElement = document.getElementById("author");
    let bookCardElement = document.getElementById("bookCard");

    titleElement.textContent = title;
    priceElement.textContent = price;
    genreElement.textContent = genre;
    authorElement.textContent = author;
    bookCardElement.backgroundImage = image;

    bookCard.style.backgroundImage = `url(${image};`;

    let authorLinkElement = document.getElementById("authorLink");
    authorLinkElement.href = `../html/autori/autor1.html?${authorId}`;
    let authorLinkElementP = document.getElementById("authorLinkP");
    authorLinkElementP.textContent = author;
}

addBooksToIndex();
