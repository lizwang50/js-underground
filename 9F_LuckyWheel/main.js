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
let rollState;

function rollWheel() {
  rollState = 'roll';
  console.log('1. 抽獎開始');
  updateButton('d-none');
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
  rollState = 'stop';
  choosePrize(prizeArr[0]);
  updateButton('d-none');
  // 顯示抽到的獎品
  chosenPrizeShow.textContent = prizeArr[0];
  // 刪除抽掉的獎品
  prizeArr.shift();
  console.log('4. 停止抽獎。獎品列表長度：',prizeArr.length);
  // 顯示剩下的次數(會 -1 )
  counterShow.textContent = prizeArr.length;
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
  console.log(prizeArr);
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

// 3. 拿到選出來的獎品。
// 3.1 轉盤上的每個獎品分別在幾度的位置上
// 3.2 比對一致，則讓該獎品對準箭頭。

function choosePrize(prz) {
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

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function countWheelAngle(angle) {
  // x 毫秒轉幾度
  let currentTime = animations.currentTime;
  animations.finish();
  let pauseAngle = currentTime * 0.36 % 360;
  //fix 3. 轉針停止的範圍設定
  let n = getRandomArbitrary(700, 740);
  console.log(n);

  wheelRolling = [
    { transform: `rotate(${pauseAngle}deg)`},
    { transform: `rotate(${angle + n}deg)`}
  ];
  rollSetting = {
    duration: 3000,
    iterations: 1,
    fill: 'forwards',
    easing: "ease-out"
  }
  animations = wheel.animate(
    wheelRolling,
    rollSetting
  )
}
// fix 1. 結果要等轉盤轉完再顯示結果
const result = document.querySelector('.result-view');
function updateButton(displayNone) {  
  if (rollState == 'roll') {
    console.log('2. 開始轉。獎品列表長度：',prizeArr.length);
    result.classList.remove('animate-in');
    drawBtn.classList.add(displayNone);
    stopDrawBtn.classList.remove(displayNone);    
  }else if(rollState == 'stop'){
    console.log('3. 停止轉。獎品列表長度：',prizeArr.length);
    result.classList.add('animate-in');
    stopDrawBtn.classList.add(displayNone);
    //fix 2. Draw 按鈕在旋轉停止後顯示
    setTimeout(() => {
      if (prizeArr.length == 0) return
      console.log('Draw 按鈕在旋轉停止後顯示');    
      drawBtn.classList.remove(displayNone);
    }, 3100);
  }
}