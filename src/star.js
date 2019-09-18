export const MIN_STAR_SIZE = 1;
export const MAX_STAR_SIZE = 8;

const canvas = document.getElementById('stars');
const context = canvas.getContext('2d');

export function Star(initialX, initialY) {
    this.x = initialX;
    this.y = initialY;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    this.size = Math.random() * (MAX_STAR_SIZE - MIN_STAR_SIZE) + MIN_STAR_SIZE;
    this.visible = false;
    this.cycles = 0;
    this.respawn = () => {
        this.x = initialX;
        this.y = initialY;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.visible = false;
        this.cycles = 0;
    }
    this.draw = () => {
        context.beginPath();
        context.ellipse(this.x, this.y, this.size / 2, this.size / 2, 0, 0, 2 * Math.PI);
        context.closePath();
        context.fillStyle = "white";
        context.fill();
    }
}
