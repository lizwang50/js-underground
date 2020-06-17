// 1. 旋轉速度
// 1.1 wheel 會旋轉，然後停止。
const wheel = document.querySelector('.wheel');
const drawBtn = document.querySelector('#draw');
const stopDrawBtn = document.querySelector('#stopDraw');
const chosenPrizeShow = document.querySelector('.chosen-prize');
const counterShow = document.querySelector('.counter');
let animations;

let wheelRolling;
let rollSetting;

function rollWheel() {
  drawBtn.classList.add('d-none');
  stopDrawBtn.classList.remove('d-none');
  wheelRolling = [
    { transform: 'rotate(0deg)'},
    { transform: 'rotate(360deg)'}
  ];
  rollSetting = {
    duration: 1000,
    iterations: 9999
  }
  animations = wheel.animate(
    wheelRolling,
    rollSetting
  )
}
function stopWheel() {
  console.log('-stopWheel-');
  drawBtn.classList.remove('d-none');
  stopDrawBtn.classList.add('d-none');
  choosePrize(prizeArr[0]);
  if (prizeArr.length == 0 ) return
  chosenPrizeShow.textContent = prizeArr[0];
  deleteChosenPrize();
}

drawBtn.addEventListener('click',rollWheel);
stopDrawBtn.addEventListener('click',stopWheel);

// 2. 列出所有獎品陣列(隨機排序)
// 2.1 點選按鈕次數會減少。且不能小於 0。
// 2.2 選過的獎品就不能再選。
let prizeArr = [];

function createPrizeArr() {
  prizeArr.push('Apple');
  for (let i = 0; i < 3; i++) {
    prizeArr.push('Banana','Cherry');
  }
  for (let i = 0; i < 5; i++) {
    prizeArr.push('Elephant','DataDog','Formula');
  }
  shuffle(prizeArr);
  console.log(prizeArr,'totalLength :',prizeArr.length);
  return prizeArr
}
createPrizeArr();
// Fisher-Yates Shuffle
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function deleteChosenPrize() {
  prizeArr.shift();
  counterShow.textContent = prizeArr.length;
}

// 3. 拿到選出來的獎品。
// 3.1 轉盤上的每個獎品分別在幾度的位置上
// 3.2 比對一致，則讓該獎品對準箭頭。

function choosePrize(prz) {
  console.log('-choosePrize-');
  if (prz == 'Apple') {
    console.log('Apple');
    countWheelAngle(60);
  }
  if(prz == 'Banana'){
    console.log('Banana');
    countWheelAngle(0);
  }
  if(prz == 'Cherry'){
    console.log('Cherry');
    countWheelAngle(300);
  }
  if(prz == 'DataDog'){
    console.log('DataDog');
    countWheelAngle(240);
  }
  if(prz == 'Elephant'){
    console.log('Elephant');
    countWheelAngle(180);
  }
  if(prz == 'Formula'){
    console.log('Formula');
    countWheelAngle(120);
  }
}

function countWheelAngle(angle) {
  console.log(angle);
  console.log('-countWheelAngle-');
  // x 毫秒轉幾度
  let currentTime = animations.currentTime;
  animations.finish();
  let pauseAngle = currentTime * 0.36 % 360;
  wheelRolling = [
    { transform: `rotate(${pauseAngle}deg)`},
    { transform: `rotate(${angle}deg)`}
  ];
  console.log(wheelRolling[1]);
  rollSetting = {
    duration: 3000,
    iterations: 1,
    fill: 'forwards'
  }
  animations = wheel.animate(
    wheelRolling,
    rollSetting
  )
}
