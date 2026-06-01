let menu = document.getElementsByClassName("nav")[0];

function bringMenu(){
    if(menu.classList.contains("active")){
        menu.classList.remove("active");
    }
    else{
        menu.classList.add("active");
    }
}
