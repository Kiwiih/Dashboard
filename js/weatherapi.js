
navigator.geolocation.getCurrentPosition(ifLocated, notLocated);
//variabel för att lagra api-nyckeln
const apiKey = 'b8c6ecccb9c0ad4e7147010fc81ff77a';
//Variabler för att lagra vart allt ska printas ut
const weatherCard = document.getElementById('weather-card');

//Deklarerar apiUrl här för det blev felkoder om att den inte är deklarerad annars
let apiUrl;

/*Om positionen lyckas och kan bestämmas sparas 
long och lat i variabler som sedan skickas in i API url, 
och sedan anropas getweather funktionen som tar in long
och lat så vädret visas för rätt plats*/

//Funktion för att spara geolocations long och lat om geolocation kan hittas
function ifLocated(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    //Här får apiUrl sitt egentliga värde
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    getWeather(latitude, longitude);
}
//Felmeddelnande om geolocation inte hittas
function notLocated(response){
    console.log("Http-error: " + response.status + ":)");
}

//Funktion för att hämta och printa ut api
async function getWeather(latitude, longitude){
    const response = await fetch(apiUrl);
    if (response.ok){
        const json = await response.json();
        displayWeather(json.list[0], "Idag");
        //console.log(json); 

        //funktion för att få nytt datum(imorrn) och hämta info från api för att kunna printa
        const tomorrowInfo = json.list.find(entry => {
            const entryDate = new Date(entry.dt_txt);
            const tomorrow = new Date();
            //plussa på 1 så det blir morgondagens väder från json
            tomorrow.setDate(tomorrow.getDate() + 1)
            return entryDate.getDate() == tomorrow.getDate();
        })
        displayWeather(tomorrowInfo, 'Imorgon');

        //I övermorgons väder
        const nextTomorrowInfo = json.list.find(entry => {
            const entryDate = new Date(entry.dt_txt);
            const nextTomorrow = new Date();
            //plussa på 2 så det blir övermorgondagens väder från json
            nextTomorrow.setDate(nextTomorrow.getDate() + 2)
            return entryDate.getDate() == nextTomorrow.getDate();
        })
        displayWeather(nextTomorrowInfo, 'Övermorgon');
    //En mindre  felhantering i konsollen om inte vädret kan hämtas
    }else {
        console.log("Http-error: " + response.status);
    }        
}
//Funktion för att printa ut vädret med olika egenskaper
function displayWeather(weather, daytitle){
    const card = document.createElement('div');
        card.className = 'weather-cards'

        //Kod för att hämta en icon från openweather baserat på vilket icon id som API:et har
        const weatherIcon = document.createElement('div');
        weatherIcon.className = 'card-icon';
        const whichIcon = weather.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${whichIcon}.png`;
        const iconImg = document.createElement('img');
        iconImg.src = iconUrl;
        weatherIcon.appendChild(iconImg);
        card.appendChild(weatherIcon);

        //Kod för att hämta vilken dag som visas
        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = `${daytitle}`;
        card.appendChild(title);

        //Hämta temperaturen och printa
        const temperature = document.createElement('div');
        temperature.className = 'card-temp';
        temperature.textContent = `${Math.trunc(weather.main.temp)}°C`;
        card.appendChild(temperature);

        //Hämta väder beskrivningen och printa (typ som att det regnar eller är blåsigt)
        const weatherDescription = document.createElement('div');
        weatherDescription.className = 'card-description';
        weatherDescription.textContent = weather.weather[0].description;
        card.appendChild(weatherDescription);

        //appenda så det printas ut i dom
        weatherCard.appendChild(card);
    }

