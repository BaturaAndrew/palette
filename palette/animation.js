// icons for cursors
const bucketCursor = "url(asserts/images/fill-drip-solid.png) 10 10, auto",
  colorPickerCursor = "url(asserts/images/eye-dropper-solid.png) 10 10, auto",
  moveCursor = "url(asserts/images/expand-arrows-alt-solid.png) 10 10, auto",
  transferCursor = "url(asserts/images/exchange-alt-solid.png) 10 10, auto";

// blocks
var canvasEl = document.querySelector(".canvas"),
  palleteEl = document.querySelector(".pallete"),
  colorsEl = document.querySelector(".colors");

// tools
const paintBucketEl = document.querySelector("#paintBucket"),
  colorPickerEl = document.querySelector("#colorPicker"),
  moveEl = document.querySelector("#move"),
  transformEl = document.querySelector("#transform");

//  colors
const currColorEl = document.querySelector("#curr-color"),
  prevColorEl = document.querySelector("#prev-color"),
  redColorEl = document.querySelector("#red-color"),
  blueColorEl = document.querySelector("#blue-color");

var currСolor = "grey", //#00ff37
  prevСolor = "green",
  currentTool = "";

var element;
var state = {}

// load colors from localStorage
state = JSON.parse(localStorage.getItem('key'));
refreshColor(state.currСolor, state.prevСolor);

// events that are triggered when you click on the block of FIGURES
document.body.addEventListener('mousedown', e => {

  console.log(e.clientX + ':' + e.clientY);
  // choose figure on canvas
  element = document.elementFromPoint(e.clientX, e.clientY);


  //  1) paint over
  if (currentTool == "paintBucket") {
    // if elem is on canvas
    if (element.parentElement === canvasEl) {
      element.style.backgroundColor = currСolor;
    }
  }

  // 2) take the color of the figure 
  if (currentTool == "colorPicker") {
    // if elem is on canvas
    if (element.parentElement === canvasEl) {
      refreshColor(e.target.style.backgroundColor);

      console.log(e.target, e.target.style.backgroundColor, e.target.classList.contains);
    }
  }

  //  3)  move
  if (currentTool == "move" && element.parentElement === canvasEl) {

    // prepare for relocation
    // 2. place in same place but in absolute coordinates 
    element.style.position = 'absolute';
    moveAt(e);
    // move it into body in order to figure not be into  position:relative  
    // canvasEl.appendChild(element); ??
    element.style.zIndex = 1000; // show the figure above the other elements

    // 3. move through screen
    document.onmousemove = function (e) {
      moveAt(e);
    }

    // 4. track ending of the move 
    element.onmouseup = function () {
      document.onmousemove = null;
      element.onmouseup = null;
    }

    // browser has its own Drag’n’Drop - switch it off 
    element.ondragstart = function () {
      return false;
    };
  }

  //  4) transform figure
  if (currentTool == "transform" && element.parentElement === canvasEl) {
    element.classList.toggle("transform-to-circle");
  }
})

// events that are triggered when you click on the block of choosing TOOLS
palleteEl.addEventListener('click', e => {

  if (e.target === paintBucketEl) {
    currentTool = "paintBucket"; // change current tool
    document.body.style.cursor = bucketCursor; // change cursor type
  }

  if (e.target === colorPickerEl) {
    currentTool = "colorPicker";
    document.body.style.cursor = colorPickerCursor;
  }

  if (e.target === moveEl) {
    currentTool = "move";
    document.body.style.cursor = moveCursor;
  }

  if (e.target === transformEl) {
    currentTool = "transform";
    document.body.style.cursor = transferCursor;
  }

  if (e.target === palleteEl) {
    currentTool = "";
    document.body.style.cursor = "";
  }
  console.log(currentTool, '  ', e.target);
})


// events that are triggered when you click on the block of choosing COLORS
colorsEl.addEventListener('click', e => {


  if (e.target === currColorEl) {
    console.log(e.target, e.target.style.backgroundColor);
    refreshColor(currСolor);
  }
  if (e.target === prevColorEl) {
    refreshColor(prevСolor);
  }
  if (e.target === redColorEl) {
    refreshColor("red");
  }
  if (e.target == blueColorEl) {
    refreshColor("blue");
  }
  //when you click on color palette do the standard cursor and the default action
  resetAction();
});


// input type='color'
var colorPickerInput = document.querySelector("#color");
colorPickerInput.addEventListener("input", watchColorPicker, false);

function watchColorPicker(event) {
  refreshColor(event.target.value);
}

function refreshColor(crColor, prColor) {
  // change color if it is not same with current color
  if (!crColor) crColor = "grey";
  if (crColor != currСolor) {
    if (prColor) prevСolor = prColor
    else prevСolor = currСolor;
    currСolor = crColor;
    currColorEl.childNodes[1].style.backgroundColor = currСolor;
    prevColorEl.childNodes[1].style.backgroundColor = prevСolor;
    console.log("color", crColor, "prev color", prevСolor, "curr color", currСolor)
  }
  // save state of colors in localstorage
  state.currСolor = currСolor;
  state.prevСolor = prevСolor;
  localStorage.setItem('key', JSON.stringify(state));
}

// just reset the color choices
function resetAction() {
  if (currentTool == "colorPicker") {
    currentTool == "";
    document.body.style.cursor = "";
  }
}
// move the figure under the cursor coordinates 
// and shifted by half width/height for centring 
function moveAt(e) {
  element.style.left = e.pageX - element.offsetWidth / 2 + 'px';
  element.style.top = e.pageY - element.offsetHeight / 2 + 'px';
}