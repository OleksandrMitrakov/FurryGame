/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(/*! ./game.js */ "./js/game.js");

var game = new Game();
document.addEventListener('keydown', function (event) {
    game.turnFurry(event);
});

game.showFurry();
game.showCoin();
game.startGame();

/***/ }),

/***/ "./js/coin.js":
/*!********************!*\
  !*** ./js/coin.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

module.exports = Coin;

/***/ }),

/***/ "./js/furry.js":
/*!*********************!*\
  !*** ./js/furry.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = 'right';
}

module.exports = Furry;

/***/ }),

/***/ "./js/game.js":
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Coin = __webpack_require__(/*! ./coin.js */ "./js/coin.js");
var Furry = __webpack_require__(/*! ./furry.js */ "./js/furry.js");

function Game() {
    this.board = document.querySelectorAll('#board div');
    this.scoreCounter = document.querySelector('#score strong');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function (x, y) {
        return x + (y * 10);
    }
}

Game.prototype.showFurry = function () {
    this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
}

Game.prototype.showCoin = function () {
    this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
}

Game.prototype.removeCoin = function () {
    this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
}

Game.prototype.startGame = function () {
    var self = this;
    this.idSetInterval = setInterval(function () {
        self.moveFurry();
    }, 250);
}

Game.prototype.moveFurry = function () {
    movement: {
        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        }
        else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y + 1;
        }
        else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y - 1;
        }

        if (this.gameOver()) {
            break movement;
        }
        this.hideVisibleFurry();
        this.checkCoinCollision();
        this.showFurry();
    }
}

Game.prototype.hideVisibleFurry = function () {
    var element = document.querySelector('div.furry');
    if (element) {
        element.classList.remove('furry');
    }
}

Game.prototype.turnFurry = function (event) {
    switch (event.which) {
        case 37:
            this.furry.direction = 'left';
            break;
        case 39:
            this.furry.direction = 'right';
            break;
        case 40:
            this.furry.direction = 'up';
            break;
        case 38:
            this.furry.direction = 'down';
            break;
    }
}

Game.prototype.checkCoinCollision = function () {
    if ((this.furry.x === this.coin.x) && (this.furry.y === this.coin.y)) {
        this.removeCoin();
        this.score++;
        this.scoreCounter.textContent = this.score;
        this.coin = new Coin();
        this.showCoin();
    }
}

Game.prototype.gameOver = function () {
    if (this.furry.x < 0 || this.furry.x > 9) {
        clearInterval(this.idSetInterval);
        this.hideVisibleFurry();
        alert(`                Game Over. 
        You've got: ${this.score} coin(s)`)
        return true

    }
    if (this.furry.y < 0 || this.furry.y > 9) {
        clearInterval(this.idSetInterval);
        this.hideVisibleFurry();
        alert(`                Game Over. 
        You've got: ${this.score} coin(s)`)
        return true
    }
    return false
}


module.exports = Game;


/***/ }),

/***/ 0:
/*!*************************!*\
  !*** multi ./js/app.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./js/app.js */"./js/app.js");


/***/ })

/******/ });
//# sourceMappingURL=out.js.map