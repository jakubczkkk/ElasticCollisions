function addBall() {

  isCreatingNewBall = true;
  pauseBalls();

  newX = newY = 1000;

  document.getElementById("canvas").addEventListener(
    "mousemove",
    getMouseCoords
  );

  document.getElementById("canvas").addEventListener(
    "click",
    placeBall
  );

  document.getElementById("canvas").addEventListener(
    "wheel",
    setRadius
  );

}

function getMouseCoords(e) {

  const rect = document.getElementById("canvas").getBoundingClientRect();
  newX = e.clientX - rect.left;
  newY = e.clientY - rect.top;

}

function setRadius(e) {

  e.preventDefault();

  radius -= e.deltaY * 0.01

  if (radius < minRadius) {
    radius = minRadius;
  } else if (radius > maxRadius) {
    radius = maxRadius;
  }

  document.getElementById("canvas").addEventListener(
    "click",
    placementReady
  );

}

function placeBall(e) {

  const canvas = document.getElementById("canvas");
  canvas.removeEventListener("mousemove", getMouseCoords);
  canvas.removeEventListener("wheel", setRadius);

  isSettingVelocity = true;
  canvas.addEventListener("click", placementReady);

}

function placementReady(e) {

  const canvas = document.getElementById("canvas");
  canvas.removeEventListener("mousemove", getMouseCoords);

  document.getElementById("canvas").addEventListener("mousemove", setVelocity);
  document.getElementById("canvas").addEventListener("click", createBall);

}

function setVelocity(e) {

  const rect = document.getElementById("canvas").getBoundingClientRect();
  vxposition = (e.clientX - rect.left);
  vyposition = (e.clientY - rect.top);
  vx = newX - vxposition;
  vy = newY - vyposition;

}

function createBall(e) {

  new Ball(
    radius,
    newX,
    newY,
    vx / 10,
    vy / 10
  );

  clean();

}

function clean() {

  const canvas = document.getElementById("canvas");
  canvas.removeEventListener("mousemove", setVelocity);
  canvas.removeEventListener("click", createBall);
  canvas.removeEventListener("click", placeBall);
  canvas.removeEventListener("click", placementReady);

  resumeBalls();
  isCreatingNewBall = false;
  isSettingVelocity = false;

}

function addRandomBall() {

  const randomRadius = Math.random() * (maxRadius - minRadius) + minRadius;
  const width = Math.random() * (750 - 2 * randomRadius) + randomRadius;
  const height = Math.random() * (650 - 2 * randomRadius) + randomRadius;

  if (balls.ballsList.length <= 15) {
    new Ball(
      randomRadius,
      width,
      height,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5
    );
  } else {
    alert("Too much ball on board;")
  }

}

function pauseBalls() {

  balls.forEach(ball => ball.isPaused = true);

}

function resumeBalls() {

  balls.forEach(ball => ball.isPaused = false);

}

function randomizeV() {
  balls.forEach(ball => {
    ball.v.x = Math.random() * 10 - 5;
    ball.v.y = Math.random() * 10 - 5;
  });
}

function clearBoard() {
  balls = [];
}

function showOptions() {

  document.getElementById("navButtonOptions").style.background = "#FFAD36";
  document.getElementById("navButtonAbout").style.background = "white";
  document.getElementById("menuDivOptions").style.display = "block";
  document.getElementById("menuDivAbout").style.display = "none";

}

function showAbout() {

  document.getElementById("navButtonOptions").style.background = "white";
  document.getElementById("navButtonAbout").style.background = "#FFAD36";
  document.getElementById("menuDivOptions").style.display = "none";
  document.getElementById("menuDivAbout").style.display = "block";
  console.log(getEventListeners(window))

}

let balls = [];
let isCreatingNewBall = false;
let isSettingVelocity = false;
let newX;
let newY;
let vx;
let vy;
let vxposition;
let vyposition;
const minRadius = 10;
const maxRadius = 60;
const defaultRadius = 20;
let radius = defaultRadius;

window.onload = function () {
  setInterval(draw, 10);
};
