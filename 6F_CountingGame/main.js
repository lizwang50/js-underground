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
  "+": "+",
  "-": "-",
  "x": "*",
  "÷": "/",
}
// default random operators obj
const values = Object.values(operator);
let randomOperators;
// default random numbers
let numberB;
let numberA;
// results
let numbers = [];
let answer;
let userAnswerStr;

// get a random number
function getRandom(min, max){
  console.log('getRandom', min,max)
  return Math.floor(Math.random() * (max - min) + min);
};

function createNumbers(o,a,b) {
  console.log('createNumbers', o,a,b)
    // 如果是除法，而且 a / b 有餘數，不可以回傳
    if (o == '/' && a % b !== 0){
      console.log('不可以回傳的除法');
      randomQuestions();
      console.log('重跑另外一個算式');
      updateQuestionsView();  
    }else{
      console.log('2 : 可以回傳算式');
      getAnswer(numbers);
    }
}

// start question
function startQuestion() {
  console.log('startQuestion');
  //default question
  numberA = getRandom(1,9); 
  numberB = getRandom(1,9);
  console.log('get A B! AB 是 1~9 的亂數');
  // operator rules
  randomOperators = values[parseInt(Math.random() * values.length)];
  if (randomOperators == '/' && numberA % numberB !== 0){
    console.log('1 : 不可以回傳的除法');
    randomQuestions();
    console.log('重跑另外一個算式');
    updateQuestionsView();
  }else{
    console.log('1 : 可以回傳算式');
    getAnswer(numbers);
  }
}

// random questions
function randomQuestions() {
  console.log('randomQuestions')
  let currentSec = timerSec.textContent;
  randomOperators = values[parseInt(Math.random() * values.length)];
  if (40 <= currentSec && currentSec < 60 ) {
    // 最大到 1 位數
    numberA = getRandom(1,9); 
    numberB = getRandom(1,9);
    // console.log('40~60秒',numberA,numberB);
  } else if (20 < currentSec && currentSec <= 39) {
    // 最大到 2 位數
    numberA = getRandom(10,99);
    numberB = getRandom(10,99);
    // console.log('20~39秒',numberA,numberB);
  } else if (0 < currentSec && currentSec <= 19) {
    // A 最大到 3 位數 ; B 最大 2 位數
    numberA = getRandom(100,999); 
    numberB = getRandom(10,99);
    // console.log('0~19秒',numberA,numberB);
  }
  createNumbers(randomOperators,numberA,numberB);
}

function getAnswer(num) {
  console.log('getAnswer',num)
  answer  = Math.floor(eval(num.join("")));
  // console.log(num,'=',answer);
}

// get users answers and random next questions
function getUsersAnswers() {
  console.log('getUsersAnswers')
  userAnswerInput.addEventListener("keyup", function (event) {
    if (userAnswerInput.value !== '' && event.key === "Enter") {
      randomQuestions();
      userAnswerStr = userAnswerInput.value;
      console.log(userAnswerStr,'is user typing');
      return userAnswerInput.value = '';
    }
  });
}

function updateQuestionsView() {
  // console.log('updateQuestionsView');
  questionView.textContent = `${numberA} ${randomOperators} ${numberB}`;
  // getUsersAnswers();
  // console.log(randomOperators);
}

// get question and answer
// getAnswer(numbers);
startQuestion();
randomQuestions();
createNumbers(randomOperators,numberA,numberB);
// console.log(numbers,'=',answer,'default');
