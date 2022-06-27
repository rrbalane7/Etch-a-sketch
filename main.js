// Targetting/Selecting elements in the HTML
const pad = document.querySelector("#sketch-pad-cont")
const gridS = document.querySelector("#grid-sides")
const gridI = document.querySelector("#grid-info")
const clear = document.querySelector("#clear")


// Creating the pad boxes grid in the main container
for(let x =0; x<4096;){
    const divBox = document.createElement("div");
    divBox.classList.add("grid-box");
    divBox.addEventListener("mouseover", fillBox);
    divBox.addEventListener("click", () => divBox.style.backgroundColor = "black");
    divBox.addEventListener("mousedown", () => divBox.style.backgroundColor = "black");
    divBox.setAttribute("draggable", "false");
    pad.appendChild(divBox);
    x++;
    
}

let isMouseDown = false;
document.body.onmousedown = () => (isMouseDown = true);
document.body.onmouseup = () => (isMouseDown = false);
document.body.setAttribute("ondragstart", "return false"); //Thank you Stackoverflow
document.body.setAttribute("ondrop", "return false");

function fillBox(e) {
    if (e.type === "mouseover" && !isMouseDown) return undefined;
    else {e.target.style.backgroundColor="black" }
}



gridS.onmousemove = (e) => updateGridInfo(e.target.value)

function updateGridInfo(value) {
    gridI.textContent = `Grid Box Sides: ${value} X ${value}`
}


clear.addEventListener("click", resetPad)

function resetPad(){
    const gridBoxes = document.querySelectorAll(".grid-box")
    gridBoxes.forEach((grid) => {
        grid.style.backgroundColor = "white";       
    })
}