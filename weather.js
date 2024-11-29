const apiKey="c5bc43556dac701e6c18b0d28d378074";

function getWeather(){
    const city=document.getElementById('city').value;
    if(city){
        fetchCurrentWeather(city);
        fetchForecast(city);
    }
    else{
        alert("Please enter a city");
    }
}

function fetchCurrentWeather(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        displayWeather(data);
    })
    .catch(error=>{
        alert('City not found');
    });
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

// Fetch 5-day weather forecast
function fetchForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            alert('Forecast data not found');
        });
}

// Display 5-day forecast
function displayForecast(data) {
    const forecast = document.getElementById('forecast');
    forecast.innerHTML = '';
    data.list.forEach((item, index) => {
        if (index % 8 === 0) { // Only show one data point per day (each 8th entry is 1 day)
            const date = new Date(item.dt * 1000);
            forecast.innerHTML += `
                <div class="forecast-day">
                    <p>${date.toLocaleDateString()}</p>
                    <p>${item.weather[0].description}</p>
                    <p>${item.main.temp}°C</p>
                </div>
            `;
        }
    });
}