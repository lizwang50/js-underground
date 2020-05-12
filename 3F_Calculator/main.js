const numbers = [0,1, 2, 3, 4, 5, 6, 7, 8, 9];
const num_button = document.querySelectorAll('.cal-buttons .btn');
const calResult = document.querySelector('.cal-result');

function apply(){
  calResult.value = `${this.value}`
  console.log(this.value);
}

num_button.forEach( (item) => {
  item.addEventListener('click',apply);
})
