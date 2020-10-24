import { CanvasObject } from "./canvas-object";

export const MIN_STAR_SIZE = 1;
export const MAX_STAR_SIZE = 7;
const BASE_SIZE_SCALE_FACTOR = 0.002;
const BASE_SPEED_SCALE_FACTOR = 0.008;

const canvas = document.getElementById('stars');
const context = canvas.getContext('2d');

export function Star(initialX, initialY) {
    CanvasObject.call(this, initialX, initialY, null, false);

    this.initialX = initialX;
    this.initialY = initialY;
    this.size = Math.random() * (MAX_STAR_SIZE - MIN_STAR_SIZE) + MIN_STAR_SIZE;
    this.vx = Math.min(1, this.size / 2) * (Math.random() - 0.5);
    this.vy = Math.min(1, this.size / 2) * (Math.random() - 0.5);
}

Star.prototype = Object.create(CanvasObject.prototype);
Star.prototype.constructor = Star;

Star.prototype.move = function (movementFactor = 1) {
    this.x += this.vx * movementFactor;
    this.y += this.vy * movementFactor;
};

Star.prototype.scale = function (scaleFactor = 1) {
    if (this.size < MAX_STAR_SIZE) {
        this.size += this.size * BASE_SIZE_SCALE_FACTOR * scaleFactor;
    }
    this.vx += this.vx *  BASE_SPEED_SCALE_FACTOR * scaleFactor;
    this.vy += this.vy * BASE_SPEED_SCALE_FACTOR * scaleFactor;
};

Star.prototype.respawn = function () {
    this.x = this.initialX;
    this.y = this.initialY;
    this.size = Math.random() * (MAX_STAR_SIZE - MIN_STAR_SIZE) + MIN_STAR_SIZE;
    this.vx = Math.min(1, this.size / 2) * (Math.random() - 0.5);
    this.vy = Math.min(1, this.size / 2) * (Math.random() - 0.5);
    this.visible = false;
};

Star.prototype.draw = function () {
    context.beginPath();
    context.ellipse(this.x, this.y, this.size / 2, this.size / 2, 0, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = "white";
    context.fill();
};
