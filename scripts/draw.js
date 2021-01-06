/**
 * Funkcja służy do narysowania aktualnego stanu planszy na canvasie.
 */
function draw() {

  /*
    Przypisujemy canvas do zmiennej, a następnie czyścimy go z poprzedniego
    stanu.
  */
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* 
    Rysujemy kulki poruszając się po tablicy balls.
  */
  balls.forEach(ball => {

    /*
      Najpierw sprawdzamy czy doszło do kolizji z innymi kulkami lub ścianą
    */
    ball.wallCollision();
    ball.checkBallCollision();

    /*
      Jeśli kulki nie są zatrzymany, to zmieniamy ich pozycje.
      Przyrost czasu przyjęty został jako 1, więc wystarczy dodać prędkość do
      położenia.
      (x_new = x_old + v * dt = x_old + v * 1 = x_old + v)
    */
    if (!ball.isPaused) {
      ball.pos.x += ball.v.x;
      ball.pos.y += ball.v.y;
    }

    ctx.beginPath();
    ctx.fillStyle = "#05386B";
    ctx.arc(ball.pos.x, ball.pos.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

  });

  /*
    Ta część funkcji odpowiada za narysowanie kulki którą właśnie umieszcamy
    na planszy.
  */
  if (isCreatingNewBall) {
    ctx.beginPath();
    ctx.fillStyle = isPlaceAvaliable ? AVALIABLE : NOT_ABALIABLE;
    ctx.arc(newX, newY, newRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  /*
    Jeśli ustawiamy prędkość kulki, to rysujemy wektor prędkości.
  */
  if (isSettingVelocity) {

    /*
      Liczymy współrzędne końca wektora oraz kąt jaki tworzy on w 
      stosunku układu canvasu. 
    */
    const topX = newX - newVX * 10;
    const topY = newY - newVY * 10;
    const angle = Math.atan2(newVY, newVX);

    ctx.lineWidth = 2;
    ctx.strokeStyle = NOT_ABALIABLE;
    ctx.fillStyle = NOT_ABALIABLE;

    /* 
      Linia łącząca wierzchołek wektora ze środkiem kulki.
    */
    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.lineTo(newX, newY);
    ctx.stroke();

    /*
      Na końcu dodajemy strzałkę do wektora korzystając z rotacji układu.
    */
    ctx.beginPath();
    ctx.translate(topX, topY);
    ctx.moveTo(0, 0);
    ctx.rotate(angle);
    ctx.lineTo(10, 5);
    ctx.lineTo(10, -5);
    ctx.fill();

    /*
      Ostatnim krokiem jest powrót to pierwotnego układu po narysowaniu
      strzałki.
    */
    ctx.setTransform(1, 0, 0, 1, 0, 0);

  }

}
