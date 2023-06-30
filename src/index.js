import './style/style.css';
import $ from 'jquery';
import 'regenerator-runtime';
import './message-form.js';

$(document).ready(() => {
  $("#submitCity").click(() => {
    return getWeather();
  });
});

const getWeather = async () => {
  const city = $("#city").val();
  if (city !== '') {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=c10bb3bd22f90d636baa008b1529ee25`, { mode: 'cors' });
      const data = await response.json();
      const widget = showResults(data);
      $("#showWeather").html(widget);
      $("#city").val('');

      // Ambil referensi elemen custom-message
      const customMessage = document.querySelector('custom-message');
      // Hapus elemen custom-message jika ditemukan
      if (customMessage) {
        customMessage.remove();
      }
    } catch (error) {
      console.error(error);
      const messageForm = document.createElement('custom-message');
      messageForm.setAttribute('message', `Error: ${error.message}`);
      document.body.appendChild(messageForm);
    }
  } else {
    const messageForm = document.createElement('custom-message');
    messageForm.setAttribute('message', 'Please insert the city!');
    document.body.appendChild(messageForm);
  }
}

const showResults = (data) => {
  const iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  const weather = data.weather[0].main;
  const description = data.weather[0].description;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const widget = `<h2 style="font-weight:bold; font-size:20px; padding-top:10px;" class="text-center">Current Weather for ${data.name}, ${data.sys.country}</h2>
  <div style="text-align:center"> Situation:   <img src="${iconUrl}"></div>
  <h3 style="text-align:center"> Description: ${weather} - ${description}</h3>
  <h3 style="text-align:center"> Temperature: ${temperature}&deg;C</h3>
  <h3 style="text-align:center"> Humidity: ${humidity}% Humidity</h3>
  <h3 style="text-align:center"> WindySpeed: ${windSpeed} m/s Wind Speed</h3>`;

  return widget;
}
