class Deck {
    constructor(){
        this.deckList = [];
        this.art = [true, true, true, true, true, true, true, true, true, true, true, true];
    }
}

const deck1 = new Deck();


function appendArt(data){
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
                const currentImg = document.getElementById(`card`+`${indexOfDefaultArt + 1}`);
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
    .then((data) => appendArt(data));