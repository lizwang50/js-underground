fetch('https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });


