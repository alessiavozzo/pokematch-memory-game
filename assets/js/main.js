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

//generate a div element with class card and add evento listener to flip card
function generateCards(shuffledArray) {
    shuffledArray.forEach(element => {
        const singleCard = document.createElement('div');
        singleCard.classList.add('card');
        singleCard.dataset.cardSymbol = element;
        //singleCard.innerHTML = card;
        singleCard.addEventListener('click', flipCard);
        board.appendChild(singleCard);
    })
}

//make the image appear based on the dataset, assign first card, assign second card and check for match
function flipCard() {

    /* if I try to reclick on the uncovered card or on a matched card, it doesn't create a new image*/
    if (this === firstCardFlipped || this.classList.contains('matched')) {
        return;
    }

    let cardSymbol = this.dataset.cardSymbol;
    const symbolImage = document.createElement('img');
    symbolImage.setAttribute('src', `./assets/img/${cardSymbol}.png`);
    this.appendChild(symbolImage);

    if (!firstCardFlipped) {
        //console.log(this);
        firstCardFlipped = this;
    }
    else {
        secondCardFlipped = this;
        checkForMatch();
    }
}

/* if first card and second card have the same symbol, reset them to null and leave matched cards uncovered on the board, otherwise turn them back  */
function checkForMatch() {
    if (firstCardFlipped.dataset.cardSymbol === secondCardFlipped.dataset.cardSymbol) {
        firstCardFlipped.classList.add('matched');
        secondCardFlipped.classList.add('matched');
        resetFlippedCards();
    }
    else {
        setTimeout(turnBackCards, 500);
    }
}

function resetFlippedCards() {
    firstCardFlipped = null;
    secondCardFlipped = null;
}

function turnBackCards() {
    firstCardFlipped.querySelector('img').remove();
    secondCardFlipped.querySelector('img').remove();
    resetFlippedCards();
}

function startGame() {
    board.innerHTML = '';
    shuffleCards(shuffledCards, cards);
    generateCards(shuffledCards);
}

startGame()

//shuffleCards(shuffledCards, cards)
//console.log(shuffledCards);
