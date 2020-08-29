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
    this.discardPile = [];
  }

  shuffle() {

    while(this.baseDeck.length > 0) {
      let index = Math.floor(Math.random() * this.baseDeck.length);
      this.deck.push(this.baseDeck.splice(index, 1)[0]);
    }
  }

  deal(hand, player) {
    for (let i = 0; i < 3; i++) {
      let cardData = this.deck.splice(0, 1)[0];
      cardData.domClass = i;
      let $card = $(`<ul class="card ${i}"/>`).append($('<li class="img" />'));
      $card.append(`<li class="name">${cardData.name}</li>`, `<li class ="damage">${cardData.damage}</li>`);
      hand.append($card);
      player.hand.push(cardData);
    }
  }
  
  discard() {
    this.discardPile.push(game.player.card, game.cpu.card);
    $cpuCard.remove();
    $playerCard.remove();
  }
}

class Game {
  constructor() {
    this.cpu = new Player('The Computer');
    this.player = new Player('Eggbert');    
  }

  getCard($clickedCard) {
    for(let i = 0; i < game.player.hand.length; i++) {
      if($clickedCard.hasClass(`${i}`)) {
        game.player.card = game.player.hand.splice(i,1)[0];
      }
    }
  }

  checkWinner() {
    let winner = {};
    if (this.player.card.damage === this.cpu.card.damage) {
      console.log(`Tie`);
    } else {
      winner = (this.player.card.damage > this.cpu.card.damage ? this.player : this.cpu);
      winner.winHand();
    }
  }

}



class Player {
constructor(name) {
  this.name = name;
  this.hand = [];
  this.roundScore = 0;
  this.gameScore = 0;
  this.card = {};
}

  chooseRandomCard() {

    let index = Math.floor(Math.random() * this.hand.length);
    this.card = this.hand.splice([index], 1)[0];

  $cpuCard = $(`#cpu-hand .${this.card.domClass}`);
  }

  winHand(winnerObject) {
    this.roundScore++;
    // if(this === game.player) {
    //   $('#eggbert-score').text(this.roundScore);
    // } else {
    //   $('#computer-score').text(this.roundScore);
    // }
  }
  winRound() {
    this.gameScore ++;
    // if(this === game.player) {
    //   $('#eggbert-rounds').text(this.gameScore);
    // } else {
    //   $('#computer-rounds').text(this-gameScore);
    // }
  }

}

const deck = new Deck;
const game = new Game;
let $cpuCard = {};
let $playerCard = {};


  deck.shuffle();
  deck.deal($('#cpu-hand'), game.cpu);
  deck.deal($('#player-hand'), game.player);



$('#player-hand').on('click', 'ul', function(e) {
  game.cpu.chooseRandomCard();
  $playerCard = $(e.target);
  game.getCard($(e.target));
  game.checkWinner();
  updateScore();
  deck.discard();
});

const updateScore = function() {
  $('#eggbert-score').text(game.player.roundScore);
  $('#eggbert-rounds').text(game.player.gameScore);

  $('#computer-score').text(game.cpu.roundScore);
  $('#computer-rounds').text(game.cpu.gameScore);
}