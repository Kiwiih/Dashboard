//Hämta knappen
const backgroundBtn = document.getElementById('random-background-btn');
//Variabel för api
const backgroundApiUrl = 'https://api.unsplash.com/photos/random?client_id=WbktjzEY2YI36QAMxdvlpmn81Hg5IvVscp9Y2ZYsFSg&orientation=landscape&order_by=random';

backgroundBtn.addEventListener('click', generateBackground);

//Funktion för att generera en bild från api som ska användas som bakgrundbild
async function generateBackground(){
    const response = await fetch (backgroundApiUrl)
    if (response.ok){
    const json = await response.json();    
    //Hämta utrl från apins json och lägg in den i en variabel vars värde kan ändras så kan bli random
    let imgUrl = json.urls.full;  
    //Ta den hämtade url:en från json Api:n och lägg in den i bodyn som en bakgrundsbild
    document.body.style.backgroundImage = `url(${imgUrl})`;

    }else{
        console.log('Error: ' + response.status);
    }
    
}

//Kod för den egna rutan
const jokeBtn = document.getElementById('get-joke-btn');