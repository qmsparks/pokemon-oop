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
    this.cpu = new Player('Computer');
    this.player = new Player('Eggbert');
    this.rounds = []
  }

  shuffle() {
    const baseDeck = cards;
    while(baseDeck.length > 0) {
      let index = Math.floor(Math.random() * baseDeck.length);
      this.deck.push(baseDeck.splice(index, 1)[0]);
    }
  }

  newRound() {
    this.rounds.push(new Round);
  }
}

class Round { 
  constructor() {
    // Push objects with player and cpu cards played into this.plays to track the history
    this.plays = [];
  }

/* Methods */
  deal() {
    if(game.deck.length < 6) {
      console.log(`Insufficient cards to deal new hand. Game over.`);
    } else {
      for (let i = 1; i <=3; i++) {
        game.player.hand.push(game.deck.splice(0, 1)[0]);
        game.cpu.hand.push(game.deck.splice(0, 1)[0]);

      }
    }
  }
  playHand() {
    let playerCard = {};
    let computerCard = {};
    // Player chooses a card from their hand

    // But just for testing purposes:
    playerCard = game.player.chooseRandomCard();

    computerCard = game.cpu.chooseRandomCard();

    this.plays.push({player: playerCard, computer: computerCard});
    // Computer chooses a card at random
    // Compare attack values
    // Card with the higher attack value nets its player a point
  }
}

class Player {
constructor(name) {
  this.name = name;
  this.hand = [];
  this.roundScore = 0;
  this.gameScore = 0;
}

/* Methods */
  chooseRandomCard() {
    let index = Math.floor(Math.random() * this.hand.length);
    return this.hand.splice(index, 1)[0];
  }
  winHand() {
    this.roundScore++;
  }
  winRound() {
    this.gameScore ++;
  }
}


const game = new Game;
game.shuffle();
game.newRound();
game.rounds[0].deal();

console.log(game.cpu);
console.log(game.player);

game.rounds[0].playHand();
console.log(game.cpu);
console.log(game.player);
console.log(game.rounds[0].plays);



