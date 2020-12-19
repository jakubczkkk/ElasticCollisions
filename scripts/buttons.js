function addBall() {

    const radius = document.getElementById("radiusInput").value;

    let posX = Number.parseFloat(document.getElementById("xStartInput").value);
    let posY = Number.parseFloat(document.getElementById("yStartInput").value);

    const vX = Number.parseFloat(document.getElementById("vxStartInput").value);
    const vY = Number.parseFloat(document.getElementById("vyStartInput").value);

    new Ball(radius, posX, posY, vX, vY);

}

function getMouseCoords(evt) {
    console.log(`${evt.clientX} ${evt.clientY}`);
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

function stopBalls() {

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

function showOption(selectedDivId) {

    for (let div of document.getElementsByClassName('optionButton')) {

        if (div.id === selectedDivId + 'Option') {
            div.style.background = "#FFAD36";
        } else {
            div.style.background = "white";
        }

    }

    for (let div of document.getElementsByClassName('optionDiv')) {

        if (div.id === selectedDivId + 'Div') {
            div.style.display = "block";
        } else {
            div.style.display = "none";
        }

    }

}

let balls = new BallsCollection();

window.onload = function () {
    setInterval(draw, 10);
}