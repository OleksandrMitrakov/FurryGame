var Coin = require('./coin.js');
var Furry = require('./furry.js');

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
