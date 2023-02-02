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
let filterArr = [];

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
        currentImg.title = "";
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
            currentImg.title = element.effect;
            currentImg.addEventListener("click", function removeCard(){
                const index = displayDeck.deckList.indexOf(element);
                displayDeck.art[index] = true;
                currentImg.src = "src/images/snap-logo.webp";
                currentImg.title = "";
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

    const filterField = document.createElement("div");
    filterField.className = "filters";
    filterField.id = "Filter By";
    btn.appendChild(filterField);

    const filterButton = document.createElement("button");
    filterButton.className = "filterButton";
    filterButton.innerHTML = "Filter By";
    filterField.appendChild(filterButton);

    const filterMenu = document.createElement("div");
    filterMenu.className = "menuContent";
    filterButton.appendChild(filterMenu);

    const fields = document.createElement("div");
    fields.className = "row";
    filterMenu.appendChild(fields);

    const power = document.createElement("div");
    power.className = "column";
    power.innerHTML = "Power<br >";
    fields.appendChild(power);

    //creates a temporary array out of all the cards which do not match the filter power value and then pushes
    //their ids to an array with the ids of cards currently in your deck and hides all cards matching these ids
    function filterPower(cards, someValue){
        const tempArr = cards.filter(element => element.power !== someValue);
        tempArr.forEach(element => filterArr.push(element.id));
        filterArr.forEach(function(element) {
            const currentCard = document.getElementById(`${element}`);
            currentCard.style.display = "none";
        });
    }

    function appendToPower(value) {
        const powerValue = document.createElement("a");
        powerValue.innerHTML = `${value}`;
        power.appendChild(powerValue);
    
        //event listener for filtering by power, checks to see if there is a previous filter array and
        //displays all elements in the array before filterPower hides elements with the new filter
        powerValue.addEventListener('click', function (){
            if(filterArr.length > 0) {
                filterArr.forEach(function(element){
                        const currentCard = document.getElementById(`${element}`);
                        currentCard.style.display = "inline-block";
                })

                //resets the filter array
                filterArr = [];

                //adds the ids of cards currently in your deck to the filter array so they are rehidden
                displayDeck.art.forEach(function(element, index){
                    if(!element){filterArr.push(displayDeck.deckList[index].id)}
                });
            }
            filterPower(data, value);
        });
    }

    //array of all the unique power values of all cards in the database
    const uniquePower = [-8, -3, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20];

    const energy = document.createElement("div");
    energy.className = "column";
    energy.innerHTML = "Energy<br >";
    fields.appendChild(energy);

    //creates a temporary array out of all the cards which do not match the filter energy value and then pushes
    //their ids to an array with the ids of cards currently in your deck and hides all cards matching these ids
    function filterEnergy(cards, someValue){
        const tempArr = cards.filter(element => element.cost !== someValue);
        tempArr.forEach(element => filterArr.push(element.id));
        filterArr.forEach(function(element) {
                const currentCard = document.getElementById(`${element}`);
                currentCard.style.display = "none";
        });
    }

    function appendToEnergy(value) {
        const energyValue = document.createElement("a");
        energyValue.innerHTML = `${value}`;
        energy.appendChild(energyValue);
    
        //event listener for filtering by energy, checks to see if there is a previous filter array and
        //displays all elements in the array before filterEnergy hides elements with the new filter
        energyValue.addEventListener('click', function (){
            if(filterArr.length > 0) {
                filterArr.forEach(function(element){
                        const currentCard = document.getElementById(`${element}`);
                        currentCard.style.display = "inline-block";
                });

                //resets the filter array
                filterArr = [];

                //adds the ids of cards currently in your deck to the filter array so they are rehidden
                displayDeck.art.forEach(function(element, index){
                    if(!element){filterArr.push(displayDeck.deckList[index].id)}
                });
            }
            filterEnergy(data, value);
        });
    }

    //array of all the unique energy values of all cards in the database
    const uniqueEnergy = [0, 1, 2, 3, 4, 5, 6, 9];

    const type = document.createElement("div");
    type.className = "column";
    type.innerHTML = "Type<br >";
    fields.appendChild(type);

    //creates a temporary array of all the cards whose effects do not contain the filter type value and then pushes
    //their ids to an array with the ids of cards currently in your deck and hides all cards matching these ids
    function filterType(cards, someValue){
        const tempArr = cards.filter(element => 
            !(element.effect.includes(someValue) || element.effect.includes(someValue.toLowerCase())));
        tempArr.forEach(element => filterArr.push(element.id));
        filterArr.forEach(function(element) {
                const currentCard = document.getElementById(`${element}`);
                currentCard.style.display = "none";
        });
    }

    function appendToType(value) {
        const typeValue = document.createElement("a");
        typeValue.innerHTML = `${value}`;
        type.appendChild(typeValue);
    
        //event listener for filtering by type, checks to see if there is a previous filter array and
        //displays all elements in the array before filterType hides elements with the new filter
        typeValue.addEventListener('click', function (){
            if(filterArr.length > 0) {
                filterArr.forEach(function(element){
                        const currentCard = document.getElementById(`${element}`);
                        currentCard.style.display = "inline-block";
                });
                
                //resets the filter array
                filterArr = [];

                //adds the ids of elements currently in your deck to the filter array so they are rehidden
                displayDeck.art.forEach(function(element, index){
                    if(!element){filterArr.push(displayDeck.deckList[index].id)}
                });
            }
            filterType(data, value);
        });
    }

    //array of strings of the main archetypes of cards
    const uniqueTypes = ["Ongoing", "On Reveal", "Move", "Discard", "Destroy", "No effect"];

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

    const clearField = document.createElement("div");
    clearField.className = "clearField";
    clearField.id = "clear";
    saveButtonField.appendChild(clearField);

    const clearDeck = document.createElement("button");
    clearDeck.className = "clearButton";
    clearDeck.id = "clrButton";
    clearDeck.innerHTML = "Clear Deck";
    clearField.appendChild(clearDeck);

    //event listener for clearing current deck
    clearDeck.addEventListener('click', function (){
        fetch("http://localhost:3000/decks")
            .then((resp) => resp.json())
            .then((decks) => loadDeck(decks.find(element => 'empty deck' === element.name)));
    });

    const clearFilterButton = document.createElement("button");
    clearFilterButton.className = "clearButton";
    clearFilterButton.id = "clrButton";
    clearFilterButton.innerHTML = "Clear Filter";
    clearField.appendChild(clearFilterButton);

    clearFilterButton.addEventListener("click", function (){
        if(filterArr.length > 0) {
            filterArr.forEach(function(element){
                const currentCard = document.getElementById(`${element}`);
                currentCard.style.display = "inline-block";
            })
            filterArr = [];
            displayDeck.art.forEach(function(element, index){
                if(!element){filterArr.push(displayDeck.deckList[index].id)}
            });
            filterArr.forEach(function(element) {
                const currentCard = document.getElementById(`${element}`);
                currentCard.style.display = "none";
            });
        }
    });

    const loadButtonField = document.createElement("div");
    loadButtonField.className = "dropdown";
    loadButtonField.id = "load";
    saveButtonField.appendChild(loadButtonField);

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
                currentImg.title = element.effect;
                card.style.display = 'none';

                //this is the click event for removal of cards from your deck
                currentImg.addEventListener("click", function removeCard(){
                    const index = displayDeck.deckList.indexOf(element);
                    if (index > -1){
                        displayDeck.art[index] = true;
                        currentImg.src = "src/images/snap-logo.webp";
                        currentImg.title = "";
                        card.style.display = 'inline-block';
                    }
                },{once: true})
            }
        })
    });
    uniquePower.forEach(element => appendToPower(element));
    uniqueEnergy.forEach(element => appendToEnergy(element));
    uniqueTypes.forEach(element => appendToType(element));
}

//fetches the card database and then runs the main function to populate the page
fetch("http://localhost:3000/cards")
    .then((resp) => resp.json())
    .then((data) => createPage(data));