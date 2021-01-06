/**
 * 
 * @param {Event} e 
 * 
 * Funkcja anuluje dodawanie nowej funkcji po wciśnięciu ESCAPE.
 */
function cancel(e) {

  if (e.which === 27) {
    clean();
  }

}


/**
 * 
 * @param {Event} e 
 * 
 * Funkcja pobiera współrzędne myszki i zapisuje je jako współrzędne
 * aktualnie tworzonej kulki.
 */
function setPosition(e) {

  const rect = document.getElementById("canvas").getBoundingClientRect();
  newX = e.clientX - rect.left;
  newY = e.clientY - rect.top;

  checkIfAvaliable(newX, newY, newRadius);

}


/**
 * 
 * @param {Event} e 
 * 
 * Funkcja zmienia promień aktualnie tworzonej kulki przy pomocy scrolla w myszce.
 */
function setRadius(e) {

  e.preventDefault();

  newRadius -= e.deltaY * 0.01

  if (newRadius < minRadius) {
    newRadius = minRadius;
  } else if (newRadius > maxRadius) {
    newRadius = maxRadius;
  }

  checkIfAvaliable(newX, newY, newRadius);

}


/**
 * 
 * @param {Event} e 
 * 
 * Jeśli kulka znajduje się w dobrym miejscu, funkcja  zatwierdza pozycję
 * i promień, a następnie umożliwia wykonywanie kolejnych operacji koniecznych
 * do utworzenia nowej kulki.
 */
function placeBall(e) {

  if (isPlaceAvaliable) {

    /*
      Usuwamy możliwość zmiany położenia i promienia.
    */
    const canvas = document.getElementById("canvas");
    canvas.removeEventListener("mousemove", setPosition);
    canvas.removeEventListener("wheel", setRadius);
    canvas.removeEventListener("click", placeBall);

    /*
      Ustawiamy prędkości początkowe na 0
    */
    newVX = 0;
    newVY = 0;

    /*
      Umożliwiamy ustawienie i zatwierdzenie prędkości.
    */
    isSettingVelocity = true;
    canvas.addEventListener("mousemove", setVelocity);
    canvas.addEventListener("click", createBall);
  }

}


/**
 * 
 * @param {Event} e 
 * 
 * Funkcja pobiera współrzędne myszki i na ich podstawie wylicza prędkość.
 */
function setVelocity(e) {

  const rect = document.getElementById("canvas").getBoundingClientRect();
  /*
    Zmienne vXPosition i vYPosition przechowują współrzędne końca myszki.
    Odejmując te wartość od współrzędnych środka kulki, otrzymujemy długość
    wektora prędkośći.
    W celu zmniejszenia wartości wektora prędkości jest podzielony przez 10.
  */
  const vXPosition = (e.clientX - rect.left);
  const vYPosition = (e.clientY - rect.top);
  newVX = (newX - vXPosition) / 10;
  newVY = (newY - vYPosition) / 10;

}


/**
 * 
 * @param {Event} e 
 * 
 * Funkcja tworzy nową kulkę.
 */
function createBall(e) {

  new Ball(
    newRadius,
    newX,
    newY,
    -newVX / 2,
    -newVY / 2
  );

  clean();

}
