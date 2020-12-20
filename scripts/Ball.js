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

    if (balls.length <= 16) { 
      balls.push(this);
    } else {
      alert("Too much balls on board");
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

  let res = [ball1.v.x - ball2.v.x, ball1.v.y - ball2.v.y];
  if (res[0] * (ball2.pos.x - ball1.pos.x) + res[1] * (ball2.pos.y - ball1.pos.y) >= 0) {
      const m1 = ball1.m
      const m2 = ball2.m
      const theta = -Math.atan2(ball2.pos.y - ball1.pos.y, ball2.pos.x - ball1.pos.x);
      const v1 = rotate([ball1.v.x, ball1.v.y], theta);
      const v2 = rotate([ball2.v.x, ball2.v.y], theta);
      const u1 = rotate([v1[0] * (m1 - m2)/(m1 + m2) + v2[0] * 2 * m2/(m1 + m2), v1[1]], -theta);
      const u2 = rotate([v2[0] * (m2 - m1)/(m1 + m2) + v1[0] * 2 * m1/(m1 + m2), v2[1]], -theta);
      
      ball1.v.x = u1[0];
      ball1.v.y = u1[1];
      ball2.v.x = u2[0];
      ball2.v.y = u2[1];
  }

}

function rotate(v, theta) {
  return [
    v[0] * Math.cos(theta) - v[1] * Math.sin(theta),
    v[0] * Math.sin(theta) + v[1] * Math.cos(theta)
  ];
};

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

  newBallColor = isPlaceAvaliable ? AVALIABLE : NOT_ABALIABLE;

  if (isCreatingNewBall) {
    ctx.beginPath();
    ctx.fillStyle = newBallColor;
    ctx.arc(newX, newY, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  if (isSettingVelocity) {

    const topX = newX - vx * 10;
    const topY = newY - vy * 10;
    const angle = Math.atan2(vy, vx);

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'darkred';

    ctx.beginPath();   
    ctx.moveTo(topX, topY);    
    ctx.lineTo(newX, newY);  
    ctx.stroke();    
    
    ctx.beginPath();
    ctx.translate(topX, topY);
    ctx.moveTo(0, 0);
    ctx.rotate(angle);
    ctx.lineTo(15, 10);
    ctx.stroke();
    ctx.moveTo(0, 0);
    ctx.lineTo(15, -10);
    ctx.stroke();

    ctx.setTransform(1,0,0,1,0,0);

  }

}