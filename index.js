/*  WEATHER APP  |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apiKey = "4ae3dbf2fa43cba97c2ee650d3c763a4";

weatherForm.addEventListener("submit", async event => {

    // since we have a submit event, we must prevent the form to refresh the page
    event.preventDefault();

    // getting the value written inside the input box
    const city = cityInput.value;

    if(city){
        try{
            // we can only use await with async function
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Enter a valid city");
    }
});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data){

    // we will use object destructuring,  we are goig to access the name property and create a variable of city
    // then we will access main which is an object that contains an array
    // main will use the object destructuring again
    // weather is an array of objects and we will use array destructuring followed by object destructuring
    const { 
            name: city, 
            main: {temp, humidity}, 
            weather:[{description, id}]
    } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cidade = document.createElement("h1");
    const temperatura = document.createElement("p");
    const umidade = document.createElement("p");
    const descricao = document.createElement("p");
    const emoji = document.createElement("p");

    cidade.textContent = city;
    temperatura.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    umidade.textContent = `Humidity: ${humidity}%`;
    descricao.textContent = description;
    emoji.textContent = getWeatherEmoji(id);

    cidade.classList.add("cidade");
    temperatura.classList.add("temperatura");
    umidade.classList.add("umidade");
    descricao.classList.add("descricao");
    emoji.classList.add("emoji");

    card.appendChild(cidade);
    card.appendChild(temperatura);
    card.appendChild(umidade);
    card.appendChild(descricao);
    card.appendChild(emoji);

}

function getWeatherEmoji(weatherID){

    switch(true){
        case(weatherID >= 200 && weatherID < 300):
            return "⛈";
        case(weatherID >= 300 && weatherID < 400):
            return "🌧";
        case(weatherID >= 500 && weatherID < 600):
            return "🌧";
        case(weatherID >= 600 && weatherID < 700):
            return "🌨";
        case(weatherID >= 700 && weatherID < 800):
            return "🌫";
        case(weatherID === 800):
            return "☀";
        case(weatherID >= 801 && weatherID < 810):
            return "🌥";
    }

}
function displayError(message){

    // here, we are creating a paragrath element
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    // getting the errorDisplay element, accessing the classlist and adding a css class
    errorDisplay.classList.add("erro");

    // we will take our card element which normally displays the weather data, 
    // reset the text content to be an empty string and changes the display to flex to show the message
    card.textContent = "";
    card.style.display = "flex";
    // append the paragraph of error display to the card
    card.appendChild(errorDisplay); 
}