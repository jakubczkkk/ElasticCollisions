function addBall() {

    isCreatingNewBall = true;
    pauseBalls();

    newX = newY = 1000;

    document.getElementById("canvas").addEventListener(
        "mousemove",
        getMouseCoords,
        true
    );

}

function getMouseCoords(e) {

    const rect = document.getElementById("canvas").getBoundingClientRect();
    newX = e.clientX - rect.left;
    newY = e.clientY - rect.top;

    document.getElementById("canvas").addEventListener(
        "click",
        placeBall,
        true
    );

    document.getElementById("canvas").addEventListener(
        "wheel",
        setRadius,
        true
    );

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
        createBall,
        true
    );

}

function createBall(e) {

    new Ball(
        radius,
        newX,
        newY,
        2,
        2
    );

    clean();

}

function clean() {

    const canvas = document.getElementById("canvas");
    canvas.removeEventListener("click", createBall, true);
    canvas.removeEventListener("click", placeBall, true);
    canvas.removeEventListener("mousemove", getMouseCoords, true);
    canvas.removeEventListener("wheel", setRadius, true);

    resumeBalls();
    isCreatingNewBall = false;

}

function placeBall(e) {

    const rect = document.getElementById("canvas").getBoundingClientRect();
    newX = e.clientX - rect.left;
    newY = e.clientY - rect.top;

}

function addRandomBall() {

    const randomRadius = Math.random() * (maxRadius - minRadius) + minRadius;
    const canvas = document.getElementById("canvas");
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

    balls.ballsList.forEach(ball => ball.isPaused = true);

}

function resumeBalls() {

    balls.ballsList.forEach(ball => ball.isPaused = false);

}

function randomizeV() {
    balls.ballsList.forEach(ball => {
        ball.v.x = (20 * Math.random()) - 10;
        ball.v.y = (20 * Math.random()) - 10;
    });
}

function clearBoard() {
    balls.ballsList = [];
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

let balls = new BallsCollection();
let isCreatingNewBall = false;
let newX;
let newY;
const minRadius = 10;
const maxRadius = 60;
const defaultRadius = 20;
let radius = defaultRadius;

window.onload = function () {
    setInterval(draw, 10);
};
