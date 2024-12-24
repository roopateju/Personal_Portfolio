document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const searchButton = document.querySelector('.search-box button');
    const weatherBox = document.querySelector('.weather-box');
    const weatherDetails = document.querySelector('.weather-details');

    searchButton.addEventListener('click', () => {
        const API_KEY = '5604317b84f98fba3a6b5399846f331c';
        const city = document.querySelector('.search-box input').value.trim();

        if (!city) return;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === "404") {
                    alert("City not found");
                    return;
                }

                const weather = data.weather[0].main.toLowerCase();
                const weatherImages = {
                    sun: 'images/sun.png',
                    rain: 'images/rain.png',
                    snow: 'images/snow.png',
                    cloud: 'images/cloud.png',
                    mist: 'images/mist.png',
                    haze: 'images/mist.png',
                    default: 'images/cloudy.png'
                };

                const image = document.querySelector('.weather-box img');
                const temperature = document.querySelector('.weather-box .temperature');
                const description = document.querySelector('.weather-box .description');
                const humidity = document.querySelector('.weather-details .humidity span');
                const wind = document.querySelector('.weather-details .wind span');

                image.src = weatherImages[weather] || weatherImages.default;
                temperature.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
                description.innerHTML = data.weather[0].description;
                humidity.innerHTML = `${data.main.humidity}%`;
                wind.innerHTML = `${Math.round(data.wind.speed)} km/h`;
            })
            .catch(error => console.error('Error fetching the weather data:', error));
    });
});
