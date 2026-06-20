 let authorscardHtml = `
 <a href="../autori/autor1.html" class="item-link">
        <div class="item">
            <div class="avatar">
                <img src="../../images/icon.png" alt="prvi autor">
            </div>
            <div class="content">
                <h3>Име Презиме</h3>
                <p>блаблабалбалбалбуаисњфанлсифњансаднњиохандсњблаблабалбалба<br>лбуаисњфанлсифњанса
                блаблабалбалбалбуаисњфанлсифњанса<br>днњиохандсњ
                блаблабалбалбалбуаисњфанлсифњансаднњиох
                </p>
            </div>

            <div class="author-info">
                <p>@autor.gmail.com</p>
                <p>autor.com</p>
                <p>0511252</p>
                <p>Ulica br. 5</p>
            </div>
        </div>
    </a>
`


async function loadData() {
    try{
        let response = await fetch("https://books-website-74fda-default-rtdb.europe-west1.firebasedatabase.app/.json");
        let data = await response.json();
        console.log(data);
        return data;
    }
    catch(err){
        console.log(err);
    }
}

async function addAuthorsToAuthors() {
    let data = await loadData();
    console.log(data.autori);
    if (data == null){
        return;
    }


    let AuthorsContainer = document.getElementById('AuthorsContainer');
    const searchBTN = document.getElementById("searchBTN");


    for (let i in data.autori){
        ime = data.autori[i].ime;
        prezime = data.autori[i].prezime;
        biografija = data.autori[i].biografija;
        kontaktTelefonMenadzera = data.autori[i].kontaktTelefonMenadzera;
        slike = data.autori[i].slike[0];
        datumRodjenja = data.autori[i].datumRodjenja;


        let authorscardHtml = `
            <a href="../html/autor1.html?id=${i}" class="item-link">
                <div class="item">
                    <div class="avatar">
                        <img src="${slike}" alt="prvi autor">
                    </div>
                    <div class="content">
                        <h3>${ime} ${prezime}</h3>
                        <p>${biografija}</p>
                    </div>

                    <div class="author-info">
                        <p>${kontaktTelefonMenadzera}</p>
                        <p>${datumRodjenja}</p>
                    </div>
                </div>
            </a>
            `

        AuthorsContainer.insertAdjacentHTML('beforeend', authorscardHtml);


        // search btn
        
    }

    const nameSearch = document.getElementById("nameSearch");
    const statusSearch = document.getElementById("statusSearch");

    searchBTN.addEventListener("click", async function (event) {
        event.preventDefault();
        console.log("radi?");
        const val = nameSearch.value;
        AuthorsContainer.innerHTML = "";
        for(let i in data.autori){
            ime = data.autori[i].ime
            prezime = data.autori[i].prezime;
            biografija = data.autori[i].biografija;
            kontaktTelefonMenadzera = data.autori[i].kontaktTelefonMenadzera;
            slike = data.autori[i].slike[0];
            datumRodjenja = data.autori[i].datumRodjenja;
            
            if(val == "" || ime.toLowerCase().includes(val)){
                console.log("nasla ime")
                let NEWauthorscardHtml = `
                    <a href="../html/autor1.html?id=${i}" class="item-link">
                        <div class="item">
                            <div class="avatar">
                                <img src="${slike}" alt="prvi autor">
                            </div>
                            <div class="content">
                                <h3><mark>${ime}</mark> ${prezime}</h3>
                                <p>${biografija}</p>
                            </div>

                            <div class="author-info">
                                <p>${kontaktTelefonMenadzera}</p>
                                <p>${datumRodjenja}</p>
                            </div>
                        </div>
                    </a>
                    `

                AuthorsContainer.insertAdjacentHTML('beforeend', NEWauthorscardHtml);
            }
               
        }
    });

    searchBTN.addEventListener("click", async function (event) {
        event.preventDefault();
        console.log("radi status?");
        const val = statusSearch.value;
        AuthorsContainer.innerHTML = "";
        for(let i in data.autori){
            ime = data.autori[i].ime
            prezime = data.autori[i].prezime;
            biografija = data.autori[i].biografija;
            kontaktTelefonMenadzera = data.autori[i].kontaktTelefonMenadzera;
            slike = data.autori[i].slike[0];
            datumRodjenja = data.autori[i].datumRodjenja;
            status = data.autori[i].status;
            
            if(val == "" || status.toLowerCase().includes(val)){
                console.log("nasla ime")
                let NEWauthorscardHtml = `
                    <a href="../html/autor1.html?id=${i}" class="item-link">
                        <div class="item">
                            <div class="avatar">
                                <img src="${slike}" alt="prvi autor">
                            </div>
                            <div class="content">
                                <h3>${ime} ${prezime}</h3>
                                <p>${biografija}</p>
                            </div>

                            <div class="author-info">
                                <p>${kontaktTelefonMenadzera}</p>
                                <p>${datumRodjenja}</p>
                            </div>
                        </div>
                    </a>
                    `

                AuthorsContainer.insertAdjacentHTML('beforeend', NEWauthorscardHtml);
            }
               
        }
    })

}

addAuthorsToAuthors();