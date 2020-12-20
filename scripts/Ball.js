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

    this.m = Math.PI * this.radius ** 2;

    if ((this.pos.x - this.radius) <= 0 || (this.pos.x + this.radius) >= 750 ||
      (this.pos.y - this.radius) <= 0 || (this.pos.y + this.radius) > 600) {
      console.log("bad ball");
      addRandomBall();
    } else {
      console.log(`ball created`);
      balls.push(this);
    }

  }

  wallCollision() {
    if (this.pos.x - this.radius <= 0) {
      this.pos.x = this.radius;
      this.v.x *= -1;
    } else if (this.pos.x + this.radius >= 750) {
      this.pos.x = 750 - this.radius;
      this.v.x *= -1;
    } else if (this.pos.y - this.radius <= 0) {
      this.pos.y = this.radius;
      this.v.y *= -1;
    } else if (this.pos.y + this.radius >= 600) {
      this.pos.y = 600 - this.radius;
      this.v.y *= -1;
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

function collision(ball1, ball2) {
  // ball1.v.x *= -1;
  // ball1.v.y *= -1;
  // ball2.v.x *= -1;
  // ball2.v.y *= -1;
}

function draw() {

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach(ball => {

    ball.wallCollision();
    ball.checkBallCollision(balls);

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

  if (isSettingVelocity) {
    ctx.beginPath();
    ctx.moveTo(newX, newY);
    ctx.lineTo(vxposition, vyposition);
    ctx.stroke();
    ctx.closePath();
  }

}