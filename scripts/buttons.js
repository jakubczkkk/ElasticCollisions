function addBall() {

    const radius = document.getElementById("radiusInput").value;
    // const mass = document.getElementById("massInput").value;

    let posX = Number.parseFloat(document.getElementById("xStartInput").value);
    let posY = Number.parseFloat(document.getElementById("yStartInput").value);

    const vX = Number.parseFloat(document.getElementById("vxStartInput").value);
    const vY = Number.parseFloat(document.getElementById("vyStartInput").value);

    new Ball(radius, 0, posX, posY, vX, vY);

}

function getMouseCoords(evt) {
    console.log(`${evt.clientX} ${evt.clientY}`);
}

function addRandomBall() {

    new Ball(
        Math.random() * 40 + 10,
        0,
        Math.random() * 500 - 50,
        Math.random() * 500 - 50,
        Math.random() * 10 -5,
        Math.random() * 10 -5
    );

}

function randomizeV() {
    balls.ballsList.forEach(ball => {
        ball.v.x = (20 * Math.random()) - 10;
        ball.v.y = (20 * Math.random()) - 10;
    });
}

function showAddBall() {
    document.getElementById("addBall").style.display = "block";
    document.getElementById("randomizeV").style.display = "none";
}

function showRandomizeV() {
    document.getElementById("addBall").style.display = "none";
    document.getElementById("randomizeV").style.display = "block";
}

let balls = new BallsCollection();

window.onload = function () {
    setInterval(balls.draw, 10);
}