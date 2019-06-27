const node = document.querySelector('#node');

let currentX = 0;
const endX = 300;

// function animate(endX, duration) {

//   let currentX = node.offsetLeft;
//   const frameCount = duration / 1000 * 60;
//   const dx = (endX - currentX) / frameCount;

//   const intervalId = setInterval(() => {
//     currentX += dx;
//     console.log(currentX);
//     if (currentX > endX) {
//       clearInterval(intervalId);
//     }
//     node.style.transform = 'translateX(' + currentX + 'px)'
//   }, 16);
// }

function animate(endX, duration) {

  let currentX = node.offsetLeft;
  const frameCount = duration / 1000 * 60;
  const dx = (endX - currentX) / frameCount;

  const tick = () => {
    currentX += dx;
    console.log(currentX);

    node.style.transform = 'translateX(' + currentX + 'px)'

    if (currentX < endX) {
      requestAnimationFrame(tick);
    }

  };

  tick(dx);
}

animate(300, 3000);