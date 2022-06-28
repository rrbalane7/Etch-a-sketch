// Targetting/Selecting elements in the HTML
const pad = document.querySelector("#sketch-pad-cont")
const gridS = document.querySelector("#grid-sides")
const gridI = document.querySelector("#grid-info")
const clear = document.querySelector("#clear")
const reset = document.querySelector("#reset")
const eraser = document.querySelector("#eraser")
const buttons = document.querySelectorAll(".button")
const color = document.querySelector("#color-mode")
const cl = document.querySelector("#color-label")
const black = document.querySelector("#black")
const random = document.querySelector("#random")

const Default_Color = "#000"
const Eraser_Color = "#fff"
const Default_Sides = 64
let Current_Color = Default_Color;
// let ColorMode_Color;
let RandomMode_Color = false;

function setCurrentColor(newColor){
    Current_Color = newColor;
    RandomMode_Color = false;
}


gridS.onmousemove = (e) => updateGridInfo(e.target.value)
gridS.onchange = (e) => setGridBoxSides(e.target.value)
color.onchange = (e) => setCurrentColor(e.target.value)
black.onclick = () => setCurrentColor(Default_Color)





function updateGridInfo(value) {
    gridI.textContent = `Grid Box Sides: ${value} X ${value}`
}

function setGridBoxSides(value) {
    resetPad()
    setUpGrid(value);
}


clear.addEventListener("click", clearPad)
reset.addEventListener("click", resetPad)
eraser.addEventListener("click", eraserActivate)
random.addEventListener("click", () => RandomMode_Color = true);

console.log(RandomMode_Color)

function eraserActivate(){
    Current_Color = Eraser_Color;
    RandomMode_Color = false;
    divBox.addEventListener("mouseover", fillBox);
    divBox.addEventListener("click", () => divBox.style.backgroundColor = Eraser_Color);
    divBox.addEventListener("mousedown", () => divBox.style.backgroundColor = Eraser_Color);
    

}

function resetPad(){
    pad.innerHTML= "";
    setUpGrid(Default_Sides);
    Current_Color = Default_Color;
    updateGridInfo(Default_Sides)
    gridS.setAttribute("value",`${Default_Sides}`)
    RandomMode_Color = false;
    buttons.forEach((button) => {
        if (button.classList.contains("button-selected") || 
        cl.classList.contains("color-selected")){
            button.classList.remove("button-selected")
            cl.classList.remove("color-selected")
        }
    })
    color.setAttribute("value","#000000");     
}


function clearPad(){
    const gridBoxes = document.querySelectorAll(".grid-box")
    gridBoxes.forEach((grid) => {
        grid.style.backgroundColor = "";
    })


}

buttons.forEach((button) => {
    button.addEventListener("click", () =>{
        buttons.forEach((button) => {
            if (button.classList.contains("button-selected") || 
            cl.classList.contains("color-selected")){
                button.classList.remove("button-selected")
                cl.classList.remove("color-selected")
            }
        });
        if (button.classList.contains("button-selected")){
            button.classList.remove("button-selected")
        } else button.classList.add("button-selected");
        if (color.classList.contains("button-selected")){
            cl.classList.add("color-selected")
        }    
    })
})




// Creating the pad boxes grid in the main container
function setUpGrid(sides = Default_Sides){
    pad.style.gridTemplateColumns = `repeat(${sides},1fr)`
    pad.style.gridTemplateRows = `repeat(${sides},1fr)` 

    for(let x =0; x < sides * sides;){
        const divBox = document.createElement("div");
        divBox.classList.add("grid-box");
        divBox.addEventListener("mouseover", fillBox);
        divBox.addEventListener("click", fillBox);
        divBox.addEventListener("mousedown", fillBox);
        divBox.setAttribute("draggable", "false");
        pad.appendChild(divBox);
        x++;
    
    }

}



let isMouseDown = false;
document.body.onmousedown = () => (isMouseDown = true);
document.body.onmouseup = () => (isMouseDown = false);
document.body.setAttribute("ondragstart", "return false"); //Thank you Stackoverflow
document.body.setAttribute("ondrop", "return false");

function fillBox(e) {
    if (e.type === "mouseover" && !isMouseDown) return undefined;
    else if (RandomMode_Color === true) {
        let Rnum = Math.floor(Math.random() * 256)
        let Gnum = Math.floor(Math.random() * 256)
        let Bnum = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${Rnum},${Gnum},${Bnum})`;
    }
    else e.target.style.backgroundColor= Current_Color
    
}


window.onload = () =>{
    setUpGrid(Default_Sides)
}
