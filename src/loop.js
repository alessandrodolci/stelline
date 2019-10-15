import { MAX_STAR_SIZE } from "./star";
import { SHOT_SPEED } from "./ship";

const CYCLES_THRESHOLD = 200;

const canvas = document.getElementById('stars');
const context = canvas.getContext('2d');

let score = 0;
let gameOver = false;

const showScore = () => {
    context.fillStyle = "white";
    context.font = "24px mono";
    context.fillText("SCORE: " + score, 10, 30);
};

export const animateStars = (stars) => {
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];

        if (star.visible) {
            if (star.cycles > CYCLES_THRESHOLD && star.size < MAX_STAR_SIZE) {
                star.size++;
                star.cycles = 0;
            }

            star.draw();
            
            star.cycles++;
        }
        else if (Math.random() > 0.995) {
            star.visible = true;
        }

        star.x += star.vx;
        star.y += star.vy;
        if (star.x > canvas.width - star.size || star.x < star.size
            || star.y > canvas.height - star.size || star.y < star.size) {
            if (star.y > canvas.height - star.size) {
                score++;
            }
            
            star.respawn();
        }
    }
};

const animateShot = (shot) => {
    shot.y = shot.y - SHOT_SPEED;
    
    if (shot.y === 0) {
        shot.hit = true;
    }
    
    shot.draw();
};

const isShipColliding = (star, ship) => {
    if (ship.x - star.x < ship.size && ship.x - star.x > -ship.size
        && ship.y - star.y < ship.size / 2 && ship.y - star.y > -ship.size / 2
        && star.visible === true) {
        return true;
    }

    return false;
};

const drawGameOver = () => {
    context.fillStyle = "white";
    context.textAlign = "center";
    context.font = "60px monospace";
    context.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);

    context.font = "38px monospace";
    context.fillText("Tap to restart", canvas.width / 2, canvas.height / 2 + 80);
};

const toggleObjectsVisibility = (stars, ship) => {
    ship.visible = !gameOver;
    
    for (let i = 0; i < ship.shots.length; i++) {
        ship.shots[i].hit = gameOver;
    }

    for (let i = 0; i < stars.length; i++) {
        stars[i].visible = !gameOver;
    }
};

const endGame = (stars, ship) => {
    gameOver = true;

    toggleObjectsVisibility(stars, ship);

    drawGameOver();

    canvas.addEventListener(
        "pointerup",
        () => {
            gameOver = false;

            toggleObjectsVisibility(stars, ship);

            stars.forEach((star) => star.respawn());
            ship.setPosition(canvas.width / 2, (canvas.height / 6) * 5);

            animate(ship, stars);
        },
        { once: true }
    );
};

const checkShipCollisions = (stars, ship) => {
    for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (isShipColliding(star, ship)) {
            ship.visible = false;
            endGame(stars, ship);
        }
    }
};

const checkShotsCollisions = (stars, shots) => {
    for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        for (let j = 0; j < shots.length; j++) {
            const shot = shots[j];
            if (shot.x - star.x < star.size && shot.x - star.x > -star.size
                && shot.y - star.y < star.size && shot.y - star.y > -star.size
                && star.visible === true) {
                shot.hit = true;
                star.respawn();
            }
        }
    }
};

const checkCollisions = (stars, ship) => {
    checkShipCollisions(stars, ship);

    checkShotsCollisions(stars, ship.shots);
};

export const animate = (ship, stars) => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    showScore();

    animateStars(stars);

    if (ship.visible) {
        ship.draw();
    }

    ship.shots = ship.shots.filter((shot) => {
        animateShot(shot);

        return !shot.hit;
    });

    checkCollisions(stars, ship);
    
    if (!gameOver) {
        window.requestAnimationFrame(() => animate(ship, stars));
    }
};
