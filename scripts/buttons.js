/**
 * Funkcja służy do dodania nowej kulki.
 */
function addBall() {

  isCreatingNewBall = true;
  
  /*
    Zatrzymujemy wszystkie kulki i wyłączamy klikanie innyhc przycisków.
  */
  pauseBalls();
  document.querySelectorAll("button").forEach(
    button => button.disabled = true
  );

  /*
    Pojawiają się cztery EventListenery. Odblokowana zostaje możliwość
    ustawienia pozycji początkowej, promienia oraz ich zatwierdzenie.
    Dodatkowo możemy anulować dodawanie naciksając ESCAPE.
  */
  document.getElementById("canvas").addEventListener("mousemove", setPosition);
  document.getElementById("canvas").addEventListener("wheel", setRadius);
  document.getElementById("canvas").addEventListener("click", placeBall);
  document.addEventListener("keydown", cancel);

}


/**
 * Funkcja sprawdza czy kulka nie wychodzi poza ściany canvasa lub
 * czy nie styka się z kulkami już umieszczonymi.
 */
function checkIfAvaliable(x, y, radius) {

  isPlaceAvaliable = true;

  if (x - radius <= 0) {
    isPlaceAvaliable = false;
  } else if (x + radius >= canvasWidth) {
    isPlaceAvaliable = false;
  } else if (y - radius <= 0) {
    isPlaceAvaliable = false;
  } else if (y + radius >= canvasHeigth) {
    isPlaceAvaliable = false;
  }

  for (let ball of balls) {

    let distance = (ball.radius + radius) ** 2 - (
      (ball.pos.x - x) ** 2 + (ball.pos.y - y) ** 2
    );

    if (distance >= 0) {
      isPlaceAvaliable = false;
      break;
    }

  }

}


/**
 * Funkcja sprząta wszystkie pozostałości po dodawaniu kulki.
 */
function clean() {

  /*
    Usuwamy EventListenery.
  */
  const canvas = document.getElementById("canvas");
  canvas.removeEventListener("mousemove", setVelocity);
  canvas.removeEventListener("click", createBall);
  canvas.removeEventListener("keydown", cancel);
  document.removeEventListener("keydown", cancel);

  /*
    Resetujemy pozycję początkową kulki, żeby przy następnym dodawaniu kulki,
    nie pojawiała się stara. Wartość 1000 powoduje, że nowa kulka pojawia się
    "poza canvasem".
  */
  newX = newY = 1000;

  /* 
    Odblokowywujemy guziki i wznawiamy kulki.
  */
  document.querySelectorAll("button").forEach(
    button => button.disabled = false
  );
  resumeBalls();

  isCreatingNewBall = false;
  isSettingVelocity = false;

}


/**
 * Funkcja sluży do dodania nowej losowej kulki.
 */
function addRandomBall() {

  let randomRadius;
  let width;
  let height;

  /*
    Losujemy parametry, tak długo aż dostaniemy poprawne.
  */
  while (true) {

    randomRadius = Math.random() * (maxRadius - minRadius) + minRadius;
    width = Math.random() * (canvasWidth - 2 * randomRadius) + randomRadius;
    height = Math.random() * (canvasHeigth - 2 * randomRadius) + randomRadius;

    checkIfAvaliable(width, height, randomRadius);

    if (isPlaceAvaliable) {
      break;
    }

  }

  new Ball(randomRadius, width, height, Math.random() * 10 - 5, Math.random() * 10 - 5);

}


/**
 * Funkcja zatrzymuje wszystkie kulki.
 */
function pauseBalls() {

  balls.forEach(ball => ball.isPaused = true);

}


/**
 * Funkcja wznawia wszystkie kulki.
 */
function resumeBalls() {

  balls.forEach(ball => ball.isPaused = false);

}


/**
 * Funkcja zmienia prędkość wszystkich kulek na losową.
 */
function randomizeV() {

  balls.forEach(ball => {
    ball.v.x = Math.random() * 10 - 5;
    ball.v.y = Math.random() * 10 - 5;
  });

}


/**
 * Funkcja usuwa wszystkie kulki z tablicy balls.
 */
function clearBoard() {

  balls = [];

}


/**
 * Funkcja pokazuje okienko z pomocą.
 */
function help() {

  document.getElementById("options").style.display = "none";
  document.getElementById("help").style.display = "flex";

}


/**
 * Funkcja zamyka okno z pomocą i powraca do głównego menu.
 */
function returnToOptions() {

  document.getElementById("options").style.display = "flex";
  document.getElementById("help").style.display = "none";

}
