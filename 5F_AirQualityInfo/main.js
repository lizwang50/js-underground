let data
const searchCity = document.querySelector('#searchCity');
const searchSite = document.querySelector('#searchSite');
const search = document.querySelector('.search');

const result = document.querySelectorAll('.result');

const county = [];

//使用 fetch 從政府 OpenData 撈取資料
fetch('https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json')
.then(function(response) {
  return response.json();
})
.then(function(json) {
  console.log('data ok');
  data = json
  getCounty();
  addCountySelect();
});

// 拿到所選的縣市
function getCounty() {
  for (let i = 0; i < data.length; i++) {
    if (county.indexOf(data[i].County) == -1) {
      county.push(data[i].County)
    } 
  }
  //推入縣市陣列
  return county
}

//將縣市資料加入選項裡
function addCountySelect() {
  county.forEach( i => {
    searchCity.innerHTML += `<option value="${i}">${i}</option>`;
  });
}

//找出所選縣市的空氣監測站
function filterCountySite(event) {
  let tempCounty = event.target.value;  //是所選的縣市資料
  searchSite.innerHTML = '';  
  for (let i = 0; i < data.length; i++) {
    if (tempCounty == data[i].County) {    
      searchSite.innerHTML += `<option value="${data[i].SiteName}">${data[i].SiteName}</option>`;
    }
  }
}

//得到監測結果，並顯示到畫面上
function getResult(e) {
  e.preventDefault();
  //得到所選取的監測站資料
  const resultSite = searchSite.value;
  for (let i = 0; i < data.length; i++) {
    if (resultSite === data[i].SiteName) {
      result[0].textContent = data[i].County
      result[1].textContent = data[i].SiteName
      result[2].textContent = data[i].PublishTime
      result[3].textContent = data[i].AQI
      result[4].textContent = data[i].Status
      result[5].textContent = data[i].O3
      result[6].textContent = data[i].PM10
      // pm2.5 沒辦法取得QQ
      result[7].textContent = data[i]['PM2.5']
      result[8].textContent = data[i].CO
      result[9].textContent = data[i].SO2
      result[10].textContent = data[i].NO2
    }
    
  }
}
//選擇都市監聽 onChange 事件
searchCity.addEventListener('change',filterCountySite);
//搜尋按鈕監聽 onClick 事件
search.addEventListener('click',getResult);