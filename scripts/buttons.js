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

function clearBoard() {
    balls.ballsList = [];
}

function showAddBall() {
    document.getElementById("addBall").style.display = "block";
    document.getElementById("showAddBall").style.background = "#FFAD36";

    document.getElementById("randomizeV").style.display = "none";
    document.getElementById("showRandomizeV").style.background = "white";

    document.getElementById("clearBoard").style.display = "none";
    document.getElementById("showClear").style.background = "white";

    document.getElementById("getHelp").style.display = "none";
    document.getElementById("showHelp").style.background = "white";

}

function showRandomizeV() {
    document.getElementById("addBall").style.display = "none";
    document.getElementById("showAddBall").style.background = "white";

    document.getElementById("randomizeV").style.display = "block";
    document.getElementById("showRandomizeV").style.background = "#FFAD36";

    document.getElementById("clearBoard").style.display = "none";
    document.getElementById("showClear").style.background = "white";

    document.getElementById("getHelp").style.display = "none";
    document.getElementById("showHelp").style.background = "white";
}

function showClearBoard() {
    document.getElementById("addBall").style.display = "none";
    document.getElementById("showAddBall").style.background = "white";

    document.getElementById("randomizeV").style.display = "none";
    document.getElementById("showRandomizeV").style.background = "white";

    document.getElementById("clearBoard").style.display = "block";
    document.getElementById("showClear").style.background = "#FFAD36";

    document.getElementById("getHelp").style.display = "none";
    document.getElementById("showHelp").style.background = "white";
}

function showHelp() {
    document.getElementById("addBall").style.display = "none";
    document.getElementById("showAddBall").style.background = "white";

    document.getElementById("randomizeV").style.display = "none";
    document.getElementById("showRandomizeV").style.background = "white";

    document.getElementById("clearBoard").style.display = "none";
    document.getElementById("showClear").style.background = "white";

    document.getElementById("getHelp").style.display = "block";
    document.getElementById("showHelp").style.background = "#FFAD36";
}


let balls = new BallsCollection();

window.onload = function () {
    setInterval(balls.draw, 10);
}