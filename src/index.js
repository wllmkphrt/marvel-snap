class Deck {
    constructor(){
        this.name = "placeholder";
        this.deckList = [];
        this.art = [true, true, true, true, true, true, true, true, true, true, true, true];
    }
}

const displayDeck = new Deck();
const saveDeck = new Deck();

function createPost(data){
    const config = {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    }
    return fetch("http://localhost:3000/decks",config)
    .then(function(response){
        return response.json()
    })
}

function loadDeck(deck){
    if(displayDeck.deckList.length > deck.deckList.length){
        for(i = deck.deckList.length; i < displayDeck.deckList.length; i++){
            let card = document.getElementById(displayDeck.deckList[i].id);
            card.style.display = 'inline-block';
            let currentImg = document.getElementById(`card`+`${displayDeck.deckList[i].id}`);
            currentImg.src = "src/images/snap-logo.webp";
        }
    }
    displayDeck.name = deck.name;
    displayDeck.deckList = deck.deckList;
    displayDeck.art = deck.art;
    deck.deckList.forEach((element) => {
            let card = document.getElementById(element.id);
            card.style.display ='none';
            let currentImg = document.getElementById(`card`+`${deck.deckList.indexOf(element)}`);
            currentImg.src = element.art;
            currentImg.addEventListener("click", function removeCard(){
                const index = displayDeck.deckList.indexOf(element);
                displayDeck.art[index] = true;
                currentImg.src ="src/images/snap-logo.webp";
                card.style.display ='inline-block';
            },{once: true})
    });
}

function createPage(data){
    let deckContainer = document.getElementById("deck");
    for(i = 0; i < 12; i++){
        let snapLogo = document.createElement("img");
        snapLogo.id = (`card`+`${i}`);
        snapLogo.src = "src/images/snap-logo.webp";
        snapLogo.width = "150";
        snapLogo.height = "150";
        deckContainer.appendChild(snapLogo);
    }

    let btn = document.getElementById("buttons");

    const saveButtonField = document.createElement("div");
    saveButtonField.className ="buttonIn";
    saveButtonField.id = "save";
    btn.appendChild(saveButtonField);

    const deckTitle = document.createElement("input");
    deckTitle.type ="text";
    deckTitle.id = "enter";
    saveButtonField.appendChild(deckTitle);

    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.innerHTML = "Save Deck";
    saveButtonField.appendChild(saveButton);

    saveButton.addEventListener('click', () => {
        saveDeck.name = document.querySelector('#enter').value;
        document.querySelector('#enter').value = "";
        saveDeck.deckList = displayDeck.deckList.filter((element, index) => !displayDeck.art[index]);
        saveDeck.art = saveDeck.art.map((element, index) => index >= saveDeck.deckList.length);

        createPost(saveDeck);

        const deckOption = document.createElement("a");
        deckOption.href = "#";
        deckOption.innerHTML = saveDeck.name;
        loadContent.appendChild(deckOption);
        deckOption.addEventListener('click', function (){
            fetch("http://localhost:3000/decks")
                .then((resp) => resp.json())
                .then((decks) => loadDeck(decks.find(element => deckOption.innerHTML === element.name)));
        });
    });

    const loadButtonField = document.createElement("div");
    loadButtonField.className = "dropdown";
    loadButtonField.id = "load";
    btn.appendChild(loadButtonField);

    const loadButton = document.createElement("button");
    loadButton.className = "dropbtn";
    loadButton.innerHTML = "Load Deck";
    loadButtonField.appendChild(loadButton);

    const loadContent = document.createElement("div");
    loadContent.className = "dropdown-content";
    loadButtonField.appendChild(loadContent);

    let mainContainer = document.getElementById("myData");
    data.forEach((element) => {
        let card = document.createElement("div");
        card.id = element.id;
        card.className = "card";
        mainContainer.appendChild(card);

        let img = document.createElement("img");
        img.src = element.art;
        img.width = "190";
        img.height = "190";
        card.appendChild(img);

        let p = document.createElement("p");
        p.id = "text";
        let effect = document.createTextNode(`${element.effect}`);
        p.appendChild(effect);
        card.appendChild(p);

        img.addEventListener("click", function addCard(){
            if(displayDeck.art.filter(currentValue => !currentValue).length < 12){
                const indexOfDefaultArt = displayDeck.art.findIndex(currentValue => currentValue);
                displayDeck.deckList[indexOfDefaultArt] = element;
                displayDeck.art[indexOfDefaultArt] = false;
                const currentImg = document.getElementById(`card`+`${indexOfDefaultArt}`);
                currentImg.src = element.art;
                card.style.display ='none';
                currentImg.addEventListener("click", function removeCard(){
                    const index = displayDeck.deckList.indexOf(element);
                    if (index > -1){
                        displayDeck.art[index] = true;
                        currentImg.src ="src/images/snap-logo.webp";
                        card.style.display ='inline-block';
                    }
                },{once: true})
            }
        })
    })
}
fetch("http://localhost:3000/cards")
    .then((resp) => resp.json())
    .then((data) => createPage(data));