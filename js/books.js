let bookCardHtml = `
<a class="bookCard" href="html/_knjiga1.html" style="background-image: url('https://bukovero.com/wp-content/uploads/2016/07/Harry_Potter_and_the_Cursed_Child_Special_Rehearsal_Edition_Book_Cover.jpg');">
<!--                 <img class="bookCardImage" src="" alt="Књига 1"> -->
                <img class="bookCardImage" src="">
<!--                 <div class="bookCardImage" style="background-color: rgba(0, 0, 0, 0.5); width: 100%;"></div> -->
                <div class="bookCardDim"></div>
                <div class="bookCardTitle">
                    Књига 1
                </div>
                <ul class="bookCardDescription">
                    <li>Аутор 1</li>
                    <li>Акција</li>
                    <li>700 дин</li>
                </ul>
            </a>
`

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

    if(data == null){
        return;
    }

    for(let i in data.knjige){
        // console.log(i);
        let title = data.knjige[i].naziv;
        let authorId = data.knjige[i].idAutora;
        let genre = data.knjige[i].zanr;
        let price = data.knjige[i].cena;
        let image = data.knjige[i].slike[0];

        let authorString = data.autori[authorId].ime + " " + data.autori[authorId].prezime;

        innerHtml = `
            <a class="bookCard" href="html/oneBook.html?${i}" style="background-image: url('${image}');">
            <!--                 <img class="bookCardImage" src="" alt="Књига 1"> -->
                            <img class="bookCardImage" src="">
            <!--                 <div class="bookCardImage" style="background-color: rgba(0, 0, 0, 0.5); width: 100%;"></div> -->
                            <div class="bookCardDim"></div>
                            <div class="bookCardTitle">
                                ${title}
                            </div>
                            <ul class="bookCardDescription">
                                <li>${authorString}</li>
                                <li>${genre}</li>
                                <li>${price} дин</li>
                            </ul>
                        </a>
            `

        bookContainer.insertAdjacentHTML("beforeend", innerHtml);
    }
}

addBooksToIndex();
