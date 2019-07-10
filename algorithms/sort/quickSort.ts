export function quickSort (
  arr: Array<any>,
  begin: number = 0,
  end: number = arr.length-1
) {
  if(begin >= end) {
    return;
  }
  const base: any = arr[begin];
  let i: number = begin;
  for(let j: number = begin+1;
      j <= end; j++) {
    if(arr[j] < base) {
      i++;
      const tmp = arr[j];
      arr[j] = arr[i];
      arr[i] = tmp;
    }
  }
  arr[begin] = arr[i];
  arr[i] = base;
  quickSort(arr, begin, i-1);
  quickSort(arr, i+1, end);
  return;
}

// 循环版本的快速排序
export function cyclicalQuickSort (
  arr: Array<any>,
  begin: number = 0,
  end: number = arr.length-1
) {
  if(begin >= end) {
    return;
  }
  const waitingStack: Array<Array<number>> = [[begin, end]];
  while(waitingStack.length) {
    let thisArr = waitingStack.shift();
    let begin = thisArr[0];
    let end = thisArr[1];
    if(begin >= end) {
      continue;
    }
    let i = begin;
    let base = arr[begin];
    for(let j=begin+1; j<=end; j++) {
      if(arr[j] < base) {
        i++;
        const tmp = arr[j];
        arr[j] = arr[i];
        arr[i] = tmp;
      }
    }
    arr[begin] = arr[i];
    arr[i] = base;
    waitingStack.push([begin, i-1], [i+1, end])
  }
  return;
}