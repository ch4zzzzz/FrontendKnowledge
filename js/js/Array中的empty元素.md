# Array中的empty元素

数组中，有时会有empty元素

```javascript
const arr = ['1', '2'];
arr[3] = '4';
console.log(arr);
// logs: ['1', '2', empty, '4']
```

## empty元素的性质

* 直接访问时，会被当做undefined

  ```javascript
  console.log(arr[2]); // undefined
  arr[2] === undefined // true
  ```

* 会被reduce、filter等方法忽略

  ```javascript
  arr[4] = undefined;
  arr[5] = undefined;
  console.log(arr);
  // logs: ['1', '2', empty, '4', undefined, undefined]
  
  arr.reduce((a, b) => a+b);
  // logs: "124undefinedundefined"
  arr.filter(item => item===undefined);
  // logs: [undefined, undefined]
  arr.map(item => '0');
  // logs: ["0", "0", empty, "0", "0", "0"]
  ```

* 使用for...in时的表现

  ```javascript
  console.log(arr);
  // logs: [1, 2, 3, empty × 2]
  for (i in arr) {
      console.log(arr[i])
  }
  // logs:
  // 1
  // 2
  // 3
  ```

* 使用for...of时的表现

  ```javascript
  for (i of arr) {
      console.log(i)
  }
  // logs:
  // 1
  // 2
  // 3
  // undefined
  // undefined
  ```

## 如何产生empty元素？

* 直接拉长数组长度

  ```javascript
  let arr = new Array(5);
  console.log(arr);
  // logs: [empty × 5]
  
  arr = [1, 2, 3];
  arr.length = 5;
  console.log(arr);
  // logs: [1, 2, 3, empty × 2]
  
  arr = [1, 2, 3];
  arr[4] = 5;
  console.log(arr);
  // logs: [1, 2, 3, empty × 2]
  ```

* 删除元素

  ```javascript
  let arr = [1, 2, 3];
  delete arr[0];
  console.log(arr);
  // logs: [empty, 2, 3]
  ```

## 个人理解

empty元素是一个标识，直接访问它会返回undefined，但是在数组中它是一个没有显式定义的值，代表这个属性没有显式定义。因此使用Array.prototype上的一些方法和for...in时，会忽略empty元素。