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
    Jeśli tak, należy ukryć odpowiednie guziki zmiany slajdu, żeby uniknąć
    wyjścia poza zakres.
  */ 
  if (currentSlide === slides.length - 1) {
    document.getElementById("next").onclick = () => {};
    document.getElementById("next").display = "none";

  } if (currentSlide === slides.length - 2) {
    document.getElementById("next").onclick = () => { changeSlide(1); }
    document.getElementById("next").display = "block";

  } if (currentSlide === 1) {
    document.getElementById("prev").onclick = () => { changeSlide(-1); }
    document.getElementById("prev").display = "block";

  } if (currentSlide === 0) {
    document.getElementById("prev").onclick = () => {};
    document.getElementById("prev").display = "none";
  }

  /*
    Ukrywamy wszystkie slajdy i pozakujemy tylko wybrany.
  */
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[currentSlide].style.display = "flex";

}
