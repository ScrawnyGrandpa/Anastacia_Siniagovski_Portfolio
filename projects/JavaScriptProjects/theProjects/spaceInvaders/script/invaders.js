export default class Invaders {
    x;
    y;
    width;
    height;
    speed;
    color;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 18;
        this.speed = 1;
        this.color = "red";
    }
}