import { Game } from "./gameClass.js";

const score = document.getElementById('score');
const canvas = document.getElementById("app");
const prevScores = document.getElementById('prevScores')
canvas.width = 400;
canvas.height = 400;

const game = new Game(canvas, 20, score, prevScores);

document.addEventListener("keydown", (event) => {
    game.handleInput(event.key);
});

game.food.imageLoadPromise
    .then(() => {
        game.start(); // Start the game only after the image is loaded
        game.keepScore();
    })
    .catch(error => {
        console.error("Error initializing game:", error);
    });

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.collapsible-header');
    const content = document.querySelector('.collapsible-content');
    const arrow = document.querySelector('.collapsible-arrow');

    header.addEventListener('click', function () {
        const isExpanded = content.style.display === 'block';
        content.style.display = isExpanded ? 'none' : 'block';
        arrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
    });
});
