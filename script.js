const apiKey = "d2c53b41cc8174d091aedd5a148b97e0";

const crops = {
  summer: ["🌽 Maize", "🥣 Millets", "🧵 Cotton"],
  winter: ["🌾 Wheat", "🍺 Barley", "🌿 Mustard"],
  monsoon: ["🍚 Rice", "🍬 Sugarcane", "🌱 Soybean"]
};

const soilInfo = {
  clay: "Clay soil is good for rice and paddy.",
  sandy: "Sandy soil is suitable for peanuts and watermelon.",
  loamy: "Loamy soil is ideal for most crops like wheat and pulses."
};

const cropPrices = {
  Wheat: "₹22/kg",
  Rice: "₹28/kg",
  Cotton: "₹40/kg",
  Maize: "₹18/kg"
};

const fertilizerData = {
  Wheat: "Urea: 120 kg/ha, DAP: 60 kg/ha, MOP: 40 kg/ha",
  Rice: "Urea: 150 kg/ha, DAP: 50 kg/ha, MOP: 50 kg/ha",
  Cotton: "Urea: 100 kg/ha, DAP: 50 kg/ha, Potash: 50 kg/ha",
  Maize: "Urea: 120 kg/ha, DAP: 60 kg/ha, MOP: 40 kg/ha"
};

document.getElementById("btn-city-weather").addEventListener("click", getWeather);
document.getElementById("btn-location-weather").addEventListener("click", getWeatherByLocation);
document.getElementById("btn-show-crops").addEventListener("click", showCrops);
document.getElementById("btn-show-soil").addEventListener("click", showSoil);
document.getElementById("btn-show-price").addEventListener("click", showPrice);
document.getElementById("btn-show-fertilizer").addEventListener("click", showFertilizer);
document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode);

window.onload = () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
};

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  if (!city) return alert("Please enter a city name");
  const output = document.getElementById("weather-output");
  output.innerText = "Loading...";
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    const icon = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    output.innerHTML = `City: ${data.name}, Temp: ${data.main.temp}°C, Condition: ${data.weather[0].main} <img src="${iconUrl}" class="weather-icon" alt="Weather icon">`;
  } catch (err) {
    output.innerText = "Failed to fetch weather data.";
  }
}

function getWeatherByLocation() {
  const output = document.getElementById("weather-output");
  if (!navigator.geolocation) {
    output.innerText = "Geolocation not supported.";
    return;
  }
  output.innerText = "Fetching location...";
  navigator.geolocation.getCurrentPosition(async position => {
    const { latitude, longitude } = position.coords;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Location error");
      const data = await res.json();
      const icon = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      output.innerHTML = `Location: ${data.name}, Temp: ${data.main.temp}°C, Condition: ${data.weather[0].main} <img src="${iconUrl}" class="weather-icon" alt="Weather icon">`;
    } catch (err) {
      output.innerText = "Failed to fetch weather data.";
    }
  }, () => {
    output.innerText = "Unable to get your location.";
  });
}

function showCrops() {
  const season = document.getElementById("season").value;
  document.getElementById("crop-output").innerText = `Recommended crops for ${season}: ${crops[season].join(", ")}`;
}

function showSoil() {
  const soil = document.getElementById("soil-type").value;
  document.getElementById("soil-output").innerText = soilInfo[soil];
}

function showPrice() {
  const crop = document.getElementById("crop").value;
  document.getElementById("price-output").innerText = `Market Price of ${crop}: ${cropPrices[crop]}`;
}

function showFertilizer() {
  const crop = document.getElementById("fertilizer-crop").value;
  document.getElementById("fertilizer-output").innerText = fertilizerData[crop];
}

function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark);
}
