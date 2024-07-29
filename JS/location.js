// Function to get the current position
function getPosition(options) {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};


// Get initial weather based on user's location
document.addEventListener("DOMContentLoaded", () => {
    
    if (navigator.geolocation) {
        getPosition()
            .then((position) => {
                
                // Set a default background image before fetching data
                setBackgroundImage(dayImages);
                
                getWeatherByCoordinates(position.coords.latitude, position.coords.longitude)
                    .then(() => {
                        loadingScreen.classList.remove("flex");
                        loadingScreen.classList.add("none");
                        weatherApp.classList.remove("none");
                        weatherApp.classList.add("flex");

                    });
            })
            .catch((err) => {

                // Set a default background image before fetching data
                setBackgroundImage(dayImages);
                
                alert("You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating real-time weather.");
                checkWeather("Kolkata", true); // Default city if location is denied
                loadingScreen.classList.add("none");
                weatherApp.classList.add("flex");

                
            });
    } else {
        alert("Geolocation not available");
    }
});
