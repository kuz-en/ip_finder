import {validateIp} from './helpers';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
  if (validateIp(ipInput.value)) {
    fetch(`
    https://geo.ipify.org/api/v1?apiKey=at_uUXrCcPXIHM8aaAQf7Q6YtAiS2ivQ&ipAddress=${ipInput.value}`)
      .then(response => response.json())
      .then(setInfo);
  }
}

function handleKey(e) {
  if (e.key === 'Enter') {
    getData();
  }
}

function setInfo(mapData) {
  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = mapData.location.country + ' ' + mapData.location.region;
  timezoneInfo.innerText = mapData.location.timezone;
  ispInfo.innerText = mapData.isp;
}