import { Game } from "./gameClass.js";

const score = document.getElementById('score');
const canvas = document.getElementById("app");
canvas.width = 400;
canvas.height = 400;

const game = new Game(canvas, 20, score);

document.addEventListener("keydown", (event) => {
    game.handleInput(event.key);
});

game.start();
