const turnIndicator = document.querySelector("h2");
const spaces = document.querySelectorAll(".space");
const space1 = document.getElementById("space-1");
const space2 = document.getElementById("space-2");
const space3 = document.getElementById("space-3");
const space4 = document.getElementById("space-4");
const space5 = document.getElementById("space-5");
const space6 = document.getElementById("space-6");
const space7 = document.getElementById("space-7");
const space8 = document.getElementById("space-8");
const space9 = document.getElementById("space-9");
const newGame = document.getElementById("new-game");

let [turn, gameWon, spacesLeft] = "";

const winCombos = [
  [space1, space2, space3],
  [space4, space5, space6],
  [space7, space8, space9],
  [space1, space4, space7],
  [space2, space5, space8],
  [space3, space6, space9],
  [space1, space5, space9],
  [space3, space5, space7],
];

function clickHandler(e) {
  if (
    !e.target.classList.contains("o-choice") &&
    !e.target.classList.contains("x-choice")
  ) {
    playerChoice(e.target);
    spacesLeft -= 1;
    checkForGameEnd();

    if (!gameWon && spacesLeft > 0) {
      nextPlayer();
      displayTurn();
    }
  }
}

function removeClickHandler() {
  spaces.forEach((el) => {
    el.removeEventListener("click", clickHandler);
  });
}

function playerChoice(el) {
  if (turn == "X") {
    el.classList.remove("o-choice");
    el.classList.add("x-choice");
  } else {
    el.classList.remove("x-choice");
    el.classList.add("o-choice");
  }
}

function displayTurn() {
  gameWon
    ? (turnIndicator.textContent = `${turn}'s Wins!`)
    : (turnIndicator.textContent = `${turn}'s Turn`);
}

function nextPlayer() {
  turn == "X" ? (turn = "O") : (turn = "X");
}

function checkForGameEnd() {
  winCombos.forEach((combo) => {
    let oAmt = 0;
    let xAmt = 0;

    for (i = 0; i < combo.length; i++) {
      combo[i].classList.contains("o-choice") ? (oAmt += 1) : oAmt;
      combo[i].classList.contains("x-choice") ? (xAmt += 1) : xAmt;
      oAmt == 3 && win("O");
      xAmt == 3 && win("X");
    }
  });

  spacesLeft == 0 && cat();
}

function win(player) {
  gameWon = 1;
  removeClickHandler();
  displayTurn();
}

function cat() {
  turnIndicator.textContent = `CAT! Play again!`;
  removeClickHandler();
}

function init() {
  spacesLeft = spaces.length;
  gameWon = 0;
  spaces.forEach((el) => {
    el.classList.remove("o-choice");
    el.classList.remove("x-choice");
    turn = "X";
    displayTurn();
  });

  spaces.forEach((el) => {
    el.addEventListener("click", clickHandler);
  });
}

init();
