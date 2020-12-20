function addBall() {

  isCreatingNewBall = true;
  pauseBalls();

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
  
  if (vx < -maxVelocity) {
    vx = -maxVelocity;
  } else if (vx > maxVelocity) {
    vx = maxVelocity;
  }

  if (vy < -maxVelocity) {
    vy = -maxVelocity;
  } else if (vy > maxVelocity) {
    vy = maxVelocity;
  }

}

function createBall(e) {

  new Ball(
    radius,
    newX,
    newY,
    -vx,
    -vy
  );

  clean();

}

function clean() {

  const canvas = document.getElementById("canvas");
  canvas.removeEventListener("mousemove", setVelocity);
  canvas.removeEventListener("click", createBall);

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

const AVALIABLE = "green";
const NOT_ABALIABLE = "red";
let newBallColor = AVALIABLE;
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
const maxVelocity = 10;

window.onload = function () {
  setInterval(draw, 10);
};
