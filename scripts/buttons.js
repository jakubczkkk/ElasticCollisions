function addBall() {

    const radius = document.getElementById("radiusInput").value;
    const mass = document.getElementById("massInput").value;

    const ball = new Ball(radius, mass);

    const svg = document.getElementById("canvas");
    svg.innerHTML += `<circle id='ball' cx='100', cy='100', r=${ball.radius}></circle>`;

}

let balls = new BallsCollection();

window.onload = function () {
    balls.add(new Ball(10, 10));
    setInterval(balls.draw, 50);
}