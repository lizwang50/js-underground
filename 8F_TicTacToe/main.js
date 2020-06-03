// 1. 點到位置會間隔出現 OX
// 1.1 同一個位置點到不能再放置 OX
// 1.2 要知道順序、玩家、記錄玩家放置 OX 的位置
// 1.3 順序(畫面)：先手是Ｏ、後手是 X。
// 1.4 玩家：先手是 A 、後手是 B 。
// 1.5 位置（放置）：dataset 1~9
const playground = document.querySelectorAll('.box');
const playerA = document.querySelector('.player-A');
const playerB = document.querySelector('.player-B');

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
  // 5. Your Turn 功能
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
  playground.forEach((i)=>{i.innerHTML = '';})
}
// 3. 規則：
// 3.1 三個 O 連成一條線贏
// 3.2 三個 X 連成一條線贏
// 3.3 沒有連成一條線就是平手
const winRule = {
	0: ['1','4','7'],
	1: ['2','5','8'],
	2: ['3','6','9'],
	3: ['1','2','3'],
	4: ['4','5','6'],
	5: ['7','8','9'],
	6: ['1','5','9'],
	7: ['3','5','7'],
}

function compareResult(a,b) {
	if(a.length < 3 && b.length < 3) return
	console.log('compareResult');
	for (let i = 0; i < 8; i++) {
			console.log('array A',a);
			console.log(winRule[i].includes(a));
			console.log('winRule',winRule[i]);
	}
}
// 4. 記錄戰績功能（Local Storage）
