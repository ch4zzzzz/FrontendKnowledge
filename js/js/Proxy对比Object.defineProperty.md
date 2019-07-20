# Proxy对比Object. defineProperty

## 数组

### Object. defineProperty

```javascript
const vm = {data: {arr: [1, 2, 3, 4]}};
let arr = vm.data.arr;
Object.defineProperty(vm, 'arr', {
    set: (newVal) => {console.log(newVal);return arr = newVal},
    get: () => arr
})

for(const i in arr) {
	let val = vm.data.arr[i]
    Object.defineProperty(vm.arr, i, {
        set: (newVal) => {console.log(newVal);return val = newVal},
        get: () => {return val}
    })
}
```

以下情况无法触发set

* 利用索引直接设置一个新的项时，例如`vm.arr[4] = 5`

  ```javascript
  vm.arr[0]= 3
  // logs: 3
  
  vm.arr[4] = 5
  // logs nothing.
  ```

* 修改数组的长度时

  ```javascript
  vm.arr.length = 2
  // logs nothing.
  ```

* 使用`push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`等方法时

  ```javascript
  vm.arr.push(4)
  // logs nothing.
  ```

### Proxy

```javascript
const vm = {data: {arr: [1, 2, 3, 4]}};
const arr = vm.data.arr;
vm.arr = new Proxy(vm.data.arr, {
    get: (target, key, receiver) => Reflect.get(target, key, receiver),
    set: (target, key, value, receiver) => {
        console.log(target, key, value, receiver);
        if(Reflect.set(target, key, value, receiver)) {
            return true;
        }
    }
})
```

* 无需对子元素也创建代理，即可在修改值时触发set

  ```javascript
  vm.arr[0] = 3
  // logs: [1, 2, 3, 4, 5] "0" 3 Proxy {0: 1, 1: 2, 2: 3, 3: 4, 4: 5}
  ```

* 解决了Object. defineProperty无法触发set的情况

  ```javascript
  vm.arr.push(5)
  /* logs:
  	[1, 2, 3, 4] "4" 5 Proxy {0: 1, 1: 2, 2: 3, 3: 4}
  	[1, 2, 3, 4, 5] "length" 5 Proxy {0: 1, 1: 2, 2: 3, 3: 4, 4: 5}
  */
  
  vm.arr[8] = 9
  // logs: [1, 2, 3, 4, 5] "8" 9 Proxy {0: 1, 1: 2, 2: 3, 3: 4, 4: 5}
  vm.arr
  // Proxy {0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 8: 9}
  ```

  