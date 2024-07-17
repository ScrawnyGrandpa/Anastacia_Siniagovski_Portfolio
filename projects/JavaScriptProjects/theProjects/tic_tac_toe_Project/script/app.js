import Game from "./game.js"

const gameManager = new Game();
const reset = document.getElementById('resetBtn');
const cells = document.querySelectorAll('.cell');

function startGamePage() {
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => gameManager.makeMove(cell, index));
    })
}

reset.addEventListener("click", () => {
    gameManager.resetGame(); // Resets board and sets player to "X"
    cells.forEach((cell) => {
        cell.innerHTML = "";
    })
})

gameManager.startGame();
startGamePage();