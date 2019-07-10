"use strict";
exports.__esModule = true;
function mergeSort(arr) {
    var len = arr.length;
    if (len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2), left = arr.slice(0, middle), right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
exports.mergeSort = mergeSort;
function merge(left, right) {
    var ret = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            ret.push(left.shift());
        }
        else {
            ret.push(right.shift());
        }
    }
    if (left.length) {
        ret.push.apply(ret, left);
    }
    if (right.length) {
        ret.push.apply(ret, right);
    }
    return ret;
}
// 循环版归并排序
function cyclicalMergeSort(arr) {
    var len = arr.length;
    if (len <= 1) {
        return;
    }
    if (len === 2 || len === 3) {
        if (len === 2) {
            if (arr[0] > arr[1]) {
                var tmp = arr[0];
                arr[0] = arr[1];
                arr[1] = tmp;
            }
        }
        else {
            if (arr[0] > arr[1]) {
                var tmp = arr[0];
                arr[0] = arr[1];
                arr[1] = tmp;
            }
            if (arr[2] <= arr[0]) {
                var tmp = arr[0];
                arr[0] = arr[2];
                arr[2] = arr[1];
                arr[1] = tmp;
            }
            else if (arr[2] < arr[1]) {
                var tmp = arr[1];
                arr[1] = arr[2];
                arr[2] = tmp;
            }
        }
        return;
    }
    var waitingStack = [];
    var i = 1;
    for (; i < len; i += 2) {
        if (arr[i] > arr[i + 1]) {
            var tmp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = tmp;
        }
        waitingStack.push([i, i + 1]);
    }
    if (i === len) {
        waitingStack.push([len - 1, len - 1]);
    }
    while (waitingStack.length) {
    }
}
exports.cyclicalMergeSort = cyclicalMergeSort;
