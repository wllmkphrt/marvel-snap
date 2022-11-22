class Deck {
    constructor(){
        this.deckList = [];
        this.art = [true, true, true, true, true, true, true, true, true, true, true, true];
    }
}

const deck1 = new Deck();


function appendArt(data){
    var mainContainer = document.getElementById("myData");
    data.forEach((element) => {
        let img = document.createElement("img");
        img.src = element.art;
        img.width = "210";
        img.height = "210";
        mainContainer.appendChild(img);
        img.addEventListener("click", function addCard(){
            if(deck1.art.filter(currentValue => !currentValue).length < 12){
                const indexOfDefaultArt = deck1.art.findIndex(currentValue => currentValue);
                deck1.deckList[indexOfDefaultArt] = element;
                deck1.art[indexOfDefaultArt] = false;
                const currentImg = document.getElementById(`card`+`${indexOfDefaultArt + 1}`);
                currentImg.src = element.art;
                img.style.display ='none';
                currentImg.addEventListener("click", function removeCard(){
                    const index = deck1.deckList.indexOf(element);
                    if (index > -1){
                        deck1.art[index] = true;
                        currentImg.src ="src/images/snap-logo.webp";
                        img.style.display ='inline';
                    }
                },{once: true})
            }
        })
    })
}
fetch("http://localhost:3000/cards")
    .then((resp) => resp.json())
    .then((data) => appendArt(data));