// Imports
import Player from "./player.js";
import Invaders from "./invaders.js";
import Projectile from "./projectile.js";
import InvaderProjectile from "./invaderProjectile.js";

// Get the canvas element by its ID
const canvas = document.getElementById("game");
// Get the 2D rendering context for the canvas
const ctx = canvas.getContext("2d");

let npcs = [];
let player = new Player();
let playerBeam = new Projectile();
let invaderBeam = new InvaderProjectile();

let gameOver = false;

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

// Draw both player and invader projectile.
function drawProjectile() {
    if (playerBeam.active) {
        ctx.fillStyle = playerBeam.color;
        ctx.fillRect(playerBeam.x, playerBeam.y, playerBeam.width, playerBeam.height);
    }
    if (invaderBeam.active) {
        ctx.fillStyle = invaderBeam.color;
        ctx.fillRect(invaderBeam.x, invaderBeam.y, invaderBeam.width, invaderBeam.height);
    }
}

// Invader Projectile auto-launch every 5secs.
function invaderProjectileLaunch() {
    let randomInvader = Math.floor(Math.random() * npcs.length);
    let invader = npcs[randomInvader];

    if (!invaderBeam.active) {
        invaderBeam.launch(invader);
    }

    setTimeout(invaderProjectileLaunch, 3000);
}
invaderProjectileLaunch();

// Update canvas display
function updateCanvas() {
    clearCanvas();

    if (gameOver) {
        // Display game over screen or victory screen
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        if (npcs.length == 0) {
            ctx.fillText("Game Over! You won!", canvas.width / 2 - 150, canvas.height / 2);
        } else {
            ctx.fillText("Game Over! You Lost!", canvas.width / 2 - 150, canvas.height / 2);
        }
        return;
    }

    drawInvaders();
    drawPlayer();
    drawProjectile();

    playerBeam.update();
    npcs.forEach((npc, i) => {
        if (playerBeam.isCollision(npc)) {
            console.log("hit!");
            npcs.splice(i, 1);
            if (npcs.length == 0) {
                gameOver = true;
            }
            playerBeam.update();
        };
    });

    invaderBeam.update();
    if (invaderBeam.active && invaderBeam.isCollision(player)) {
        console.log("Player got hit!");
        gameOver = true;
    }

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

        case " ":
            if (!playerBeam.active) {
                playerBeam.launch(player.x);
            }
            break;

        case "Enter":
            window.document.location.reload();
    }
});