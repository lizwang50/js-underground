let data
const searchCity = document.querySelector('#searchCity');
const searchSite = document.querySelector('#searchSite');
const search = document.querySelector('.search');
let result = document.querySelectorAll('.result');

const county = [];

fetch('https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json')
.then(function(response) {
  return response.json();
})
.then(function(json) {
  console.log('data ok');
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
  let tempCounty = event.target.value;  //是所選的縣市資料
  searchSite.innerHTML = '';  
  for (let i = 0; i < data.length; i++) {
    if (tempCounty == data[i].County) {    
      searchSite.innerHTML += `<option value="${data[i].SiteName}">${data[i].SiteName}</option>`;
    }
  }
}

function updateCountySelect() {
  county.forEach( i => {
    searchCity.innerHTML += `<option value="${i}">${i}</option>`;
  });
}

function getResult(e) {
  e.preventDefault();
  const resultSite = searchSite.value;
  for (let i = 0; i < data.length; i++) {
    if (resultSite === data[i].SiteName) {
      console.log(resultSite);
      result[0].textContent = data[i].County
      result[1].textContent = data[i].SiteName
      result[2].textContent = data[i].PublishTime
      result[3].textContent = data[i].AQI
      result[4].textContent = data[i].Status
      result[5].textContent = data[i].O3
      result[6].textContent = data[i].PM10
      result[7].textContent = data[i].PM10
      result[8].textContent = data[i].CO
      result[9].textContent = data[i].SO2
      result[10].textContent = data[i].NO2
    }
    
  }
}

searchCity.addEventListener('change',filterCountySite);
search.addEventListener('click',getResult)