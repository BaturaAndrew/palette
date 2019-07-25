//VARABLES

// icons for cursors
const bucketCursor = "url(asserts/images/fill-drip-solid.png) 10 10, auto",
  colorPickerCursor = "url(asserts/images/eye-dropper-solid.png) 10 10, auto",
  moveCursor = "url(asserts/images/expand-arrows-alt-solid.png) 10 10, auto",
  transferCursor = "url(asserts/images/exchange-alt-solid.png) 10 10, auto";

// blocks
var palleteEl = document.querySelector(".pallete"),
  colorsEl = document.querySelector(".colors");

// tools
const paintBucketEl = document.querySelector(".paintBucket"),
  colorPickerEl = document.querySelector(".colorPicker"),
  moveEl = document.querySelector(".move"),
  transformEl = document.querySelector(".transform");

//  colors
const currColorEl = document.querySelector(".curr-color__item"),
  prevColorEl = document.querySelector(".prev-color__item"),
  redColorEl = document.querySelector(".red-color__item"),
  blueColorEl = document.querySelector(".blue-color__item");

var currСolor = "grey", //#00ff37
  prevСolor = "green",
  currentTool = "";

// input type='color'
var colorPickerInput = document.querySelector(".color");

var figures;
figures = document.querySelectorAll(".figure");
figures = Array.prototype.slice.call(figures);

var state = {}


// load colors from localStorage
state = JSON.parse(localStorage.getItem('key'));

loadState();


// PANEL

/** 
 * events that are triggered when you click on the block of choosing TOOLS
 **/

paintBucketEl.addEventListener('click', () => {
  clearToolState();
  currentTool = "paintBucket"; // change current tool
  document.body.style.cursor = bucketCursor; // change cursor type
  paintBucketEl.classList.add("active");
});

colorPickerEl.addEventListener('click', () => {
  clearToolState();
  currentTool = "colorPicker";
  document.body.style.cursor = colorPickerCursor;
  colorPickerEl.classList.add("active");
});

moveEl.addEventListener('click', () => {
  clearToolState();
  currentTool = "move";
  document.body.style.cursor = moveCursor;
  moveEl.classList.add("active");
});

transformEl.addEventListener('click', () => {
  clearToolState();
  currentTool = "transform";
  document.body.style.cursor = transferCursor;
  transformEl.classList.add("active");
});

//FIGURES
/** 
 *  events that are triggered when you click on the block of FIGURES
 **/
figures.map(elem => {
  elem.addEventListener('mousedown', e => {
    //  1) paint over
    if (currentTool == "paintBucket") {
      elem.style.backgroundColor = currСolor;
    }

    // 2) take the color of the figure 
    if (currentTool == "colorPicker") {
      refreshColor(elem.style.backgroundColor);
    }

    //  3)  move
    if (currentTool == "move") {
      moveFigure(elem, e);
    }
    //  4) transform figure
    if (currentTool == "transform") {
      elem.classList.toggle("transform-to-circle");
    }

  });
});

function moveFigure(figure, e) {

  // prepare for relocation
  // 2. place in same place but in absolute coordinates 
  figure.style.position = 'absolute';
  moveAt(e);
  // move it into body in order to figure not be into  position:relative  
  // canvasEl.appendChild(element); ??
  figure.style.zIndex = 1000; // show the figure above the other elements

  // 3. move through screen
  document.onmousemove = function (e) {
    moveAt(e);
  }

  // 4. track ending of the move 
  figure.onmouseup = function () {
    document.onmousemove = null;
    figure.onmouseup = null;
  }

  // browser has its own Drag’n’Drop - switch it off 
  figure.ondragstart = function () {
    return false;
  };

  // move the figure under the cursor coordinates 
  // and shifted by half width/height for centring 
  function moveAt(e) {
    figure.style.left = e.pageX - figure.offsetWidth / 2 + 'px';
    figure.style.top = e.pageY - figure.offsetHeight / 2 + 'px';
  }

}


function clearToolState() {
  let childs = palleteEl.children
  childs = Array.prototype.slice.call(childs);
  childs.map(elem => {
    elem.classList.remove("active");
  });

}
// CHOOSE COLOR PANEL

/**  
 *  events that are triggered when you click on the block of choosing COLORS
 **/
colorsEl.addEventListener('click', e => {
  if (e.target === currColorEl) {
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


// COLOR PICKER

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
  }
  // save state of colors in localstorage
  saveState();
}

// just reset the color choices
function resetAction() {
  if (currentTool == "colorPicker") {
    currentTool == "";
    document.body.style.cursor = "";
  }
}


function saveState() {
  // save state of colors in localstorage
  state.currСolor = currСolor;
  state.prevСolor = prevСolor;
  localStorage.setItem('key', JSON.stringify(state));
}

function loadState() {
  if (!state) {
    state = {
      currСolor: "grey",
      prevСolor: "green"
    }
  }
  if (state) {
    refreshColor(state.currСolor, state.prevСolor);
  }
}