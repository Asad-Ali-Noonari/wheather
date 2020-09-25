window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.temperature');
    let degreeSpan = document.querySelector('.temperature span');
    let iconImg    = document.querySelector('.location img');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat  = position.coords.latitude;
            const api = `http://api.weatherapi.com/v1/current.json?key=5bda9c4662574d2ba1f114743201909&q=${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const temperatureCelsius = data.current.temp_c;
                    const temperatureFahrenheit = data.current.temp_f;
                    const {text, icon} = data.current.condition;

                    // Set DOM elements from API
                    temperatureDegree.textContent = temperatureFahrenheit;
                    temperatureDescription.textContent = text;
                    locationTimezone.textContent = data.location.tz_id;
                    iconImg.setAttribute("src", `${icon}`);
                    
                    // Change temperature to Celsius/Fahrenheit
                    degreeSection.addEventListener('click', () => {
                        if(degreeSpan.textContent === "F"){
                            degreeSpan.innerHTML = "C";
                            temperatureDegree.textContent = temperatureCelsius;
                        } else {
                            degreeSpan.textContent = "F";
                            temperatureDegree.textContent = temperatureFahrenheit;
                        }
                    });
                });
        });
    } 
    
});
