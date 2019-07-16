// icons for cursors
const bucketCursor = "url(asserts/images/fill-drip-solid.png) 10 10, auto";
const colorPickerCursor = "url(asserts/images/eye-dropper-solid.png) 10 10, auto";
const moveCursor = "url(asserts/images/expand-arrows-alt-solid.png) 10 10, auto";
const transferCursor = "url(asserts/images/exchange-alt-solid.png) 10 10, auto";

// blocks
let canvasEl = document.querySelector(".canvas");
var palleteEl = document.querySelector(".pallete");
var colorsEl = document.querySelector(".colors");

// tools
const paintBucketEl = document.querySelector("#paintBucket");
const colorPickerEl = document.querySelector("#colorPicker");
const moveEl = document.querySelector("#move");
const transformEl = document.querySelector("#transform");

//  colors
const currColorEl = document.querySelector("#curr-color");
const prevColorEl = document.querySelector("#prev-color");
const redColorEl = document.querySelector("#red-color");
const blueColorEl = document.querySelector("#blue-color");


var curr_color, prev_color;
curr_color = "#00ff37";
prev_color = "green";
var currentTool = "";



// reset currentTool by Escape
document.addEventListener('keydown', e => {
  if (e.keyCode == 27) {
    currentTool = "";
    document.body.style.cursor = "";
  }
})

let element;

// events that are triggered when you click on the block of FIGURES
document.body.addEventListener('mousedown', e => {

  console.log(e.clientX + ':' + e.clientY);
  // choose figure on canvas
  element = document.elementFromPoint(e.clientX, e.clientY);


  //  1) paint over
  if (currentTool == "paintBucket") {
    // if elem is on canvas
    if (element.parentElement === canvasEl) {
      element.style.backgroundColor = curr_color;
    }
  }

  // 2) take the color of the figure 
  if (currentTool == "colorPicker") {
    // if elem is on canvas
    if (element.parentElement === canvasEl) {
      refreshColor(element.style.backgroundColor);
    }
  }

  //  3)  move
  if (currentTool == "move" && element.parentElement === canvasEl) {
    console.log(element, " ", element.parentElement);
    element.onmousedown = function (e) { // 1. отследить нажатие

      // подготовить к перемещению
      // 2. разместить на том же месте, но в абсолютных координатах
      element.style.position = 'absolute';
      moveAt(e);
      // переместим в body, чтобы фигра был точно не внутри position:relative
      // document.body.appendChild(element);
      canvasEl.appendChild(element);
      element.style.zIndex = 1000; // показывать фигру над другими элементами

      // передвинуть фигру под координаты курсора
      // и сдвинуть на половину ширины/высоты для центрирования
      function moveAt(e) {
        element.style.left = e.pageX - element.offsetWidth / 2 + 'px';
        element.style.top = e.pageY - element.offsetHeight / 2 + 'px';
      }

      // 3, перемещать по экрану
      document.onmousemove = function (e) {
        moveAt(e);
      }

      // 4. отследить окончание переноса
      element.onmouseup = function () {
        document.onmousemove = null;
        element.onmouseup = null;
      }
      element.ondragstart = function () {
        return false;
      };
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
    refreshColor(curr_color);
  }
  if (e.target === prevColorEl) {
    refreshColor(prev_color);
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


function refreshColor(color) {
  prev_color = curr_color;
  curr_color = color;
  currColorEl.childNodes[1].style.backgroundColor = curr_color;
  prevColorEl.childNodes[1].style.backgroundColor = prev_color;
}

// for now just reset the color choices
function resetAction() {
  if (currentTool == "colorPicker") {
    currentTool == "";
    document.body.style.cursor = "";
  }
}