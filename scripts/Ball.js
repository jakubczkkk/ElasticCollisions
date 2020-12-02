class Ball {

    constructor(radius, mass) {
        this.radius = radius;
        this.mass = mass;
        this.v = {
            x: 2,
            y: 1
        }
        this.pos = {
            x: 20,
            y: 20
        }
        console.log(`Ball with ${this.radius} radius, ${this.mass} created!`);
        balls.add(this);
    }

    checkWallCollision() {
        if (this.pos.x < 0 || this.pos.x > 600) {
            this.v.x *= -1;
        }
        if (this.pos.y < 0 || this.pos.y > 600) {
            this.v.y *= -1;
        }
    }

    checkBallCollision(balls) {

        balls.forEach(ball => {
            if (this !== ball && this.isInCollisionArea(ball)) {
                console.log("BOOM");
                this.v.x *= -1;
                this.v.y *= -1;
            }
        });

    }

    isInCollisionArea(ball) {
        return ((this.pos.x - ball.pos.x) ** 2 + (this.pos.y - ball.pos.y) ** 2) <= (this.radius + ball.radius);
    }

}

class BallsCollection {

    constructor() {
        this.ballsCollection = [];
    }

    add(ball) {
        this.ballsCollection.push(ball);
    }

    draw() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        balls.ballsCollection.forEach(ball => {
            ctx.beginPath();
            ctx.arc(ball.pos.x, ball.pos.y, ball.radius, 0, Math.PI*2);
            ctx.fillStyle = '#111111';
            ctx.fill();
            ctx.closePath();
            ball.pos.x += ball.v.x;
            ball.pos.y += ball.v.y;
            ball.checkWallCollision();
            ball.checkBallCollision(balls.ballsCollection);
        });
    }

}

