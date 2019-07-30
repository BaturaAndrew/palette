import State from './State.js'

// icons for cursors
const bucketCursor = "url(asserts/images/fill-drip-solid.png) 10 10, auto",
  colorPickerCursor = "url(asserts/images/eye-dropper-solid.png) 10 10, auto",
  moveCursor = "url(asserts/images/expand-arrows-alt-solid.png) 10 10, auto",
  transferCursor = "url(asserts/images/exchange-alt-solid.png) 10 10, auto";

// blocks
const palleteEl = document.querySelector(".pallete"),
  colorsEl = document.querySelector(".colors");

// tools
const paintBucketEl = document.querySelector(".paintBucket"),
  colorPickerEl = document.querySelector(".colorPicker"),
  moveEl = document.querySelector(".move"),
  transformEl = document.querySelector(".transform"),
  saveStateButton = document.querySelector(".save-state");

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

var figures = document.querySelectorAll(".figure");
// convert to array
figures = Array.prototype.slice.call(figures);

// figures change in class State
const controlState = new State(figures);

controlState.loadState();
refreshColor(controlState.state.currСolor, controlState.state.prevСolor);

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
  if (e.target === blueColorEl) {
    refreshColor("blue");
  }
  //when you click on color palette do the standard cursor and the default action
  resetAction();
});


// COLOR PICKER 
colorPickerInput.addEventListener("input", watchColorPicker, false);


// SAVE IN LOCALSTORE
saveStateButton.addEventListener("click", () => {
  controlState.saveState([currСolor, prevСolor]);
})


/** 
 *FUNCTIONS
 */
function moveFigure(figure, e) {

  var coords = getCoords(figure);
  var shiftX = e.pageX - coords.left;
  var shiftY = e.pageY - coords.top;
  var sec = new Date(),
    // to show always above  another figure
    zIndexAdd = sec.getMinutes() + sec.getSeconds();
  figure.style.position = 'absolute';
  figure.style.zIndex = 100 + zIndexAdd;

  moveAt(e);

  document.onmousemove = function (e) {
    moveAt(e);
  }

  figure.onmouseup = function () {
    document.onmousemove = null;
    figure.onmouseup = null;
  }

  // browser has its own Drag’n’Drop - switch it off 
  figure.ondragstart = function () {
    return false;
  };

  function moveAt(e) {
    figure.style.left = e.pageX - shiftX + 'px';
    figure.style.top = e.pageY - shiftY + 'px';
  }

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

}

function clearToolState() {
  let childs = palleteEl.children
  childs = Array.prototype.slice.call(childs);
  childs.map(elem => {
    elem.classList.remove("active");
  });

}

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
}

// just reset the color choices
function resetAction() {
  if (currentTool == "colorPicker") {
    currentTool == "";
    document.body.style.cursor = "";
  }
}