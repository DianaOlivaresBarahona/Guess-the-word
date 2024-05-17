// Här finns alla element som vi behöver komma åt i html filen genom att hämta upp dem via ID namnen
const linesElement = document.getElementById("lines-box");
const alphabetElement = document.getElementById("alphabet-box");
const lifeElement = document.getElementById("status");
const newGameButtonElement = document
  .getElementById("new-game-btn")
  .addEventListener("click", function () {
    startGame();
  });

// Alfabetet
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "Å",
  "Ä",
  "Ö",
];
// Det här är en array med alla ord som används i spelet.
const words = ["lejon", "elefant", "hund"];
let lettersArray = [];
let randomWord = "";
let maxGuess = 5;
let hasWon = false;

lifeElement.innerText = maxGuess;

// Här är alla funktioner som behövs för att spelet ska funka
function startGame() {
  hasWon = false;
  maxGuess = 5;
  lettersArray = [];
  lifeElement.innerText = maxGuess;
  createAlphabet();
  generateRandomWord();
  createWordLetters();
}
// Den här funktionen generar ett slumpmässigt ord av de orden som ligger i arrayen
function generateRandomWord() {
  const randomNum = Math.floor(Math.random() * words.length);
  randomWord = words[randomNum];
}
// Den här funktionen skapar alla knappar med en bokstav ifrån hela alfabetet
function createAlphabet() {
  alphabetElement.innerHTML = "";
  for (let row = 0; row < alphabet.length; row++) {
    // Skapar en knapp
    const buttonElement = document.createElement("button");
    // Lägger till ett värde på knappen
    buttonElement.value = alphabet[row];
    // Lägger till text till knappen
    buttonElement.textContent = alphabet[row];
    // Skapar knappen i Alphabet-box diven
    alphabetElement.appendChild(buttonElement);
    buttonElement.addEventListener("click", function (event) {
      buttonElement.disabled = true;
      const guessedLetter = event.target.value.toLowerCase();
      checkLetter(guessedLetter);
    });
  }
}
// Den här funktionen kontrollerar om spelaren klickar på rätt bokstav kontra bokstäverna som finns i ordet som slumpmässigts genererats och kollar om spelaren vinner eller förlorar.
function checkLetter(guessedLetter) {
  if (hasWon) return;
  if (maxGuess < 2) {
    return (lifeElement.innerText = "Tyvärr, Du har förlorat!");
  }
  if (randomWord.toLowerCase().includes(guessedLetter)) {
    for (let i = 0; i < randomWord.length; i++) {
      if (randomWord[i] === guessedLetter) {
        lettersArray[i].innerText = guessedLetter.toLowerCase();
      }
      if (
        lettersArray.every(function (letter) {
          return letter.innerText !== "_";
        })
      ) {
        hasWon = true;
        return (lifeElement.innerText = "Grattis, Du har vunnit!");
      }
    }
  } else {
    maxGuess--;
    lifeElement.innerText = maxGuess;
  }
}
// Den här funktionen skapar understrecken och sparar ner elementen i en array för att sedan kunna kontrollera om man vinner genom att kontrollera ifall alla understreck är borta
function createWordLetters() {
  linesElement.innerHTML = "";
  for (let line = 0; line < randomWord.length; line++) {
    const lineElement = document.createElement("li");
    lineElement.innerText = "_";
    linesElement.appendChild(lineElement);
    lettersArray.push(lineElement);
  }
}

startGame();
