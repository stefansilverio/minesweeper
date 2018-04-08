'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = require('./board');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this._board = new _board.Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      this._board.flipTile(rowIndex, columnIndex);

      //If there is a bomb at the flipped location, tell player they lost
      if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
        console.log('Game over! Here was the final board: ');
        this._board.print();
      }
      //Otherwise, if there is not a bomb at the flip location, and game is over, tell player current board
      else if (this._board.hasNonBombEmptySpaces()) {
          console.log('Current board: ');
          this._board.print();
        }
        //If there is not a bomb at the flipped location, and game is not over, tell player they won
        else {
            console.log('Congradulations on winning! Here is your winning board: ');
            this._board.print();
          }
    }
  }]);

  return Game;
}();
