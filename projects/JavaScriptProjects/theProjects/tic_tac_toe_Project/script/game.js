export default class Game {
    board;
    currentPlayer;
    gameStatus;

    constructor() {
        this.board = ["", "", "", "", "", "", "", "", ""];
        this.currentPlayer = "X";
        this.gameStatus = "ongoing"
    }

    startGame() {
        this.resetGame();
    }

    makeMove(cell, index) {
        if (this.board[index] === "" && this.gameStatus === "ongoing") {
            this.board[index] = this.currentPlayer;
            cell.innerHTML = this.currentPlayer;
            this.updateBoard();

            setTimeout(() => {
                let result = this.checkWin();
                const popUp = document.getElementById("gamePopUp");
                const message = document.getElementById("popUpMessage");

                if (result === 1) {
                    message.textContent = `The winner is : ${this.currentPlayer === "X" ? "O" : "X"}`;
                    popUp.style.display = "block";
                }
                if (result === -1) {
                    message.textContent = "It's a draw!";
                    popUp.style.display = "block";
                }
            }, 0)
        }
        this.switchPlayer();
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    }

    updateBoard() {
        return this.board;
    }

    checkWin() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], //Rows
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8], //Columns
            [0, 4, 8],
            [2, 4, 6], //Diagonals
        ];
        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;

            // Check if all three cells in the current pattern are the same and not empty
            if (this.board[a] !== "" &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]) {
                return 1;
            }
        }
        if (!this.board.includes("")) {
            return -1;
        }
        return 0;
    }

    resetGame() {
        this.board = ["", "", "", "", "", "", "", "", ""];
        this.currentPlayer = "X";
    };
}

