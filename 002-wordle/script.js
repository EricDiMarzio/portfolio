'use strict';

// const q = document.getElementById('q');
// q.addEventListener('click', function (e) {
//   console.log('yo');
// });

const solutionArray = [
  'after',
  'bouts',
  'raise',
  'psalm',
  'weird',
  'crime',
  'quail',
  'front',
  'tease',
  'frizz',
  'atoll',
  'trope',
  'swill',
  'knoll',
  'smite',
];

function getNewWord(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

const letters = document.querySelectorAll('.letter');
const solution = [...getNewWord(solutionArray)];
console.log(solution);

let activeTile = 0;

let activeRow = 1;
//Function that adds a new letter to guess.
letters.forEach(function addLetter(letter) {
  letter.addEventListener('click', function (event) {
    console.log(letter.textContent);
    if (activeTile < 5) {
      //Assign Active Row
      document.querySelector(`.row-${activeRow}`).classList.add('active-row');

      //Assign Active Tile
      activeTile += 1;
      //   document
      //     .querySelector('.active-row')
      //     .querySelector(`.tile-${activeTile}`)
      //     .classList.add('active');
      let activeTileSel = document
        .querySelector('.active-row')
        .querySelector(`.tile-${activeTile}`);
      //Insert Letter
      activeTileSel.innerHTML = letter.textContent;
      //Change Border
      activeTileSel.classList.add('guess');
      //Animate Letter
      activeTileSel.classList.add('animate');
      setTimeout(function () {
        document.querySelector('.animate').classList.remove('animate');
      }, 100);
      //Remove active tile status
      //   activeTileSel.classList.remove('active');
    }
  });
});

//function that deletes a letter from the guess.
document.getElementById('delete').addEventListener('click', function () {
  if (activeTile > 0) {
    //get active tile
    let activeTileSel = document
      .querySelector('.active-row')
      .querySelector(`.tile-${activeTile}`);
    //replace innerHTML
    activeTileSel.innerHTML = '';
    //Change Border
    activeTileSel.classList.remove('guess');
    activeTile -= 1;
    console.log(`active tile: ${activeTile}`);
  }
});
//function that Enters a guess.
document.getElementById('enter').addEventListener('click', function () {
  if (activeTile === 5) {
    let activeRowSel = document.querySelector(`.row-${activeRow}`);
    //---Validates its a real word. ....future problem
    //...
    //Add tiles to array
    let guessWord = [];
    activeRowSel.querySelectorAll('.tile').forEach(function checkGuess(guess) {
      guessWord.push(guess.textContent);
    });
    console.log(guessWord);
    let letterCounter = 1;
    //Compare arrays
    for (const i of guessWord) {
      console.log(i);
      if (!solution.includes(i)) {
        console.log('wrong');
        activeRowSel
          .querySelector(`.tile-${letterCounter}`)
          .classList.add('wrong', 'reveal');
        document.getElementById(`${i}`).classList.add('wrong');
        document.getElementById(`${i}`).classList.remove('key-blank');

        setTimeout(function () {
          activeRowSel.querySelector('.reveal').classList.remove('reveal');
        }, 100);
      } else if (solution[letterCounter - 1] === guessWord[letterCounter - 1]) {
        console.log('correct');
        activeRowSel
          .querySelector(`.tile-${letterCounter}`)
          .classList.add('correct', 'reveal');
        document.getElementById(`${i}`).classList.add('correct');
        document
          .getElementById(`${i}`)
          .classList.remove('key-blank', 'present');

        setTimeout(function () {
          activeRowSel.querySelector('.reveal').classList.remove('reveal');
        }, 100);
      } else {
        console.log('present');
        activeRowSel
          .querySelector(`.tile-${letterCounter}`)
          .classList.add('present', 'reveal');
        document.getElementById(`${i}`).classList.add('present');
        document.getElementById(`${i}`).classList.remove('key-blank');

        setTimeout(function () {
          activeRowSel.querySelector('.reveal').classList.remove('reveal');
        }, 100);
      }
      letterCounter += 1;
    }

    //Move to Next Row
    activeTile = 0;
    activeRowSel.classList.remove('active-row');
    activeRow += 1;
  }
});
//---add reveal animation.
//integrate a database
//require real words
//win condition
//lose condition
