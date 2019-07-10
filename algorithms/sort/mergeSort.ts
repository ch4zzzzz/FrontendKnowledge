export function mergeSort (arr: Array<any>) {
    const len = arr.length;
    if(len < 2) {
        return arr;
    }
    const middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge (left: Array<any>, right: Array<any>): Array<any> {
  const ret: Array<any> = [];
  while (left.length && right.length) {
    if(left[0] <= right[0]) {
      ret.push(left.shift());
    } else {
      ret.push(right.shift());
    }
  }

  if (left.length) {
    ret.push(...left);
  }

  if (right.length) {
    ret.push(...right);
  }
  return ret;
}

// 循环版归并排序
export function cyclicalMergeSort (arr: Array<any>) {
  const len = arr.length;
  if(len <= 1) {
    return;
  }
  if(len === 2 || len === 3) {
    if(len === 2) {
      if(arr[0] > arr[1]) {
        const tmp = arr[0];
        arr[0] = arr[1];
        arr[1] = tmp;
      }
    } else {
      if(arr[0] > arr[1]) {
        const tmp = arr[0];
        arr[0] = arr[1];
        arr[1] = tmp;
      }
      if(arr[2] <= arr[0]) {
        const tmp = arr[0];
        arr[0] = arr[2];
        arr[2] = arr[1];
        arr[1] = tmp;
      } else if(arr[2] < arr[1]) {
        const tmp = arr[1];
        arr[1] = arr[2];
        arr[2] = tmp;
      }
    }
    return;
  }
  const waitingStack: Array<Array<number>> = [];
  let i = 1;
  for (; i<len; i+=2) {
    if(arr[i] > arr[i+1]) {
      const tmp = arr[i];
      arr[i] = arr[i+1];
      arr[i+1] = tmp;
    }
    waitingStack.push([i, i+1]);
  }
  if(i===len) {
    waitingStack.push([len-1, len-1]);
  }
  while (waitingStack.length) {

  }

}