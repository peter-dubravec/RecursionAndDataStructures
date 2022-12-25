function merge(arr_left, arr_right) {
  let sortedArr = []; //
  console.log(arr_left);
  console.log(arr_right);
  let j = 0;
  while (arr_left.length > 0 && arr_right.length > 0) {
    if (arr_left[0] < arr_right[0]) {
      sortedArr[j++] = arr_left.shift();
    } else {
      sortedArr[j++] = arr_right.shift();
    }
  }

  if (arr_left.length != 0) {
    return sortedArr.concat(arr_left);
  } else if (arr_right.length != 0) {
    return sortedArr.concat(arr_right);
  }

  return sortedArr;
}

function mergeRec(arr) {
  if (arr.length == 1) {
    return arr;
  }

  let mid = arr.length / 2;
  let leftArr = arr.slice(0, mid);
  let rightArr = arr.slice(mid, arr.length);

  return merge(mergeRec(leftArr), mergeRec(rightArr));
}
console.log(mergeRec([2, 1, 4, 3]));
