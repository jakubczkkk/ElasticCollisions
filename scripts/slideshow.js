let currentSlide = 0;

function changeSlide(n) {

  currentSlide += n;
  console.log(currentSlide);

  const slides = document.getElementsByClassName("slide");

  if (currentSlide === slides.length - 1) {
    document.getElementById("next").onclick = () => {};
  } if (currentSlide === slides.length - 2) {
    document.getElementById("next").onclick = () => { changeSlide(1); }
  } if (currentSlide === 1) {
    document.getElementById("prev").onclick = () => { changeSlide(-1); }
  } if (currentSlide === 0) {
    document.getElementById("prev").onclick = () => {};
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[currentSlide].style.display = "flex";

}
