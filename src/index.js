class Deck {
    constructor(){
        this.name = "placeholder";
        this.deckList = [];
        this.art = [true, true, true, true, true, true, true, true, true, true, true, true];
    }
}
const myEvent = new Event("custom:deckloaded");

const deck1 = new Deck();
const deck2 = new Deck();

/*
function loadDeck(deck){
    document.dispatchEvent(myEvent);
    deck1.name = deck.name;
    deck1.deckList = deck.deckList;
    deck1.art = deck.art;
    for(i = 0; i <= deck.deckList.length; i++){
        let snapLogo = document.getElementById(`card`+`${i}`);
        snapLogo.src = deck.deckList[i].art;
    }
}*/

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
        deck2.name = document.querySelector('#enter').value;
        document.querySelector('#enter').value = "";
        deck2.deckList = deck1.deckList.filter((element, index) => !deck1.art[index]);
        deck2.art = deck2.art.map((element, index) => index >= deck2.deckList.length);

        const deckOption = document.createElement("a");
        deckOption.href = "#";
        deckOption.innerHTML = deck2.name;
        loadContent.appendChild(deckOption);
        deckOption.addEventListener('click', function loadDeck(){
            deck1.name = deck2.name;
            deck1.deckList = deck2.deckList;
            deck1.art = deck2.art;
            for(i = 0; i < deck2.deckList.length; i++){
                let card = document.getElementById(deck2.deckList[i].id);
                card.style.display ='none';
                let snapLogo = document.getElementById(`card`+`${i}`);
                snapLogo.src = deck2.deckList[i].art;
                snapLogo.addEventListener("click", function removeCard(){
                        deck1.art[i] = true;
                        snapLogo.src ="src/images/snap-logo.webp";
                        card.style.display ='inline-block';
                },{once: true})
                console.log('deckloaded');
            }
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
            if(deck1.art.filter(currentValue => !currentValue).length < 12){
                const indexOfDefaultArt = deck1.art.findIndex(currentValue => currentValue);
                deck1.deckList[indexOfDefaultArt] = element;
                deck1.art[indexOfDefaultArt] = false;
                const currentImg = document.getElementById(`card`+`${indexOfDefaultArt}`);
                currentImg.src = element.art;
                card.style.display ='none';
                currentImg.addEventListener("click", function removeCard(){
                    const index = deck1.deckList.indexOf(element);
                    deck1.art[index] = true;
                    currentImg.src ="src/images/snap-logo.webp";
                    card.style.display ='inline-block';
                },{once: true})
            }
        })
    })
}
fetch("http://localhost:3000/cards")
    .then((resp) => resp.json())
    .then((data) => createPage(data));