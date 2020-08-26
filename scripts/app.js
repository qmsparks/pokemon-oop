const cards = [
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
];


class Game {
  constructor() {
    this.deck = [];
    this.cpu = {
      name: 'Computer',
      roundsWon: 0
    };
    this.player = {
      name: 'Eggbert',
      roundsWon: 0
    };
  }

  shuffle() {
    const baseDeck = cards;

    while(baseDeck.length > 0) {
      let index = Math.floor(Math.random() * baseDeck.length);
      this.deck.push(baseDeck.splice(index, 1)[0]);
    }
  }
}



class Round extends Game { 
  constructor() {
    super();
    this.playerScore = 0;
    this.computerScore = 0;
  }

/* Methods */
  deal() {

  }
}



class Player {
/* Properties */
// Hand

/* Methods */
  winHand() {

  }
  winRound() {

  }
}
