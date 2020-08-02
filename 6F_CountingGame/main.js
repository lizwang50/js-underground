$('.start-button').on('click', function (e) {
  e.preventDefault()
  $( "section:nth-child(1)" ).addClass( "d-none" );
  $( "section:nth-child(2)" ).removeClass( "d-none" );
  timer();
})

// Set timer
const timerSec = document.querySelector('.timer-sec');
const timerMin = document.querySelector('.timer-min');
let seconds = 60;
let setTimer;
let setMinTimer;
// Minutes coundown timer
function countdownMin() {
  timerMin.textContent = `00`;
}

// Seconds coundown timer
function timer() {
  setMinTimer = setTimeout(countdownMin, 1000);
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
    isFinalScore();
    console.log('stopTimer')
    stopTimer();
    gameOver();
  }
}

// Stop timer 
function stopTimer() {
  clearInterval(setTimer);
}

// timer();


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
  // console.log('getRandom', min,max)
  return Math.floor(Math.random() * (max - min) + min);
};

function createNumbers(o,a,b) {
  console.log('3. 製作算式：',a,o,b)
    if (o == '/' && a % b !== 0){
      // console.log('4. 判斷算式：不可以回傳的除法');
      numberA = numberA - numberA % numberB ;
    }
      // console.log('4. 判斷算式：可以回傳算式');
      numbers = [numberA,randomOperators,numberB]
      updateQuestionsView();
      // console.log('5. 呈現算式：將算式呈現到畫面上之後 return numbers');
      return numbers
}

// random questions
function randomNumbers() {
  // console.log('1. 生成新的題目')
  randomOperators = values[parseInt(Math.random() * values.length)];
  if (40 <= seconds) {
    // 最大到 1 位數
    numberA = getRandom(1,9); 
    numberB = getRandom(1,9);
    console.log('第一階段: 40~60秒 題目：',numberA,numberB);
  } else if (20 <= seconds) {
    // 最大到 2 位數
    numberA = getRandom(10,99);
    numberB = getRandom(1,9);
    console.log('第二階段: 20~39秒',numberA,numberB);
  } else {
    // A 最大到 3 位數 ; B 最大 2 位數
    numberA = getRandom(100,999); 
    numberB = getRandom(10,99);
    console.log('第三階段: 0~19秒',numberA,numberB);
  }
  // console.log('2. 產生亂數題目(判斷除法答案)');
  createNumbers(randomOperators,numberA,numberB);
  getAnswer(numbers);
}

// get current answer
function getAnswer() {
  answer  = Math.floor(eval(numbers.join("")));
  console.log(answer);
  return answer;
}

// get users answers and random next questions
function getUsersAnswers() {
  userAnswerInput.addEventListener("keyup", function (event) {
    if (userAnswerInput.value !== '' && event.key === "Enter") {
      userAnswerStr = userAnswerInput.value;
      isScore(userAnswerStr);
      randomNumbers();
      updateQuestionsView();
      userAnswerInput.value = '';
      return userAnswerStr;
    }
  });
}

// update question
function updateQuestionsView() {
  questionView.textContent = `${numberA} ${randomOperators} ${numberB}`;
}

randomNumbers();
getUsersAnswers();

// get score!
let scoreView = document.querySelector('.score');
let score = 0;

function isScore(userAnswer) {
  console.log('isScore',answer,userAnswer);
  answerStr = `${answer}`;
  if (userAnswer == answerStr && 20 <= seconds) {
    score++;
  } else if (userAnswer == answerStr && 0 <= seconds){
    score += 5;
  } else {
    console.log('not match!!');
  }
  console.log(score);
  updateScore(score);
}

function updateScore(score) {
  console.log('updateScore',score);  
  if (score < 10) {
    scoreView.textContent = `00${score}`;
  }else if(score < 100){
    scoreView.textContent = `0${score}`;
  }else{
    console.log('no point');
  }
  return scoreView.textContent;
}

// get final score

let finalScore = document.querySelector('.final-score');

function isFinalScore() {
  const finalScoreNumber = score;
  if (seconds <= 0) {
    finalScore.textContent = `${finalScoreNumber}`;    
  }
}


// game over page
const gameOverSection = document.querySelector('.game-over');
const playGround = document.querySelector('.playground');

function gameOver(){
  gameOverSection.classList.remove("d-none");
  playGround.classList.add("d-none");
}

// restart game 
const tryAgainBtn = document.querySelector('.try-again');
tryAgainBtn.addEventListener('click',restartGame);

function restartGame(e) {
  e.preventDefault();
  console.log('restartGame');
  playGround.classList.remove("d-none");
  gameOverSection.classList.add("d-none");
  resetNumbers(); 
  randomNumbers();
}

function resetNumbers() {
  score = 0;
  scoreView.textContent = `000`;
  timerMin.textContent = `01`;
  seconds = 60;
  userAnswerInput.value = '';
}
