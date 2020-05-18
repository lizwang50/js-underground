let data
const countyOpts = document.querySelector('#searchCity');
const searchSite = document.querySelector('#searchSite');
const result = document.querySelector('.result');

const city = document.querySelector('.city');
const siteView = document.querySelector('.site');
const updateTime = document.querySelector('.updateTime');

const totalAQI = document.querySelector('.totalAQI');
const status = document.querySelector('.status');
const o3 = document.querySelector('.o3');
const pm10 = document.querySelector('.pm10');
const pm25 = document.querySelector('.pm25');
const co = document.querySelector('.co');
const so2 = document.querySelector('.so2');
const no2 = document.querySelector('.no2');


const county = [];
let site = [];

fetch('https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json')
.then(function(response) {
  return response.json();
})
.then(function(json) {
  console.log('ok');
  data = json
  getCounty();
  updateCountySelect();
});

function getCounty() {
  for (let i = 0; i < data.length; i++) {
    if (county.indexOf(data[i].County) == -1) {
      county.push(data[i].County)
    } 
  }
  return county
}

function filterCountySite(event) {
  let tempItem = event.target.value;  //是所選的縣市資料
  let tempArr = [];
  // 如果 tempItem == data 陣列中的 County 資料，就撈出他的 site 名稱。
  searchSite.innerHTML = '';  
  for (let i = 0; i < data.length; i++) {
    if (tempItem == data[i].County) {    
      searchSite.innerHTML += `<option value="${data[i].SiteName}">${data[i].SiteName}</option>`;
    }
  }
  site = tempArr
  console.log(tempArr);
  
}

function updateCountySelect() {
  county.forEach( i => {
    countyOpts.innerHTML += `<option value="${i}">${i}</option>`;
  });
}

function getResult(e) {
  e.preventDefault();
  console.log(data.SiteName);
  if (site == data.SiteName) {
    totalAQI.textContent = `${data.AQI}`;
    status.textContent = data.Status;
    o3.textContent = data.O3;
    pm10.textContent = data.PM10;
    pm25.textContent = data.PM10;
    co.textContent = data.CO;
    so2.textContent = data.SO2;
    no2.textContent = data.NO2;
  }
  console.log(site);
}

countyOpts.addEventListener('change',filterCountySite);
result.addEventListener('click',getResult)