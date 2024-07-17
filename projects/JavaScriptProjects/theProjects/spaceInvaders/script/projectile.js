export default class Projectile {
    x;
    y;
    width = 10;
    height = 20;
    speed = 15;
    color = "purple";
    active = false;

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    launch(playerX) {
        this.x = playerX + 10;
        this.y = 390;
        this.active = true
    }

    update() {
        if (this.active) {
            this.y -= this.speed;
            if (this.y < 0) {
                this.active = false;
            }
        }
    }

    isCollision(invader) {
        if ((this.y + this.height > invader.y && this.y < invader.y + invader.height) &&
            (this.x + this.width > invader.x && this.x < invader.x + invader.width)) {
            this.active = false;
            return true;
        } else {
            return false;
        }
    }
}