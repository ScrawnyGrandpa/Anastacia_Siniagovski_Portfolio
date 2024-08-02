import { getRandomInt } from "./directions.js";

export class Food {
    x = 0;
    y = 0;
    size = 20;
    img;

    constructor(grideSize, snakePositions) {
        this.respawn(grideSize, snakePositions);
        this.img = new Image();
        this.img.src = "../images/apple-whole-solid.svg";
    }

    respawn(grideSize, snakePositions) {
        let isOccupied = true;
        while (isOccupied === true) {
            this.x = getRandomInt(0, grideSize) * this.size;
            this.y = getRandomInt(0, grideSize) * this.size;
            isOccupied = false;
            snakePositions.forEach((point) => {
                if (point.x === this.x && point.y === this.y) {
                    isOccupied = true;
                }
            });
        }
    }

    draw(canvasContext) {
        canvasContext.drawImage(this.img, this.x, this.y, this.size, this.size);
    }
}