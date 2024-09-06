// script.js

document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resetButton = document.getElementById('reset');
    const startButton = document.getElementById('startGame');
    const playerXInput = document.getElementById('playerXName');
    const playerXColor = document.getElementById('playerXColor');
    const playerOInput = document.getElementById('playerOName');
    const playerOColor = document.getElementById('playerOColor');
    const currentPlayerDisplay = document.getElementById('currentPlayerDisplay');

    let playerX = '';
    let playerO = '';
    let playerXColorValue = '#ff0000';
    let playerOColorValue = '#0000ff';
    let currentPlayer = 'X';
    let gameActive = false;
    let boardstate = ['', '', '', '', '', '', '', '', ''];

    const winning = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8],
    ];

    // Start Game - Collect Player Names and Colors
    startButton.addEventListener('click', () => {
        playerX = playerXInput.value;
        playerO = playerOInput.value;
        playerXColorValue = playerXColor.value;
        playerOColorValue = playerOColor.value;

        if (playerX === '' || playerO === '') {
            alert('Please enter names for both players.');
            return;
        }

        gameActive = true;
        board.style.display = 'grid';
        resetButton.style.display = 'block';
        currentPlayerDisplay.textContent = `${playerX}'s Turn (X)`;
        applyGradient();
    });

    // Handle Cell Clicks
    function handlecell(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute('data-index');

        if (boardstate[cellIndex] !== '' || !gameActive) {
            return;
        }
        updatecell(cell, cellIndex);
        checkforWinner();
    }

    function updatecell(cell, index) {
        boardstate[index] = currentPlayer;
        cell.textContent = currentPlayer;

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerDisplay.textContent = currentPlayer === 'X' ? `${playerX}'s Turn (X)` : `${playerO}'s Turn (O)`;
    }

    function checkforWinner() {
        let roundWon = false;

        for (let i = 0; i < winning.length; i++) {
            const wincombo = winning[i];
            const a = boardstate[wincombo[0]];
            const b = boardstate[wincombo[1]];
            const c = boardstate[wincombo[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            const winner = currentPlayer === 'X' ? playerO : playerX; // Since currentPlayer is already flipped
            setTimeout(() => alert(`Player ${winner} has won!`), 10);
            gameActive = false;
        } else if (!boardstate.includes('')) {
            setTimeout(() => alert('Draw!'), 10);
            gameActive = false;
        }
    }

    function resetGame() {
        boardstate = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        currentPlayerDisplay.textContent = `${playerX}'s Turn (X)`;
        document.querySelectorAll('.cell').forEach(cell => (cell.textContent = ''));
    }

    // Apply Gradient Backgrounds
    function applyGradient() {
        const gradient = `linear-gradient(to right, ${playerXColorValue}, ${playerOColorValue})`;
        document.body.style.background = gradient;
    }

    // Event Listeners
    board.addEventListener('click', handlecell);
    resetButton.addEventListener('click', resetGame);
});
