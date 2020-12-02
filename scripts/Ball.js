class Ball {

    constructor(radius, mass) {
        this.radius = radius;
        this.mass = mass;
        this.v = {
            x: 5,
            y: 0
        }
        this.pos = {
            x: 20,
            y: 20
        }
        console.log(`Ball with ${this.radius} radius, ${this.mass} created!`);
        balls.add(this);
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
            ctx.arc(10, 10, ball.radius, 0, Math.PI*2);
            ctx.fillStyle = '#111111';
            ctx.fill();
            ctx.closePath();
            // ball.pos.x += 5;
            // ball.pos.y += 5;
        });
    }

}

