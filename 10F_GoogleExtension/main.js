// Date Time
const currentDate = document.querySelector('.date');
const currentTime = document.querySelector('.time');  

let event = new Date();

function setCurrentDateTime() {
  let year = event.toLocaleString('en-US', {timeZone:'Asia/Taipei' , year: 'numeric'});
  let month = event.toLocaleString('en-US', {timeZone:'Asia/Taipei' , month: 'numeric'});
  let day = event.toLocaleString('en-US', {timeZone:'Asia/Taipei' , day: 'numeric'});
  let time = event.toLocaleTimeString('en-US', {timeZone:'Asia/Taipei',hour12: false});
  currentDate.textContent = `${year}/${month}/${day}`;
  currentTime.textContent = `${time}`;  
}

function updateView() {
  event = new Date();
  setCurrentDateTime();
}

setInterval(updateView,10);