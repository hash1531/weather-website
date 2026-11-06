
const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  if (!city.trim()) return;

  try {
    const response = await fetch(
      apiUrl + encodeURIComponent(city) + `&appid=${apiKey}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
      }

      throw new Error("Unable to fetch weather data.");
    }

    const data = await response.json();

    // Update city name
    document.querySelector(".city").innerHTML = data.name;

    // Update temperature
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";

    // Update humidity
    document.querySelector(".humidity").innerHTML =
      data.main.humidity + "%";

    // Update wind speed
    document.querySelector(".wind").innerHTML =
      data.wind.speed + " km/h";

    // Update weather icon
    const condition = data.weather[0].main;

    if (condition === "Clouds") {
      weatherIcon.src = "img/clouds.png";
    } else if (condition === "Clear") {
      weatherIcon.src = "img/clear.png";
    } else if (condition === "Rain") {
      weatherIcon.src = "img/rain.png";
    } else if (condition === "Drizzle") {
      weatherIcon.src = "img/drizzle.png";
    } else if (condition === "Mist") {
      weatherIcon.src = "img/mist.png";
    } else if (condition === "Snow") {
      weatherIcon.src = "img/snow.png";
    } else if (condition === "Thunderstorm") {
      weatherIcon.src = "img/rain.png";
    } else {
      weatherIcon.src = "img/clouds.png";
    }

    // Show weather information
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

  } catch (error) {
    console.error(error);

    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

// Search button click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Search using Enter key
searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
