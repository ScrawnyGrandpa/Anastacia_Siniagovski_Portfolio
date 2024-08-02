import { Food } from "./foodClass.js"
import { Snake } from "./snakeClass.js"
import { Direction } from "./directions.js";

export class Game {
    snake;
    food;
    gameOver;
    score;
    gridSize;
    canvas;
    ctx;
    intervalId;
    scoreDiv;
    savedScore;
    bestScore;

    constructor(canvas, gridSize = 20, scoreDiv) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.gridSize = gridSize;
        this.gameOver = false;
        this.score = 0;
        this.intervalId = null;
        let middle = this.gridSize ** 2 / 2;
        this.snake = new Snake({ x: middle, y: middle });
        this.food = new Food(gridSize, this.snake.body);
        this.scoreDiv = scoreDiv;
        this.savedScore = localStorage.getItem('score')
    }

    start() {
        this.intervalId = setInterval(() => {
            this.update();
        }, 120); // Update every 100 milliseconds
    }

    keepScore() {
        this.scoreDiv.innerHTML = `Your current score is - ${this.score} <br>
            Your best score was - ${this.savedScore != null ? this.savedScore : "0"}`;

        if (this.score > this.savedScore) {
            this.savedScore = this.score;
            localStorage.setItem('score', this.savedScore);
        }
    }

    update() {
        this.keepScore();
        if (this.gameOver) {
            if (this.intervalId) clearInterval(this.intervalId);
            console.log("Game Over!");
            return;
        }

        this.snake.move();

        // Check if food is eaten
        if (
            this.snake.body[0].x === this.food.x &&
            this.snake.body[0].y === this.food.y
        ) {
            this.snake.grow();
            this.food.respawn(this.gridSize, this.snake.body);
            this.score += 10;



        }

        // Check for game over
        if (this.snake.checkCollision(this.gridSize * this.gridSize)) {
            this.gameOver = true;

            this.ctx.fillStyle = "Black";
            this.ctx.font = "30px Arial";
            this.ctx.fillText("Game Over!", this.canvas.width - 280, this.canvas.height / 2);
            return;
        }

        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.food.draw(this.ctx);
        this.snake.draw(this.ctx);
    }

    handleInput(key) {
        switch (key) {
            case "ArrowUp":
                this.snake.turn(Direction.Up);
                break;
            case "ArrowDown":
                this.snake.turn(Direction.Down);
                break;
            case "ArrowLeft":
                this.snake.turn(Direction.Left);
                break;
            case "ArrowRight":
                this.snake.turn(Direction.Right);
                break;
            case "Enter":
                this.reset();
                break;
        }
    }

    reset() {
        this.gameOver = false;
        this.score = 0;
        this.snake = new Snake({ x: this.gridSize, y: this.gridSize });
        this.food.respawn(this.gridSize, this.snake.body);
        this.start();
    }
}
