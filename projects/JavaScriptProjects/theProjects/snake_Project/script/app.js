import { Game } from "./gameClass.js";

const score = document.getElementById('score');
const canvas = document.getElementById("app");
canvas.width = 400;
canvas.height = 400;

const game = new Game(canvas, 20, score);

document.addEventListener("keydown", (event) => {
    game.handleInput(event.key);
});

game.food.imageLoadPromise
    .then(() => {
        game.start(); // Start the game only after the image is loaded
    })
    .catch(error => {
        console.error("Error initializing game:", error);
    });

