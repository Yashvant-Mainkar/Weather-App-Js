const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed'); 
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');


async function checkWeather(cityName){
    const api_key = `66b2afd7d5e2bd6c36f8d9697fed721d`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid${api_key}`

    const weather_data = await fetch(`${url}`)
    .then(response=> response.json())
    console.log(weather_data)

    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }
    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    if (weather_data.weather[0].main === 'Clouds') {
        weather_img.src = "/Weather App/assets/cloud.png";
    } else if (weather_data.weather[0].main === 'Clear') {
        weather_img.src = "/Weather App/assets/clear.png";
    } else if (weather_data.weather[0].main === 'Rain') {
        weather_img.src = "/Weather App/assets/rain.png";
    } else if (weather_data.weather[0].main === 'Mist') {
        weather_img.src = "/Weather App/assets/mist.png";
    } else if (weather_data.weather[0].main === 'Snow') {
        weather_img.src = "/Weather App/assets/snow.png";
    }
    
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(inputBox.value)
})