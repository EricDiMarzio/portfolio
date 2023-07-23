'use strict';

const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');
const navLogo = document.getElementById('nav-logo');

const headerLink = document.getElementById('header--link');
const section1Link = document.getElementById('section--1--link');
const section2Link = document.getElementById('section--2--link');
const section3Link = document.getElementById('section--3--link');
const section4Link = document.getElementById('section--4--link');
const section5Link = document.getElementById('section--5--link');

const header = document.querySelector('.header');
const section1 = document.getElementById('section--1');
const section2 = document.getElementById('section--2');
const section3 = document.getElementById('section--3');
const section4 = document.getElementById('section--4');
const section5 = document.getElementById('section--5');

//scroll events
headerLink.addEventListener('click', function (e) {
  header.scrollIntoView({ behavior: 'smooth' });
});
section1Link.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});
section2Link.addEventListener('click', function (e) {
  section2.scrollIntoView({ behavior: 'smooth' });
});
// section3Link.addEventListener('click', function (e) {
//   section3.scrollIntoView({ behavior: 'smooth' });
// });
// section4Link.addEventListener('click', function (e) {
//   section4.scrollIntoView({ behavior: 'smooth' });
// });
// section5Link.addEventListener('click', function (e) {
//   section5.scrollIntoView({ behavior: 'smooth' });
// });

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
});
