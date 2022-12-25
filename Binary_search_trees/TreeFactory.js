import { NodeFactory } from "/nodeFactory.js";

function TreeFactory() {
  let node;

  let getNode = () => {
    return node;
  };

  function _buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }

    let mid = parseInt((start + end) / 2);
    let node = NodeFactory(arr[mid]);

    node.left = _buildTree(arr, start, mid - 1);
    node.right = _buildTree(arr, mid + 1, end);

    return node;
  }

  function _insertValue(node, value) {
    if (node.value == value) {
      return;
    }

    if (node.left == null && value < node.value) {
      node.left = value;
      return;
    }

    if (node.right == null && value > node.value) {
      let newNode = NodeFactory(value);
      node.right = newNode;
      return;
    }

    return value < node.value
      ? _insertValue(node.left, value)
      : _insertValue(node.right, value);
  }

  function _findSmallest(node) {
    while (node.left != null) {
      let result = _findSmallest(node.left);
      node.left = null;
      return result;
    }
    return node;
  }

  function _deleteValue(node, value, prevNode) {
    if (node == null) {
      return;
    }

    // case for leafe node
    if (node.value == value) {
      if (node.left == null && node.right == null) {
        if (prevNode.right.value == value) {
          prevNode.right = null;
          return;
        } else {
          prevNode.left = null;
          return;
        }
      }

      // case for only one child

      if (node.right != null && node.left == null) {
        prevNode.right = node.right;
        return;
      }

      if (node.right == null && node.left != null) {
        prevNode.left = node.left;
        return;
      }

      // case of 2 children

      if (node.right != null && node.left != null) {
        let smallestVal = _findSmallest(node.right);
        smallestVal.left = node.left;
        smallestVal.right = smallestVal.right || null;
        if (prevNode == undefined) {
          node.value = smallestVal.value;
          return;
        }
        if (prevNode.left.value == value) {
          prevNode.left = smallestVal;
        } else {
          prevNode.right = smallestVal;
        }
        return;
      }
    }

    if (value < node.value) {
      return _deleteValue(node.left, value, node);
    } else {
      return _deleteValue(node.right, value, node);
    }
  }

  function _findValue(node, value) {
    if (node == null) {
      throw new Error("Value not found in binary tree");
    }
    if (node.value == value) {
      return node;
    }

    if (value < node.value) {
      return _findValue(node.left, value);
    } else {
      return _findValue(node.right, value);
    }
  }

  function _levelOrder(root, cb) {
    let queue = [root];
    let visited = [];
    while (queue.length > 0) {
      let nowTurn = queue.shift();
      if (cb) {
        cb(nowTurn.value);
      } else {
        visited.push(nowTurn.value);
      }

      for (let property in nowTurn) {
        if (property != "value" && nowTurn[property] != null) {
          queue.push(nowTurn[property]);
        }
      }
    }
    if (visited.length > 0) return visited;
  }

  function _preOrder(node, arr = [], cb) {
    if (node == null) {
      return;
    }
    if (cb) {
      cb(node.value);
    } else arr.push(node.value);

    _preOrder(node.left, arr, cb);
    _preOrder(node.right, arr, cb);

    if (arr.length > 0) return arr;
  }

  function _inOrder(node, arr, visited, cb) {
    if (node == null) {
      return;
    }

    visited.push(node.value);

    _inOrder(node.left, arr, visited, cb);

    if (visited.includes(node.value)) {
      if (cb) {
        cb(node.value);
      } else {
        arr.push(node.value);
      }
    }

    _inOrder(node.right, arr, visited, cb);
    if (arr.length > 0) return arr;
  }

  function _height(node, max_depth = 0) {
    if (node == null) {
      return;
    }

    if (node.left == null && node.right == null) {
      return max_depth;
    }

    return _height(node.left, max_depth + 1) >
      _height(node.right, max_depth + 1)
      ? _height(node.left, max_depth + 1)
      : _height(node.right, max_depth + 1);
  }

  function _depth(node, selected_node, depth = 0) {
    if (node == null) {
      return;
    }
    if (selected_node.value == node.value) {
      return depth;
    }

    if (selected_node.value > node.value) {
      return _depth(node.right, selected_node, depth + 1);
    } else {
      return _depth(node.left, selected_node, depth + 1);
    }
  }

  let root = (array) => {
    let sortedArray = array.sort((a, b) => parseInt(a) - parseInt(b));
    sortedArray;
    let arr = [...new Set(sortedArray)]; // remove duplicates
    let start = 0;
    let end = arr.length - 1;
    node = _buildTree(arr, start, end);
    return node;
  };

  let insert = (value) => {
    _insertValue(node, value);
  };

  let deleteVal = (value) => {
    _deleteValue(node, value);
  };

  let find = (value) => {
    let temp = _findValue(node, value);
    return temp;
  };

  let levelOrder = (cb) => {
    cb;
    return _levelOrder(node, cb);
  };

  let preOrder = (cb) => {
    let arr = [];
    return _preOrder(node, arr, cb);
    // return myFunction(node);
  };

  let inOrder = (cb) => {
    let visited = [];
    let arr = [];
    return _inOrder(node, arr, visited, cb);
  };

  let postOrder = (cb) => {
    let visited = [];
    let arr = [];
    let inOrder = _inOrder(node, arr, visited, cb);

    if (!cb) {
      let temp = inOrder.splice(inOrder.indexOf(node.value), 1);
      inOrder.push(temp[0]);
      let postOrder = inOrder;
      return postOrder;
    }
  };

  let height = (node) => {
    return _height(node);
  };

  let depth = (selected_node) => {
    return _depth(node, selected_node);
  };

  let isBalanced = () => {
    let heightLeft = parseInt(height(node.left));
    let heightRight = parseInt(height(node.right));
    let result = heightLeft - heightRight;
    let required = [-1, 0, 1];
    return required.indexOf(result) == -1 ? false : true;
  };

  let rebalance = () => {
    let values = inOrder();
    values;
    node = root(values);
    return node;
  };

  return {
    root,
    getNode,
    insert,
    deleteVal,
    find,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

export { TreeFactory };
