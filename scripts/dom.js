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
	$playerTarget.append($(`#${round.playerCard.id}`));
	$comTarget.append($(`#${round.comCard.id}`));
	// playRound();
}

const renderScore = function() {
	// TODO
	console.log('Update! That! Score!!');
}


// ANCHOR game logic helper functions
const playRound = function() {
	// TODO
	// This will be the function that calls the Game instance's handleScore() function
	// And also deal with whatever animations I attach to this
}

const endRound = function() {
	// TODO
	// Here we handle the discard, both in the Game istance and in the UI (which means, again, potentially some animation)
	// This will also be where we call the renderScore function to update the UI
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