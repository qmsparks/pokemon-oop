// ANCHOR game logic variables
let game;
let player;
let computer;


// ANCHOR jQuery variables
const $startBtn = $('#start-game');
const $drawBtn = $('#draw');
const $comHand = $('#com-hand');
const $playerHand = $('#player-hand');


// ANCHOR helper functions
const renderCards = function(cardArr, targetHand, htmlClass) {
	cardArr.forEach(card => {
		targetHand.append(`
			<li class="${htmlClass}" id="${card.id}">
				<p>${card.name}</p>
				<p>${card.damage}</p>
			</li>
		`)
	})
}

const renderScore = function() {
	console.log('Update! That! Score!!');
}


// ANCHOR event listeners
$startBtn.on('click', () => {
	game = new Game();
	player = game.player;
	computer = game.computer;
	$startBtn.toggleClass('hidden');
	$drawBtn.toggleClass('hidden');
})

$drawBtn.on('click', () => {
	game.deal();
	renderCards(player.hand.cards, $playerHand, 'card');
	renderCards(computer.hand.cards, $comHand, 'card facedown');
})

$playerHand.on('click', '.card', e => {
	const cardId = Number(e.target.id);
	game.startRound(player.chooseCard(cardId));
})