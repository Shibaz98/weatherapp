const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "ac32359f9b536e4ed3a37ca0d442f587";


//When Submit is clicked, the async event code block executes
weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
//The input value is the text I type into the box for the input html tag
    const city =cityInput.value;

//Then it passes the value of the city input into this if statement
    if(city){
        try{
            const weatherData = await getWeatherData(city)
            displayWeatherInfo(weatherData)


        }catch(error){
            console.log(error);
            displayError(error); 
        }

    }else{
        displayError("Please enter a city");
    }
});

// this func takes the input value of City from the above 
async function getWeatherData(city){
    
    // it plugs city into the ${city} part of the url 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(apiUrl);
    
    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch weather data")
    }

    //converting the response into json 
    return await response.json(); 

};

function displayWeatherInfo(data){
    // object destructuring 
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data; 

    card.textContent = ""; 
    card.style.display = "flex";        

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city; 
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay"); 
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji")


    card.appendChild(cityDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(descDisplay); 
    card.appendChild(weatherEmoji); 

}

function getWeatherEmoji(weatherId){

    switch(true){
        case(weatherId >= 200 && weatherId < 300):
            return "⛈️"
        case(weatherId >= 300 && weatherId < 400):
            return "🌧️"    
        case(weatherId >= 500 && weatherId < 600):
            return "⛈️"
        case(weatherId >= 600 && weatherId < 700):
            return "❄️"
        case(weatherId >= 700 && weatherId < 800):
            return "😶‍🌫️"    
        case(weatherId === 800):
            return "🌞"
        case(weatherId >= 801 && weatherId < 810):
            return "☁"
        default:
            return "???";                 
    }

}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message; 
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display ="flex"; 
    card.appendChild(errorDisplay); 
}