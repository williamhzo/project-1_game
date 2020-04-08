// importing data
import { movies } from './data.js';

// sections
const homeSection = document.getElementById('home');
const gameSection = document.getElementById('in-game');
const aboutSection = document.getElementById('about');

// in-game
const emojiList = document.querySelector('.emoji-list');
const totalScore = document.getElementById('score');
const timer = document.querySelector('.time-counter');

// buttons
const btnStart = document.getElementById('btn-start');
const btnHome = document.getElementById('btn-home');
const btnAbout = document.getElementById('btn-about');
const btnSkip = document.getElementById('btn-skip');
const btnKeyboard = document.querySelector('.fa-keyboard');

// user input
const input = document.getElementById('user-input');
let currentEmojis, // set of emojis for ongoing question
  currentTitle, // expected answer for ongoing question
  randomIndex, // random number to select question
  currentScore, // user score during game
  currentFailed, // failed and/or skipped questions
  quizLength; // total number of questions
let quizArray = []; // questions array
let intervalId = 0; // id to clear the timer countdown

// functions

// initialize the game: initializeScore, setGameSection,
// create quiz array, displayQuiz
const startGame = () => {
  initializeScore();
  setGameSection();
  quizArray = JSON.parse(JSON.stringify(movies));
  displayQuiz();
};

// render new quiz question to the game board:
// initializeQuiz, pickRandomQuiz, display set of emojis,
// remove current question from current quiz array to prevent
// redundant questions, check if remaining questions
const displayQuiz = () => {
  // Takes a random movie from database and displays the emojis it in DOM
  initializeQuiz();
  pickRandQuiz();
  currentEmojis.forEach(
    (e) => (emojiList.innerHTML += `<li class="emoji">${e}</li>`)
  );
  setTimer();
  quizArray.splice(randomIndex, 1);
  if (!quizArray.length) {
    // make a message 'pop' ==> 'That's all folks!'
  }
};

// clear the game board: user input & emojis
const initializeQuiz = () => {
  input.value = '';
  emojiList.innerHTML = '';
};

// generate random index & select corresponding question from array
const pickRandQuiz = () => {
  randomIndex = Math.floor(Math.random() * quizArray.length);
  currentEmojis = quizArray[randomIndex].emoji;
  currentTitle = quizArray[randomIndex].title;
};

// clear the score board & define number of questions
const initializeScore = () => {
  currentScore = 0;
  currentFailed = 0;
  quizLength = movies.length;
  updateScore();
};

// input new score board into the DOM
const updateScore = () => {
  totalScore.innerHTML = `<li class='success'> Right: ${currentScore}</li>
  <li class='fail'>Wrong: ${currentFailed}</li>
  <li class='total'>Out of: ${quizLength}</li>`;
};

// when user skips: updateScore and displayQuiz
const skipQuiz = () => {
  currentFailed++;
  updateScore();
  displayQuiz();
};

// when user inputs: compare input with the expected answer
// if true: stopTimer, displayQuiz, updateScore
// if false:
const checkInput = () => {
  if (input.value.toUpperCase() === currentTitle.toUpperCase()) {
    // remove 'The' and 'A' from input to avoid silly mistakes
    stopTimer();
    displayQuiz();
    currentScore++;
    updateScore();
    // make a message 'pop' ==> 'Great!' and turn focus green
  } else {
    // make a message 'pop' ==> 'Nope' and turn focus red
  }
};

// stop previous timer if ongoing & set new one
// if time is out: stopTimer, displayQuiz, updateScore
// const setTimer = () => {
//   clearInterval(intervalId);
//   const countFrom = 200;
//   let timeCount = countFrom;
//   intervalId = setInterval(() => {
//     if (timeCount <= 0) {
//       stopTimer();
//       displayQuiz();
//       currentFailed++;
//       updateScore();
//       return;
//     }
//     timeCount--;
//     timer.style.width = Math.floor((100 * timeCount) / countFrom) + '%';
//     console.log(timeCount);
//   }, 100);
// };

const setTimer = () => {
  clearInterval(intervalId);
  const countFrom = 200;
  let timeCount = countFrom;
  intervalId = setInterval(() => {
    if (timeCount <= 0) {
      stopTimer();
      displayQuiz();
      currentFailed++;
      updateScore();
      return;
    }
    timeCount--;
    timer.style.width = Math.floor((100 * timeCount) / countFrom) + '%';
    console.log(timeCount);
  }, 100);
};

// stop timer
const stopTimer = () => {
  clearInterval(intervalId);
};

// event handlers
const setGameSection = () => {
  homeSection.classList.add('hide');
  aboutSection.classList.add('hide');
  gameSection.classList.remove('hide');
};

const setHomeSection = () => {
  gameSection.classList.add('hide');
  aboutSection.classList.add('hide');
  homeSection.classList.remove('hide');
};

const setAboutSection = () => {
  gameSection.classList.add('hide');
  homeSection.classList.add('hide');
  aboutSection.classList.remove('hide');
};

const enterInput = (e) => {
  if (e.key === 'Enter') {
    checkInput();
  }
};

// event listeners
btnStart.onclick = startGame;
btnHome.onclick = setHomeSection;
btnAbout.onclick = setAboutSection;
btnSkip.onclick = skipQuiz;
btnKeyboard.onclick = checkInput;
input.addEventListener('keypress', enterInput);
window.requestAnimationFrame();
