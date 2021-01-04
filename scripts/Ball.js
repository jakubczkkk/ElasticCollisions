/**
 * Klasa Ball identyfikuje kulki znajdujące się na planszy.
 */
class Ball {

  /**
   * 
   * @param {*} radius Promień
   * @param {*} posX Pozycja początkowa kulki na osi X
   * @param {*} posY Pozycja początkowa kulki na osi Y
   * @param {*} vX Prędkość początkowa kulki na osi X
   * @param {*} vY Prędkość początkowa kulki na osi Y
   */
  constructor(radius, posX, posY, vX, vY) {

    this.radius = radius;
    this.isPaused = false;
    this.pos = {
      x: posX,
      y: posY
    };
    this.v = {
      x: vX,
      y: vY
    };

    /*
      Przyjmujemy gętość kulki równą 1, więc jej masa to jej pole.
      (m = P = pi * r * r)
    */
    this.m = Math.PI * this.radius ** 2;

    /*
      Dodajemy nowo utworzoną kulkę do tablicy balls, tylko jeśli
      nie przekraczamy ich maksymalnego limitu.
    */
    if (balls.length <= maxBalls) { 
      balls.push(this);
    } else {
      alert(`Za dużo kulek na planszy. Maksymalnie może ich być ${maxBalls}.`);
    }

  }

  /**
   * Funkcja sprawdza czy doszło do kolizji kulki ze ścianą.
   * Jeśli tak przyjmujemy że kulka odbija się od niej bez żadnych strat
   * w energii.
   */
  wallCollision() {
    if (this.pos.x - this.radius <= 0) {
      this.pos.x = this.radius;
      this.v.x *= -1;
    } else if (this.pos.x + this.radius >= canvasWidth) {
      this.pos.x = canvasWidth - this.radius;
      this.v.x *= -1;
    } else if (this.pos.y - this.radius <= 0) {
      this.pos.y = this.radius;
      this.v.y *= -1;
    } else if (this.pos.y + this.radius >= canvasHeigth) {
      this.pos.y = canvasHeigth - this.radius;
      this.v.y *= -1;
    }
  }

  /**
   * Funkcja sprawdza czy doszło do kolizi z którąś z innych kulek.
   * Jeśli tak wywołana zostaje funkcja collision().
   */
  checkBallCollision() {

    balls.forEach(ball => {
      if (this !== ball && this.isInCollisionArea(ball)) {
        collision(this, ball);
      }
    });

  }


  /**
   * 
   * @param {Ball} ball Kulka z którą sprawdzamy czy nastąpi zderzenie.
   * @returns {boolean}
   * 
   * Funkcja oblicza pomiędzy środkami this i ball. Jeśli jest ona mniejsza
   * niż suma ich promieni, to następuje zderzenie.
   */
  isInCollisionArea(ball) {

    return (
      Math.sqrt((this.pos.x - ball.pos.x) ** 2
              + (this.pos.y - ball.pos.y) ** 2)
            <= (this.radius + ball.radius)
    );

  }

}
