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
let activeCountry;
let randomNumber;
let keyCounter = 0;

const newGame = function () {
  flagsGrid.innerHTML = '';
  countryList.clear();
  keyCounter = 0;
  document.querySelector('.lives').innerHTML = '❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️';
  const request = fetch(`https://restcountries.com/v3.1/all`)
    .then((response) => response.json())
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
      renderNewCountry();
    })
    .catch((err) => console.log(err))
    .finally(() => {});
};

const renderNewCountry = function () {
  randomNumber = Math.floor(Math.random() * countryList.size);
  activeCountry = countryList.get(randomNumber);
  // updateAnswers();

  console.log(activeCountry);
  let randomArray = [];
  for (let i = 0; i < 30; i++) {
    let randomNumber = Math.floor(Math.random() * 4);
    randomArray.push(randomNumber);
  }
  const filteredArray = randomArray.reduce((accumulator, i) => {
    if (!accumulator.includes(i)) {
      accumulator.push(i);
    }
    return accumulator;
  }, []);

  let r = Math.floor(Math.random() * countryList.size);
  const wrongAnswer1 = countryList.get(r).commonName;
  r = Math.floor(Math.random() * countryList.size);
  const wrongAnswer2 = countryList.get(r).commonName;
  r = Math.floor(Math.random() * countryList.size);
  const wrongAnswer3 = countryList.get(r).commonName;

  answers[filteredArray[0]].textContent = activeCountry.commonName;
  answers[filteredArray[1]].textContent = wrongAnswer1;
  answers[filteredArray[2]].textContent = wrongAnswer2;
  answers[filteredArray[3]].textContent = wrongAnswer3;

  activeFlag.src = activeCountry.flagPNG;
};

const updateAnswers = function () {
  let randomArray = [];
  for (let i = 0; i < 30; i++) {
    let randomNumber = Math.floor(Math.random() * 4);
    randomArray.push(randomNumber);
  }
  const filteredArray = randomArray.reduce((accumulator, i) => {
    if (!accumulator.includes(i)) {
      accumulator.push(i);
    }
    return accumulator;
  }, []);

  let r = Math.floor(Math.random() * countryList.size);
  const wrongAnswer1 = countryList.get(r).commonName;
  r = Math.floor(Math.random() * countryList.size);
  const wrongAnswer2 = countryList.get(r).commonName;
  r = Math.floor(Math.random() * countryList.size);
  const wrongAnswer3 = countryList.get(r).commonName;

  answers[filteredArray[0]].textContent = activeCountry.commonName;
  answers[filteredArray[1]].textContent = wrongAnswer1;
  answers[filteredArray[2]].textContent = wrongAnswer2;
  answers[filteredArray[3]].textContent = wrongAnswer3;
};

const addFlagToGrid = function (flag) {
  const newFlag = document.createElement('div');
  newFlag.classList.add('grid-item');
  newFlag.innerHTML = flag;
  flagsGrid.appendChild(newFlag);
};

const removeCountry = function () {
  countryList.delete(randomNumber);
};

const loseALife = function () {
  document.querySelector('.lives').innerHTML = lives.innerHTML.slice(0, -2);
  if (lives.textContent === '') document.querySelector('.modal').showModal();
};
// Event Handlers

answersContainer.addEventListener('click', function (e) {
  if (e.target.textContent === '???') return;
  if (e.target.textContent === activeCountry.commonName) {
    console.log('correct!');
    e.target.classList.add('correct');
    setTimeout(function () {
      e.target.classList.remove('correct');
      addFlagToGrid(activeCountry.flag);
      removeCountry(activeCountry);
    }, 200);
  }
  if (
    e.target.classList.contains('answer') &&
    e.target.textContent !== activeCountry.commonName
  ) {
    e.target.classList.add('wrong');
    setTimeout(function () {
      e.target.classList.remove('wrong');
    }, 300);
    loseALife();
  }
  setTimeout(function () {
    renderNewCountry();
  }, 300);
});

// settingsButton.addEventListener('click', function () {
//   document.querySelector('.modal').showModal();
// });

newGameButton.addEventListener('click', newGame);

playAgainButton.addEventListener('click', function () {
  document.querySelector('.modal').close();
  newGame();
});

// Application Start
