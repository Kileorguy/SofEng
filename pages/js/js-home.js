document.getElementById("elementToHide2").style.display = "none";

function toggleVisibility() {
    var elementToHide = document.getElementById("elementToHide");
    var elementToHide2 = document.getElementById("elementToHide2");

    if (elementToHide.style.display === "none") {
        elementToHide.style.display = "block";
        elementToHide2.style.display = "none";
    } else {
        elementToHide.style.display = "none";
        elementToHide2.style.display = "block";
    }
}

function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
}