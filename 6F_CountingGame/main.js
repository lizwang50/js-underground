$('.start-button').on('click', function (e) {
  e.preventDefault()
  // $( "section:nth-child(1)" ).addClass( "d-none" );
  // $( "section:nth-child(2)" ).removeClass( "d-none" );
})

const timerSec = document.querySelector('.timer-sec');
const timerMin = document.querySelector('.timer-min');
let seconds = 12;
let setTimer;

function timer() {
  setTimer = setInterval(countdownSec, 1000);  
  console.log(new Date(),14)
}

function countdownSec() {
  console.log(new Date(),18)
  if (countdownMin && seconds > 0) {
    seconds--;
    timerSec.textContent = `${seconds}`;
    console.log(new Date(),'22 - stop!!!')
  }
  console.log(new Date(),24)
}

function stopTimer() {
  clearInterval(setTimer);
}
timer();

function countdownMin() {
  timerMin.textContent = `00`;
}
setTimeout(countdownMin,1000);
