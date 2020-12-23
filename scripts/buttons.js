function addBall() {

  isCreatingNewBall = true;
  pauseBalls();

  document.querySelectorAll("button").forEach(
    button => button.disabled = true
  );

  newX = newY = 1000;

  document.getElementById("canvas").addEventListener("mousemove", setPosition);
  document.getElementById("canvas").addEventListener("wheel", setRadius);
  document.getElementById("canvas").addEventListener("click", placeBall);

}

function setPosition(e) {

  const rect = document.getElementById("canvas").getBoundingClientRect();
  newX = e.clientX - rect.left;
  newY = e.clientY - rect.top;

  checkIfAvaliable(newX, newY, radius);

}

function setRadius(e) {

  e.preventDefault();

  radius -= e.deltaY * 0.01

  if (radius < minRadius) {
    radius = minRadius;
  } else if (radius > maxRadius) {
    radius = maxRadius;
  }

  checkIfAvaliable(newX, newY, radius);

}

function checkIfAvaliable(x, y, radius) {

  isPlaceAvaliable = true;

  if (x - radius <= 0) {
    isPlaceAvaliable = false;
  } else if (x + radius >= 750) {
    isPlaceAvaliable = false;
  } else if (y - radius <= 0) {
    isPlaceAvaliable = false;
  } else if (y + radius >= 600) {
    isPlaceAvaliable = false;
  }

  for (let ball of balls) {

    let distance = (ball.radius + radius) ** 2 - (
      (ball.pos.x - x) ** 2 + (ball.pos.y - y) ** 2
    );

    if (distance >= 0) {
      isPlaceAvaliable = false;
      break;
    }

  }

}

function placeBall(e) {

  if (isPlaceAvaliable) {
    const canvas = document.getElementById("canvas");
    canvas.removeEventListener("mousemove", setPosition);
    canvas.removeEventListener("wheel", setRadius);
    canvas.removeEventListener("click", placeBall);

    vx = 0;
    vy = 0;

    isSettingVelocity = true;

    canvas.addEventListener("mousemove", setVelocity);
    canvas.addEventListener("click", createBall);
  }

}

function setVelocity(e) {

  const rect = document.getElementById("canvas").getBoundingClientRect();
  vxposition = (e.clientX - rect.left);
  vyposition = (e.clientY - rect.top);
  vx = (newX - vxposition) / 10;
  vy = (newY - vyposition) / 10;

}

function createBall(e) {

  new Ball(
    radius,
    newX,
    newY,
    -vx / 2,
    -vy / 2
  );

  clean();

}

function clean() {

  const canvas = document.getElementById("canvas");
  canvas.removeEventListener("mousemove", setVelocity);
  canvas.removeEventListener("click", createBall);

  document.querySelectorAll("button").forEach(
    button => button.disabled = false
  );

  resumeBalls();
  isCreatingNewBall = false;
  isSettingVelocity = false;

}

function addRandomBall() {

  let randomRadius;
  let width;
  let height;

  while (true) {

    randomRadius = Math.random() * (maxRadius - minRadius) + minRadius;
    width = Math.random() * (750 - 2 * randomRadius) + randomRadius;
    height = Math.random() * (650 - 2 * randomRadius) + randomRadius;

    checkIfAvaliable(width, height, randomRadius)

    if (isPlaceAvaliable) {
      break;
    }

  }

  new Ball(randomRadius, width, height, Math.random() * 12 - 6, Math.random() * 12 - 6);

}

function pauseBalls() {

  balls.forEach(ball => ball.isPaused = true);

}

function resumeBalls() {

  balls.forEach(ball => ball.isPaused = false);

}

function randomizeV() {

  balls.forEach(ball => {
    ball.v.x = Math.random() * 12 - 6;
    ball.v.y = Math.random() * 12 - 6;
  });

}

function clearBoard() {

  balls = [];

}

function help() {

  document.getElementById("options").style.display = "none";
  document.getElementById("help").style.display = "flex";

}

function returnToOptions() {

  document.getElementById("options").style.display = "flex";
  document.getElementById("help").style.display = "none";

}

const AVALIABLE = "#2DC241";
const NOT_ABALIABLE = "#A31919";
let balls = [];
let isCreatingNewBall = false;
let isSettingVelocity = false;
let isPlaceAvaliable = true;
let newX;
let newY;
let vx;
let vy;
let vxposition = 0;
let vyposition = 0;
const minRadius = 10;
const maxRadius = 60;
const defaultRadius = 20;
let radius = defaultRadius;

window.onload = function () {
  setInterval(draw, 10);
};
