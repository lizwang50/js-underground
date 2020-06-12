// 1. 旋轉速度
// 1.1 wheel 會旋轉，然後停止。
const wheel = document.querySelector('.wheel');
const drawBtn = document.querySelector('#draw');
const stopDrawBtn = document.querySelector('#stopDraw');
const chosenPrizeShow = document.querySelector('.chosen-prize');
const counterShow = document.querySelector('.counter');
let animations;

const wheelRolling = [
  { transform: 'rotate(0)'},
  { transform: 'rotate(360deg)'}
];
const rollSetting = {
  duration: 1000,
  iterations: Infinity
}

function rollWheel() {
  animations = wheel.animate(
    wheelRolling,
    rollSetting
  )
}
function stopWheel() {
  animations.pause();
  if (prizeArr.length == 0 ) return
  console.log(prizeArr.length);
  chosenPrizeShow.textContent = prizeArr[0];
  deleteChosenPrize();
  console.log(prizeArr);
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
    prizeArr.push('Elephant','DataDog','formula');
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

console.log(wheel.nodeValue);
