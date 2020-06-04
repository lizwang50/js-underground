// 1. 點到位置會間隔出現 OX
// 1.1 同一個位置點到不能再放置 OX
// 1.2 要知道順序、玩家、記錄玩家放置 OX 的位置
// 1.3 順序(畫面)：先手是Ｏ、後手是 X。
// 1.4 玩家：先手是 A 、後手是 B 。
// 1.5 位置（放置）：dataset 1~9
const playground = document.querySelectorAll('.box');
const gamePage = document.querySelector('.game-page');
const resultPage = document.querySelector('.result-page');
const winner = document.querySelector('.winner');
const playerA = document.querySelector('.player-A');
const playerB = document.querySelector('.player-B');
const scoreA = document.querySelector('.score-A');
const scoreB = document.querySelector('.score-B');

let AScoreDisplay = 0;
let BScoreDisplay = 0;
let isPlay = false;
let ArrayA = [];
let ArrayB = [];

playground.forEach((item) => {
	item.addEventListener('click',startGameRecord);
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
	applyMark(dataObj,this);
}

function applyMark(obj,target) {
	target.innerHTML = `<div class="${obj.className}"></div>`;
  // 5. Your Turn
  if (obj.player == 'A') {
    playerA.textContent = obj.textContent
    playerB.textContent = ''
  }else{
    playerA.textContent = ''
    playerB.textContent = obj.textContent
  }
}

// 2. Restart 功能（不清空戰績）
const restart = document.querySelector('.restart');
restart.addEventListener('click', restartGame);
function restartGame() {
  console.log('restartGame');
  isPlay = false;
  playerA.textContent = ''
	playerB.textContent = ''
	ArrayA = [];
	ArrayB = [];
	gamePage.classList.remove('d-none');
	resultPage.classList.add('d-none');
  playground.forEach((i)=>{i.innerHTML = '';})
}
// 3. 規則：
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
	if(a.length < 3 && b.length < 3) return
	console.log('compareResult');
	// 贏的條件式
	let compareNumA;
	let compareNumB;
	for (let i = 0; i < winRule.length; i++) {
		compareNumA = a.includes(winRule[i][0]) && a.includes(winRule[i][1]) && a.includes(winRule[i][2]);
		compareNumB = b.includes(winRule[i][0]) && b.includes(winRule[i][1]) && b.includes(winRule[i][2]);  
		if(compareNumA == true){
			console.log('a win!');
			AScoreDisplay++
			scoreA.textContent = AScoreDisplay;
			isResult()
			return
		}else if(compareNumB == true){
			console.log('b win!');
			BScoreDisplay++
			scoreB.textContent = BScoreDisplay;
			isResult()
			winner.textContent = `PLAYER B`
			return
		}else{
			console.log('遊戲還沒結束 或是 平手啦!');
			equalResult(a);
		}
	}
	console.log('result',compareNumA,compareNumB);
}

function isResult() {
	gamePage.classList.add('d-none');
	resultPage.classList.remove('d-none');
	restart.classList.remove('d-none');
}
function equalResult(a) {
	if (a.length < 5) {
		return
	}else{
		isResult()
		winner.textContent = `EXCELLENT EQUAL!`
	}
}

// 4. 記錄戰績功能（Local Storage）
