export const Direction = {
    Up: 'UP',
    Down: 'DOWN',
    Left: 'LEFT',
    Right: 'RIGHT'
};

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function getOpositeDirection(dir) {
    switch (dir) {
        case Direction.Right:
            return Direction.Left;
        case Direction.Left:
            return Direction.Right;
        case Direction.Up:
            return Direction.Down;
        case Direction.Down:
            return Direction.Up;
        default:
            return Direction.Right;
    }
}