class Ball {

    constructor(radius, posX, posY, vX, vY) {

        this.radius = radius;
        this.isPaused = false;
        this.v = {
            x: vX,
            y: vY
        }
        this.pos = {
            x: posX,
            y: posY
        }

        if ((this.pos.x - this.radius) <= 0 || (this.pos.x + this.radius) >= 750 ||
            (this.pos.y - this.radius) <= 0 || (this.pos.y + this.radius) > 600) {
            console.log("bad ball");
            addRandomBall();
        } else {
            console.log(`ball created`);
            balls.add(this);
        }

    }

    checkWallCollision() {
        if ((this.pos.x - this.radius) <= 0 || (this.pos.x + this.radius) >= 750) {
            console.log("boom wall");
            this.v.x *= -1;
        }
        if ((this.pos.y - this.radius) <= 0 || (this.pos.y + this.radius) > 600) {
            this.v.y *= -1;
            console.log("boom wall");
        }
    }

    checkBallCollision(balls) {

        balls.forEach(ball => {
            if (this !== ball && this.isInCollisionArea(ball)) {
                console.log("boom ball");
                collision(this, ball);
            }
        });

    }

    isInCollisionArea(ball) {

        return Math.sqrt((this.pos.x - ball.pos.x) ** 2 + (this.pos.y - ball.pos.y) ** 2)
            <= (this.radius + ball.radius);

    }

}

class BallsCollection {

    constructor() {
        this.ballsList = [];
    }

    add(ball) {
        this.ballsList.push(ball);
    }

}

function collision(ball1, ball2) {
    ball1.v.x *= -1;
    ball1.v.y *= -1;
    ball2.v.x *= -1;
    ball2.v.y *= -1;
}

function draw() {

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.ballsList.forEach(ball => {

        ball.checkWallCollision();
        ball.checkBallCollision(balls.ballsList);
        if (!ball.isPaused) {
            ball.pos.x += ball.v.x;
            ball.pos.y += ball.v.y;
        }

        ctx.beginPath();
        ctx.arc(ball.pos.x, ball.pos.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#222222';
        ctx.fill();
        ctx.closePath();

    });

    if (isCreatingNewBall) {
        ctx.beginPath();
        ctx.fillStyle = '#555555';
        ctx.arc(newX, newY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

}