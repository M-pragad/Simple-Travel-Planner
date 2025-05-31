const apiKey = "YOUR API KEY"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) return alert("Please enter a city name");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;

    const sunriseDate = new Date((data.sys.sunrise + data.timezone) * 1000);
    const sunsetDate = new Date((data.sys.sunset + data.timezone) * 1000);
    
    document.getElementById("weather-result").innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <p>🌡️ Temp: ${temp}°C (Feels like: ${data.main.feels_like}°C)</p>
      <p>☁️ Weather: ${description}</p>
      <p>🌬️ Wind: ${data.wind.speed} m/s, Direction: ${data.wind.deg}°</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌥️ Cloudiness: ${data.clouds.all}%</p>
      <p>🔆 Sunrise: ${sunriseDate.toUTCString()}</p>
      <p>🌇 Sunset: ${sunsetDate.toUTCString()}</p>
      <p>📍 Coordinates: ${data.coord.lat}, ${data.coord.lon}</p>
      <p>👁️ Visibility: ${data.visibility} meters</p>
      <p>🕒 Timezone offset: ${data.timezone / 3600} hours from UTC</p>
    `;
    
  } catch (error) {
    document.getElementById("weather-result").textContent = "Error: " + error.message;
  }
}
function indexpage(){
    window.location.href = "index.html";
  }