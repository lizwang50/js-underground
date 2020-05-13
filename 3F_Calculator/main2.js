const num_button = document.querySelectorAll('.btn');
const operators = '+-*/=';
const equals = document.querySelector('.equals');
const clean = document.querySelector('.clean');
const deleted = document.querySelector('.deleted');
const calResultContainer = document.querySelector('.cal-result');
let processing = document.querySelector('.processing');
let calResultArr = [];

function apply(){
  const value = this.value;  
  const calResultArrLen = calResultArr.length;
  const calResultLast = calResultArr[calResultArrLen - 1];
  const calResultSec = calResultArr[calResultArrLen - 2];
  const compareLast = operators.includes(calResultLast); //布林值
  const compareSec = operators.includes(calResultSec);   //布林值
  if(value !== '=' && value !== 'AC' && value !== 'Del' && calResultArrLen < 9){
    calResultArr.push(value);
    console.log(calResultArr); 
    processing.innerHTML = calResultArr.join("");
  }
  const calResultFirst = calResultArr[0];
  const compareFirst = operators.includes(calResultFirst);   //布林值
  if (calResultFirst == '0' || compareFirst == true) {
    calResultArr.splice(0,1);
    return 
  }
  if (compareSec == compareLast && compareSec == true) {
    calResultArr.splice(-2,1);
    processing.innerHTML = calResultArr.join("");
  }else{
    processing.innerHTML = calResultArr.join("");
  }
}

function calculate() { 
  const result = calResultArr.join("");  
  if(result == ''){return}
  const total = eval(calResultArr.join(""));
  calResultContainer.value = total;
  calResultArr = [];
}

function clear() {
  processing.innerHTML = '0';
  calResultArr = [];
  calResultContainer.value = '0';
}
function deletedNumber() {
  calResultArr.pop();
  processing.innerHTML = calResultArr.join("");
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