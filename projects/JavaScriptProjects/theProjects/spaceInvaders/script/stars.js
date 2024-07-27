export default class Star {
    constructor(canvasWidth, canvasHeight) {
        const colors = [
            "white",
            "lightgray",
            "yellow",
            "orange",
            "red",
            "blue",
            "blueviolet",
            "turquoise",
            "skyblue",
            "dodgerblue",
            "darkorange",
            "darkred",
            "crimson",
            "gold",
            "lightcoral",
            "salmon",
            "mediumslateblue",
            "lightsteelblue",
            "lightsalmon",
            "peachpuff"
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.speed = Math.random() * 1.5 + 0.1;
        this.size = 1.7;
        this.canvasHeight = canvasHeight;
        this.canvasWdith = canvasWidth;
    }

    draw(ctx) {

        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    update() {
        this.y += this.speed;
        if (this.y > this.canvasHeight) {
            this.y = 0;
            this.x = Math.random() * this.canvasWdith;
        }
    }
}