import {quickSort, cyclicalQuickSort} from "./sort/quickSort"
import {mergeSort} from "./sort/mergeSort"

let arr: Array<number>;

// 快速排序
arr = getRandomArray();
quickSort(arr);
console.log(`快速排序：${arr}`);

// 非递归快速排序
arr = getRandomArray();
cyclicalQuickSort(arr);
console.log(`非递归快速排序：${arr}`);

function getRandomArray (num: number = 10, min: number = 0, max: number = 100) 
    : Array<number> {   
  const range = max - min;
  const arr = [];
  for(let i=0; i<num; i++) {
    const rand = Math.random();
    const thisOne = min + Math.round(rand * range);
    arr.push(thisOne)
  }
  return arr;
}

// 归并排序
arr = getRandomArray();
arr = mergeSort(arr);
console.log(`归并排序：${arr}`);
