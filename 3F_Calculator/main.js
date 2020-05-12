const num_button = document.querySelectorAll('.btn');
const processing = document.querySelector('.processing');
const numbers = [1,2,3,4,5,6,7,8,9,0];
const equals = document.querySelector('.equals');

const calResult = [];
const calResultContainer = document.querySelector('.cal-result');

function apply(){
  //value 是最新的輸入(最後一筆)
  const value = this.value;
  // array[array.length-1] 是倒數第二筆
  const second = calResult[calResult.length-1];
  if(second !== numbers){
    calResult.splice(second);
  }
  calResult.push(value);
  processing.innerHTML = calResult.join("");
  console.log(calResult);
}

num_button.forEach( (item) => {
  item.addEventListener('click',apply);
})
