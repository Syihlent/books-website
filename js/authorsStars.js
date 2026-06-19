// async function loadData() {
//     try{
//         let response = await fetch("https://books-website-74fda-default-rtdb.europe-west1.firebasedatabase.app/.json");
//         let data = await response.json();
//         return data;
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// let one = document.getElementById("star1");
// let two = document.getElementById("star2");
// let three = document.getElementById("star3");
// let four = document.getElementById("star4");
// let five = document.getElementById("star5");

// async function addStarToAuthor() {
//     let data = await loadData();
//     console.log(data.ocene);
//     if (data == null){
//         return;
//     }
    

//     for (let i in data.ocene){

//         let ocena = data.ocene[i];    
        
//         let stars = `
//         <tr onclick="authorsform('${i}')">
//             <th><img src="${slikaSrc}"></th>
//             <td>${ime}</td>
//             <td>${prezime}</td>
//             <td>${datumRodjenja}</td>
//             <td>${brNag}</td>
//             <td>${brProd}</td>
//             <td>${statuss}</td>
//             <td>${kontaktTelefonMenadzera}</td>
//         </tr>     
//         `
//         a += tableCardHTML;
//     }

//     AuthorsTable.insertAdjacentHTML('beforeend', a);
// }

