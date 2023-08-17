'use strict';

const title = document.getElementById('title');
const flagsGrid = document.querySelector('.flags-grid');
const flagContainer = document.querySelector('.flag-container');
const newGameButton = document.querySelector('.new-game-button');
const settingsButton = document.querySelector('.settings-button');
const playAgainButton = document.querySelector('.play-again-button');
const submitButton = document.querySelector('.button-submit');
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
let regionList = [];
let randomCountryNumber;
let wrongAnswer;
let activeCountry;
let randomNumber;
let keyCounter = 0;
let activeCountryName;
let correctGuesses = 0;
let numberOfCountries;
let selectedCheckboxes;

const newGame = function () {
  regionList = [];
  flagsGrid.innerHTML = '';
  countryList.clear();
  correctCountries.clear();
  keyCounter = 0;
  correctGuesses = 0;
  document.querySelector('.lives').innerHTML = '❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️';
  const request = fetch(`https://restcountries.com/v3.1/all`)
    .then((response) => {
      if (!response.ok) throw new Error(`Error message: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      data.forEach((entry) => {
        if (selectedCheckboxes.includes(entry.region)) {
          const newEntry = {
            commonName: entry.name.common,
            capital: entry.capital,
            flagPNG: entry.flags.png,
            region: entry.region,
            flag: entry.flag,
          };
          countryList.set(keyCounter++, newEntry);
          regionList.push(entry.region);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      const filteredRegionList = [];

      regionList.forEach((region) => {
        if (!filteredRegionList.includes(region))
          filteredRegionList.push(region);
      });
      console.log(filteredRegionList);
      numberOfCountries = countryList.size;
      document.getElementById(
        'title'
      ).innerHTML = `Flag Guessr ~ ${correctGuesses}/${numberOfCountries}`;
      renderNewCountry();
      console.log(countryList);
    });
};

const getRandomCountryNumber = function () {
  while (true) {
    randomCountryNumber = Math.floor(Math.random() * numberOfCountries);
    if (!correctCountries.has(randomCountryNumber)) {
      return randomCountryNumber;
    }
  }
};

const getWrongAnswer = function () {
  const activeRegion = activeCountry.region;
  while (true) {
    wrongAnswer = Math.floor(Math.random() * numberOfCountries);
    if (
      wrongAnswer !== randomCountryNumber &&
      countryList.get(wrongAnswer).region === activeRegion
    ) {
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

const processCorrectAnswer = function () {
  correctCountries.set(randomCountryNumber, activeCountry);
  const newFlag = document.createElement('div');
  newFlag.classList.add('grid-item');
  newFlag.innerHTML = activeCountry.flag;
  flagsGrid.appendChild(newFlag);
  correctGuesses++;
  document.getElementById(
    'title'
  ).innerHTML = `Flag Guessr ~ ${correctGuesses}/${numberOfCountries}`;
  if (correctGuesses === numberOfCountries)
    document.querySelector('.modal').showModal();
  else renderNewCountry();
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
      processCorrectAnswer();
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
});

settingsButton.addEventListener('click', function () {
  document.querySelector('.settings').showModal();
});

newGameButton.addEventListener('click', newGame);

playAgainButton.addEventListener('click', function () {
  newGame();
  document.querySelector('.modal').close();
});

submitButton.addEventListener('click', function (e) {
  e.preventDefault();
  const checkboxes = document.getElementsByName('checkbox');
  selectedCheckboxes = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) selectedCheckboxes.push(checkbox.value);
  });
  document.querySelector('.settings').close();
  newGame();
});
``;
