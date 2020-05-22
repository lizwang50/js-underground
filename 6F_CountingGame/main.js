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
// Seconds coundown timer
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
let numberA = getRandom(1,9);
let numberB = getRandom(1,9);
// default random operators obj
const values = Object.values(operator);
// operator rules
let randomOperators = values[parseInt(Math.random() * values.length)];
// results
let numbers = [numberA,randomOperators,numberB];
let answer;
let userAnswerStr;
divisionQuestion(randomOperators,numberA,numberB);
getAnswer(numbers);

// get a random number
function getRandom(min, max){
  return Math.floor(Math.random() * (max - min) + min);
};

// division
function divisionQuestion(d,a,b) {
  if (d == '/') {
    console.log('除法！');
    console.log(a,d,b);
    // numberA / numberB = answer
    // numberB * answer = numberA
    // answer = 100/numberB ~ 999/numberB
    // answer 最小值是比 10/numberB 大的整數
    // answer 最大值是比 999/numberB 小的整數
    answer = getRandom(Math.ceil(100/b), Math.floor(999/b));
    return answer
  }else{
    return randomQuestions();
  }
}

// start random questions
function randomQuestions() {
  let currentSec = timerSec.textContent;
  randomOperators = values[parseInt(Math.random() * values.length)];
  if (40 <= currentSec && currentSec < 60 ) {
    // 最大到 1 位數
    numberA = getRandom(1,9); 
    numberB = getRandom(1,9);
    console.log('40~60秒',numberA,numberB,answer);
  } else if (20 < currentSec && currentSec <= 39) {
    // 最大到 2 位數
    numberA = getRandom(10,99);
    numberB = getRandom(10,99);
    console.log('20~39秒',numberA,numberB,answer);
  } else if (0 < currentSec && currentSec <= 19) {
    // A 最大到 3 位數 ; B 最大 2 位數
    numberA = getRandom(100,999); 
    numberB = getRandom(10,99);
    console.log('0~19秒',numberA,numberB,answer);
  }
  divisionQuestion(randomOperators,numberA,numberB);
  updateQuestions(numberA,numberB);
  getAnswer(numbers);
}

function getAnswer(num) {
  answer  = Math.floor(eval(num.join("")));
  answer2 = num.join("");
  console.log(num,'=',answer);
}

// get users answers and random next questions
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


