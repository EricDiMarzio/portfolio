'use strict';

const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');
const navLogo = document.getElementById('nav-logo');

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
});

document.querySelector('.navbar-links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav-link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
