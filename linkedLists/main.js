function NodeFactory(value) {
  let pointsTo = null;
  return { value, pointsTo };
}

function LinkedListFactory() {
  let headNode = false;

  function _findLastRec(headNode) {
    if (headNode.pointsTo == null) {
      return headNode;
    }
    return _findLastRec(headNode.pointsTo);
  }

  function _findSize(headNode) {
    if (headNode.pointsTo == null) {
      return 1;
    }
    let i = 1;
    return i + _findSize(headNode.pointsTo);
  }

  function _getLastNode(headNode) {
    if (headNode.pointsTo == null) {
      return headNode.value;
    }

    return _getLastNode(headNode.pointsTo);
  }

  function _getNodeAt(headNode, index, i = 0) {
    if (i == index) {
      return headNode.value;
    }

    return _getNodeAt(headNode.pointsTo, index, i + 1);
  }

  function _popLast(headNode, size, index = 1) {
    if (index == size) {
      headNode.pointsTo = null;
      return;
    }

    return _popLast(headNode.pointsTo, size, index + 1);
  }

  function _checkIfContains(headNode, value) {
    if (headNode.value == value) {
      return true;
    }

    if (headNode.pointsTo == null) {
      return false;
    }

    return _checkIfContains(headNode.pointsTo, value);
  }

  function _findIndex(headNode, value, index = 0) {
    if (headNode.value == value) {
      return index;
    }

    if (headNode.pointsTo == null) {
      return null;
    }

    return _findIndex(headNode.pointsTo, value, index + 1);
  }

  function _toString(headNode) {
    let arr = [];
    if (headNode.pointsTo == null) {
      arr.push(headNode.value);

      return arr;
    }
    arr.push(headNode.value);
    return arr.concat(_toString(headNode.pointsTo));
  }

  function _insertAt(headNode, value, index, i = 1) {
    if (index == i) {
      let temp = headNode.pointsTo;
      let newNode = NodeFactory(value);
      headNode.pointsTo = newNode;
      newNode.pointsTo = temp;
      return;
    }

    return _insertAt(headNode.pointsTo, value, index, i + 1);
  }

  let append = (value) => {
    if (headNode == false) {
      headNode = NodeFactory(value);
      return;
    }

    let lastNode = _findLastRec(headNode);
    lastNode.pointsTo = NodeFactory(value);
  };

  let prepend = (value) => {
    let temp = headNode;
    headNode = NodeFactory(value);
    headNode.pointsTo = temp;
  };

  let size = () => {
    let size = _findSize(headNode);
    return size;
  };

  let showLinkedList = () => headNode;

  let getNodeAt = (index) => _getNodeAt(headNode, index);

  let getheadNode = () => headNode.value;

  let getLastNode = () => _getLastNode(headNode);

  let pop = () => {
    let size = _findSize(headNode) - 1;
    _popLast(headNode, size);
  };

  let contains = (value) => {
    return _checkIfContains(headNode, value);
  };

  let find = (value) => {
    return _findIndex(headNode, value);
  };

  let toString = () => {
    let temp = _toString(headNode);
    let string =
      temp.map((elem) => "( " + elem + " )" + " =>").join(" ") + " null";
    return string;
  };

  let insertAt = (value, index) => {
    _insertAt(headNode, value, index);
  };

  return {
    append,
    prepend,
    size,
    getheadNode,
    getLastNode,
    getNodeAt,
    pop,
    showLinkedList,
    contains,
    find,
    toString,
    insertAt,
  };
}


let myLinkedList = LinkedListFactory();
console.log(myLinkedList.append(2));
console.log(myLinkedList.append(3));

console.log(myLinkedList.prepend(19));
console.log(myLinkedList.size());

console.log(myLinkedList.getheadNode());
console.log(myLinkedList.getLastNode());
console.log(myLinkedList.getNodeAt(0));
console.log(myLinkedList.showLinkedList());
console.log(myLinkedList.insertAt(5, 3));
console.log(myLinkedList.showLinkedList());
console.log(myLinkedList.contains(19));
console.log(myLinkedList.toString());
console.log(myLinkedList.find(3));
console.log(myLinkedList.pop());
console.log(myLinkedList.showLinkedList());
// function findLastRec(list) {
//   if (list.pointsTo == null) {
//     list.pointsTo = NodeFactory(10);
//     return;
//   }
//   return findLastRec(list.pointsTo);
// }

// findLastRec(myLinkedList.headNode.pointsTo);
