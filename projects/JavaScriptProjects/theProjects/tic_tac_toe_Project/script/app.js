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


document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("gamePopUp").style.display = "none";
    window.location.reload();
});

window.onclick = function (event) {
    if (event.target === document.getElementById("gamePopUp")) {
        document.getElementById("gamePopUp").style.display = "none";
        window.location.reload();
    }
}

gameManager.startGame();
startGamePage();