const num_button = document.querySelectorAll('.btn');
const operators = '+-*/=';
const equals = document.querySelector('.equals');
const clean = document.querySelector('.clean');
const deleted = document.querySelector('.deleted');
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
  const compareLast = operators.includes(calResultLast); //布林值
  const compareSec = operators.includes(calResultSec);   //布林值
  //把最新一筆輸入的東西，推進去陣列裡，但是要擋掉 = 和 AC 這兩個按鈕
  if(value !== '=' && value !== 'AC' && value !== 'Del'){
    calResultArr.push(value);
    console.log(calResultArr); 
    processing.innerHTML = calResultArr.join("");   
  }
  //拿到新陣列的第一筆資料
  const calResultFirst = calResultArr[0];
  //比較第一個陣列資料是否為運算子
  const compareFirst = operators.includes(calResultFirst);   //布林值
  if (calResultFirst == '0' || compareFirst == true) {
    calResultArr.splice(0,1);
    return 
  }
  //如果倒數二筆資料等於運算子，從原陣列刪除倒數第二筆資料，顯示在畫面上
  //只留最新的運算子
  if (compareSec == compareLast && compareSec == true) {
    calResultArr.splice(-2,1);
    processing.innerHTML = calResultArr.join("");
  }else{
    //塞到網頁裡面呈現
    processing.innerHTML = calResultArr.join("");
  }
}

function calculate() { 
  //拿到結果字串
  const result = calResultArr.join("");  
  //排除空字串，避免空值送出
  if(result == ''){return}
  //用 eval 將字串轉為程式進行運算
  const total = eval(calResultArr.join(""));
  //將結果呈現在網頁上的 input 值裡面
  calResultContainer.value = total;
  //清空陣列，準備下一次運算
  calResultArr = [];
}

function clear() {
  //清空字串
  processing.innerHTML = '0';
  //清空陣列
  calResultArr = [];
  //將結果歸零  
  calResultContainer.value = '0';
}
function deletedNumber() {
  //pop() 方法會移除並回傳陣列的最後一個元素。此方法會改變陣列的長度。
  calResultArr.pop();
  //顯示過程
  processing.innerHTML = calResultArr.join("");
  //如果是空字串，就塞 '0' 進去
  if (processing.innerHTML === '') {
    processing.innerHTML = '0'
  }
}



num_button.forEach( (item) => {
  item.addEventListener('click',apply);
})
equals.addEventListener('click', calculate);
clean.addEventListener('click', clear);
deleted.addEventListener('click', deletedNumber);