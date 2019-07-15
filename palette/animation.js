// icons for cursors
const bucketCursor = "url(asserts/images/fill-drip-solid.png) 10 10, auto";
const chooseColorCursor = "url(asserts/images/eye-dropper-solid.png) 10 10, auto";
const moveCursor = "url(asserts/images/expand-arrows-alt-solid.png) 10 10, auto";
const transferCursor = "url(asserts/images/exchange-alt-solid.png) 10 10, auto";

// blocks
const canvas = document.querySelector(".canvas");
const pallete = document.querySelector(".pallete");
const colors = document.querySelector(".colors");

// tools
const paintBucket = document.querySelector("#paintBucket");
const chooseColor = document.querySelector("#chooseColor");
const move = document.querySelector("#move");
const transform = document.querySelector("#transform");

//  colors
const currColor = document.querySelector("#curr-color");
const prevColor = document.querySelector("#prev-color");
const redColor = document.querySelector("#red-color");
const blueColor = document.querySelector("#blue-color");


var curr_color, prev_color;
color = curr_color = "grey";
prev_color = "green";
var tools = {}
tools.paintBucket = false;
tools.chooseColor = false;
tools.move = false;
tools.transform = false;

let element;

// events that are triggered when you click on the block of canvas
canvas.addEventListener('click', e => {

  console.log(e.clientX + ':' + e.clientY);
  // choose figure on canvas
  element = document.elementFromPoint(e.clientX, e.clientY);

  //paint over
  if (tools.paintBucket) {
    // if elem is on canvas
    if (element.parentElement === canvas) {
      element.style.backgroundColor = curr_color;
      console.log(' ', curr_color, ' ', prev_color);
    }
  }

  //take the color of the figure 
  if (tools.chooseColor) {
    // if elem is on canvas
    if (element.parentElement === canvas) {
      refreshColor(element.style.backgroundColor);
    }
  }

  //!!!!!!!!
  // move
  if (tools.move) {
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
pallete.addEventListener('click', e => {

  if (e.target === paintBucket) {
    tools.paintBucket = true;
    document.body.style.cursor = bucketCursor;
  } else {
    tools.paintBucket = false;
  }

  if (e.target === chooseColor) {
    tools.chooseColor = true;
    document.body.style.cursor = chooseColorCursor;
  } else {
    tools.chooseColor = false;
  }

  if (e.target === move) {
    tools.move = true;
    document.body.style.cursor = moveCursor;
  } else {
    tools.move = false;
  }

  if (e.target === transform) {
    tools.transform = true;
    document.body.style.cursor = transferCursor;
  } else {
    tools.transform = false;
  }

  if (!tools.paintBucket && !tools.chooseColor && !tools.move && !tools.transform) {
    document.body.style.cursor = "";
  }

})

// events that are triggered when you click on the block of choosing colors
colors.addEventListener('click', e => {
  if (tools.chooseColor) {
    if (e.target === currColor) {
      refreshColor(curr_color);
    }
    if (e.target === prevColor) {
      refreshColor(prev_color);
    }
    if (e.target === redColor) {
      refreshColor("red");
    }
    if (e.target == blueColor) {
      refreshColor("blue");
    }
  }

  //when you click do the standard cursor and the default action
  resetAction();
});


// 
var colorPicker = document.querySelector("#color");
colorPicker.addEventListener("input", watchColorPicker, false);

function watchColorPicker(event) {
  refreshColor(event.target.value);
}

function refreshColor(color) {
  prev_color = curr_color;
  curr_color = color;
  currColor.childNodes[1].style.backgroundColor = curr_color;
  prevColor.childNodes[1].style.backgroundColor = prev_color;
}

// for now just reset the color choices
function resetAction() {
  if (tools.chooseColor) {
    tools.chooseColor = false;
    document.body.style.cursor = "";
  }
}