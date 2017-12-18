let text = "New major releases of Node.js are cut from the GitHub master branch every six months.";

let currentLetterIndex = 0;
let totalWords;
let totalLetters = text.split('').length;
let words = 1;
let startTime = -1 * 330 * 60 * 1000;
let timer;
let currentLetterBox;

let options = ['lower', 'letters'];

let formatters = {
  lower: (text) => text.toLowerCase(),
  numbers: (text) => text.split('').filter((char) => Number.isInteger(char)).join(''),
  letters: (text) => text.split('').filter((char) => (/[a-z., ]/i).test(char)).join('')
};

const keyPressed = function (event) {
  let letterPressed = event.key;
  stopBlinking(currentLetterBox);
  if (event.keyCode == 8) {            //backspace key
    event.preventDefault();
    currentLetterBox.className = '';
    currentLetterBox = document.getElementById(--currentLetterIndex);
  } else {
    let currentLetter = text[currentLetterIndex];
    if (currentLetter == ' ' && letterPressed == ' ') {
      words++;
    }
    currentLetterBox.className = letterPressed === currentLetter ? 'correct' : 'wrong';
    currentLetterBox = document.getElementById(++currentLetterIndex);
  }
  if (currentLetterBox) {
    currentLetterBox.className = 'current';
    startBlinkCursor(currentLetterBox);
  } else {
    document.body.onkeypress = '';
    clearInterval(timer);
  }
}

const loadGame = function () {
  let timeDisplay = document.getElementById('time');
  let speedDisplay = document.getElementById('speed');
  document.body.onkeypress = keyPressed;
  currentLetterBox = document.getElementById(currentLetterIndex);
  currentLetterBox.className = 'current';
  totalWords = text.split(' ').length;
  startTimer(timeDisplay, speedDisplay);
  startBlinkCursor(currentLetterBox);
}

const startTimer = function (timeDisplay, speedDisplay) {
  timer = setInterval(() => {
    let time = new Date(startTime);
    let timeSpend = time.getMinutes() * 60 + time.getSeconds();
    speedDisplay.innerText = Math.floor(60 * words / timeSpend);
    timeDisplay.innerText = `${time.getMinutes()}:${time.getSeconds()}`
    startTime += 101;
  }, 100);
}

const stopBlinking = function (currentLetterBox) {
  clearInterval(blinkCursor);
  currentLetterBox.style['background-color'] = "";
}

const startBlinkCursor = function (currentCursorPosition) {
  blinkCursor = setInterval(() => {
    let currentBg = currentCursorPosition.style['background-color'];
    currentCursorPosition.style['background-color'] = currentBg == "" ? "white" : "";
  }, 500);
}

const init = function () {
  let id = 0;
  text = formatText(text, options);
  let textHTML = text.split('').reduce((text, char) => {
    return `${text}<span id="${id++}">${char}</span>`;
  }, "");
  document.getElementById('text').innerHTML = textHTML;
  loadGame();
}

const formatText = function (text, options) {
  options.forEach((option) => {
    text = formatters[option](text);
  });
  return text;
}

window.onload = init;
