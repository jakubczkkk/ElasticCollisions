/**
 * 
 * @param {Ball} ball1 Pierwsza kulka biorąca udział w zderzeniu.
 * @param {Ball} ball2 Druga kulka biorąca udział w zderzeniu.
 * 
 * Na podstawie zasady zachowania pędu i zasady zachowania energii,
 * obliczane są nowe wartości prędkości kulek.
 */
function collision(ball1, ball2) {

  /**
   * 
   * @param {Object} v 
   * @param {Number} theta 
   * @returns {Object}
   * 
   * Funkcja dekonuje rotacji wektora prędkośc v o kąt theta
   */
  function rotate(v, theta) {
    return {
      x: v.x * Math.cos(theta) - v.y * Math.sin(theta),
      y: v.x * Math.sin(theta) + v.y * Math.cos(theta)
    };
  };

  let res = {
    x: ball1.v.x - ball2.v.x, 
    y: ball1.v.y - ball2.v.y
  };

  if (res.x * (ball2.pos.x - ball1.pos.x) + res.y * (ball2.pos.y - ball1.pos.y) >= 0) {

      const theta = -Math.atan2(ball2.pos.y - ball1.pos.y, ball2.pos.x - ball1.pos.x);

      const v1 = rotate(ball1.v, theta);
      const v2 = rotate(ball2.v, theta);

      const u1 = {
        x: v1.x * (ball1.m - ball2.m)/(ball1.m + ball2.m) + v2.x * 2 * ball2.m/(ball1.m + ball2.m),
        y: v1.y
      };
      const u2 = {
        x: v2.x * (ball2.m - ball1.m)/(ball1.m + ball2.m) + v1.x * 2 * ball1.m/(ball1.m + ball2.m),
        y: v2.y
      };

      ball1.v = rotate(u1, -theta);
      ball2.v = rotate(u2, -theta);

  }

}
