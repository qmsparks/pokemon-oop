const baseDeck = [
  {
    name: "Bulbasaur",
    damage: 60
  }, {
    name: "Caterpie",
    damage: 40
  }, {
    name: "Charmander",
    damage: 60
  }, {
    name: "Clefairy",
    damage: 50
  }, {
    name: "Jigglypuff",
    damage: 60
  }, {
    name: "Mankey",
    damage: 30
  }, {
    name: "Meowth",
    damage: 60
  }, {
    name: "Nidoran - female",
    damage: 60
  }, {
    name: "Nidoran - male",
    damage: 50
  }, {
    name: "Oddish",
    damage: 40
  }, {
    name: "Pidgey",
    damage: 50
  }, {
    name: "Pikachu",
    damage: 50
  }, {
    name: "Poliwag",
    damage: 50
  }, {
    name: "Psyduck",
    damage: 60
  }, {
    name: "Rattata",
    damage: 30
  }, {
    name: "Squirtle",
    damage: 60
  }, {
    name: "Vulpix",
    damage: 50
  }, {
    name: "Weedle", 
    damage: 40
  }
]

class Game {
	constructor(playerName='Eggbert') {
		this.player = new Player({
			name: playerName
		})

		this.computer = new Player({
			name: 'Computer'
		})

		this.drawDeck = new Deck({
			cards: baseDeck
		});

		this.discard = new Deck({
			cards: []
		});
	}

	deal() {
		if(this.drawDeck.cards.length >= 3) {
			for (let i = 0; i < 3; i++) {
				this.player.hand.draw(this.drawDeck);
				this.computer.hand.draw(this.drawDeck);
			}
		} else {
			// TODO turn this into logic that will actually work for the game, but: test purposes
			console.log('No more cards, game over');
		}
	}

	startRound(playerCard, comCard) {
		this.round = new Round({
			playerCard: playerCard,
			comCard: comCard
		})
	}

	// TODO reconfigure this so instead of returning something to log, it triggers some dom manipulation
	handleScore() {
		const playerWon = this.round.compareCards();

		if (playerWon === null) {
			return "Tie";
		}

		if(playerWon) {
			this.player.score++;
			return "Eggbert wins";
		} else {
			this.computer.score++;
			return "The Computer wins"
		}
	}

	endRound() {
		this.discard.cards.push(this.round.playerCard, this.round.comCard);
	}

}

class Deck {
	constructor(configObj) {
		this.cards = Deck.buildDeck(configObj.cards);
	}

	static buildDeck(cardArr) {
		const deck = [];
		if (cardArr.length > 0) {
			cardArr.forEach((cardObj, i) => {
				cardObj.id = i;
				deck.push(new Card(cardObj));
			})
		}
		return deck;
	}

	getRandomCard() {
		const index = Math.floor(Math.random() * this.cards.length);
		return this.cards.splice(index, 1)[0];
	}

	draw(targetDeck) {
		this.cards.push(targetDeck.getRandomCard());
	}
}

class Card {
	constructor(configObj) {
		this.name = configObj.name;
		this.damage = configObj.damage;
		this.id = configObj.id;
	}
}

class Player {
	constructor(configObj) {
		this.name = configObj.name;
		this.hand = new Deck({
			cards: []
		});
		this.score = 0;
	}

	chooseCard(cardId) {
		const matchingIndex = card => card.id === cardId;

		const index = this.hand.cards.findIndex(matchingIndex);

		const card = this.hand.cards.splice(index, 1)[0];
		return card;
	}

}

class Round {
	constructor(configObj) {
		this.playerCard = configObj.playerCard;
		this.comCard = configObj.comCard;
	}

	compareCards() {
		if (this.playerCard.damage === this.comCard.damage) {
			return null;
		}
		return this.playerCard.damage > this.comCard.damage ? true : false
	}

}