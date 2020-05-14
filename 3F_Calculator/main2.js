const num_button = document.querySelectorAll('.btn');
const equals = document.querySelector('.equals');
const clean = document.querySelector('.clean');
const deleted = document.querySelector('.deleted');
const calResult = document.querySelector('.cal-result');
const processing = document.querySelector('.processing');

let calResultArr = [];

// 拿到陣列最後一個值
function getLastValue() {
  if (calResultArr.length === 0) {
    return
  }
  return calResultArr[calResultArr.length - 1];
}

// 判斷是否為運算子
function isOperator(n) {
  return n === '=' || n === '-' || n === '*' || n === '/' || n === '+'
}
// 判斷最後一個值是否為運算子
function isLastInputOperator() {
  return isOperator(getLastValue())
}


// 將陣列最後一個值，塞到 processing 和 calResult
function inputNumber(e) {
  const value = e.target.value;
  if(value !== '=' && value !== 'AC' && value !== 'Del'){
    calResultArr.push(value);
    console.log(getLastValue()); 
  }
}
function getResult() {
    //用 eval 將字串轉為程式進行運算
    //將結果呈現在網頁上的 input 值裡面
    calResult.value = eval(calResultArr.join(""));
    //清空陣列，準備下一次運算
    calResultArr = [];  
}

// 執行 update 畫面
function updateView() {
  processing.innerHTML = calResultArr.join("");
  getResult();
}

num_button.forEach( (item) => {
  item.addEventListener('click',(e)=>{
    inputNumber(e)
    updateView()
  });
})
updateView()
// equals.addEventListener('click', calculate);
// clean.addEventListener('click', clear);
// deleted.addEventListener('click', deletedNumber);