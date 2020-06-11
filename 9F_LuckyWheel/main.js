// 1. 旋轉速度
// 1.1 wheel 會旋轉，3 秒後，會漸慢然後停止。
const wheel = document.querySelector('.wheel');
const drawBtn = document.querySelector('#draw');
const stopDrawBtn = document.querySelector('#stopDraw');
const chosenPrizeShow = document.querySelector('.chosen-prize');
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
    shuffle(prizeArr);
}
function stopWheel() {
  chosenPrizeShow.textContent = prizeArr[0];
  deleteChosenPrize();
  console.log(prizeArr);
  animations.pause();
}

drawBtn.addEventListener('click',rollWheel);
stopDrawBtn.addEventListener('click',stopWheel);

// 2. 列出所有獎品
// 2.1 次數會減少。且不能小於 0。
// 2.2 選中的獎品數量會減少。
let prizeArr = [];
let prizeArrLen;
function createPrizeArr() {
  prizeArr.push('Apple');
  for (let i = 0; i < 3; i++) {
    prizeArr.push('Banana','Cherry');
  }
  for (let i = 0; i < 5; i++) {
    prizeArr.push('Elephant','DataDog','formula');
  }
  prizeArrLen = prizeArr.length;
  console.log(prizeArr,'totalLength :',prizeArrLen);
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
  prizeArr.splice(0,1)
}