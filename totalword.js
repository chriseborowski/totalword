// import the list of possible words
const randomWords = require("./randomwords");

// select a random word from the list
function randomize() {
  return randomWords[Math.floor(Math.random() * randomWords.length)];
}

let totalWord = randomize().toString();

// prepare readline-sync for user prompting
function userInput(prompt) {
  const readline = require("readline-sync");
  const question = readline.question(prompt);
  return question;
}

// declare function to filter unique array values
function uniqueLetters(value, index, array) {
  return array.indexOf(value) === index;
}

// check the user's input against the randomly selected word from the list
function wordCheck() {
  let attemptNumber = 1;
  let globalCorrectLetters = [];
  let globalIncorrectLetters = [];
  while (attemptNumber < 6) {
    const attempt = userInput("Enter your 5-letter word: ").toLowerCase();
    console.log(
      `Attempt #${attemptNumber}: You entered ${attempt.toUpperCase()}`
    );
    if (attempt === totalWord) {
      console.log(
        `Congratulations! You guessed the word: ${totalWord.toUpperCase()}`
      );
      return;
    } else if (randomWords.includes(attempt) === false) {
      console.log(
        "Because the word you entered isn't on the list, you get another attempt. Try again."
      );
      attemptNumber--;
    } else {
      if (attempt.length !== 5) {
        console.log("You must enter a 5-letter word.");
      } else {
        for (let i = 0; i < 5; i++) {
          if (attempt[i] === totalWord[i]) {
            console.log(
              `Nice! You guessed the letter ${attempt[
                i
              ].toUpperCase()} in this position correctly.`
            );
            globalCorrectLetters.push(attempt[i].toUpperCase());
          } else if (totalWord.includes(attempt[i])) {
            console.log(
              `Good! The letter ${attempt[
                i
              ].toUpperCase()} is somewhere in the word.`
            );
            globalCorrectLetters.push(attempt[i].toUpperCase());
          } else {
            console.log(
              `The letter ${attempt[i].toUpperCase()} is missing from the word.`
            );
            globalIncorrectLetters.push(attempt[i].toUpperCase());
          }
        }
        if (globalCorrectLetters.length > 0) {
          console.log(
            `Correct letter(s): ${globalCorrectLetters
              .filter(uniqueLetters)
              .sort()}`
          );
        }
        if (globalIncorrectLetters.length > 0) {
          console.log(
            `Incorrect letter(s): ${globalIncorrectLetters
              .filter(uniqueLetters)
              .sort()}`
          );
        }
      }
    }
    attemptNumber++;
    if (attemptNumber === 6 && attempt !== totalWord) {
      console.log(
        `Better luck next time! The word was: ${totalWord.toUpperCase()}`
      );
    }
  }
}

// run the script
wordCheck();
