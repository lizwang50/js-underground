const num_button = document.querySelectorAll('.btn');
const operators = '+-*/';
const equals = document.querySelector('.equals');
const clean = document.querySelector('.clean');
const calResultContainer = document.querySelector('.cal-result');

let processing = document.querySelector('.processing');
let calResultArr = [];

function apply(){
  //value 是最新的輸入
  const value = this.value;  
  //拿到新陣列的最後一筆資料
  const calResultArrLen = calResultArr.length;
  const calResultLast = calResultArr[calResultArrLen - 1];
  //拿到新陣列的倒數第二筆資料
  const calResultSec = calResultArr[calResultArrLen - 2];
  //比較兩者資料字串中是否包含運算子（ 因為運算子是一群，所以多的包含少的）
  const compareLast = operators.includes(calResultLast);
  const compareSec = operators.includes(calResultSec);
  //把最新一筆輸入的東西，推進去陣列裡，但是要擋掉 = 和 AC 這兩個按鈕
  if(value !== '=' && value !== 'AC'){
    calResultArr.push(value);
    console.log(calResultArr); 
    processing.innerHTML = calResultArr.join("");   
  }
  //如果倒數二筆資料等於運算子，從原陣列刪除第二筆資料，顯示在畫面上
  //只留最新的運算子
  if (compareSec == compareLast && compareSec == true) {
    calResultArr.splice(-2,1);
    processing.innerHTML = calResultArr.join("");
  }else if(compareSec){
    //塞到網頁裡面呈現
    processing.innerHTML = calResultArr.join("");
  }
}

function calculate() {
  const result = calResultArr.join("");
  console.log(result);
  console.log(eval(result));
  const total = eval(calResultArr.join(""));
  calResultContainer.value = total;
}

function clear() {
  console.log(calResultArr);
  processing.innerHTML = '';
  calResultArr = [];
  calResultContainer.value = '0';  
}

num_button.forEach( (item) => {
  item.addEventListener('click',apply);
})
equals.addEventListener('click', calculate);
clean.addEventListener('click', clear);