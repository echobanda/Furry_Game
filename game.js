var Coin = require("./coin.js");
var Furry = require("./furry.js");
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
