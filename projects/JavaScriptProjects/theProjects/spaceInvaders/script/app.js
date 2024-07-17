// Imports
import Player from "./player.js";
import Invaders from "./invaders.js";
import Projectile from "./projectile.js";

// Get the canvas element by its ID
const canvas = document.getElementById("game");
// Get the 2D rendering context for the canvas
const ctx = canvas.getContext("2d");

let npcs = [];
let player = new Player();
let beam = new Projectile();


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

// Create invaders
function createInvaders() {
    let startX = 60;
    let startY = 40;
    let counter = 40
    for (let z = 0; z < 2; z++) {
        for (let i = 0; i < 13; i++) {
            let x = startX + i * counter;
            let newInvader = new Invaders(x, startY);
            npcs.push(newInvader);
        }
        startY += 30
    }
}
createInvaders();

// Drawthe invaders on Canvas
function drawInvaders() {
    npcs.forEach((invader) => {
        ctx.fillStyle = invader.color;
        ctx.fillRect(invader.x, invader.y, invader.width, invader.height);
    });
}

// Draw the player
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawProjectile() {
    if (beam.active) {
        ctx.fillStyle = beam.color;
        ctx.fillRect(beam.x, beam.y, beam.width, beam.height);
    }
}

// Update canvas display
function updateCanvas() {
    clearCanvas();
    drawInvaders();
    drawPlayer();
    drawProjectile();

    beam.update();
    npcs.forEach((npc, i) => {
        if (beam.isCollision(npc)) {
            console.log("hit!");
            npcs.splice(i, 1);
            beam.update();
        };
    });

    requestAnimationFrame(updateCanvas);
}
updateCanvas();

// Controls for the player
window.addEventListener("keydown", e => {
    switch (e.key) {

        // Move Player Left
        case "ArrowLeft":
            if (player.x - 30 > 0) {
                player.x -= player.speed;
            }
            break;

        // Move Player Right
        case "ArrowRight":
            if (player.x < canvas.clientWidth - 60) {
                player.x += player.speed;
            }
            break;

        case "ArrowUp":
            if (!beam.active) {
                beam.launch(player.x);
            }
            break;
    }
});