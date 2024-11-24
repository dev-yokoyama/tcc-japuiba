const animacao = localStorage.getItem('animacao');
const logo = document.querySelector('.logo');

if (animacao) {
  window.location.href = './html/inicio.html';
} else {
  logo.addEventListener('animationend', () => { 
    localStorage.setItem('animacao', true);
    window.location.href = './html/inicio.html';
  });
}
