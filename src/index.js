const stars = [];
for (let i = 0; i < MAX_STARS; i++) {
    const star = new Star();
    stars.push(star);
}

const ship = new Ship();

let score = 0;
let gameOver = false;
let shouldRender = true;

bindKeys();

listenToOrientationChange();

window.requestAnimationFrame(animate);
