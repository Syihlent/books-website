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

    // titleElement.textContent = title;
    // priceElement.textContent = price;
    // genreElement.textContent = genre;
    // authorElement.textContent = author;
    // bookCardElement.backgroundImage = image;

    // bookCard.style.backgroundImage = `url(${image};`;

    // let cardDivHtml = `
    // <div id="bookCard" class="bookCard width550" style="background-image: url('https://bukovero.com/wp-content/uploads/2016/07/Harry_Potter_and_the_Cursed_Child_Special_Rehearsal_Edition_Book_Cover.jpg');">
    // `
    // document.getElementById("oneBookCommentsContainer").insertAdjacentHTML("afterbegin", cardDivHtml);

    bookCardHtml = `
        <div id="bookCard" class="bookCard width550" style="background-image: url('${image}');">

                <div class="bookCardDim"></div>
                <!--<img class="bookCardImage" src="" alt="Књига 1">-->
                <!-- <div class="centerBookImageContainer">
                    <div class="bookImageContainer">
                        <img class="bookImage" src="https://bukovero.com/wp-content/uploads/2016/07/Harry_Potter_and_the_Cursed_Child_Special_Rehearsal_Edition_Book_Cover.jpg" alt="Књига 1">
                        <img class="bookImage" src="https://bukovero.com/wp-content/uploads/2016/07/Harry_Potter_and_the_Cursed_Child_Special_Rehearsal_Edition_Book_Cover.jpg" alt="Књига 1">
                        <img class="bookImage" src="https://bukovero.com/wp-content/uploads/2016/07/Harry_Potter_and_the_Cursed_Child_Special_Rehearsal_Edition_Book_Cover.jpg" alt="Књига 1">
                        <img class="bookImage" src="https://bukovero.com/wp-content/uploads/2016/07/Harry_Potter_and_the_Cursed_Child_Special_Rehearsal_Edition_Book_Cover.jpg" alt="Књига 1">
                    </div>
                </div> -->

                <div class="bookCardTitle" id="title">
                    ${title}
                </div>
                <ul class="bookCardDescription">
                    <li id="author">${author}</li>
                    <li id="genre">${genre}</li>
                    <li id="price">${genre} дин</li>
                </ul>
            </div>
            `

    document.getElementById("oneBookCommentsContainer").insertAdjacentHTML("afterbegin", bookCardHtml);

    let authorLinkElement = document.getElementById("authorLink");
    authorLinkElement.href = `../html/autori/autor1.html?${authorId}`;
    let authorLinkElementP = document.getElementById("authorLinkP");
    authorLinkElementP.textContent = author;



    let bookImagesContainer = document.getElementById("bookImagesContainer");
    for(let i in bookData.slike){
        let image1 = `
            <img class="bookImage" src="${bookData.slike[i]}" alt="${title}">
        `;
        bookImagesContainer.insertAdjacentHTML("beforeend", image1);
    }

    document.getElementById("isbn").textContent = `ИСБН: ` + bookData.isbn;
    document.getElementById("noPages").textContent = `Број страна: ` + bookData.brojStrana;
    document.getElementById("format").textContent = `Формат: ` + bookData.format;
    document.getElementById("bookDescription").textContent = bookData.opis;
}

addBooksToIndex();
