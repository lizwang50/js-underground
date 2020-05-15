const xhr = new XMLHttpRequest();
xhr.open('get','http://opendata.epa.gov.tw/webapi/Data/ATM00679/?$orderby=MonitorDate%20desc&$skip=0&$top=1000&format=json',true);
xhr.send(null)

function callOtherDomain() {
  if(xhr) {    
    xhr.open('GET', 'http://opendata.epa.gov.tw/webapi/Data/ATM00679/?$orderby=MonitorDate%20desc&$skip=0&$top=1000&format=json', true);
    xhr.onreadystatechange = handler;
    xhr.send(); 
  }
}