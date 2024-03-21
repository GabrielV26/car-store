var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";

  // Agendar a próxima mudança de slide após 5 segundos
  setTimeout(function() {
    plusSlides(1); // Avança para o próximo slide
  }, 5000); // 5000 milissegundos = 5 segundos
}
