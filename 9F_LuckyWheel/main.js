const circle = document.querySelector('.circle');
const drawBtn = document.querySelector('#draw');

function rollCircle() {
  circle.classList.add('rotate')
}

drawBtn.addEventListener('click',rollCircle);