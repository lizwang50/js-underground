// 1. 點到位置會間隔出現 OX
// 1.1 同一個位置點到不能再放置 OX
// 1.2 要知道順序、玩家、記錄玩家放置 OX 的位置
// 1.3 順序(畫面)：先手是Ｏ、後手是 X。
// 1.4 玩家：先手是 A 、後手是 B 。
// 1.5 位置（放置）：dataset 1~9
const head = document.querySelector('.head');
const startBtn = document.querySelector('.start');
const startPlay = document.querySelector('.start-play');

const playground = document.querySelectorAll('.box');
const gamePage = document.querySelector('.game-page');
const resultPage = document.querySelector('.result-page');
const winner = document.querySelector('.winner');
const playerATurn = document.querySelector('.player-A-turn');
const playerBTurn = document.querySelector('.player-B-turn');

let isPlay = false;
let ArrayA = [];
let ArrayB = [];

playground.forEach((item) => {
	item.addEventListener('click',startGameRecord);
})
startBtn.addEventListener('click', ()=>{
	startPlay.classList.remove('d-none');
	head.classList.add('d-none');
})

function startGameRecord() {
	if (this.innerHTML !== '') return
	console.log('startGameRecord');
  let dataObj = {
    placeId: this.dataset.id,
    textContent: 'YOUR TURN!'
	};
  isPlay = !isPlay;
  if(isPlay){
		dataObj.player = 'A'
		dataObj.className ='circle'
		ArrayA.push(dataObj.placeId)
	}else{
		dataObj.player = 'B'
		dataObj.className = 'cross'
		ArrayB.push(dataObj.placeId)
	}
  compareResult(ArrayA,ArrayB);
  showScore();
	applyMark(dataObj,this);
}

function applyMark(obj,target) {
	target.innerHTML = `<div class="${obj.className}"></div>`;
  // 5. Your Turn
  if (obj.player == 'A') {
    playerATurn.textContent = obj.textContent
    playerBTurn.textContent = ''
  }else{
    playerATurn.textContent = ''
    playerBTurn.textContent = obj.textContent
  }
}

// 2. Restart 功能（不清空戰績）
const restart = document.querySelector('.restart');
restart.addEventListener('click', restartGame);
function restartGame() {
	console.log('restartGame');
	restart.classList.add('d-none');
  isPlay = false;
  playerATurn.textContent = ''
	playerBTurn.textContent = ''
	ArrayA = [];
	ArrayB = [];
	gamePage.classList.remove('d-none');
	resultPage.classList.add('d-none');
  playground.forEach((i)=>{i.innerHTML = '';})
}
// 3. 規則：
const displayScoreA = document.querySelector('.score-A');
const displayScoreB = document.querySelector('.score-B');

let localScoreA = localStorage.getItem('player A')|| 0;
let localScoreB = localStorage.getItem('player B')|| 0;
// 3.1 三個 O 連成一條線贏
// 3.2 三個 X 連成一條線贏
// 3.3 沒有連成一條線就是平手
const winRule = [
	['1','4','7'],
	['2','5','8'],
	['3','6','9'],
	['1','2','3'],
	['4','5','6'],
	['7','8','9'],
	['1','5','9'],
	['3','5','7'],
]
// 做出規則陣列
// 去比對 A 和 B player 所放置位置所儲存而成的陣列
// A 和 B 某一個陣列，只要先符合 winRule 中的某一個陣列（不論順序），就是贏家
function compareResult(a,b) {
	// a,b 陣列如果長度沒有超過 3 的話，就不要比較結果。
	if(a.length < 3) return
	console.log('compareResult');
	// 贏的條件式
	let compareNumA;
  let compareNumB;
	for (let i = 0; i < winRule.length; i++) {
		compareNumA = a.includes(winRule[i][0]) && a.includes(winRule[i][1]) && a.includes(winRule[i][2]);
		compareNumB = b.includes(winRule[i][0]) && b.includes(winRule[i][1]) && b.includes(winRule[i][2]);  
		if(compareNumA == true){
			console.log('a win!');
      isResult();
      localScoreA++
      localStorage.setItem('player A',localScoreA);
      winner.textContent = 'PLAYER A';
		}else if(compareNumB == true){
			console.log('b win!');
      isResult();
      localScoreB++
      localStorage.setItem('player B',localScoreB);
      winner.textContent = 'PLAYER B';
		}
  }
  equalResult(a);
}

function isResult() {
	gamePage.classList.add('d-none');
	resultPage.classList.remove('d-none');
	restart.classList.remove('d-none');
}
function equalResult(a) {
	// 遊戲沒有玩完前，不進行平手判斷
	if (a.length <= 4) return
	console.log('遊戲平手!');
	isResult()
	winner.textContent = `EXCELLENT EQUAL!`
}

// 4. 記錄戰績（Local Storage）
// 4.1 Default：AB score 為 0:0
// 4.2 如果 localStorage 中，A or B 沒有值的時候，要顯示為 0
// 4.3 如果 localStorage 中，A or B 有值的時候，要顯示在畫面上。
// 4.4 重整畫面後，可以繼續從 localStorage 中提取 A / B 的分數，並且繼續累加。

function showScore() {
  console.log('showScore');
  displayScoreA.textContent = localScoreA;
  displayScoreB.textContent = localScoreB;
}
showScore();