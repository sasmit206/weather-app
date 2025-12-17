const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".weatherCard");
const apiKey = "b9416460983cd942cf2813433156f49c";

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        await getWeatherData(city);
    } else {
        displayError("Enter a city bruv");
    }
});

async function getWeatherData(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        getWeatherInfo(data);
    } catch (error) {
        displayError("Couldn't fetch weather info. Try again.");
    }
}

function getWeatherInfo(data) {
    const temperature = data.main.temp;
    const cityName = data.name;
    const description = data.weather[0].description;
    const weatherId = data.weather[0].id;
    const emoji = getWeatherEmoji(weatherId);

    card.innerHTML = `
        <h2>${cityName} ${emoji}</h2>
        <p><strong>${temperature.toFixed(1)}°C</strong></p>
        <p>${description}</p>
    `;
    card.style.display = "flex";
}

function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return "⛈️";    
    if (weatherId >= 300 && weatherId < 500) return "🌦️";     
    if (weatherId >= 500 && weatherId < 600) return "🌧️";    
    if (weatherId >= 600 && weatherId < 700) return "❄️";     
    if (weatherId >= 700 && weatherId < 800) return "🌫️";      
    if (weatherId === 800) return "☀️";                    
    if (weatherId > 800) return "☁️";                    
    return "🌍"; 
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
