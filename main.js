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


// Storing constant and non-constant values in variables
const Default_Color = "#000"  
const Eraser_Color = "#fff"
const Default_Sides = 64
let Current_Color = Default_Color;
let RandomMode_Color = false;  // Needed for the if-condition in 'fillBox' function, this will be changed to true once Random button is clicked
let isMouseDown = false;    //Also needed for the if-condition in 'fillBox' function, Changed to true on mousedown event.


//For the overall DOM body, needed to set the dragstart and dragdrop default values to false 
//This addresses the issue of unintentionally dragging object of grid boxes when in mousedown and mouseover event.
document.body.setAttribute("ondragstart", "return false"); 
document.body.setAttribute("ondrop", "return false");


//DOM Events to call function using Arrow function operator
gridS.onmousemove = (e) => updateGridInfo(e.target.value)
gridS.onchange = (e) => setGridBoxSides(e.target.value)
color.onchange = (e) => setCurrentColor(e.target.value)
black.onclick = () => setCurrentColor(Default_Color)
document.body.onmousedown = () => (isMouseDown = true);
document.body.onmouseup = () => (isMouseDown = false);


//Listen to mouse events to execute function
clear.addEventListener("click", clearPad)
reset.addEventListener("click", resetPad)
eraser.addEventListener("click", eraserActivate)
random.addEventListener("click", () => RandomMode_Color = true);


//This adds styling class for the buttons when clicked except for 'Clear' and 'Reset
//This function lets the 'User' know what mode(The color of the pen) they are currently in.
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


//Sets the new color selected as the current color
//Needed for the Color Mode, also sets the random mode boolean to false
function setCurrentColor(newColor){
    Current_Color = newColor;
    RandomMode_Color = false;
}

//Updates the Grid Box Sides information showing in the screen as the user uses the slider concurrently
function updateGridInfo(value) {
    gridI.textContent = `Grid Box Sides: ${value} X ${value}`
}

//Once the user, onmouse change event in the slider, chooses the preferred number of sides,
//this calls the 'resetPad' and 'setUpGrid' function
function setGridBoxSides(value) {
    resetPad()
    setUpGrid(value);
}


//When eraser button is clicked, this set the current color to white,
//also sets the random mode boolean to false
function eraserActivate(){
    Current_Color = Eraser_Color;
    RandomMode_Color = false;    
}


//When the reset button is clicked, this sets the grid box sides, current color to default values,
//this also sets the random mode boolean to false
function resetPad(){
    pad.innerHTML= "";
    setUpGrid(Default_Sides);
    Current_Color = Default_Color;
    updateGridInfo(Default_Sides)
    gridS.setAttribute("value",`${Default_Sides}`)    //Should set the value back to default value but the slider interface doesnt go back to default value.
    RandomMode_Color = false;
    buttons.forEach((button) => {
        if (button.classList.contains("button-selected") || 
        cl.classList.contains("color-selected")){
            button.classList.remove("button-selected")
            cl.classList.remove("color-selected")
        }
    })
    color.setAttribute("value","#000000");          //Should set the color value back to default value which is black, but the color picker interface doesnt go back to default value.
}

//When clear button is clicked, removes the filled color of grid boxes.
function clearPad(){
    const gridBoxes = document.querySelectorAll(".grid-box")
    gridBoxes.forEach((grid) => {
        grid.style.backgroundColor = "";
    })


}



//Creates the sketch pad(grid-box) and listens to mouse events to call the 'fillBox' function
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

//Fills the boxes with color depending on the mode(color of the pen) on certain mouse events.
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

//When the browser window loads, the setupGrid function is called with the default sides as the value passed on the parameter.
window.onload = () => setUpGrid(Default_Sides)

