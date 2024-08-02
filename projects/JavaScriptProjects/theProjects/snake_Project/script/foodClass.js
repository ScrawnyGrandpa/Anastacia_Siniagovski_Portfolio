import { getRandomInt } from "./directions.js";

export class Food {
    x = 0;
    y = 0;
    size = 20;
    img = new Image();

    constructor(gridSize, snakePositions) {
/*      this.img.src = "./images/apple-whole-solid.svg";
 */     this.img.src = "./images/apple-svgrepo-com.png";
        this.isImageLoaded = false;

        this.imageLoadPromise = new Promise((resolve, reject) => {
            this.img.onload = () => {
                this.isImageLoaded = true;
                this.respawn(gridSize, snakePositions);
                resolve();
            };
        });
    }

    respawn(gridSize, snakePositions) {
        let isOccupied = true;
        while (isOccupied === true) {
            this.x = getRandomInt(0, gridSize) * this.size;
            this.y = getRandomInt(0, gridSize) * this.size;
            isOccupied = false;
            snakePositions.forEach((point) => {
                if (point.x === this.x && point.y === this.y) {
                    isOccupied = true;
                }
            });
        }
    }

    draw(canvasContext) {
        if (this.isImageLoaded) {
            canvasContext.drawImage(this.img, this.x, this.y, this.size, this.size);
        } else {
            console.error("Image not loaded yet");
        }
    }
}