class Deck {
    constructor(){
        this.name = "placeholder";
        this.deckList = [];
        this.art = [true, true, true, true, true, true, true, true, true, true, true, true];
    }
}

//creates two deck objects for manipulation on the page
const displayDeck = new Deck();
const saveDeck = new Deck();

//function used to post decks to db.json
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

// function to load a saved deck
function loadDeck(deck){

    //resets cards/events before they are replaced by loaded cards/events
    for(i = 0; i < displayDeck.deckList.length; i++){
        let card = document.getElementById(displayDeck.deckList[i].id);
        card.style.display = 'inline-block';
        let currentImg = document.getElementById(`card`+`${i}`);
        currentImg.src = "src/images/snap-logo.webp";
    }

    //sets the display deck attributes equal to the load deck
    displayDeck.name = deck.name;
    displayDeck.deckList = deck.deckList;
    displayDeck.art = deck.art;

    //displays loaded cards and adds event listeners to cards now displayed in deck
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
//populates the page elements dynamically
function createPage(data){
    let deckContainer = document.getElementById("deck");
    for(i = 0; i < 12; i++){
        let snapLogo = document.createElement("img");
        snapLogo.id = (`card`+`${i}`);
        snapLogo.src = "src/images/snap-logo.webp";
        snapLogo.width = "150";
        snapLogo.height = "150";
        deckContainer.appendChild(snapLogo);

        //mouseover and mouseout events to change image size of cards in deck
        snapLogo.addEventListener("mouseover", function bigImg(){
            snapLogo.style.height = "165px";
            snapLogo.style.width = "165px";
        });
        snapLogo.addEventListener("mouseout", function smallImg(){
            snapLogo.style.height = "150px";
            snapLogo.style.width = "150px";
        });
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

    //adds an event to the save button which adds the deck name to dropdown menu under 
    //load button and adds the currently displayed deck to the database
    function save () {
        saveDeck.name = document.querySelector('#enter').value;
        document.querySelector('#enter').value = "";
        saveDeck.deckList = displayDeck.deckList.filter((element, index) => !displayDeck.art[index]);
        saveDeck.art = saveDeck.art.map((element, index) => index >= saveDeck.deckList.length);
    
        //adds the deck to the database
        createPost(saveDeck);
    
        const deckOption = document.createElement("a");
        deckOption.href = "#";
        deckOption.innerHTML = saveDeck.name;
        loadContent.appendChild(deckOption);
    
        //event listener for dropdown menu to load deck
        deckOption.addEventListener('click', function (){
            fetch("http://localhost:3000/decks")
                .then((resp) => resp.json())
                .then((decks) => loadDeck(decks.find(element => deckOption.innerHTML === element.name)));
        });
    }

    //adds event listeners which call save function
    document.addEventListener('keyup', (event) => {
        if(event.key === "Enter") {save()};
    });
    saveButton.addEventListener('click', save);

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

    //this populates all the cards on the page from our database
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

        //adds the effect text under each card
        let p = document.createElement("p");
        p.id = "text";
        let effect = document.createTextNode(`${element.effect}`);
        p.appendChild(effect);
        card.appendChild(p);

        //adds a click event to add cards into your deck and remove them from display below,
        //which then adds a click event to the card image in your deck which removes the image
        //from the deck and returns it to display below
        img.addEventListener("click", function addCard(){
            if(displayDeck.art.filter(currentValue => !currentValue).length < 12){
                const indexOfDefaultArt = displayDeck.art.findIndex(currentValue => currentValue);
                displayDeck.deckList[indexOfDefaultArt] = element;
                displayDeck.art[indexOfDefaultArt] = false;
                const currentImg = document.getElementById(`card`+`${indexOfDefaultArt}`);
                currentImg.src = element.art;
                card.style.display ='none';

                //this is the click event for removal of cards from your deck
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

//fetches the card database and then runs the main function to populate the page
fetch("http://localhost:3000/cards")
    .then((resp) => resp.json())
    .then((data) => createPage(data));