$('.start-button').on('click', function (e) {
  e.preventDefault()
  // $( "section:nth-child(1)" ).addClass( "d-none" );
  // $( "section:nth-child(2)" ).removeClass( "d-none" );
})
//跨 function 使用變數的方法
//1. 宣告在 function 外
//2. 放在參數傳遞

// Set timer
const timerSec = document.querySelector('.timer-sec');
const timerMin = document.querySelector('.timer-min');
let seconds = 60;
let setTimer;
// Minutes coundown timer
function countdownMin() {
  timerMin.textContent = `00`;
}
setTimeout(countdownMin, 1000);

// Seconds coundown timer
function timer() {
  setTimer = setInterval(countdownSec, 1000);
}

function countdownSec() {
  // console.log('1')
  seconds--;
  if (countdownMin && seconds >= 10) {
    timerSec.textContent = `${seconds}`;
    // console.log('2')
  } else if (0 <= seconds && seconds <= 9) {
    // console.log('3')
    timerSec.textContent = `0${seconds}`;
  } else {
    console.log('stopTimer')
    stopTimer();
  }
}

// Stop timer 
function stopTimer() {
  clearInterval(setTimer);
}
timer();


// Random number
const questionView = document.querySelector('.question-view');
const userAnswerInput = document.querySelector('.answer');
const operator = {
  " ": "+",
  "-": "-",
  "x": "*",
  "÷": "/",
}
// default random numbers
let numberA = Math.ceil(Math.random() * 10);
let numberB = Math.ceil(Math.random() * 10);
// default random operators obj
const values = Object.values(operator);
let randomOperators = values[parseInt(Math.random() * values.length)];
let numbers = [numberA,randomOperators,numberB];

let answer;
let userAnswerStr;

function getRandom(min, max){
  numberA = Math.ceil(Math.random() * (max - min) + min); // 最大到 3 位數
  numberB = Math.ceil(Math.random() * (max - min) + min);  // 最大到 3 位數
};

function randomQuestions() {
  let currentSec = timerSec.textContent;
  randomOperators = values[parseInt(Math.random() * values.length)];
  updateQuestions(numberA,numberB);
  if (40 <= currentSec && currentSec < 60 ) {
    getRandom(1,9);     
  } else if (20 < currentSec && currentSec <= 39) {
    getRandom(10,99);   
  } else if (0 < currentSec && currentSec <= 19) {
    getRandom(100,999); 
  }
  console.log(numbers);
  
  getAnswer(numbers);
}

function getAnswer(num) {
  answer  = num.join("")
  answer2 = eval(num.join(""));
  answer3 = Math.ceil(eval(num.join("")));
  console.log(answer);
}

function getUsersAnswers() {
  userAnswerInput.addEventListener("keyup", function (event) {
    if (userAnswerInput.value !== '' && event.key === "Enter") {
      randomQuestions();
      userAnswerStr = userAnswerInput.value;
      return userAnswerInput.value = '';
    }
  });
}

function updateQuestions() {
  questionView.textContent = `${numberA} ${randomOperators} ${numberB}`;
  getUsersAnswers();
}

updateQuestions();


