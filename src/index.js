import { Ship, SHIP_HORIZONTAL_SPEED, SHIP_VERTICAL_SPEED } from "./ship";
import { Star } from "./star";
import { animate } from "./loop";

const MAX_STARS = 200;

const bindKeys = (ship) => {
    window.onkeydown = (e) => {
        switch (e.code) {
            case "ArrowLeft":
            case "KeyA":
                ship.moveHorizontally(-SHIP_HORIZONTAL_SPEED);
                break;
            case "ArrowRight":
            case "KeyD":
                ship.moveHorizontally(SHIP_HORIZONTAL_SPEED);
                break;
            case "ArrowUp":
            case "KeyW":
                ship.moveVertically(-SHIP_VERTICAL_SPEED);
                break;
            case "ArrowDown":
            case "KeyS":
                ship.moveVertically(SHIP_VERTICAL_SPEED);
                break;
            case "KeyZ":
                ship.fireShot();
                break;
            default:
                break;
        }
    };

    window.onclick = (e) => {
        ship.fireShot(e.clientX, e.clientY);
    };
};

const listenToOrientationChange = (ship, stars) => {
    let initialBeta = 0;
    let initialGamma = 0;

    const initialListener = (event) => {
        initialBeta = event.beta;
        initialGamma = event.gamma;

        if (initialBeta > 90) {
            initialBeta = 90;
        }
        if (initialBeta < -90) {
            initialBeta = -90;
        }
    };

    const orientationListener = (event) => {
        let beta = event.beta - initialBeta;
        const gamma = event.gamma - initialGamma;

        if (beta > 90) {
            beta = 90;
        }
        if (beta < -90) {
            beta = -90;
        }

        ship.moveVertically(beta / 20);

        for (let i = 0; i < stars.length; i++) {
            stars[i].x -= gamma / 5;
            stars[i].y += beta / 5;
        }
    };

    window.addEventListener("deviceorientation", initialListener, { once: true });
    window.addEventListener("deviceorientation", orientationListener);
};

const canvas = document.getElementById('stars');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const starsInitialX = canvas.width / 2;
const starsInitialY = canvas.height / 3;
const stars = [];
for (let i = 0; i < MAX_STARS; i++) {
    const star = new Star(starsInitialX, starsInitialY);
    stars.push(star);
}

const shipInitialX = canvas.width / 2;
const shipInitialY = (canvas.height / 6) * 5;
const ship = new Ship(shipInitialX, shipInitialY);

bindKeys(ship);

listenToOrientationChange(ship, stars);

window.requestAnimationFrame(() => animate(ship, stars));
