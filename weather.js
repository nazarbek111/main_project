// API ключ для OpenWeatherMap
const WEATHER_API_KEY = 'dcbe33c3d65182907a83d79d8cd1c57e';

// Функция для получения погоды
async function getWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Almaty&units=metric&lang=ru&appid=${WEATHER_API_KEY}`);
        const data = await response.json();
        
        // Обновляем информацию о погоде на странице
        const weatherWidget = document.getElementById('weather-widget');
        if (weatherWidget) {
            weatherWidget.innerHTML = `
                <div class="weather-info" aria-live="polite">
                    <i class="fas fa-temperature-high"></i>
                    <span>${Math.round(data.main.temp)}°C</span>
                    <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" 
                         alt="${data.weather[0].description}"
                         width="50" height="50">
                    <span>${data.weather[0].description}</span>
                </div>
            `;
        }
    } catch (error) {
        console.error('Ошибка при получении погоды:', error);
    }
}

// Обновляем погоду каждые 30 минут
getWeather();
setInterval(getWeather, 30 * 60 * 1000);
