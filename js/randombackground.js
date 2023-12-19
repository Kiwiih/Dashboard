//Hämta knappen
const backgroundBtn = document.getElementById('random-background-btn');
//Variabel för api
let backgroundApiUrl; 

backgroundBtn.addEventListener('click', generateBackground)

//Funktion för att generera en bild från api som ska användas som bakgrundbild
async function generateBackground(){
    const response = fetch(backgroundApiUrl)
    //Variabel för api får sitt värde
    backgroundApiUrl = 'https://api.unsplash.com/photos/?client_id=WbktjzEY2YI36QAMxdvlpmn81Hg5IvVscp9Y2ZYsFSg?orientation=landscape';
    

    body.style.backgroundImage = ;
}
