// script.js
const cells = document.querySelectorAll("[data-cell]");
const message = document.getElementById("message");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "x";
let gameActive = true;

function handleClick(event) {
  const cell = event.target;

  if (
    !gameActive ||
    cell.classList.contains("x") ||
    cell.classList.contains("o")
  ) {
    return;
  }

  cell.classList.add(currentPlayer);

  if (checkWin()) {
    gameActive = false;
    message.textContent = `${currentPlayer.toUpperCase()} wins!`;
  } else if (
    Array.from(cells).every(
      (cell) => cell.classList.contains("x") || cell.classList.contains("o")
    )
  ) {
    message.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "x" ? "o" : "x";
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some((pattern) => {
    const [a, b, c] = pattern;
    return (
      cells[a].classList.contains(currentPlayer) &&
      cells[b].classList.contains(currentPlayer) &&
      cells[c].classList.contains(currentPlayer)
    );
  });
}

function restartGame() {
  cells.forEach((cell) => cell.classList.remove("x", "o"));
  currentPlayer = "x";
  gameActive = true;
  message.textContent = "";
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));
restartButton.addEventListener("click", restartGame);
