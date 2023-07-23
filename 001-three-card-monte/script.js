'use strict';

const cardA = document.querySelector('.card-a');
const cardB = document.querySelector('.card-b');
const cardC = document.querySelector('.card-c');

cardA.style.left = '20%';
cardB.style.left = '50%';
cardC.style.left = '80%';

let gameActive = false;

// console.log(`A: ${cardA.style.left}`);
// console.log(`B: ${cardB.style.left}`);
// console.log(`C: ${cardC.style.left}`);

//Animations

function swapAB() {
  [cardA.style.left, cardB.style.left] = [cardB.style.left, cardA.style.left];
}

function swapBC() {
  [cardB.style.left, cardC.style.left] = [cardC.style.left, cardB.style.left];
}
function swapAC() {
  [cardA.style.left, cardC.style.left] = [cardC.style.left, cardA.style.left];
}

function swapABC() {
  [cardA.style.left, cardB.style.left, cardC.style.left] = [
    cardB.style.left,
    cardC.style.left,
    cardA.style.left,
  ];
}

function swapCBA() {
  [cardA.style.left, cardB.style.left, cardC.style.left] = [
    cardC.style.left,
    cardA.style.left,
    cardB.style.left,
  ];
}

//Button Functions

//Shuffle Cards

const swapArr = [swapAB, swapBC, swapAC, swapABC, swapCBA, swapABC, swapCBA];

let difficulty = 'easy';

function activateGame() {
  gameActive = true;
}

function shuffleEasy() {
  const bet = Number(document.querySelector('.bet-input').value);
  if (1 <= bet && bet <= balance) {
    function randomSwap() {
      let randomIndex = Math.floor(Math.random() * swapArr.length);
      console.log('swap');
      return swapArr[randomIndex]();
    }
    difficulty = 'easy';
    setTimeout(flipCardsFront, 0);
    setTimeout(randomSwap, 1750);
    setTimeout(randomSwap, 2400);
    setTimeout(randomSwap, 3200);
    setTimeout(randomSwap, 4000);
    setTimeout(randomSwap, 4800);
    setTimeout(randomSwap, 5600);
    setTimeout(randomSwap, 6200);
    setTimeout(randomSwap, 6800);
    setTimeout(randomSwap, 7400);
    setTimeout(randomSwap, 7900);
    setTimeout(activateGame, 8000);
  }
}

function shuffleMedium() {
  const bet = Number(document.querySelector('.bet-input').value);
  if (1 <= bet && bet <= balance) {
    flipCardsFront();
    function randomSwap() {
      let randomIndex = Math.floor(Math.random() * swapArr.length);
      console.log('swap');
      return swapArr[randomIndex]();
    }
    difficulty = 'medium';
    setTimeout(flipCardsFront, 0);
    setTimeout(randomSwap, 1750);
    setTimeout(randomSwap, 2200);
    setTimeout(randomSwap, 2800);
    setTimeout(randomSwap, 3600);
    setTimeout(randomSwap, 4200);
    setTimeout(randomSwap, 4800);
    setTimeout(randomSwap, 5200);
    setTimeout(randomSwap, 5600);
    setTimeout(randomSwap, 6000);
    setTimeout(randomSwap, 6400);
    setTimeout(activateGame, 6400);
  }
}

function shuffleHard() {
  const bet = Number(document.querySelector('.bet-input').value);
  if (1 <= bet && bet <= balance) {
    flipCardsFront();
    document.querySelector;
    function randomSwap() {
      let randomIndex = Math.floor(Math.random() * swapArr.length);
      console.log('swap');
      return swapArr[randomIndex]();
    }
    difficulty = 'hard';
    setTimeout(flipCardsFront, 0);
    setTimeout(randomSwap, 1750);
    setTimeout(randomSwap, 2200);
    setTimeout(randomSwap, 2800);
    setTimeout(randomSwap, 3600);
    setTimeout(randomSwap, 4100);
    setTimeout(randomSwap, 4700);
    setTimeout(randomSwap, 5000);
    setTimeout(randomSwap, 5500);
    setTimeout(randomSwap, 6000);
    setTimeout(randomSwap, 6400);
    setTimeout(randomSwap, 6900);
    setTimeout(randomSwap, 8200);
    setTimeout(activateGame, 8500);
  }
}

//Flip Cards
const flipCardsBtn = document.querySelector('.flipCardsBtn');
const containerA = document.getElementById('containerA');
const containerB = document.getElementById('containerB');
const containerC = document.getElementById('containerC');

let revealed = false;

function flipCardsFront() {
  const flipAFront = () => (containerA.style.transform = 'rotateY(-180deg)');
  const flipBFront = () => (containerB.style.transform = 'rotateY(-180deg)');
  const flipCFront = () => (containerC.style.transform = 'rotateY(-180deg)');
  flipBFront();
  setTimeout(flipAFront, 500);
  setTimeout(flipCFront, 1000);
}

function flipCardsBack() {
  const flipABack = () => (containerA.style.transform = 'rotateY(0)');
  const flipBBack = () => (containerB.style.transform = 'rotateY(0)');
  const flipCBack = () => (containerC.style.transform = 'rotateY(0)');
  if (gameActive) {
    flipBBack();
    setTimeout(flipABack, 500);
    setTimeout(flipCBack, 1000);
  }
}

//check for win
let balance = 20.0;
let maxBet = 20;
function checkForWin(color) {
  if (gameActive) {
    const bet = Number(document.querySelector('.bet-input').value);
    if (color === 'black') {
      balance -= bet;
    } else {
      if (difficulty === 'easy') balance += bet * 0.5;
      if (difficulty === 'medium') balance += bet;
      if (difficulty === 'hard') balance += bet * 1.5;
    }
    console.log(balance);
    document.querySelector('.balance').textContent = balance.toFixed(2);
    maxBet = balance;
    gameActive = false;
    document.querySelector('.bet-input').max = balance;
  }
}

//Event Listeners
const shuffleEasyBtn = document.querySelector('.shuffleEasy');
const shuffleMediumBtn = document.querySelector('.shuffleMedium');
const shuffleHardBtn = document.querySelector('.shuffleHard');

if (balance >= 1) {
  shuffleEasyBtn.addEventListener('click', shuffleEasy);
  shuffleMediumBtn.addEventListener('click', shuffleMedium);
  shuffleHardBtn.addEventListener('click', shuffleHard);
}
// flipCardsBtn.addEventListener('click', function () {
//   if (revealed) {
//     flipCardsBack();
//     revealed = false;
//   } else {
//     flipCardsFront();
//     revealed = true;
//   }
//   document.querySelector('.bet-input').max = '10';
// });

cardA.addEventListener('click', function () {
  flipCardsBack();
  checkForWin('black');
});
cardB.addEventListener('click', function () {
  flipCardsBack();
  checkForWin('red');
});
cardC.addEventListener('click', function () {
  flipCardsBack();
  checkForWin('black');
});
