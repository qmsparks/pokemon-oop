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
    this.cpu = new Player('The Computer');
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
    let winner = {};
    // TODO allow the player to choose their own card
    playerCard = game.player.chooseRandomCard();

    computerCard = game.cpu.chooseRandomCard();

    this.plays.push({player: playerCard, computer: computerCard});

    console.log(`${game.player.name} played ${playerCard.name}, with an attack of ${playerCard.damage}`);
    console.log(`${game.cpu.name} played ${computerCard.name}, with an attack of ${computerCard.damage}`);

    if (playerCard.damage === computerCard.damage) {
      console.log(`Cards have equal damage value. No one scores`);
    } else {
      winner = (playerCard.damage > computerCard.damage ? game.player : game.cpu);
      winner.winHand();
    }

    console.log(`Score`);
    console.log(`${game.player.name}: ${game.player.roundScore}`);
    console.log(`${game.cpu.name}: ${game.cpu.roundScore}`);
  }
}

class Player {
constructor(name) {
  this.name = name;
  this.hand = [];
  this.roundScore = 0;
  this.gameScore = 0;
}

  chooseRandomCard() {
    let index = Math.floor(Math.random() * this.hand.length);
    return this.hand.splice(index, 1)[0];
  }
  winHand() {
    this.roundScore++;
    console.log(`${this.name} wins the hand.`)
  }
  winRound() {
    this.gameScore ++;
  }
}




const game = new Game;
game.shuffle();
game.newRound();
game.rounds[0].deal();

game.rounds[0].playHand();

