const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const playerXButton = document.getElementById('playerX');
const playerOButton = document.getElementById('playerO');
const dialog = document.getElementById('dialog');
const dialogMessage = document.getElementById('dialogMessage');
const closeDialog = document.getElementById('closeDialog');
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(event) {
  const cell = event.target;
  const cellIndex = parseInt(cell.getAttribute('data-index'));

  if (boardState[cellIndex] !== '' || !gameActive) {
    return;
  }

  boardState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  checkResult();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updatePlayerButtons();
  }
}

function checkResult() {
  let roundWon = false;
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    gameActive = false;
    dialogMessage.textContent = `Player ${currentPlayer} Wins!`;
    dialog.style.display = 'block';
  } else if (!boardState.includes('')) {
    gameActive = false;
    dialogMessage.textContent = 'Draw!';
    dialog.style.display = 'block';
  }
}

function resetGame() {
  currentPlayer = 'X';
  boardState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  cells.forEach(cell => cell.textContent = '');
  dialog.style.display = 'none';
  updatePlayerButtons();
}

function updatePlayerButtons() {
  if (currentPlayer === 'X') {
    playerXButton.classList.add('active');
    playerOButton.classList.remove('active');
  } else {
    playerXButton.classList.remove('active');
    playerOButton.classList.add('active');
  }
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
closeDialog.addEventListener('click', () => {
  dialog.style.display = 'none';
});

updatePlayerButtons();
