/**
 * 
 * @param {Number} n Informuje o tym o ile slajdów przechodzimy.
 * 
 * Funkcja służy do zmiany aktualnego slajdu. Jeśli n jest mniejsze od zera,
 * przechodzimy slajdami w lewo, jeśli n jest większe, to przechodzimy w prawo. 
 * 
 */
function changeSlide(n) {

  currentSlide += n;
  console.log(currentSlide);

  const slides = document.getElementsByClassName("slide");

  /* 
    Sprawdzamy czy znajdujemy się w pobliżu początku lub końca.
    Jeśli tak, należy zablokować odpowiednie guziki zmiany slajdu, żeby uniknąć
    wyjścia poza zakres.
  */ 
  if (currentSlide === slides.length - 1) {
    document.getElementById("next").disabled = true;

  } if (currentSlide === slides.length - 2) {
    document.getElementById("next").disabled = false;

  } if (currentSlide === 1) {
    document.getElementById("prev").disabled = false;

  } if (currentSlide === 0) {
    document.getElementById("prev").disabled = true;
  }

  /*
    Ukrywamy wszystkie slajdy i pozakujemy tylko wybrany.
  */
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[currentSlide].style.display = "flex";

}
