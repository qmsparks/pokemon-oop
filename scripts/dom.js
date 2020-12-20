// ANCHOR game logic variables
let game;
let player;
let computer;


// ANCHOR jQuery variables
const $startBtn = $('#start-game');
const $drawBtn = $('#draw');
const $playerHand = $('#player-hand');
const $playerTarget = $('#player-target');
const $comHand = $('#com-hand');
const $comTarget = $('#com-target');
const $discard = $('#discard');



// ANCHOR rendering helper functions
const renderActiveUI = function() {
	$('#player-name').text(player.name);
	$('.target').toggleClass('hidden');
	$('.score-display').toggleClass('hidden');
	$startBtn.toggleClass('hidden');
	$drawBtn.toggleClass('hidden');
}

const renderCards = function(cardArr, targetHand, htmlClass) {
	cardArr.forEach(card => {
		targetHand.append(`
			<li class="${htmlClass}" id="${card.id}">
				<p class="card-name">${card.name}</p>
				<p class ="card-damage">${card.damage}</p>
			</li>
		`)
	})
}

const moveCardsToField = function(round) {
	$playerTarget.append($(`#${round.playerCard.id}`).addClass('in-play'));
	$comTarget.append($(`#${round.comCard.id}`).addClass('in-play').removeClass('facedown'));
	playRound();
}

const renderScore = function() {
	// TODO
	console.log('Update! That! Score!!');
	$('#com-score').text(computer.score);
	$('#player-score').text(player.score);
}


// ANCHOR game logic helper functions
const playRound = function() {
	const playerWon = game.handleRound();
	
	if (playerWon === null) console.log("Tie");
	else {
		playerWon ? console.log(`${player.name} wins`) : console.log("The computer wins");
	}
	
	// TODO this will be where whatever animation gets handled

	setTimeout(() => {
		endRound()
	}, 2500)
}

const endRound = function() {
	// TODO animation!
	$('.in-play').removeClass('in-play').addClass('discarded');

	$('#discard-pile').append($('.discarded'));
	renderScore();
}



// ANCHOR event listeners
$startBtn.on('click', () => {
	game = new Game();
	player = game.player;
	computer = game.computer;

	renderActiveUI();
})

$drawBtn.on('click', () => {
	game.deal();
	renderCards(player.hand.cards, $playerHand, 'card');
	renderCards(computer.hand.cards, $comHand, 'card facedown');
})

$playerHand.on('click', '.card', e => {
	const $target = $(e.target);
	
	const cardId = $target.hasClass('card') ?
	Number(e.target.id) :
	Number($target.parent('.card').attr('id'));

	game.startRound(player.chooseCard(cardId), computer.hand.getRandomCard());
	moveCardsToField(game.round);
})