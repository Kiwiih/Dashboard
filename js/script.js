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


//Skapa och spara länkar
const addLinkBtn = document.querySelector('.add-link-btn');
const linkContainer = document.getElementById('link-container');
let userLinks = getStoredLinks() || [];

addLinkBtn.addEventListener('click', addLinks)

//Funktion för att kunna lägga till länkar
function addLinks(){

    let inputValue = prompt('Please enter your link:') 
    userLinks.push(inputValue) 
    console.log(userLinks)
    saveLinks();
    getStoredLinks();
    linkContainer.innerHTML = ''; 
    displayLinks();  
}
//funktion för att rendra länkarna
function displayLinks(){

    userLinks.forEach((link, index) => {
        const linkSection = document.createElement('div');
        linkSection.className = 'link-section';
        
        let url = new URL(link)
        //Ska se till så inte hela urlen behövs skrivas ut, utan bara vad sidan heter
        let siteName = url.hostname;

        const linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.className = 'link-element';   
        linkElement.textContent = siteName;

        //Skapa en delete knapp för varje länk som läggs till, och en funktion som tar bort
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.className = 'remove-btn';  
        removeButton.addEventListener('click', function(){
            userLinks.splice(index, 1);
            saveLinks();
            linkContainer.innerHTML = '';
            displayLinks();
        });
        
        linkSection.appendChild(linkElement);
        linkSection.appendChild(removeButton);
        linkContainer.appendChild(linkSection);
    });
}
//Funktion för att spara länkarna i localstorage
function saveLinks(){
    localStorage.setItem('userLinks', JSON.stringify(userLinks));
    
}
//Funktion för att hämta de sparade länkarna
function getStoredLinks(){
    const storedLinks = localStorage.getItem('userLinks');
    /*lärde mig att ? kan tydligen funka som en "shorthand" för en if sats, så om den(?) är falsk(finns inget i 
    localstorage på den nyckeln) så skickas det en tom array 😀 */
    return storedLinks ? JSON.parse(storedLinks) : [];
}

/*Funktion för att kalla på anteckningarna och titel funktionerna direkt när sidan laddas, även lagt till så ett skämt genereras*/
window.onload = () => { 
    inputContent(); 
    notesContent(); 
    getJoke(); 
    displayLinks();
};
