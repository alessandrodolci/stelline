const SHIP_SIZE = 30;
const SHIP_LINE_WIDTH = 1.5;
const SHIP_INITIAL_HORIZONTAL_POSITION = ORIGIN_X;
const SHIP_INITIAL_VERTICAL_POSITION = (canvas.height / 6) * 5;
const SHIP_HORIZONTAL_SPEED = 2;
const SHIP_VERTICAL_SPEED = 1;
const SHOTS_SIZE = 4;
const SHOTS_SPEED = 4;

function Ship() {
    this.x = SHIP_INITIAL_HORIZONTAL_POSITION;
    this.y = SHIP_INITIAL_VERTICAL_POSITION;
    this.size = SHIP_SIZE;
    this.shots = [];
    this.visible = true;
    this.moveVertically = (speed) => {
        ship.y += speed;
        ship.size += speed / 6;
    }
    this.fireShot = (targetX, targetY) => {
        this.shots.push(new Shot(this.x, this.y, targetX, targetY));
    };
}

function Shot(originX, originY, targetX, targetY) {
    this.x = originX;
    this.y = originY - ship.size / 2;
    this.targetX = targetX;
    this.targetY = targetY;
    this.hit = false;
}

const spawnShip = () => {
    context.beginPath();

    context.moveTo(ship.x - ship.size, ship.y + ship.size / 4);
    context.lineTo(ship.x, ship.y - ship.size / 2);
    context.lineTo(ship.x + ship.size, ship.y + ship.size / 4);
    context.lineTo(ship.x, ship.y + ship.size / 6);
    context.lineTo(ship.x - ship.size, ship.y + ship.size / 4);

    context.moveTo(ship.x, ship.y - ship.size / 8);
    context.lineTo(ship.x - ship.size, ship.y + ship.size / 4);

    context.moveTo(ship.x, ship.y - ship.size / 8);
    context.lineTo(ship.x + ship.size, ship.y + ship.size / 4);

    context.moveTo(ship.x, ship.y - ship.size / 8);
    context.lineTo(ship.x, ship.y - ship.size / 2);

    context.closePath();
    context.strokeStyle = "white";
    context.lineWidth = SHIP_LINE_WIDTH;
    context.stroke();
};

const drawShot = (shot) => {
    context.beginPath();
    context.ellipse(shot.x, shot.y, SHOTS_SIZE / 2, SHOTS_SIZE / 2, 0, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = "grey";
    context.fill();
};

const animateShot = (shot) => {
    shot.y = shot.y - SHOTS_SPEED;
    
    if (shot.y === 0) {
        shot.hit = true;
    }
    
    drawShot(shot);
};
