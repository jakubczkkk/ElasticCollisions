class Ball {

    constructor(radius, posX, posY, vX, vY) {

        this.radius = radius;
        this.isInCollision = false;
        this.isPaused = false;
        this.v = {
            x: vX,
            y: vY
        }
        this.pos = {
            x: posX,
            y: posY
        }

        if ((this.pos.x - this.radius) <= 0 || (this.pos.x + this.radius) >= 600 ||
            (this.pos.y - this.radius) <= 0 || (this.pos.y + this.radius) > 600) {
            console.log("bad ball");
            addRandomBall();
        } else {
            console.log(`ball created`);
            balls.add(this);
        }

    }

    checkWallCollision() {
        if ((this.pos.x - this.radius) <= 0 || (this.pos.x + this.radius) >= 600) {
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
            if (this !== ball && !this.isInCollision && !ball.isInCollision && this.isInCollisionArea(ball)) {
                console.log("boom ball");
                this.isInCollision = ball.isInCollision = true;
                collision(this, ball);
            }
        });

    }

    isInCollisionArea(ball) {

        return Math.sqrt((this.pos.x - ball.pos.x) ** 2 + (this.pos.y - ball.pos.y) ** 2)
            < (this.radius + ball.radius);

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

    balls.ballsList.forEach(ball => ball.isInCollision = false);

    balls.ballsList.forEach(ball => {
        ctx.beginPath();
        ctx.arc(ball.pos.x, ball.pos.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#222222';
        ctx.fill();
        ctx.closePath();
        if (!ball.isPaused) {
            ball.pos.x += ball.v.x;
            ball.pos.y += ball.v.y;
        }
        ball.checkWallCollision();
        ball.checkBallCollision(balls.ballsList);
    });

}