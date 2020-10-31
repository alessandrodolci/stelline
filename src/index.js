import { Ship, SHIP_HORIZONTAL_SPEED, SHIP_VERTICAL_SPEED } from "./ship";
import { Star } from "./star";
import { animate } from "./loop";
import { deviceHasTouchScreen } from "./utils";

const MAX_STARS = 200;

export function getNewStars() {
    const stars = [];
    for (let i = 0; i < MAX_STARS; i++) {
        const star = new Star(canvas.width / 2, canvas.height / 3);

        star.move(Math.random() * (canvas.width/3));

        stars.push(star);
    }

    return stars;
}

const bindKeys = (ship) => {
    window.onkeydown = (e) => {
        switch (e.key) {
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

    if (!deviceHasTouchScreen()) {
        window.onwheel = (e) => {
            ship.moveHorizontally(e.deltaX);
            ship.moveVertically(e.deltaY);
        };
    }

    window.onclick = (e) => {
        ship.fireShot(e.clientX, e.clientY);
    };
};

const listenToOrientationChange = (ship, stars) => {
    const clamp = (value, min, max) => {
        return Math.min(Math.max(value, min), max);
    };

    let initialBeta = 0;
    let initialGamma = 0;

    const initialListener = (event) => {
        initialBeta = clamp(event.beta, -90, 90);
        initialGamma = event.gamma;
    };

    const orientationListener = (event) => {
        const beta = clamp(event.beta - initialBeta, -90, 90);
        const gamma = event.gamma - initialGamma;

        ship.moveHorizontally(gamma / 20);
        ship.moveVertically(beta / 10);
    };

    window.addEventListener("deviceorientation", initialListener, { once: true });
    window.addEventListener("deviceorientation", orientationListener);
};

const canvas = document.getElementById('stars');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = getNewStars();

const ship = new Ship(canvas.width / 2, (canvas.height / 6) * 5);

bindKeys(ship);

listenToOrientationChange(ship, stars);

window.requestAnimationFrame(() => animate(ship, stars));
