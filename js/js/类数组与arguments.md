# 类数组与arguments

## 类数组

类数组对象是一个有一个 length 属性和若干索引属性的对象

```javascript
const arr = {
  '0': 0,
  '1': 1,
  '2': 'man',
  length: 3,
}
```

### 读写、遍历与长度

```javascript 
console.log(arr[0]); // 0
arr[0] = 5; 
console.log(arr.length) // 3
for (let i=0, len=arr.length; i<len; i++) {
    console.log(arr[i])
}
```

### 调用数组方法

类数组对象无法直接调用数组方法，但可以通过`Function.prototype.call`来调用

```javascript
const arr = {
  '0': 0,
  '1': 1,
  '2': 'man',
  length: 3,
}
console.log(Array.prototype.push.call(arr, 0))
// 4
console.log(Array.prototype.concat.call(arr, 1))
// [ 0, 1, 'man', 0, 1 ]
console.log(Array.prototype.map.call(arr, item => item+"!"))
// [ '0!', '1!', 'man!', '0!' ]
```

### 转化为数组

使用`Array.prototype`上的slice、splice、concat方法

```javascript
var arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 }
// 1. slice
Array.prototype.slice.call(arrayLike); // ["name", "age", "sex"] 
// 2. splice
Array.prototype.splice.call(arrayLike, 0); // ["name", "age", "sex"] 
// 3. ES6 Array.from
Array.from(arrayLike); // ["name", "age", "sex"] 
// 4. apply
Array.prototype.concat.apply([], arrayLike) // ["name", "age", "sex"] 
```

在设置了`arrayLike[Symbol.isConcatSpreadable] = true`，后

```javascript
Array.prototype.concat.call([], arrayLike) // ["name", "age", "sex"] 
Array.prototype.concat.apply([], arrayLike) // ["name", "age", "sex"]
```

## arguments

Arguments 对象只定义在函数体中，包括了函数的参数和其他属性。在函数体中，arguments 指代该函数的 Arguments 对象。

除了索引属性和length外，还有一个**callee**属性，通过它可以引用函数自身

```
var data = [];

for (var i = 0; i < 3; i++) {
    (data[i] = function () {
       console.log(arguments.callee.i) 
    }).i = i;
}

data[0]();
data[1]();
data[2]();
```

## 参考资料

https://github.com/mqyqingfeng/Blog/issues/14

