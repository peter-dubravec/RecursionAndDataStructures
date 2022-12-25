import { TreeFactory } from "/TreeFactory.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node == undefined) return null;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function printValues(binaryTree) {
  console.log(`Is balanced: ${binaryTree.isBalanced()}`);
  console.log(`Elements in level order: ${binaryTree.levelOrder()}`);
  console.log(`Elements in pre order: ${binaryTree.preOrder()}`);
  console.log(`Elements in post order: ${binaryTree.postOrder()}`);
  console.log(`Elements in order: ${binaryTree.inOrder()}`);
  prettyPrint(binaryTree.getNode());
}

let arr = [];

for (let i = 0; i < 10; i++) {
  arr[i] = Math.round(Math.random() * 100);
}
arr;

let binaryTree = TreeFactory();
binaryTree.root(arr);

printValues(binaryTree);
console.log("\n --------------------------- \n \n");

binaryTree.insert(200);
binaryTree.insert(204);
binaryTree.insert(206);
binaryTree.insert(245);
binaryTree.insert(248);
printValues(binaryTree);

console.log("\n --------------------------- \n \n");
console.log("Balancing previous tree.");
binaryTree.rebalance();
printValues(binaryTree);
