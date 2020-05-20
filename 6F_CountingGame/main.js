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
}

function countdownSec() {
  console.log('1')
  seconds--;
  if (countdownMin && seconds >= 10) {
    timerSec.textContent = `${seconds}`;
    console.log('2')
  }else if(0 <= seconds && seconds <= 9){
    console.log('3')
    timerSec.textContent = `0${seconds}`;
  }else{
    console.log('stopTimer')
    stopTimer();
  }
}

function stopTimer() {
  clearInterval(setTimer);
}
timer();

function countdownMin() {
  timerMin.textContent = `00`;
}
setTimeout(countdownMin,1000);
