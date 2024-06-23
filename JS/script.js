const app = document.getElementsByTagName("body");
const input = document.querySelector(" .input-val");
const temp_city = document.querySelector(" .temp-city");
const mainTemperature = document.querySelector(" .temp");
const mainCity = document.querySelector(" .city");
const date_time = document.querySelector(" .date-time");
const clock = document.querySelector(" .time");
const date = document.querySelector(".date");
const searchBtn = document.querySelector(" #button");
const image = document.querySelector(" .img");
const description = document.querySelector(" .stat");
const secondCity = document.querySelector(" .city2");
const countryCode = document.querySelector(" .c-code");
const secondTemperature = document.querySelector(" .span1");
const humidity = document.querySelector(" .span2");
const feelsLike = document.querySelector(" .span3");
const visibility = document.querySelector(" .span4");
const windSpeed = document.querySelector(" .span5");
const statusContainer = document.querySelector(".status");
const stat = document.querySelector(".stat");
const locationContainer = document.querySelector(".location");
const listsContainer = document.querySelector(".lists");
const not_found = document.querySelector(".not-found");
const no_input = document.querySelector(".no-input");

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

    date.innerHTML = days[day] + "," + " " + tarikh + " " + months[month];
}, 1000);

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
            not_found.classList.add("flex");
            not_found.classList.remove("none");
            mainTemperature.classList.add("none");
            mainCity.classList.add("none");
            statusContainer.classList.add("none");
            stat.classList.add("none");
            locationContainer.classList.add("none");
            listsContainer.classList.add("none");
            no_input.classList.add("none");
            return;
        }

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
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        image.innerHTML = `<img src="${iconURL}" class="img" alt="" height="60">`;

    } catch (error) {

        console.error("Error in checkWeather:", error);
        alert("Failed to fetch weather data. Please try again later.");

    }
}

window.onload = () => {
    checkWeather("Kolkata", true);
};

searchBtn.addEventListener("click", () => {
    checkWeather(input.value);
});

input.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        checkWeather(input.value);
    }
});
