let btnSubmit = document.querySelector('#submit');
btnSubmit.addEventListener("click", () => {
    let city = getInput();
    getWeather(city);
})

const getInput = () => {
    let input = document.querySelector('#inputLocation');
    if (input.value == "") {
        alert("Enter city");
    }
    else {
        let city = input.value;
        input.value = ""
        return city;
    }
}

const chosenCity = ((name, country, feelslike, temp, maxtemp, mintemp, desc, humidity, windspeed) => {
    let getName = () => name;
    let getCountry = () => country;
    let getFeels = () => feelslike;
    let getTemp = () => temp;
    let getMaxTemp = () => maxtemp;
    let getMinTemp = () => mintemp;
    let getDesc = () => desc;
    let getHumidity = () => humidity;
    let getWinSpd = () => windspeed;

    return {name, country, feelslike, temp, maxtemp, mintemp, desc, humidity, windspeed};
})();


let getWeather = async (city) => {
    let string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=7b0d8e1f49707785a9df06ad5f57927c`;
    const response = fetch(string, {mode: 'cors'})
    .then( (response) => {
        return response.json();
    })
    .then (
        (response) => {
            console.log(response);
            chosenCity.name = response.name;
            chosenCity.country = response.sys.country;
            chosenCity.feelslike = Math.round(response.main.feels_like);
            chosenCity.temp = Math.round(response.main.temp);
            chosenCity.maxtemp = Math.round(response.main.temp_max);
            chosenCity.mintemp = Math.round(response.main.temp_min);
            chosenCity.desc = response.weather[0].description;
            chosenCity.humidity = response.main.humidity;
            chosenCity.windspeed = response.wind.speed;
            console.log(chosenCity);
            updateDOM(chosenCity);
        }
    )
};

const updateDOM = (City) => {
    let windspeed = document.querySelector('.windspeed');
    windspeed.textContent = chosenCity.windspeed;
    let humidity = document.querySelector('.humidity');
    humidity.textContent = chosenCity.humidity;
    let feelslike = document.querySelector('.feelslike');
    feelslike.textContent = chosenCity.feelslike;

    let temp = document.querySelector('.temp');
    temp.textContent = chosenCity.temp;
    let tempMax = document.querySelector('.temp-max');
    tempMax.textContent = chosenCity.maxtemp;
    let tempMin = document.querySelector('.temp-min');
    tempMin.textContent = chosenCity.mintemp;

    let desc = document.querySelector('.desc');
    desc.textContent = chosenCity.desc;
    let city = document.querySelector('.city');
    city.textContent = chosenCity.name;
    let country = document.querySelector('.country');
    country.textContent = chosenCity.country;    
}




// Use template literals to append parameters to url
// ` www.google.com/${VARIABLE}/red/${VARIABLE2} `
