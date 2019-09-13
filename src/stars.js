const MIN_STAR_SIZE = 1;
const MAX_STAR_SIZE = 8;
const CYCLES_THRESHOLD = 200;
const MAX_STARS = 200;

function Star() {
    this.x = ORIGIN_X;
    this.y = ORIGIN_Y;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    this.size = Math.random() * (MAX_STAR_SIZE - MIN_STAR_SIZE) + MIN_STAR_SIZE;
    this.visible = false;
    this.cycles = 0;
    this.respawn = () => {
        this.x = ORIGIN_X;
        this.y = ORIGIN_Y;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.visible = false;
        this.cycles = 0;
    }
}

const animateStars = (stars) => {
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];

        if (star.visible) {
            if (star.cycles > CYCLES_THRESHOLD && star.size < MAX_STAR_SIZE) {
                star.size++;
                star.cycles = 0;
            }

            context.beginPath();
            context.ellipse(star.x, star.y, star.size / 2, star.size / 2, 0, 0, 2 * Math.PI);
            context.closePath();
            context.fillStyle = "white";
            context.fill();
            star.cycles++;
        }
        else if (Math.random() > 0.995) {
            star.visible = true;
        }

        star.x += star.vx;
        star.y += star.vy;
        if (star.x > canvas.width - star.size || star.x < star.size
            || star.y > canvas.height - star.size || star.y < star.size) {
            score++;
            star.respawn();
        }
    }
};
