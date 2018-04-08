'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfEmptySpaces = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'hasNonBombEmptySpaces',
    value: function hasNonBombEmptySpaces() {
      return this._numberOfBombs !== this.numberOfEmptySpaces;
    }
  }, {
    key: 'getNumberOfSurroundingBombs',
    value: function getNumberOfSurroundingBombs(rowIndex, columnIndex) {
      var _this = this;

      var offsets = [[-1, 1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, -1], [0, 1], [1, 1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      var numberOfSurroundingBombs = 0;
      offsets.forEach(function (offsets) {
        var neighborRowIndex = rowIndex + offsets[0]; //this gives you your neighboring tiles
        var neighborColumnIndex = columnIndex + offsets[1]; //these are the tiles you need to check
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            ++numberOfSurroundingBombs;
          }
        }
      });
      return numberOfSurroundingBombs;
    }
  }, {
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
      //check if tile has already been flipped, if so, return
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log("This tile has already been flipped!");
        return;
      }
      this.numberOfEmptySpaces--;
      //check if tile is bomb, if so, place on player board
      if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfSurroundingBombs(rowIndex, columnIndex);
        //if tile not bomb, place number of bombs surrounding tile on player board
      }
    }
  }, {
    key: 'print',
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        var row = [];
        for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
          row.push(' ');
        }
        board.push(row); //adds row to end of our board array
      }
      return board;
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];
      for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        var row = [];
        for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
          row.push(null);
        }
        board.push(row); //adds row to end of our board array
      }
      var numberOfBombsPlaced = 0; //want to knowhow many bombs we've placed
      while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          //if if statement is false than block isnt executed
          board[randomRowIndex][randomColumnIndex] = 'B'; //populating board array with desired variable
          numberOfBombsPlaced++;
        }
      }
      return board;
    }
  }]);

  return Board;
}();