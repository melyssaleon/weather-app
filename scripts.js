const output = document.getElementById("output");
let weatherData = null;

async function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) {
    output.textContent = "Please enter a city.";
    return;
  }

  output.textContent = "Loading...";

  try {
    const geo = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    const geoData = await geo.json();

    if (!geoData.results) {
      output.textContent = "City not found.";
      return;
    }

    const { latitude, longitude } = geoData.results[0];

    const weather = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    weatherData = await weather.json();

    output.textContent = "Choose temperature or condition.";
  } catch {
    output.textContent = "Error fetching data.";
  }
}

function showTemp() {
  if (!weatherData) return;
  output.textContent =
    `🌡 ${weatherData.current_weather.temperature} °C`;
}

function showCondition() {
  if (!weatherData) return;
  const code = weatherData.current_weather.weathercode;
  output.textContent = `☁ Condition code: ${code}`;
}
