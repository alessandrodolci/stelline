const SHIP_SIZE = 30;
const SHIP_LINE_WIDTH = 1.5;
export const SHIP_HORIZONTAL_SPEED = 1;
export const SHIP_VERTICAL_SPEED = 0.4;

const SHOTS_SIZE = 4;
export const SHOTS_SPEED = 4;

const canvas = document.getElementById('stars');
const context = canvas.getContext('2d');

export function Ship(initialX, initialY) {
    this.x = initialX;
    this.y = initialY;
    this.size = SHIP_SIZE;
    this.shots = [];
    this.visible = true;
    this.moveVertically = (speed) => {
        this.y += speed;
        this.size += speed / 6;
    };
    this.moveHorizontally = (speed) => {
        this.x += speed;
    };
    this.draw = () => {
        context.beginPath();

        context.moveTo(this.x - this.size, this.y + this.size / 4);
        context.lineTo(this.x, this.y - this.size / 2);
        context.lineTo(this.x + this.size, this.y + this.size / 4);
        context.lineTo(this.x, this.y + this.size / 3);
        context.lineTo(this.x - this.size, this.y + this.size / 4);

        context.moveTo(this.x, this.y - this.size / 8);
        context.lineTo(this.x - this.size, this.y + this.size / 4);

        context.moveTo(this.x, this.y - this.size / 8);
        context.lineTo(this.x + this.size, this.y + this.size / 4);

        context.moveTo(this.x, this.y - this.size / 8);
        context.lineTo(this.x, this.y - this.size / 2);

        context.closePath();
        context.strokeStyle = "white";
        context.lineWidth = SHIP_LINE_WIDTH;
        context.stroke();
    }
    this.fireShot = (targetX, targetY) => {
        this.shots.push(new Shot(this.x, this.y - this.size / 2, targetX, targetY));
    };
}

function Shot(originX, originY, targetX, targetY) {
    this.x = originX;
    this.y = originY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.hit = false;
    this.draw = () => {
        context.beginPath();
        context.ellipse(this.x, this.y, SHOTS_SIZE / 2, SHOTS_SIZE / 2, 0, 0, 2 * Math.PI);
        context.closePath();
        context.fillStyle = "grey";
        context.fill();
    }
}
