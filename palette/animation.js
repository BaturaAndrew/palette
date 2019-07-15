// icons for cursors
const bucketCursor = "url(asserts/images/fill-drip-solid.png) 10 10, auto";
const colorPickerCursor = "url(asserts/images/eye-dropper-solid.png) 10 10, auto";
const moveElCursor = "url(asserts/images/expand-arrows-alt-solid.png) 10 10, auto";
const transferCursor = "url(asserts/images/exchange-alt-solid.png) 10 10, auto";

// blocks
const canvasEl = document.querySelector(".canvas");
const palleteEl = document.querySelector(".pallete");
const colorsEl = document.querySelector(".colors");

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
color = curr_color = "grey";
prev_color = "green";
var currentTool = "";

let element;

// events that are triggered when you click on the block of canvas
canvasEl.addEventListener('click', e => {

  console.log(e.clientX + ':' + e.clientY);
  // choose figure on canvas
  element = document.elementFromPoint(e.clientX, e.clientY);

  //paint over
  if (currentTool == "paintBucket") {
    // if elem is on canvas
    if (element.parentElement === canvasEl) {
      element.style.backgroundColor = curr_color;
    }
  }

  //take the color of the figure 
  if (currentTool == "colorPicker") {
    // if elem is on canvas
    if (element.parentElement === canvasEl) {
      refreshColor(element.style.backgroundColor);
    }
  }

  //!!!!!!!!
  // move
  if (currentTool == "move") {
    var rect = element.getBoundingClientRect()
    var dx = e.pageX - rect.left,
      dy = e.pageY - rect.top

    // element.style.backgroundColor = "silver";
    document.body.addEventListener("click", function handler(e) {

      console.log("element.style", element.style.offsetLeft + ':' + element.style.offsetTop);
      console.log("dx dy", dx + ':' + e.clientY);
      console.log("e.client", e.clientX + ':' + dy);

      element.style.offsetLeft = e.clientX - dx + 'px';
      element.style.offsetTop = e.clientY - dy + 'px';
      // document.removeEventListener('click', handler, true);
      // event.stopPropagation();
    });
  }

})

// events that are triggered when you click on the block of choosing tools
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

  if (!currentTool) {
    document.body.style.cursor = "";
  }

})

// events that are triggered when you click on the block of choosing colors
colorsEl.addEventListener('click', e => {
  if (currentTool == "colorPicker") {
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
  }

  //when you click on color palette do the standard cursor and the default action
  resetAction();
});


// 
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