const taipeiDate = document.querySelector('.taipei-date');
const taipeiTime = document.querySelector('.taipei-time');  
const newYorkDate = document.querySelector('.new-york-date');
const newYorkTime = document.querySelector('.new-york-time');  
const londonDate = document.querySelector('.london-date');
const londonTime = document.querySelector('.london-time');  
const bangkokDate = document.querySelector('.bangkok-date');
const bangkokTime = document.querySelector('.bangkok-time');  
const sydneyDate = document.querySelector('.sydney-date');
const sydneyTime = document.querySelector('.sydney-time');  

let event = new Date();


function setTaipeiDateTime() {
  let year = event.toLocaleString('en-US', {timeZone:'Asia/Taipei' , year: 'numeric'});
  let month = event.toLocaleString('en-US', {timeZone:'Asia/Taipei' , month: 'short'});
  let day = event.toLocaleString('en-US', {timeZone:'Asia/Taipei' , day: 'numeric'});
  let time = event.toLocaleTimeString('en-US', {timeZone:'Asia/Taipei',hour12: false,hour: '2-digit', minute: '2-digit'});
  taipeiDate.innerHTML = `${day} ${month} . ${year}`;
  taipeiTime.innerHTML = `${time}`;  
}
function setNewYorkTime() {
  let year = event.toLocaleString('en-US', {timeZone:'America/New_York' , year: 'numeric'});
  let month = event.toLocaleString('en-US', {timeZone:'America/New_York' , month: 'short'});
  let day = event.toLocaleString('en-US', {timeZone:'America/New_York' , day: 'numeric'});
  let time = event.toLocaleTimeString('en-US', {timeZone:'America/New_York',hour12: false,hour: '2-digit', minute: '2-digit'});
  newYorkDate.innerHTML = `${day} ${month} . ${year}`;
  newYorkTime.innerHTML = `${time}`;  
}

function setLondonTime() {
  let year = event.toLocaleString('en-US', {timeZone:'Europe/London' , year: 'numeric'});
  let month = event.toLocaleString('en-US', {timeZone:'Europe/London' , month: 'short'});
  let day = event.toLocaleString('en-US', {timeZone:'Europe/London' , day: 'numeric'});
  let time = event.toLocaleTimeString('en-US', {timeZone:'Europe/London',hour12: false,hour: '2-digit', minute: '2-digit'});
  londonDate.innerHTML = `${day} ${month} . ${year}`;
  londonTime.innerHTML = `${time}`;  
}
function setBangkokTime() {
  let year = event.toLocaleString('en-US', {timeZone:'Asia/Bangkok' , year: 'numeric'});
  let month = event.toLocaleString('en-US', {timeZone:'Asia/Bangkok' , month: 'short'});
  let day = event.toLocaleString('en-US', {timeZone:'Asia/Bangkok' , day: 'numeric'});
  let time = event.toLocaleTimeString('en-US', {timeZone:'Asia/Bangkok',hour12: false,hour: '2-digit', minute: '2-digit'});
  bangkokDate.innerHTML = `${day} ${month} . ${year}`;
  bangkokTime.innerHTML = `${time}`;  
}
function setSydneyTime() {
  let year = event.toLocaleString('en-US', {timeZone:'Australia/Sydney' , year: 'numeric'});
  let month = event.toLocaleString('en-US', {timeZone:'Australia/Sydney' , month: 'short'});
  let day = event.toLocaleString('en-US', {timeZone:'Australia/Sydney' , day: 'numeric'});
  let time = event.toLocaleTimeString('en-US', {timeZone:'Australia/Sydney',hour12: false,hour: '2-digit', minute: '2-digit'});
  sydneyDate.innerHTML = `${day} ${month} . ${year}`;
  sydneyTime.innerHTML = `${time}`;  
}


function updateView() {
  setTaipeiDateTime();
  setNewYorkTime();
  setLondonTime();
  setBangkokTime();
  setSydneyTime()
}

updateView();
