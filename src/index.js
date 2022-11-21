class Deck {
    constructor(){
        this.deckList = [];
        this.cardCount = 0;
    }
}

const deck1 = new Deck();


function appendArt(data){
    var mainContainer = document.getElementById("myData");
    data.forEach((element) => {
        let img = document.createElement("img");
        img.src = element.art;
        img.width = "200";
        img.height = "200";
        mainContainer.appendChild(img);
        img.addEventListener("click", function addCardtoDeck(){
            deck1.deckList[deck1.cardCount] = element;
            document.getElementById(`card`+`${(deck1.cardCount + 1)}`).src = element.art;
            if(deck1.cardCount < 12){
                deck1.cardCount++;
            }
        })
    })
}
fetch("http://localhost:3000/cards")
    .then((resp) => resp.json())
    .then((data) => appendArt(data));