class Deck {
    constructor(){
        this.name = "placeholder";
        this.deckList = [];
        this.art = [true, true, true, true, true, true, true, true, true, true, true, true];
    }
}

const deck1 = new Deck();
const deck2 = new Deck();

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
    })

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

    loadButton.addEventListener('click', ()=> {

    })

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
                    if (index > -1){
                        deck1.art[index] = true;
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