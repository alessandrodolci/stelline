import { CanvasObject } from "./canvas-object";

const SHIP_SIZE = 30;
const SHIP_SCALE = 20;
const SHIP_LINE_WIDTH = 1.5;
const SHIP_SKEW_FACTOR = 0.02;
export const SHIP_HORIZONTAL_SPEED = 1;
export const SHIP_VERTICAL_SPEED = 0.4;

const SHOT_SIZE = 4;
export const SHOT_SPEED = 4;

const canvas = document.getElementById('stars');
const context = canvas.getContext('2d');

export function Ship(initialX, initialY) {
    CanvasObject.call(this, initialX, initialY, SHIP_SIZE, true);

    this.shots = [];
}

Ship.prototype = Object.create(CanvasObject.prototype);
Ship.prototype.constructor = Ship;

const getShipHorizontalSkew = (shipX) => ((canvas.width / 2) - shipX) * SHIP_SKEW_FACTOR;

Ship.prototype.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
};

Ship.prototype.resetSize = function () {
    this.size = SHIP_SIZE;
};

Ship.prototype.getNoseXCoordinate = function () {
    return this.x;
};

Ship.prototype.getNoseYCoordinate = function () {
    return this.y - this.size / 2;
};

Ship.prototype.getLeftWingXCoordinate = function () {
    return this.x - this.size - getShipHorizontalSkew(this.x);
};

Ship.prototype.getRightWingXCoordinate = function () {
    return this.x + this.size - getShipHorizontalSkew(this.x);
};

Ship.prototype.getWingsYCoordinate = function () {
    return this.y + this.size / 4;
};

Ship.prototype.getTopXCoordinate = function () {
    return this.x - getShipHorizontalSkew(this.x);
};

Ship.prototype.getTopYCoordinate = function () {
    return this.y - this.size / 8;
};

Ship.prototype.getRearXCoordinate = function () {
    return this.x - getShipHorizontalSkew(this.x);
};

Ship.prototype.getRearYCoordinate = function () {
    return this.y + this.size / 3;
};

Ship.prototype.moveVertically = function (speed) {
    const deltaX = canvas.width/2 - this.x;
    const deltaY = canvas.height/2 - this.y;
    const direction = Math.atan2(deltaY, deltaX);
    this.x -= speed * Math.cos(direction);

    if (this.y > canvas.height/2) {
        this.y -= speed * Math.sin(direction);
        this.size += speed / SHIP_SCALE;
    }
};

Ship.prototype.moveHorizontally = function (speed) {
    this.x += speed;
};

Ship.prototype.draw = function () {
    context.beginPath();

    context.moveTo(this.getLeftWingXCoordinate(), this.getWingsYCoordinate());
    context.lineTo(this.getNoseXCoordinate(), this.getNoseYCoordinate());
    context.lineTo(this.getRightWingXCoordinate(), this.getWingsYCoordinate());
    context.lineTo(this.getRearXCoordinate(), this.getRearYCoordinate());
    context.lineTo(this.getLeftWingXCoordinate(), this.getWingsYCoordinate());

    context.moveTo(this.getTopXCoordinate(), this.getTopYCoordinate());
    context.lineTo(this.getLeftWingXCoordinate(), this.getWingsYCoordinate());

    context.moveTo(this.getTopXCoordinate(), this.getTopYCoordinate());
    context.lineTo(this.getRightWingXCoordinate(), this.getWingsYCoordinate());

    context.moveTo(this.getTopXCoordinate(), this.getTopYCoordinate());
    context.lineTo(this.getNoseXCoordinate(), this.getNoseYCoordinate());

    context .closePath();
    context.strokeStyle = "white";
    context.lineWidth = SHIP_LINE_WIDTH;
    context.stroke();
};

Ship.prototype.fireShot = function (targetX, targetY) {
    this.shots.push(new Shot(this.getNoseXCoordinate(), this.getNoseYCoordinate(), targetX, targetY));
};

function Shot(originX, originY, targetX, targetY) {
    CanvasObject.call(this, originX, originY, SHOT_SIZE, null);

    this.targetX = targetX;
    this.targetY = targetY;
    this.hit = false;
}

Shot.prototype = Object.create(CanvasObject.prototype);
Shot.prototype.constructor = Shot;

Shot.prototype.draw = function () {
    context.beginPath();
    context.ellipse(this.x, this.y, this.size / 2, this.size / 2, 0, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = "grey";
    context.fill();
};
