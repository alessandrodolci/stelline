/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/canvas-object.js":
/*!******************************!*\
  !*** ./src/canvas-object.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanvasObject": () => (/* binding */ CanvasObject)
/* harmony export */ });
function CanvasObject(initialX, initialY, size, visible) {
    this.x = initialX;
    this.y = initialY;
    this.size = size;
    this.visible = visible;
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getNewStars": () => (/* binding */ getNewStars)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _star__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./star */ "./src/star.js");
/* harmony import */ var _loop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loop */ "./src/loop.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/utils.js");





const MAX_STARS = 200;

function getNewStars() {
    const stars = [];
    for (let i = 0; i < MAX_STARS; i++) {
        const star = new _star__WEBPACK_IMPORTED_MODULE_1__.Star(canvas.width / 2, canvas.height / 3);

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
                ship.moveHorizontally(-_ship__WEBPACK_IMPORTED_MODULE_0__.SHIP_HORIZONTAL_SPEED);
                break;
            case "ArrowRight":
            case "KeyD":
                ship.moveHorizontally(_ship__WEBPACK_IMPORTED_MODULE_0__.SHIP_HORIZONTAL_SPEED);
                break;
            case "ArrowUp":
            case "KeyW":
                ship.moveVertically(-_ship__WEBPACK_IMPORTED_MODULE_0__.SHIP_VERTICAL_SPEED);
                break;
            case "ArrowDown":
            case "KeyS":
                ship.moveVertically(_ship__WEBPACK_IMPORTED_MODULE_0__.SHIP_VERTICAL_SPEED);
                break;
            case "KeyZ":
                ship.fireShot();
                break;
            default:
                break;
        }
    };

    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_3__.deviceHasTouchScreen)()) {
        window.onwheel = (e) => {
            ship.moveHorizontally(e.deltaX);
            ship.moveVertically(e.deltaY);
        };
    }

    window.onclick = (e) => {
        ship.fireShot(e.clientX, e.clientY);
    };
};

const listenToOrientationChange = (ship) => {
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

const ship = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(canvas.width / 2, (canvas.height / 6) * 5);

bindKeys(ship);

listenToOrientationChange(ship, stars);

window.requestAnimationFrame(() => (0,_loop__WEBPACK_IMPORTED_MODULE_2__.animate)(ship, stars));


/***/ }),

/***/ "./src/loop.js":
/*!*********************!*\
  !*** ./src/loop.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "animateStars": () => (/* binding */ animateStars),
/* harmony export */   "animate": () => (/* binding */ animate)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _star__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./star */ "./src/star.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! . */ "./src/index.js");




const canvas = document.getElementById('stars');
const context = canvas.getContext('2d');

let score = 0;
let gameOver = false;

const showScore = () => {
    context.fillStyle = "white";
    context.textAlign = "left";
    context.font = "24px mono";
    context.fillText("SCORE: " + score, 10, 30);
};

const animateStars = (stars) => {
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];

        if (star.visible) {
            star.draw();
        }
        else if (Math.random() > 0.1) {
            star.visible = true;
        }

        star.move();

        if (star.x > canvas.width - star.size || star.x < star.size
            || star.y > canvas.height - star.size || star.y < star.size) {
            if (star.y > canvas.height - star.size) {
                score++;
            }
            
            stars[i] = new _star__WEBPACK_IMPORTED_MODULE_1__.Star(canvas.width / 2, canvas.height / 3);
            stars[i].move(Math.random() * (canvas.width/6));
        }
        else {
            star.scale();
        }
    }
};

const animateShot = (shot) => {
    shot.y = shot.y - _ship__WEBPACK_IMPORTED_MODULE_0__.SHOT_SPEED;
    
    if (shot.y === 0) {
        shot.hit = true;
    }
    
    shot.draw();
};

const isShipColliding = (star, ship) => {
    return ship.x - star.x < ship.size && ship.x - star.x > -ship.size
        && ship.y - star.y < ship.size / 2 && ship.y - star.y > -ship.size / 2
        && star.visible;
};

const isShotColliding = (star, shot) => {
    return shot.x - star.x < star.size && shot.x - star.x > -star.size
        && shot.y - star.y < star.size && shot.y - star.y > -star.size
        && star.visible;
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

            stars = (0,___WEBPACK_IMPORTED_MODULE_2__.getNewStars)();
            ship.resetSize();
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
        let star = stars[i];
        for (let j = 0; j < shots.length; j++) {
            const shot = shots[j];
            if (isShotColliding(star, shot)) {
                shot.hit = true;
                
                stars[i] = new _star__WEBPACK_IMPORTED_MODULE_1__.Star(canvas.width / 2, canvas.height / 3);
                stars[i].move(Math.random() * (canvas.width/6));
            }
        }
    }
};

const checkCollisions = (stars, ship) => {
    checkShipCollisions(stars, ship);

    checkShotsCollisions(stars, ship.shots);
};

const animate = (ship, stars) => {
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


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SHIP_HORIZONTAL_SPEED": () => (/* binding */ SHIP_HORIZONTAL_SPEED),
/* harmony export */   "SHIP_VERTICAL_SPEED": () => (/* binding */ SHIP_VERTICAL_SPEED),
/* harmony export */   "SHOT_SPEED": () => (/* binding */ SHOT_SPEED),
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
/* harmony import */ var _canvas_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas-object */ "./src/canvas-object.js");


const SHIP_SIZE = 30;
const SHIP_SCALE = 20;
const SHIP_LINE_WIDTH = 1.5;
const SHIP_SKEW_FACTOR = 0.02;
const SHIP_HORIZONTAL_SPEED = 1;
const SHIP_VERTICAL_SPEED = 0.4;

const SHOT_SIZE = 4;
const SHOT_SPEED = 4;

const canvas = document.getElementById('stars');
const context = canvas.getContext('2d');

function Ship(initialX, initialY) {
    _canvas_object__WEBPACK_IMPORTED_MODULE_0__.CanvasObject.call(this, initialX, initialY, SHIP_SIZE, true);

    this.shots = [];
}

Ship.prototype = Object.create(_canvas_object__WEBPACK_IMPORTED_MODULE_0__.CanvasObject.prototype);
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
    _canvas_object__WEBPACK_IMPORTED_MODULE_0__.CanvasObject.call(this, originX, originY, SHOT_SIZE, null);

    this.targetX = targetX;
    this.targetY = targetY;
    this.hit = false;
}

Shot.prototype = Object.create(_canvas_object__WEBPACK_IMPORTED_MODULE_0__.CanvasObject.prototype);
Shot.prototype.constructor = Shot;

Shot.prototype.draw = function () {
    context.beginPath();
    context.ellipse(this.x, this.y, this.size / 2, this.size / 2, 0, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = "grey";
    context.fill();
};


/***/ }),

/***/ "./src/star.js":
/*!*********************!*\
  !*** ./src/star.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MIN_STAR_SIZE": () => (/* binding */ MIN_STAR_SIZE),
/* harmony export */   "MAX_STAR_SIZE": () => (/* binding */ MAX_STAR_SIZE),
/* harmony export */   "Star": () => (/* binding */ Star)
/* harmony export */ });
/* harmony import */ var _canvas_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas-object */ "./src/canvas-object.js");


const MIN_STAR_SIZE = 0.2;
const MAX_STAR_SIZE = 7;
const MAX_INITIAL_STAR_SIZE = MAX_STAR_SIZE / 2;
const BASE_SIZE_SCALE_FACTOR = 0.002;
const BASE_SPEED_SCALE_FACTOR = 0.008;

const canvas = document.getElementById('stars');
const context = canvas.getContext('2d');

function Star(initialX, initialY) {
    const size = Math.random() * (MAX_INITIAL_STAR_SIZE - MIN_STAR_SIZE) + MIN_STAR_SIZE;
    _canvas_object__WEBPACK_IMPORTED_MODULE_0__.CanvasObject.call(this, initialX, initialY, size, false);

    this.initialX = initialX;
    this.initialY = initialY;
    this.vx = Math.min(1, this.size / 2) * (Math.random() - 0.5);
    this.vy = Math.min(1, this.size / 2) * (Math.random() - 0.5);
}

Star.prototype = Object.create(_canvas_object__WEBPACK_IMPORTED_MODULE_0__.CanvasObject.prototype);
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

Star.prototype.draw = function () {
    context.beginPath();
    context.ellipse(this.x, this.y, this.size / 2, this.size / 2, 0, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = "white";
    context.fill();
};


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deviceHasTouchScreen": () => (/* binding */ deviceHasTouchScreen)
/* harmony export */ });
function deviceHasTouchScreen() {
    let hasTouchScreen = false;

    if ("maxTouchPoints" in navigator) {
        hasTouchScreen = navigator.maxTouchPoints > 0;
    }
    else if ("msMaxTouchPoints" in navigator) {
        hasTouchScreen = navigator.msMaxTouchPoints > 0;
    }

    return hasTouchScreen;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map