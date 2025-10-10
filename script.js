const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const playerXScore = document.getElementById('playerX');
const playerOScore = document.getElementById('playerO');
const drawScore = document.getElementById('draws');

let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;
let scores = { X: 0, O: 0, Draw: 0 };

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener('click', () => handleCellClick(cell));
});

function handleCellClick(cell) {
  const index = cell.dataset.index;

  if (!isGameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('animated');

  if (checkWinner()) {
    highlightWinner();
    message.textContent = `🎉 Player ${currentPlayer} Wins!`;
    updateScore(currentPlayer);
    isGameActive = false;
  } else if (board.every(cell => cell !== "")) {
    message.textContent = "😐 It's a Draw!";
    updateScore('Draw');
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  return winPatterns.some(pattern => {
    return pattern.every(index => board[index] === currentPlayer);
  });
}

function highlightWinner() {
  winPatterns.forEach(pattern => {
    if (pattern.every(index => board[index] === currentPlayer)) {
      pattern.forEach(index => {
        cells[index].classList.add('winning');
      });
    }
  });
}

function updateScore(winner) {
  scores[winner]++;
  playerXScore.textContent = `X Wins: ${scores.X}`;
  playerOScore.textContent = `O Wins: ${scores.O}`;
  drawScore.textContent = `Draws: ${scores.Draw}`;
}

resetBtn.addEventListener('click', resetGame);

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('winning', 'animated');
  });
  currentPlayer = 'X';
  message.textContent = "Player X's Turn";
  isGameActive = true;
}
