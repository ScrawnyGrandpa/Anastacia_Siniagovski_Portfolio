export default class InvaderProjectile {
    x;
    y;
    width = 10;
    height = 20;
    speed = 3;
    color = "orange";
    active = false;

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    launch(invaderX) {
        this.x = invaderX.x + 10;
        this.y = invaderX.y;
        this.active = true
    }

    update() {
        if (this.active) {
            this.y += this.speed;
            if (this.y < 0 || this.y > 480) {
                this.active = false;
            }
        }
    }

    isCollision(player) {
        if ((this.y + this.height > player.y && this.y < player.y + player.height) &&
            (this.x + this.width > player.x && this.x < player.x + player.width)) {
            this.active = false;
            return true;
        } else {
            return false;
        }
    }
}