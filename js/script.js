
let dateDiv = document.getElementById("date-div");
//Funktion för att uppdatera tiden utan att uppdatera sidan
function updateTime(){
    //Variabler för att hämta tid/datum med Date()
    const date = new Date();
    const dateTimeString = date.toLocaleString();
    dateDiv.innerHTML = dateTimeString;

}
//Använder interval för att se till så tiden uppdateras varje sekund
setInterval(updateTime, 1000);






//https://fontawesome.com/search?q=weather&o=r länk till icons för väder

//API för 3e rutan https://sv443.net/jokeapi/v2/      https://www.youtube.com/watch?v=xHuaEKCldhE&list=PLNCevxogE3fiLT6bEObGeVfHVLnttptKv

//Väder-api https://openweathermap.org/appid


//random bild API https://unsplash.com/developers

//dokumentation för att spara h1 localstorage https://stackoverflow.com/questions/56735599/content-editable-not-saving-with-localstorage