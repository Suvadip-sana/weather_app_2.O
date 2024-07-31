const app = document.getElementsByTagName("body");
input = document.querySelector(".input-val"),
temp_city = document.querySelector(".temp-city"),
mainTemperature = document.querySelector(".temp"),
mainCity = document.querySelector(".city"),
date_time = document.querySelector(".date-time"),
clock = document.querySelector(".time"),
date = document.querySelector(".date"),
searchBtn = document.querySelector("#button"),
image = document.querySelector(".img"),
description = document.querySelector(".stat"),
secondCity = document.querySelector(".city2"),
countryCode = document.querySelector(".c-code"),
secondTemperature = document.querySelector(".span1"),
humidity = document.querySelector(".span2"),
feelsLike = document.querySelector(".span3"),
visibility = document.querySelector(".span4"),
windSpeed = document.querySelector(".span5"),
statusContainer = document.querySelector(".status"),
stat = document.querySelector(".stat"),
locationContainer = document.querySelector(".location"),
listsContainer = document.querySelector(".lists"),
not_found = document.querySelector(".not-found"),
no_input = document.querySelector(".no-input"),
loadingScreen = document.querySelector(".loading-screen"),
weatherApp = document.querySelector(".weather-app");


// Preload Images
function preloadImages(images) {
    images.forEach((image) => {
        const img = new Image();
        img.src = image;
    });
}



// Function to set the background image based on time
function setBackgroundImage(images, isNight) {
    const randomIndex = Math.floor(Math.random() * images.length);
    const selectedImage = images[randomIndex];
    document.body.style.backgroundImage = `url('${selectedImage}')`;
    weatherApp.style.backgroundImage = `url('${selectedImage}')`;

     // Update the search button's class based on time
     if (isNight == true) {
        searchBtn.classList.add("night-mode");
        searchBtn.classList.remove("day-mode");
    } else {
        searchBtn.classList.add("day-mode");
        searchBtn.classList.remove("night-mode");
    }
};



// Preload all images
preloadImages([...dayImages, ...nightImages]);



// Function to get weather data by coordinates
async function getWeatherByCoordinates(lat, lon) {
    image.innerHTML = '<div class="custom-loader"></div>';
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const data = await fetch(`${URL}`).then(response => response.json());
    console.log(data);

    // Process weather data and update the UI
    updateWeatherUI(data);
}

function codeError(){
    not_found.classList.add("flex");
    not_found.classList.remove("none");
    mainTemperature.classList.add("none");
    mainCity.classList.add("none");
    statusContainer.classList.add("none");
    stat.classList.add("none");
    locationContainer.classList.add("none");
    listsContainer.classList.add("none");
    no_input.classList.add("none");
}

function flexDefaultAndUpdate(data){
    not_found.classList.remove("flex");
        not_found.classList.add("none");
        no_input.classList.remove("flex");
        no_input.classList.add("none");
        mainTemperature.classList.remove("none");
        mainTemperature.classList.add("block");
        mainCity.classList.remove("none");
        mainCity.classList.add("block");
        statusContainer.classList.remove("none");
        statusContainer.classList.add("flex");
        stat.classList.remove("none");
        stat.classList.add("flex");
        locationContainer.classList.remove("none");
        locationContainer.classList.add("flex");
        date_time.classList.remove("none");
        date_time.classList.add("flex");
        temp_city.classList.remove("none");
        temp_city.classList.add("flex");
        listsContainer.classList.remove("none");

        mainTemperature.innerHTML = `${Math.round(data.main.temp)}&#176;`;
        mainCity.innerHTML = `${data.name}`;
        description.innerHTML = `${data.weather[0].main}`;
        secondCity.innerHTML = `${data.name},`;
        countryCode.innerHTML = ` ${data.sys.country}`;
        secondTemperature.innerHTML = `${Math.round(data.main.temp)} <sup>°C</sup>`;
        humidity.innerHTML = `${data.main.humidity} %`;
        feelsLike.innerHTML = `${Math.round(data.main.feels_like)} <sup>°C</sup>`;
        visibility.innerHTML = `${Math.round(data.visibility / 1000)} Km`;
        windSpeed.innerHTML = `${Math.round(data.wind.speed)} Km/h`;

        const iconCode = data.weather[0].icon;
        const iconURL = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;
        image.innerHTML = `<img src="${iconURL}" class="img" alt="" height="60">`;

        const cityTimezoneOffset = data.timezone;
        const cityLocalTime = new Date(new Date().getTime() + cityTimezoneOffset * 1000);
        const cityLocalHours = cityLocalTime.getUTCHours();

        if (cityLocalHours >= 6 && cityLocalHours < 18) {
            setBackgroundImage(dayImages,false);
        } else {
            setBackgroundImage(nightImages,true);
        }
}

// Function to update weather UI
function updateWeatherUI(data) {
    if (data.cod === '404') {
        codeError();
        return;
    }

    flexDefaultAndUpdate(data);
}

// Function to get weather data by city name
async function checkWeather(city, initialLoad = false) {
    try {
        if (!initialLoad && input.value == "") {
            no_input.classList.add("flex");
            no_input.classList.remove("none");
            mainTemperature.classList.add("none");
            mainCity.classList.add("none");
            not_found.classList.remove("none");
            statusContainer.classList.add("none");
            stat.classList.add("none");
            locationContainer.classList.add("none");
            listsContainer.classList.add("none");
            not_found.classList.add("none");
            return;
        }

        image.innerHTML = '<div class="custom-loader"></div>';
        input.value = "";

        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const data = await fetch(`${URL}`).then((response) => response.json());

        if (data.cod === `404` || !/^[a-zA-Z\s]+$/.test(city.trim())) {
            
            codeError();
            return;
        }

        flexDefaultAndUpdate(data);

    } catch (error) {
        console.error("Error in checkWeather:", error);
        alert("Failed to fetch weather data. Please try again later.");
    }
}


searchBtn.addEventListener("click", () => {
    checkWeather(input.value);
});

input.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        checkWeather(input.value);
    }
});

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const tarikh = time.getDate();
    const day = time.getDay();
    const hours = time.getHours();
    const formatIn12Hr = hours % 12 || 12;
    const amPm = hours >= 12 ? "PM" : "AM";
    const minutes = time.getMinutes();

    clock.innerHTML =
        (formatIn12Hr < 10 ? "0" + formatIn12Hr : formatIn12Hr) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        `<span class="am-pm">${amPm}</span>`;

    date.innerHTML = days[day] + ", " + tarikh + " " + months[month];
}, 1000);
