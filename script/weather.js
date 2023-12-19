let city_out = document.getElementById('city')

var start = async function() {
  let url = "https://api.open-meteo.com/v1/forecast?latitude=48.4666&longitude=35.0407&hourly=temperature_2m,weather_code&timezone=Europe%2FLondon&forecast_days=1";
    
  let response = await fetch(url);
  
  if (response.ok) { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    let weather = await response.json();

    createWeatherTable(weather);


      weather.hourly.time;
      weather.hourly.temperature_2m;
      weather.hourly.weather_code
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}

start();

function createWeatherTable(weather){
  city_out.textContent = weather.timezone
  let table = document.createElement("table");

  let timeRow = document.createElement("tr");
  let weatherRow = document.createElement("tr");
  let temperatureRow = document.createElement("tr");

  for(let i = 0; i < 24; i++) {
    let timeCell = document.createElement("td");
    timeCell.innerText = weather.hourly.time[i].slice(-5);
    timeRow.append(timeCell);

    let weatherCell = document.createElement("td");
    weatherCell.innerHTML = `<img src="img/${weather.hourly.weather_code[i]}.png">`;
    weatherRow.append(weatherCell);

    let temeratureCell = document.createElement("td");
    temeratureCell.innerText = `${weather.hourly.temperature_2m[i]} C`;
    temperatureRow.append(temeratureCell);
  }

  table.append(timeRow);
  table.append(weatherRow);
  table.append(temperatureRow);

  document.body.append(table);
}