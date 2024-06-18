# phase-1-project-marvel-snap
This app is based on the recently released hit mobile card game, Marvel Snap.
I created a JSON database of all 175 cards in the game(at the time I created it that was all the cards, they have since added more).
This app allows you to create theoretical decks for the game out of all the possible cards and save them to a database for future reference.
The app fetches from db.JSON in order to populate a simple layout of all of the cards and their descriptions, which you can then click on to add to your deck at the top of the screen.
There are no duplicate cards allowed in the game, so when you add a card to your deck, it is removed from the pool of cards. You can click on any
card in your deck to remove it and add it back to the pool. When you are satisfied with the deck you have created, you can save it, which will POST
your deck object to the JSON file. When you have a saved deck, you can load this deck back onto the screen via the dropdown load menu. There are
a lot of cards, so while you are scrolling through them, your deck and the save and load buttons will stay at the top of the screen for easy access.
You can also filter the cards by their power, energy cost, and type via a dropdown menu. This makes it easier to find cards that will fit well with the deck you are creating. For further ease, you can clear the deck you are currently working on with one click via the clear deck button. You can also clear the filter you have applied currently to redisplay all the cards with the clear filter button.
<img width="1315" alt="Screen Shot 2023-02-03 at 12 20 42 PM" src="https://user-images.githubusercontent.com/33963737/216666797-9ba9f501-bf83-42df-a65e-faf4b1cb3169.png">
