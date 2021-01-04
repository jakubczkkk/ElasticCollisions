/*
 * Plik zawiera wszsytkie zmienne globalne użyte w programie.
 * Oprócz tego uruchamia on główną funkcję rysują na canvasie.
 */

/*
  Stałe zawierające kody HEX zielonego i czerwonego, wykorzystywane
  m.in. do rysowanie wstawianych kulek.
*/
const AVALIABLE = "#2DC241";
const NOT_ABALIABLE = "#A31919";

/*
  Tablica przechowująca wszystkie utworzone kulki.
  Maksymalnie możemy ich przechowywać 20.
*/
let balls = [];
const maxBalls = 20;

/*
  Rozmiar canvasu.
*/
const canvasWidth = 750;
const canvasHeigth = 600;

/*
  Stałe określające dopuszczalne wartości promienia kulek.
   Ponadto zmienna radius przechowuje promień aktualnie wstawianej kulki.
*/
const minRadius = 5;
const maxRadius = 50;
const defaultRadius = 15;
let newRadius = defaultRadius;

/*
  Zmienne służące do czytanie współrzędnych myszki oraz późniejszemu ustawieniu
  początkowej wartości połóżenia oraz prędkości.
*/
let newX;
let newY;
let newVX;
let newVY;

/*
  Zmienne tyou boolean które informują nas o aktualnym stanie ustawiania
  nowej kulki na planszy.
*/
let isCreatingNewBall = false;
let isSettingVelocity = false;
let isPlaceAvaliable = true;

/*
  Zmienna przechowując indeks w tablicy aktualnego slajdu.
  UWAGA! Pierwszemu slajdowi odpowiada 0, drugiemu 1 itd.
*/
let currentSlide = 0;

/*
  Po załadowaniu strony, rozpoczynamy stałe wykonywanie funkcji draw()
*/
window.onload = function () {
  setInterval(draw, 10);
};
