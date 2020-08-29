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
    // shuffles cards randomly from based deck into working deck, assigning each one a unique id based off their index in that array
    for(let i = 0; i < 18; i++){
      let index = Math.floor(Math.random() * this.baseDeck.length);
      let card = this.baseDeck.splice(index, 1)[0];
      card.id = i;
      this.deck.push(card);
    }
}

  deal(hand, player) {
    // deals three cards to a player, and gives the dom element the same id as the corresponding card object
    // NOTE appended a blank image li for if I want to actually style the cards in the dom
    for (let i = 0; i < 3; i++) {
      let cardData = this.deck.splice(0, 1)[0];
      let $card = $(`<ul class="card" id="${cardData.id}"/>`).append($('<li class="img" />'));
      $card.append(`<li class="name">${cardData.name}</li>`, `<li class ="damage">${cardData.damage}</li>`);
      hand.append($card);
      player.hand.push(cardData);
    }
  }
  
  discard() {
    // removes selected cards from the player object's hand array, and from the dom
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
    // ensures that clicking a card accurately effects both the data and the visuals 
    let cardId = $clickedCard.attr('id');
    let cardIndex = game.player.hand.findIndex(function(element) {
      return element.id == cardId; });
      
      game.player.card = game.player.hand.splice(cardIndex, 1)[0];
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

  updateScore() {
    // puts accurate score on the page
    $('#eggbert-score').text(game.player.roundScore);
    $('#eggbert-rounds').text(game.player.gameScore);

    $('#computer-score').text(game.cpu.roundScore);
    $('#computer-rounds').text(game.cpu.gameScore);
  }

  newRound(){

    (this.player.roundScore > this.cpu.roundScore ? this.player.winRound() : this.cpu.winRound);
    this.player.roundScore = 0;
    this.cpu.roundScore = 0;

    if (deck.deck.length < 6) {
      $('#score').append($('<p>Game Over!</p>'));
    } else {
      deck.deal($('#cpu-hand'), game.cpu);
      deck.deal($('#player-hand'), game.player);
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

    $cpuCard = $(`#${this.card.id}`);
  }

  winHand(winnerObject) {
    this.roundScore++;
    game.updateScore();
  }
  winRound() {
    this.gameScore ++;
    game.updateScore();
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
  deck.discard();

  if (game.cpu.hand.length === 0) {
    game.newRound();
  }
});

// const updateScore = function() {
//   $('#eggbert-score').text(game.player.roundScore);
//   $('#eggbert-rounds').text(game.player.gameScore);

//   $('#computer-score').text(game.cpu.roundScore);
//   $('#computer-rounds').text(game.cpu.gameScore);
// }