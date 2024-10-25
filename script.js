let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function moveSlide(n) {
    showSlide(slideIndex += n);
}

function showSlide(n) {
    if (n >= slides.length) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach((slide, index) => {
        slide.style.display = (index === slideIndex) ? 'block' : 'none';
    });
}

showSlide(slideIndex);

setInterval(function() {
    moveSlide(1);
}, 10000);
