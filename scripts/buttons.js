function addBall() {

    isCreatingNewBall = true;
    pauseBalls();

    document.getElementById("canvas").addEventListener(
        "mousemove",
        getMouseCoords
    );

}

function getMouseCoords(e) {

    const rect = document.getElementById("canvas").getBoundingClientRect();
    newX = e.clientX - rect.left;
    newY = e.clientY - rect.top;

    document.getElementById("canvas").addEventListener(
        "click",
        placeBall
    )
}

function placeBall(e) {

    const rect = document.getElementById("canvas").getBoundingClientRect();
    newX = e.clientX - rect.left;
    newY = e.clientY - rect.top;

    new Ball(
        16,
        newX,
        newY,
        2,
        2
    );


    resumeBalls();
    isCreatingNewBall = false;
}

function addRandomBall() {

    if (balls.ballsList.length <= 15) {
        new Ball(
            Math.random() * 40 + 10,
            Math.random() * 600 - 50,
            Math.random() * 600 - 50,
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

}

let balls = new BallsCollection();
let isCreatingNewBall = false;
let newX;
let newY;

window.onload = function () {
    setInterval(draw, 10);
}