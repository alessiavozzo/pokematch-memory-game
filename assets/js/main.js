/* get dom elements */
const board = document.getElementById('board');
const errorsCounter = document.getElementById('errors-counter');

/* cards array */
const cards = ['alien', 'bug', 'duck', 'rocket', 'spaceship', 'tiktac', 'alien', 'bug', 'duck', 'rocket', 'spaceship', 'tiktac'];

/* init variables I need */
let shuffledCards = [];

let firstCardFlipped = null;
let secondCardFlipped = null;


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//shuffle cards array
function shuffleCards(shuffledArray, originalArray) {

    /* repeat until shuffledNumbers length == cards length: extract random number between 0 and cards length, if the number isn't already included in shuffledNumbers, push it into shuffledNumbers*/
    let shuffledNumbers = [];
    while (shuffledNumbers.length < originalArray.length) {
        let randomNumber = getRndInteger(0, originalArray.length - 1);
        if (!shuffledNumbers.includes(randomNumber)) {
            shuffledNumbers.push(randomNumber);
        }
    }

    /* for each number of my shuffledNumbers array, push into shuffledCards the card in position number */
    shuffledNumbers.forEach(number => {
        shuffledArray.push(originalArray[number]);
    });

    /* return shuffled cards array */
    return shuffledArray;
}

function generateCards(shuffledArray) {
    shuffledArray.forEach(card => {
        const singleCard = document.createElement('div');
        singleCard.classList.add('card');
        singleCard.dataset.cardSymbol = card;
        singleCard.innerHTML = card;
        board.appendChild(singleCard);
    })
}

function startGame() {
    board.innerHTML = '';
    shuffleCards(shuffledCards, cards);
    generateCards(shuffledCards);
}

startGame()

//shuffleCards(shuffledCards, cards)
//console.log(shuffledCards);
