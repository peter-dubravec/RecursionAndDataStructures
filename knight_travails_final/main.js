import { Board } from "./Board.js";

function knightTravails(startPosition, endPosition) {
  let chessBoard = Board(7, startPosition);

  let legalMoves = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];

  let formTree = chessBoard.formTree(startPosition, endPosition, legalMoves);

  function _findPath(endPosition, tree) {
    if (JSON.stringify(endPosition) == JSON.stringify(tree.startPosition)) {
      let path = [tree.startPosition];
      return path;
    } else {
      for (let child of tree.legalMoves) {
        let result = _findPath(endPosition, child);
        if (result) {
          result.unshift(tree.startPosition);
          return result;
        }
      }
    }
  }

  let foundPath = _findPath(endPosition, formTree);

  function _formatString(arr) {
    console.log(`You made it in ${arr.length - 1} moves! Here is your path:`);
    for (let elem of arr) {
      console.log(`[${elem}]`);
    }
  }

  _formatString(foundPath);
}

knightTravails([0, 0], [7, 7]);
