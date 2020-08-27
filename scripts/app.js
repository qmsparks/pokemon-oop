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
      game.player.hand = this.deck.splice(0, 3);
      game.cpu.hand = this.deck.splice(0, 3);
  }
  

}

class Game {
  constructor() {
    this.cpu = new Player('The Computer');
    this.player = new Player('Eggbert');    
  }

  playGame() {
    
    for(let i = 0; i < 3; i++) {
      this.cpu.chooseRandomCard();
      this.player.chooseRandomCard();
      
      //TODO allow player to choose their card 
      // this.player.chooseCard();

      let winner = {};
      let loser = {};

      if (this.player.card.damage === this.cpu.card.damage) {
        console.log(`${this.player.name}'s ${this.player.card.name} and ${this.cpu.name}'s ${this.cpu.card.name} reach a stalemate.`);
      } else {
        winner = (this.player.card.damage > this.cpu.card.damage ? this.player : this.cpu);
        winner.winHand();

        if(winner === this.player) {
          loser = this.cpu;
        } else {
          loser = this.player;
        }
        
        console.log(`${winner.name}'s ${winner.card.name} beats ${loser.name}'s ${loser.card.name}`);
      }
    }

    deck.discard.push(this.cpu.card, this.player.card);
  }

  trackScore() {
    //  TODO adjust gameScore and resent roundScore at the end of each round
  }
}



class Player {
constructor(name) {
  this.name = name;
  this.roundScore = 0;
  this.gameScore = 0;
  this.card = {};
}

  chooseRandomCard() {
    let index = Math.floor(Math.random() * this.hand.length);
    this.card = this.hand.splice(index, 1)[0];
  }

  chooseCard() {

  }

  winHand() {
    this.roundScore++;
  }
  winRound() {
    this.gameScore ++;
  }
}

const deck = new Deck;
const game = new Game;

const beginGame = function() { 
  deck.shuffle();
  while(deck.deck.length >= 6) {
    // console.log(`Dealing new hands`);
    deck.deal();
    game.playGame();
    console.log(`\n`);
  }
}


beginGame();
