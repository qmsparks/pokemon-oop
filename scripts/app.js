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

class Deck {
  constructor() {
    this.baseDeck = cards;
    this.deck = [];
    this.discard = [];
  }

  shuffle() {

    while(this.baseDeck.length > 0) {
      let index = Math.floor(Math.random() * this.baseDeck.length);
      this.deck.push(this.baseDeck.splice(index, 1)[0]);
    }
  }

  deal() {
    if (this.deck.length < 6) {
      console.log(`Round over`);
    } else {
      for (let i = 1; i <= 3; i++) {

        game.player.hand.push(this.deck.splice(0, 1)[0]);
        game.cpu.hand.push(this.deck.splice(0,1)[0]);
      }
    }
  }

}

class Game {
  constructor() {
    this.cpu = new Player('The Computer');
    this.player = new Player('Eggbert');    
  }

  playGame() {
    // Player and computer both choose cards
    let computerCard = game.cpu.chooseRandomCard();

    //Grab player card randomly for now
    let playerCard = game.player.chooseRandomCard();

    let winner = {};

    if (playerCard.damage === computerCard.damage) {
      console.log(`${game.player.name}'s ${playerCard.name} and ${game.cpu.name}'s ${computerCard.name} reached a stalemate.`);
    } else {
      winner = (playerCard.damage > computerCard.damage ? game.player : game.cpu);
      winner.winHand();

    }

    // Score go here also
    deck.discard.push(computerCard, playerCard);
    
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
    console.log(`${this.name} wins the hand.`);
  }
  winRound() {
    this.gameScore ++;
  }
}

const deck = new Deck;
const game = new Game;

deck.shuffle();
console.log(deck);
deck.deal();
console.log(game.player.hand);
console.log(game.cpu.hand);
game.playGame();
console.log(deck.discard);






/* class Round { 
  constructor() {
    // Push objects with player and cpu cards played into this.plays to track the history
    this.plays = [];
  }

  playHand() {
    let playerCard = {};
    let computerCard = {};
    let winner = {};
    // TODO allow the player to choose their own card
    playerCard = game.player.chooseRandomCard();

    computerCard = game.cpu.chooseRandomCard();



   

    console.log(`Score`);
    console.log(`${game.player.name}: ${game.player.roundScore}`);
    console.log(`${game.cpu.name}: ${game.cpu.roundScore}`);
  }
}*/