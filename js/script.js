// // Globala variabler

// const wordList;      // Array: med spelets alla ord
// let selectedWord;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan

// let guesses = 0;     // Number: håller antalet gissningar som gjorts
// let hangmanImg;      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

// let msgHolderEl;     // DOM-nod: Ger meddelande när spelet är över
// let startGameBtnEl;  // DOM-nod: knappen som du startar spelet med
// let letterButtonEls; // Array av DOM-noder: Knapparna för bokstäverna
// let letterBoxEls;    // Array av DOM-noder: Rutorna där bokstäverna ska stå

// // Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
// // Funktion som slumpar fram ett ord
// // Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
// // Funktion som körs när du trycker på bokstäverna och gissar bokstav
// // Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// // Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på

// Global variables
let selectedWord; // String: The randomly selected word
let guesses = 0; // Number: Tracks the number of guesses
let hangmanImg;
let msgHolderEl;
let startGameBtnEl;
let letterButtonEls;
let letterBoxEls;
const maxGuesses = 6; // Maximum allowed guesses
let Hint;

// New words = ["Word name", "Hint"]
const wordList = [
  ["Banana", "Fruit, yellow when ripe"],
  ["Car", "Mode of transportation, four wheels"],
  ["Venice", " Famous European city, known for canals"],
  ["Nose", "Part of the body, helps you smell"],
  ["Elephant", "Type of animal, large and strong"],
  ["Piano", "Musical instrument, black and white keys"],
  ["Autumn", "Season, associated with falling leaves"],
  ["Giraffe", "Tall African animal with a long neck"],
  ["Laptop", "Portable computer"],
  ["Watermelon", "Large fruit with green skin and pink flesh"],
  ["Beach", "Sandy shore near the ocean"],
  ["Sunglasses", "Eyewear for protection from the sun"],
  ["Guitar", "Six-string musical instrument"],
];

const gameBoard = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";

// Function to start the game
function startGame() {
  document.getElementById("HintBtn").style.display = "inline-block";
  document.getElementById("h1H1").style.display = "none";
  document.getElementById("h1H").style.display = "inline-block";
  document.getElementById("gameBoard").style.display = "inline-block";
  document.getElementById("resetGameBtn").style.display = "inline-block";
  document.getElementById("startGameBtn").style.display = "none";
  generateRandomWord();
  createLetterBoxes();
}

// Function to select a random word from wordList
function generateRandomWord() {
  [selectedWord, Hint] = wordList[Math.floor(Math.random() * wordList.length)];
  selectedWord = selectedWord.toUpperCase();
  console.log("Hint:", Hint);
  console.log("Selected Word:", selectedWord);
}

// Function to create letter boxes
function createLetterBoxes() {
  const letterBoxContainer = document.getElementById("letterBoxes");
  letterBoxContainer.innerHTML = ""; // Clear any existing letter boxes

  for (let i = 0; i < selectedWord.length; i++) {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("disabled", "true");

    if (i === 0 || selectedWord[i] === " ") {
      inputElement.value = selectedWord[i].toUpperCase(); // Show the first letter or spaces
    } else {
      inputElement.value = "_"; // Set initial value as underscore for other letters
    }

    const listItem = document.createElement("li");
    listItem.appendChild(inputElement);

    letterBoxContainer.appendChild(listItem);
  }
}

// Function to check if all letters have been guessed
function checkAllLettersFound(letterBoxEls) {
  return Array.from(letterBoxEls).every((letterBox) => letterBox.value !== "_");
}

// Function to handle letter button clicks
let hasWon = false;
function handleLetterClick(event) {
  if (guesses === maxGuesses || hasWon) {
    return; // If the game has ended, exit the function
  }
  const clickedLetter = event.target.value.toUpperCase();
  console.log("Clicked Letter:", clickedLetter);

  // This function will handle what happens when a letter button is clicked
  let foundMatch = false;
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === clickedLetter) {
      const letterBoxEls = document.querySelectorAll("#letterBoxes li input");
      letterBoxEls[i].value = clickedLetter;
      foundMatch = true;
    }
  }
  // Handle correct and incorrect guesses
  if (foundMatch) {
    let allLettersFound = true;
    const letterBoxEls = document.querySelectorAll("#letterBoxes li input");
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === clickedLetter) {
        letterBoxEls[i].value = clickedLetter; // Update the letter box with the guessed letter
      }
      if (letterBoxEls[i].value === "_") {
        allLettersFound = false;
      }
    }
    // Check for win condition
    if (allLettersFound) {
      //  Player wins
      hasWon = true;
      const msgHolderEl = document.getElementById("message");
      const msg = document.createElement("h1");
      console.log("Congratulations! You've won!");
      msgHolderEl.innerHTML = "";
      msg.textContent = "Congratulations! You've won!";
      msgHolderEl.appendChild(msg);
    }
  } else {
    guesses++; // Increment the number of incorrect guesses
    const hangmanImgEl = document.getElementById("hangman");
    if (guesses <= maxGuesses) {
      hangmanImgEl.src = `images/h${guesses}.png`;
    }
    if (guesses === maxGuesses) {
      const msgHolderEl = document.getElementById("message");
      const msg = document.createElement("h1");
      console.log("You have lost!");
      msgHolderEl.innerHTML = "";
      msg.textContent =
        "You have lost! Would you like to retry? If yes, Press the Try Again button";
      msgHolderEl.appendChild(msg);
    }
  }
  event.target.disabled = true;
}

function resetGameBtn() {
  const msgHolderEl = document.getElementById("message");
  const msg = document.createElement("h1");
  msg.textContent = "You started a new Game";
  msgHolderEl.innerHTML = "";
  msgHolderEl.appendChild(msg);
  console.log("You started a new Game");
  resetGame();
  resetHint();
}

function HintBtn() {
  const hintText = document.getElementById("hintText");
  hintText.innerText = Hint;
  console.log(hintText);
}

function hintExit() {
  const hintText = document.getElementById("hintText");

  if (hintText.style.display === "block") {
    hintText.style.display = "none";
  } else {
    hintText.style.display = "block";
  }
}
function resetHint() {
  const hintText = document.getElementById("hintText");
  hintText.style.display = "none";
}

// Function to reset the game state
function resetGame() {
  guesses = 0;
  const hangmanImgEl = document.getElementById("hangman");
  hangmanImgEl.src = "images/h0.png";
  const letterButtonEls = document.querySelectorAll("#letterButtons li button");
  letterButtonEls.forEach((button) => {
    button.disabled = false;
  });
  hasWon = false;
  hintExit();
  generateRandomWord(); // Select a new word
  createLetterBoxes(); // Reset the letter boxes with the new word
}

// Event listener for the start game button
document.getElementById("startGameBtn").addEventListener("click", startGame);
// Event listener for the reset game button
document.getElementById("resetGameBtn").addEventListener("click", resetGameBtn);
// Event listener for the hint button
document.getElementById("HintBtn").addEventListener("click", HintBtn);
// Attaching click event to the button
document.getElementById("HintBtn").addEventListener("click", hintExit);
// Event listeners for each letter button
const letterButtons = document.querySelectorAll("#letterButtons button");
letterButtons.forEach((button) => {
  button.addEventListener("click", handleLetterClick);
});
