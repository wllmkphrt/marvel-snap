# phase-1-project-marvel-snap
This app is based on the recently released hit mobile card game, Marvel Snap.
I created a JSON database of all 175 cards in the game(at the time I created it that was all the cards, they have since added more).
This app allows you to create theoretical decks for the game out of all the possible cards and save them to a database for future reference.
The vast majority of the html elements on the page are dynamically added via javascript. The app fetches from db.JSON in order to populate a simple
layout of all of the cards and their descriptions, which you can then click on to add to your deck at the top of the screen.
There are no duplicate cards allowed in the game, so when you add a card to your deck, it is removed from the pool of cards. You can click on any
card in your deck to remove it and add it back to the pool. When you are satisfied with the deck you have created, you can save it, which will POST
your deck object to the JSON file. When you have a saved deck, you can load this deck back onto the screen via the dropdown load menu. There are
a lot of cards, so while you are scrolling through them, your deck and the save and load buttons will stay at the top of the screen for easy access.
