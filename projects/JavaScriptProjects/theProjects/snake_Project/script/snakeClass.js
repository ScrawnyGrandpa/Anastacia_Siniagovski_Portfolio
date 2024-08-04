import { Direction, getOpositeDirection } from "./directions.js";

export class Snake {
    body = [];
    direction;
    size = 20;

    constructor(initialPosition) {
        this.body = [initialPosition];
        this.direction = Direction.Right;
    }

    move() {
        const newHead = { ...this.body[0] };
        switch (this.direction) {
            case Direction.Right:
                newHead.x += this.size;
                break;
            case Direction.Left:
                newHead.x -= this.size;
                break;
            case Direction.Up:
                newHead.y -= this.size;
                break;
            case Direction.Down:
                newHead.y += this.size;
                break;
        }

        this.body.unshift(newHead);
        this.body.pop();
    }

    grow() {
        const tail = this.body[this.body.length - 1];
        this.body.push({ x: tail.x, y: tail.y });
    }

    turn(newDirection) {
        if (newDirection !== getOpositeDirection(this.direction)) {
            const newHead = { ...this.body[0] };
            switch (newDirection) {
                case Direction.Right:
                    newHead.x += this.size;
                    break;
                case Direction.Left:
                    newHead.x -= this.size;
                    break;
                case Direction.Up:
                    newHead.y -= this.size;
                    break;
                case Direction.Down:
                    newHead.y += this.size;
                    break;
            }

            if (!this.body.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                this.direction = newDirection;
            }
        }
    }

    checkCollision(gridSize) {
        const head = this.body[0];
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
            return true;
        }

        if (this.body.length > 2) {
            for (let i = 1; i < this.body.length; i++) {
                if (this.body[i].x === head.x && this.body[i].y === head.y) {
                    return true;
                }
            }
        }
        return false;
    }

    draw(ctx) {
        ctx.fillStyle = "green";
        this.body.forEach((segment) => {
            ctx.fillRect(segment.x, segment.y, this.size, this.size);
        });
    }
}
