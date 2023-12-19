/*
3. Denna del innehåller länkar som användaren sparat. 
Användaren kan ta bort länkar (3a) samt lägga till nya (3b). 
När användaren lägger till nya länkar ska användaren fylla i länken samt en rubrik som denna 
vill ska synas i dashboarden.
Extra utmaning: Hämta länkens favicon och visa som bild i dashboarden.
*/

let dateDiv = document.getElementById("date-div");
//Funktion för att uppdatera tiden utan att uppdatera sidan
function updateTime(){
    //Variabler för att hämta tid/datum med Date()
    const date = new Date();
    const dateTimeString = date.toLocaleString();
    dateDiv.innerHTML = dateTimeString;
}
/*Använder interval för att se till så tiden uppdateras varje halvsekund, 
detta för att klockan ska gå helt rätt, det blev en liten delay om jag hade var 1000e*/
setInterval(updateTime, 500);

//Sektion för att uppdatera H1 och spara i localstorage
let titleInput = document.getElementById('title');
let titleKey = 'h1HTML';
function updateTitleInput(){
    localStorage.setItem(titleKey, titleInput.innerHTML);
}
/*Funktion för att när sidan laddats ska texten antingen innehålla default 
'Dashboard' eller det som man själv fyllt i*/
function inputContent() {
    let result = localStorage.getItem(titleKey);
    titleInput.innerHTML = result || 'Dashboard';
};
//Eventlistener för att funktionen ska kallas på när inputen är ändrad
titleInput.addEventListener('input', updateTitleInput)



//funktioner för notes inputen, så den uppdaterar och sparar i localStorage
let notesInput = document.getElementById("notes-input");
let notesKey = 'notesHTML';

function updateNotesInput(){
    localStorage.setItem(notesKey, notesInput.value);
}
function notesContent(){
    let notesResult = localStorage.getItem(notesKey);
    notesInput.value = notesResult || 'Write notes here...';
};
notesInput.addEventListener('input', updateNotesInput)

/*Funktion för att kalla på anteckningarna och titel funktionerna direkt när sidan laddas*/
window.onload = () => { inputContent(); notesContent(); }


//API för 3e rutan https://sv443.net/jokeapi/v2/      https://www.youtube.com/watch?v=xHuaEKCldhE&list=PLNCevxogE3fiLT6bEObGeVfHVLnttptKv

