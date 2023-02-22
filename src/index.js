const statusDisplay = document.querySelector(".game-status");

let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const drawMessage = `Game ended in a draw!`;

// statusDisplay.innerText = currentPlayer

const handleCellPlayed = function (clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
};
const handlePlayerChange = function () {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerText = `It's ${currentPlayer}'s turn`;
};

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleResultValidation = function () {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDisplay.innerText = `Player ${currentPlayer} has won!`;
    gameActive = false;
    return;
  }
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerText = drawMessage;
    gameActive = false;
    return;
  }
  handlePlayerChange();
};

const handleCellClick = function (clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = clickedCell.getAttribute("data-cell-index");
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
};

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerText = `It's ${currentPlayer}'s turn`;
  document.querySelectorAll(`.cell`).forEach(function (cell) {
    cell.innerHTML = "";
  });
}

const cell = document.querySelectorAll(".cell");
cell.forEach(function (cell) {
  cell.addEventListener("click", handleCellClick);
});
const gameRestart = document.querySelector(".game-restart");
gameRestart.addEventListener("click", function () {
  handleRestartGame();
});
