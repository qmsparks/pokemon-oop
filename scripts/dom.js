const logHand = function() {
    console.log(`Computer has ${game.player.hand.cards.length} cards remaining`);
    console.log(game.player.hand.cards);
}

const testRound = function(num) {
    game.startRound(game.player.chooseCard(num));
    console.log(game.handleScore());
    console.log(game.player.score);
    console.log(game.computer.score);
    game.endRound();
    logHand();
}

logHand();