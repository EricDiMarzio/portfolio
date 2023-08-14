'use strict';

const flagsGrid = document.querySelector('.flags-grid');
const flagContainer = document.querySelector('.flag-container');
const newGameButton = document.querySelector('.new-game-button');
const settingsButton = document.querySelector('.settings-button');
const playAgainButton = document.querySelector('.play-again-button');
const activeFlag = document.querySelector('.active-flag');
const answersContainer = document.querySelector('.answers');
const answerA = document.getElementById('answer--a');
const answerB = document.getElementById('answer--b');
const answerC = document.getElementById('answer--c');
const answerD = document.getElementById('answer--d');
const lives = document.querySelector('.lives');
const answers = [answerA, answerB, answerC, answerD];

let countryList = new Map();
let correctCountries = new Map();
let randomCountryNumber;
let wrongAnswer;
let activeCountry;
let randomNumber;
let keyCounter = 0;
let activeCountryName;

const newGame = function () {
  flagsGrid.innerHTML = '';
  countryList.clear();
  correctCountries.clear();
  keyCounter = 0;
  document.querySelector('.lives').innerHTML = '❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️';
  const request = fetch(`https://restcountries.com/v3.1/all`)
    .then((response) => {
      if (!response.ok) throw new Error(`Error message: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      data.forEach((entry) => {
        if (entry.flags.png && entry.name.common) {
          const newEntry = {
            commonName: entry.name.common,
            capital: entry.capital,
            flagPNG: entry.flags.png,
            region: entry.region,
            flag: entry.flag,
          };
          countryList.set(keyCounter++, newEntry);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderNewCountry();
    });
};

const getRandomCountryNumber = function () {
  while (true) {
    randomCountryNumber = Math.floor(Math.random() * 250);
    if (!correctCountries.has(randomCountryNumber)) {
      return randomCountryNumber;
    }
  }
};

const getWrongAnswer = function () {
  while (true) {
    wrongAnswer = Math.floor(Math.random() * 250);
    if (wrongAnswer !== randomCountryNumber) {
      return wrongAnswer;
    }
  }
};

const renderNewCountry = function () {
  if (lives.textContent === '') {
    document.querySelector('.modal').showModal();
    return;
  }
  activeCountry = countryList.get(getRandomCountryNumber());
  activeCountryName = activeCountry.commonName;

  let randomArray = [];
  for (let i = 0; i < 30; i++) {
    let answerNumber = Math.floor(Math.random() * 4);
    randomArray.push(answerNumber);
  }
  const filteredArray = randomArray.reduce((accumulator, i) => {
    if (!accumulator.includes(i)) {
      accumulator.push(i);
    }
    return accumulator;
  }, []);
  console.log(activeCountryName);

  const wrongAnswer1 = countryList.get(getWrongAnswer()).commonName;
  const wrongAnswer2 = countryList.get(getWrongAnswer()).commonName;
  const wrongAnswer3 = countryList.get(getWrongAnswer()).commonName;

  answers[filteredArray[0]].textContent = activeCountry.commonName;
  answers[filteredArray[1]].textContent = wrongAnswer1;
  answers[filteredArray[2]].textContent = wrongAnswer2;
  answers[filteredArray[3]].textContent = wrongAnswer3;

  activeFlag.src = activeCountry.flagPNG;
};

const updateAnswers = function () {};

const addFlagToGrid = function () {
  const newFlag = document.createElement('div');
  newFlag.classList.add('grid-item');
  newFlag.innerHTML = activeCountry.flag;
  flagsGrid.appendChild(newFlag);
};

const addToCorrect = function () {
  correctCountries.set(randomCountryNumber, activeCountry);
};

const loseALife = function () {
  document.querySelector('.lives').innerHTML = lives.innerHTML.slice(0, -2);
  if (lives.textContent === '') document.querySelector('.modal').showModal();
};
// Event Handlers

answersContainer.addEventListener('click', function (e) {
  if (e.target.textContent === '???') return;
  if (e.target.textContent === activeCountry.commonName) {
    e.target.classList.add('correct');
    setTimeout(function () {
      e.target.classList.remove('correct');
      addFlagToGrid();
      addToCorrect();

      renderNewCountry();
    }, 300);
  }
  if (
    e.target.classList.contains('answer') &&
    e.target.textContent !== activeCountry.commonName
  ) {
    document.querySelector('.lives').innerHTML = lives.innerHTML.slice(0, -2);
    e.target.classList.add('wrong');

    setTimeout(function () {
      e.target.classList.remove('wrong');
      renderNewCountry();
    }, 300);
  }
  // setTimeout(function () {}, 300);
});

// settingsButton.addEventListener('click', function () {
//   document.querySelector('.modal').showModal();
// });

newGameButton.addEventListener('click', newGame);

playAgainButton.addEventListener('click', function () {
  newGame();
  document.querySelector('.modal').close();
});

// Application Start
