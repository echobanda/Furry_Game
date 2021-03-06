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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Coin = __webpack_require__(2);
var Furry = __webpack_require__(3);
var self;

var Game = function (){
  var self = this;
  this.board = document.querySelectorAll("#board > div");
  this.furry = new Furry();
  this.coin = new Coin ();
  this.score = 0;
  this.index = function(x,y){
    return x + (y * 10);
  };
  this.showFurry = function() {
    this.hideVisibleFurry();
    this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");
  };


   this.hideVisibleFurry = function() {
     for (var i = 0; i < this.board.length; i++) {
       this.board[i].classList.remove("furry");
     }
   };

   this.showCoin = function() {
     this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
   };


   self = this;

   this.moveFurry = function(){
     if (self.furry.direction === "right"){
       self.furry.x++;
     } else if (self.furry.direction === "left"){
       self.furry.x--;
     } else if(self.furry.direction === "up"){
       self.furry.y--;
     }else if(self.furry.direction === "down"){
       self.furry.y++;
      //  dodałem y
     }
     this.gameOver();
     this.checkCoinCollision();
     this.showFurry();
   };

   this.turnFurry = function(event) {
     switch (event.which) {
       case 37:
         self.furry.direction = "left";
         break;
       case 38:
         self.furry.direction = "up";
         break;
       case 39:
         self.furry.direction = "right";
         break;
       case 40:
         self.furry.direction = "down";
         break;
     }
   };

   this.checkCoinCollision = function() {
     if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
       console.log("Booom!");
       this.board[this.index(this.coin.x, this.coin.y)].classList.remove("coin");
       this.score = this.score + 1;
      //  tu zmieniłem zapis
       document.querySelector("strong").innerHTML = this.score;
       this.coin = new Coin();
       this.showCoin();
     }
};

   this.gameOver = function() {
     if (this.furry.x <0 ||  this.furry.y <0 || this.furry.x > 9 || this.furry.y > 9 ) {
       clearInterval(this.idSetInterval);
      //  document.querySelector("#board").classList.toggle("invisible");
      //  console.log("Nooooooooooo!");
      //  document.querySelector("#over").classList.toggle("invisible");
      //  this.hideVisibleFurry();
      // u nie też to nie działało i się z tym migającym ekranem męczyłem więc zrobiłem jak poniżej
      clearInterval(this.idSetInterval);
      var text = document.querySelector("#board");
      text.innerHTML = "buuuuuuuuuuuuuuum";
     }
   }

   this.startGame = function() {
     this.showFurry();
     this.showCoin();
     var self = this;
     this.idSetinterval = setInterval(function() {
       self.moveFurry();
     }, 255);

   };

}


 module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

document.addEventListener("DOMContentLoaded", function() {


var Game = __webpack_require__(0);

var game = new Game();
document.addEventListener('keydown', function(event) {
   game.turnFurry(event);
 });
 game.startGame();

});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var Coin = function() {
  this.x = Math.floor(Math.random() * 10);
  this.y = Math.floor(Math.random() * 10);
};


module.exports = Coin;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var Furry = function() {
  this.x = 0;
  this.y = 0;
  this.direction = "right", "left", "down", "up";

};

module.exports = Furry;


/***/ })
/******/ ]);