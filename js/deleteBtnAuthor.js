const btn = document.getElementById('deleteBtn');
const dialog = document.getElementById('btnDel')
const okbtn = document.getElementById('okBTN');
const cancelbtn = document.getElementById('cancelBTN');

btn.addEventListener('click', () => {
    dialog.showModal();
});

okbtn.addEventListener('click', () =>{
    dialog.close();
})

cancelbtn.addEventListener('click', () =>{
    dialog.close();
})

