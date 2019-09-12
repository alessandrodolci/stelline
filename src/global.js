const canvas = document.getElementById('stars');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ORIGIN_X = canvas.width / 2;
const ORIGIN_Y = canvas.height / 3;

const bindKeys = () => {
    window.onkeydown = (e) => {
        switch (e.code) {
            case "ArrowLeft":
            case "KeyA":
                ship.x = ship.x - SHIP_HORIZONTAL_SPEED;
                break;
            case "ArrowRight":
            case "KeyD":
                ship.x = ship.x + SHIP_HORIZONTAL_SPEED;
                break;
            case "ArrowUp":
            case "KeyW":
                ship.y = ship.y - SHIP_VERTICAL_SPEED;
                ship.size = ship.size - 0.4;
                break;
            case "ArrowDown":
            case "KeyS":
                ship.y = ship.y + SHIP_VERTICAL_SPEED;
                ship.size = ship.size + 0.4;
                break;
            case "KeyZ":
                ship.fireShot();
                break;
            default:
                break;
        }
    }

    window.onclick = (e) => {
        ship.fireShot(e.clientX, e.clientY);
    }
};

const showScore = () => {
    context.fillStyle = "white";
    context.font = "24px mono";
    context.fillText("SCORE: " + score, 10, 30);
};

const showGameOver = () => {
    context.fillStyle = "white";
    context.font = "72px mono";
    context.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
};

const endGame = (stars, ship) => {
    ship.visible = false;
    for (let i = 0; i < ship.shots.length; i++) {
        ship.shots[i].hit = true;
    }

    for (let i = 0; i < stars.length; i++) {
        stars[i].visible = false;
    }

    showGameOver();

    gameOver = true;
};

const checkShipCollisions = (stars, ship) => {
    for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (ship.x - star.x < SHIP_SIZE && ship.x - star.x > -SHIP_SIZE
            && ship.y - star.y < SHIP_SIZE && ship.y - star.y > -SHIP_SIZE
            && star.visible === true) {
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
                score++;
                star.respawn();
            }
        }
    }
};

const checkCollisions = (stars, ship) => {
    checkShipCollisions(stars, ship);

    checkShotsCollisions(stars, ship.shots);
};

const animate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    showScore();

    animateStars(stars);

    if (ship.visible) {
        spawnShip();
    }

    ship.shots = ship.shots.filter((shot) => {
        animateShot(shot);

        return !shot.hit;
    });

    checkCollisions(stars, ship);
    
    if (!gameOver) {
        window.requestAnimationFrame(animate);
    }
};