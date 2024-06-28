let player = "X";
let board = ["", "", "", "", "", "", "", "", ""];
const cells = document.querySelectorAll(".cell");
const reset = document.getElementById('resetBtn');

cells.forEach((cellElement, index) => {
    console.log(`binding cell #${index} click to makeMove(cell, ${index})`); // shows me the index # of each cell (מספר תא)
    cellElement.addEventListener("click", () => {
        makeMove(cellElement, index);
    });
});

function makeMove(cell, index) {
    if (board[index] === "") {
        board[index] = player; // save the click in our array
        console.log(board); //display the array with the new save
        cell.innerText = player; //write the X/O inside the div
        setTimeout(() => {
            let result = checkWinner();
            if (result === 1) {
                alert("The winner is : " + player);
                window.location.reload();
            }
            if (result === -1) {
                alert("Its a draw!");
                window.location.reload();
            }
            player = player === "X" ? "O" : "X"; //toggle turn
        }, 0);
    }
};

reset.addEventListener('click', () => {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => cell.innerText = "");
    player = "X";
});

function checkWinner() {
    //return 1 if there is a winner
    if ((board[0] === board[1] && board[1] == board[2] && board[0] != "") ||
        (board[3] === board[4] && board[4] == board[5] && board[3] != "") ||
        (board[6] === board[7] && board[7] == board[8] && board[6] != "") || //rows
        (board[0] === board[3] && board[3] == board[6] && board[0] != "") ||
        (board[1] === board[4] && board[4] == board[7] && board[1] != "") ||
        (board[2] === board[5] && board[5] == board[8] && board[2] != "") || //columns
        (board[0] === board[4] && board[4] == board[8] && board[0] != "") ||
        (board[2] === board[4] && board[4] == board[6] && board[2] != "")) {
        return 1;
    }
    //return -1 if its a draw
    if (!board.includes("")) {
        return -1;
    }
    //return 0 if there is no winner yet
    return 0;
}

// There is a better wayt o create the checkWinner function using an array - try to solve it.
/* function checkWinner() {
    let x;
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 7], //Rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], //Columns
        [0, 4, 8],
        [2, 4, 6], //Diagonals
    ];
}; */