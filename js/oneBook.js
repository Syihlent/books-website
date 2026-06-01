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

async function loadBook(){
    let data = await loadData();

    console.log(data);
    console.log(data.recenzije);
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
                    <li id="price">${price} дин</li>
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



    let commentContainer = document.getElementById("commentContainer");
    for(let i in data.recenzije){
        if (data.recenzije[i].idKnjige != id){
            continue
        }

        let userId = data.recenzije[i].idKorisnika
        let user = data.korisnici[userId].ime + " " + data.korisnici[userId].prezime;

        let date = data.recenzije[i].datum.replaceAll("-", ".");
        date += ".";

        let commentDiv = `
            <div class="comment">
                    <div class="commentTop">
                        <div class="lightBlueStyle">${user}</div>
                        <div class="lightRedStyle">${date}</div>
                    </div>
<!--                     <h2>*** наслов коментара, треба на ћирилици ***</h2> -->
                    <p>${data.recenzije[i].tekst}</p>
                </div>
        `

        commentContainer.insertAdjacentHTML("beforeend", commentDiv);
    }
}

loadBook();

document.getElementById("reviewForm").addEventListener("submit", (event) => {
    event.preventDefault();

    let formData = new FormData(event.target);
    let passed = true;
    for(let [key, value] of formData.entries()){
        console.log(key + " - " + value);

    }

    // add new comment logic here


    // submitter = event.submitter.value;
    // submitData = formData.entries();
    //
    // if(passed && event.submitter.value !== "delete"){
    //
    //     //popup
    //     confirmDialog.showModal();
    //     // add logic for add/edit
    //
    //     // event.target.reset();
    //     // location.reload();
    // }
    // else if(event.submitter.value === "delete"){
    //     if(selectedBookId === null){
    //         return;
    //     }
    //
    //     //remove book
    //     console.log(selectedBookId);
    //
    //
    //     //popup
    //     confirmDialog.showModal();
    //
    //     // event.target.reset();
    //     // location.reload();
    // }
    // // console.log(formData);
});
