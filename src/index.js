import 'babel-polyfill';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {addOffset, addTileLayer, getAddress, validateIp} from './helpers';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
});

const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
});

addTileLayer(map);
L.marker([51.505, -0.09], {icon: markerIcon}).addTo(map);

function getData() {
  if (validateIp(ipInput.value)) {
    getAddress(ipInput.value)
      .then(setInfo);
  }
}

function handleKey(e) {
  if (e.key === 'Enter') {
    getData();
  }
}

function setInfo(mapData) {
  const {lat, lng, country, region, timezone} = mapData.location;

  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = country + ' ' + region;
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = mapData.isp;

  setMap(lat, lng);

  if (matchMedia("(max-width: 1023px)").matches) {
    addOffset(map);
  }
}

function setInfoByPosition(mapData) {
  const {country, region, timezone} = mapData.location;

  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = country + ' ' + region;
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = mapData.isp;

  if (matchMedia("(max-width: 1023px)").matches) {
    addOffset(map);
  }
}

function getIp(setInfo) {
  fetch(`https://api64.ipify.org?format=json`)
  .then(response => response.json())
  .then(response => getAddress(response.ip))
  .then(setInfo);
}

function setMap(lat, lng) {
  map.setView([lat, lng]);
  L.marker([lat, lng], {icon: markerIcon}).addTo(map);
}

document.addEventListener('DOMContentLoaded', () => {
  if ("geolocation" in navigator) {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function errorCallback(error) {
      console.log('ERROR(' + error.code + '): ' + error.message);
      getIp(setInfo);
    }

    function success(position) {
      getIp(setInfoByPosition);
      const {latitude, longitude} = position.coords;

      setMap(latitude, longitude);
    }

    navigator.geolocation.getCurrentPosition(success, errorCallback, options);
  } else {
    getIp(setInfo);
  }
});
