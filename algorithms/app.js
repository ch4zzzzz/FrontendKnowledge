"use strict";
exports.__esModule = true;
var quickSort_1 = require("./sort/quickSort");
var mergeSort_1 = require("./sort/mergeSort");
var arr;
// 快速排序
arr = getRandomArray();
quickSort_1.quickSort(arr);
console.log("\u5FEB\u901F\u6392\u5E8F\uFF1A" + arr);
// 非递归快速排序
arr = getRandomArray();
quickSort_1.cyclicalQuickSort(arr);
console.log("\u975E\u9012\u5F52\u5FEB\u901F\u6392\u5E8F\uFF1A" + arr);
function getRandomArray(num, min, max) {
    if (num === void 0) { num = 10; }
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 100; }
    var range = max - min;
    var arr = [];
    for (var i = 0; i < num; i++) {
        var rand = Math.random();
        var thisOne = min + Math.round(rand * range);
        arr.push(thisOne);
    }
    return arr;
}
// 归并排序
arr = getRandomArray();
arr = mergeSort_1.mergeSort(arr);
console.log("\u5F52\u5E76\u6392\u5E8F\uFF1A" + arr);
