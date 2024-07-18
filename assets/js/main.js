/* get dom elements */
const board = document.getElementById('board');
const errorsCounter = document.getElementById('errors-counter');
const startBtn = document.getElementById('start-btn');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');
const scoreElement = document.getElementById('score');

const startPage = document.getElementById('start');

/* cards array */
const easyCards = ['pikachu', 'bulbasaur', 'squirtle', 'charmender', 'jigglypuff', 'gastly'];
const hardCards = ['eevee', 'magikarp', 'magnemite', 'snorlax', 'staryu', 'voltorb'];

/* init variables I need */
let shuffledCards = [];

let firstCardFlipped = null;
let secondCardFlipped = null;
let errors = 0;
let score = 0;
let flippingCards = false;
let matchedCards = [];

let selectedDifficulty = 'easy';


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

//generate a div element with class card and add event listener to flip card
function generateCards(shuffledArray) {
    shuffledArray.forEach(element => {
        const singleCard = document.createElement('div');
        singleCard.classList.add('card', 'back');
        singleCard.dataset.cardSymbol = element;
        //singleCard.innerHTML = card;

        //dynamic grid
        if (selectedDifficulty === 'easy') {
            singleCard.classList.add('col-3');
        }
        else if (selectedDifficulty === 'hard') {
            singleCard.classList.add('col-2');
        }

        singleCard.addEventListener('click', flipCard);
        board.appendChild(singleCard);
    })
}

//make the image appear based on the dataset, assign first card, assign second card and check for match
function flipCard() {

    /* if I try to reclick on the uncovered card or on a matched card, it doesn't create a new image*/
    if (flippingCards || this === firstCardFlipped || this === secondCardFlipped || this.classList.contains('matched')) {
        return;
    }

    let cardSymbol = this.dataset.cardSymbol;
    const symbolImage = document.createElement('img');
    symbolImage.setAttribute('src', `./assets/img/${cardSymbol}.png`);
    this.appendChild(symbolImage);

    if (!firstCardFlipped) {
        //console.log(this);
        firstCardFlipped = this;
        this.classList.remove('back');
        this.classList.add('flipped');
    }
    else {
        secondCardFlipped = this;
        this.classList.remove('back');
        this.classList.add('flipped');
        flippingCards = true;
        checkForMatch();
    }
}

/* if first card and second card have the same symbol, push symbol in matched cards, reset them to null and leave matched cards uncovered on the board, otherwise turn them back  */
function checkForMatch() {
    if (firstCardFlipped.dataset.cardSymbol === secondCardFlipped.dataset.cardSymbol) {
        firstCardFlipped.classList.add('matched');
        secondCardFlipped.classList.add('matched');
        matchedCards.push(firstCardFlipped.dataset.cardSymbol);
        resetFlippedCards();
        checkForWin();
    }
    else {
        setTimeout(turnBackCards, 500);
    }
}

//reset cards to null
function resetFlippedCards() {
    firstCardFlipped = null;
    secondCardFlipped = null;
    flippingCards = false;
}

//turn back cards and reset them to null; display error counter; turn cards to their back;
function turnBackCards() {
    cardsFlipped = [firstCardFlipped, secondCardFlipped];
    cardsFlipped.forEach(cardFlipped => {
        cardFlipped.querySelector('img').remove();
        cardFlipped.classList.remove('flipped');
        cardFlipped.classList.add('back');
    })

    resetFlippedCards();
    errors++;
    errorsCounter.innerText = `Errors: ${errors}`;
}

function checkForWin() {
    if (matchedCards.length === shuffledCards.length / 2) {
        //empty board
        board.innerHTML = '';
        //cancel errors
        errorsCounter.style.display = 'none';
        //restart game buttons appearance
        startPage.style.display = 'flex';
        startBtn.children[0].src = './assets/img/restart.png'
        //calc score
        calcScore();
        //console.log(score);
        //print score
        scoreElement.style.display = "block";
        scoreElement.innerHTML = `Score: ${score}`;
    }
}

function calcScore() {
    score = (shuffledCards.length * 10) - (errors * 3);
    return score;
}

//set difficulty
function setDifficulty() {
    difficultyButtons.forEach(button => {
        button.addEventListener('click', function () {
            //remove chosen from all buttons and assign chosen to selected button
            document.querySelector('.difficulty-btn.chosen')?.classList.remove('chosen');
            this.classList.add('chosen');
            selectedDifficulty = this.dataset.difficulty;
            //console.log(selectedDifficulty);
        })
    })
}

//on click, start game: clean the board, assign cards, shuffle cards, init errors counter to 0
function startGame() {
    startPage.style.display = "none";
    board.innerHTML = '';
    shuffledCards = [];

    let cards;
    if (selectedDifficulty === 'easy') {
        cards = [...easyCards, ...easyCards];
    }
    else if (selectedDifficulty === 'hard') {
        cards = [...easyCards, ...easyCards, ...hardCards, ...hardCards];
    }

    //console.log(cards);
    shuffleCards(shuffledCards, cards);
    //console.log(shuffledCards);
    generateCards(shuffledCards);
    errors = 0;
    errorsCounter.innerText = `Errors: ${errors}`;
}

//on page load
document.addEventListener('DOMContentLoaded', () => {
    setDifficulty();
    startBtn.addEventListener('click', startGame);
    //console.log(startBtn.children[0]);
})

//shuffleCards(shuffledCards, cards)
//console.log(shuffledCards);
