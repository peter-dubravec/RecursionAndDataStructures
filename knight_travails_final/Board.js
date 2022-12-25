function Board(size, startPosition) {
  let visited = [startPosition];
  let queue = [];
  let origObj = { startPosition: [startPosition] };

  function _whichSquare(arr, obj) {
    if (JSON.stringify(obj.startPosition) == JSON.stringify(arr)) {
      return obj;
    }

    if (obj.legalMoves == undefined) return;

    for (let i = 0; i < obj.legalMoves.length; i++) {
      let result = _whichSquare(arr, obj.legalMoves[i]);
      if (result) {
        return result;
      }
    }
  }

  function formTree(startPosition, endPosition, moves, myObj = origObj) {
    if (JSON.stringify(startPosition) == JSON.stringify(endPosition)) {
      return true;
    }

    let legalMoves = [];

    for (let i = 0; i < moves.length; i++) {
      let xValue = parseInt(startPosition[0]) + parseInt(moves[i][0]);
      let yValue = parseInt(startPosition[1]) + parseInt(moves[i][1]);

      if (!visited.some((elem) => elem[0] == xValue && elem[1] == yValue)) {
        if (xValue <= size && xValue >= 0 && yValue <= size && yValue >= 0) {
          queue.push([xValue, yValue]);
          visited.push([xValue, yValue]);
          legalMoves.push({ startPosition: [xValue, yValue] });
        }
      }
    }

    myObj.legalMoves = legalMoves;

    while (queue.length > 0) {
      let value = queue.shift();
      let squareThatContainsVal = _whichSquare(value, origObj);
      formTree(value, endPosition, moves, squareThatContainsVal);
    }

    return myObj;
  }

  return { formTree };
}

export { Board };
