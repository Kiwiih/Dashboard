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

//Kod för den egna rutan (I mitt fall ett api för att hämta ett random skämt, göra dagen bättre liksom)
const jokeBtn = document.getElementById('get-joke-btn');
const jokeSection = document.getElementById('joke-section');
//variabel för att lagra api, det är blacklistat så det inte är olämliga skämt i :)
const jokeApiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit';

jokeBtn.addEventListener('click', getJoke);

async function getJoke(){
    const response = await fetch (jokeApiUrl);
    if(response.ok){
    const json = await response.json();
        //REnsar bort det gamla skämtet om man klickar igen
        jokeSection.innerHTML = '';

        //Printa ut skämtet, fanns två olika json categorierer så den jämför dessa och printar ut den som är aktuell
        let jokeSetup = document.createElement('div')
        jokeSetup.className = 'joke-setup';
        jokeSetup.textContent = jokeSetup.textContent = json.joke || json.setup;
        jokeSection.appendChild(jokeSetup);
        //Om det är ett skämt med en punchline så ska den printas ut nedanför
        if (json.type === 'twopart') {
            let punchLine = document.createElement('div');
            punchLine.className = 'joke-punchline';
            punchLine.textContent = json.delivery;
            jokeSection.appendChild(punchLine);
        }

    }else{
        console.log('Error: ' + response.status);
    }
}