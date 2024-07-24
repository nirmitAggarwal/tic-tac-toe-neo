const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] !== '' || !isGameActive) {
        return;
    }

    updateCell(cell, cellIndex);
    checkResult();
};

const updateCell = (cell, index) => {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
};

const changePlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
};

const checkResult = () => {
    let roundWon = false;
    let winningCombination = [];

    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const combination = WINNING_COMBINATIONS[i];
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winningCombination = combination;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        isGameActive = false;
        highlightWinningCells(winningCombination);
    } else if (!board.includes('')) {
        statusText.textContent = 'Draw!';
        isGameActive = false;
        location.reload();
    } else {
        changePlayer();
    }
};

const highlightWinningCells = (winningCombination) => {
    const winningLine = document.createElement('div');
    winningLine.classList.add('winning-line');
    document.getElementById('tic-tac-toe').appendChild(winningLine);

    const [a, b, c] = winningCombination;
    const cellA = cells[a];
    const cellB = cells[b];
    const cellC = cells[c];

    if (a % 3 === b % 3) {
        // Vertical win
        winningLine.classList.add('vertical');
        winningLine.style.height = '100%';
        winningLine.style.left = `${cellA.offsetLeft + cellA.offsetWidth / 2}px`;
    } else if (Math.floor(a / 3) === Math.floor(b / 3)) {
        // Horizontal win
        winningLine.classList.add('horizontal');
        winningLine.style.width = '100%';
        winningLine.style.top = `${cellA.offsetTop + cellA.offsetHeight / 2}px`;
    } else {
        // Diagonal win
        winningLine.classList.add('diagonal');
        winningLine.style.width = '100%';
        if (a === 0) {
            winningLine.classList.add('left');
        } else {
            winningLine.classList.add('right');
        }
    }
};

const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    cells.forEach(cell => cell.textContent = '');
    statusText.textContent = `${currentPlayer}'s turn`;
    const winningLine = document.querySelector('.winning-line');
    if (winningLine) {
        winningLine.remove();
    }
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
statusText.textContent = `${currentPlayer}'s turn`;
