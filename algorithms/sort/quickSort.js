"use strict";
exports.__esModule = true;
function quickSort(arr, begin, end) {
    if (begin === void 0) { begin = 0; }
    if (end === void 0) { end = arr.length - 1; }
    if (begin >= end) {
        return;
    }
    var base = arr[begin];
    var i = begin;
    for (var j = begin + 1; j <= end; j++) {
        if (arr[j] < base) {
            i++;
            var tmp = arr[j];
            arr[j] = arr[i];
            arr[i] = tmp;
        }
    }
    arr[begin] = arr[i];
    arr[i] = base;
    quickSort(arr, begin, i - 1);
    quickSort(arr, i + 1, end);
    return;
}
exports.quickSort = quickSort;
// 循环版本的快速排序
function cyclicalQuickSort(arr, begin, end) {
    if (begin === void 0) { begin = 0; }
    if (end === void 0) { end = arr.length - 1; }
    if (begin >= end) {
        return;
    }
    var waitingStack = [[begin, end]];
    while (waitingStack.length) {
        var thisArr = waitingStack.shift();
        var begin_1 = thisArr[0];
        var end_1 = thisArr[1];
        if (begin_1 >= end_1) {
            continue;
        }
        var i = begin_1;
        var base = arr[begin_1];
        for (var j = begin_1 + 1; j <= end_1; j++) {
            if (arr[j] < base) {
                i++;
                var tmp = arr[j];
                arr[j] = arr[i];
                arr[i] = tmp;
            }
        }
        arr[begin_1] = arr[i];
        arr[i] = base;
        waitingStack.push([begin_1, i - 1], [i + 1, end_1]);
    }
    return;
}
exports.cyclicalQuickSort = cyclicalQuickSort;
