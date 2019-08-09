# `Promise`

一个`Promise`对象，代表了异步操作的最终完成或失败，是一个绑定了回调的对象而非将回调传入函数内部。

`Promise`用以处理多个相互关联的异步请求，解决回调地狱。

```javascript
import axios from 'axios';
axios.get(url).then(data => {
   console.log(data)
})
```

## 创建`Promise`

```javascript
// 语法
const promise = new Promise((resolve, reject) => {
  // 异步处理
  // 处理结束后、调用resolve 或 reject
});

// 示例
const promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('foo');
  }, 300);
});

```

## 使用`Promise`

支持链式调用，`resolve`时调用`onFulfilled`，`reject`时调用`onRejected`。

```javascript
// 语法
promise.then(onFulfilled, onRejected);

// 示例
promise1.then(function(value) {
  console.log(value);
  // expected output: "foo"
});
```

应用`Promise`时的约定：

* 本轮事件循环运行完成之前，回调不会被调用

* `.then()`形式添加的回调函数总会被调用，即便是在异步操作完成之后才被添加的

* 多次调用`.then()`添加的多个回调，会按照插入顺序独立运行

  ```javascript
  const p = Promise.resolve(0);
  p.then(res => {
      console.log(res);
  })
  p.then(res => {
      console.log(res+1)
  })
  p.then(res => {
      console.log(res+2)
  })
  // logs: 0, 1, 2
  ```

  

## `catch()`

很可能会在一个回调失败之后继续使用链式操作，即，使用一个`catch`，这对于在链式操作中抛出一个失败之后，再次开启新的操作很有用。`catch`会捕捉在它之前的链式操作中的回调失败。

```javascript
new Promise((resolve, reject) => {
    console.log('Initial');

    resolve();
})
.then(() => {
    throw new Error('Something failed');
        
    console.log('Do this');
})
.catch(() => {
    console.log('Do that');
})
.then(() => {
    console.log('Do this whatever happened before');
});
```

##  静态方法

### `resolve()`和`reject()`

`Promise.resolve()`和`Promise.rejected()`返回一个`fulfilled`状态或`rejected`状态的`Promise`对象。

### `all()`	

`Promise.all(iterable)`接收一个`Promise`对象`iterable`作为参数，等全部操作结束后进行下一步操作

```javascript
Promise.all([func1(), func2(), func3()])
.then(([result1, result2, result3]) => { /* use result1, result2 and result3 */ });
```

参数中所有`Promise`都完成或参数不包含`Promise`时回调完成并返回一个包含resolve的值的数组，当有一个`Promise`失败时，此实例回调失败，失败原因是第一个失败`Promise`的结果。

### `race()`

`Promise.race(iterable)`方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。

```javascript
var p1 = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 500, "one"); 
});
var p2 = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 100, "two"); 
});

Promise.race([p1, p2]).then(function(value) {
  console.log(value); // "two"
  // 两个都完成，但 p2 更快
});
```

## 实现一个Promise

实现了then方法

```typescript
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  _status: string;
  _value: any;
  _fulfilledQueues: Array<Function>;
  _rejectedQueues: Array<Function>;

  constructor (handle: Function) {
    this._status = PENDING;
    this._value = undefined;

    this._fulfilledQueues = [];
    this._rejectedQueues = [];

    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) {
      this._reject(err);
    }
  }

  _resolve (val) {
    if (this._status !== PENDING) {
      return;
    }

    if (val instanceof MyPromise) {
      return val.then(this._resolve.bind(this), this._reject.bind(this));
    } else {
      this._status = FULFILLED;
      this._value = val;
    }
    let fun;
    while (fun = this._fulfilledQueues.shift()) {
      fun(val);
    }
  }

  _reject (err) {
    if (this._status !== PENDING) {
      return;
    }
    if (err instanceof MyPromise) {
      return err.then(this._resolve.bind(this), this._reject.bind(this));
    } else {
      this._status = REJECTED;
      this._value = err;
    }

    let fun;
    while (fun = this._rejectedQueues.shift()) {
      fun(err);
    }
  }

  then (onFulfilled?: Function | any, onRejected?: Function | any) {
    const {_value, _status, _fulfilledQueues, _rejectedQueues} = this;
    if (!onFulfilled) {
      onFulfilled = () => _value;
    }
    if (!onRejected) {
      onRejected = () => _value;
    }

    switch (_status) {
      case PENDING: {
        return new MyPromise((res, rej) => {
          _fulfilledQueues.push((val) => {
            let ret;
            // console.log(this)
            try {
              ret = onFulfilled(val);
              if (ret instanceof MyPromise) {
                ret.then(res, rej);
              } else {
                res(ret);
              }
            } catch (err) {
              rej(err);
            }
          })
          _rejectedQueues.push((val) => {
            let ret;
            try {
              ret = onRejected(val);
              if (ret instanceof MyPromise) {
                ret.then(res, rej);
              } else {
                res(ret);
              }
            } catch (err) {
              rej(err);
            }
          })
        })
      }
      case FULFILLED: {
        return new MyPromise((res, rej) => {
          let ret;
          try {
            ret = onFulfilled(_value);
            if (ret instanceof MyPromise) {
              ret.then(res, rej);
            } else {
              res(ret);
            }
          } catch (err) {
            rej(err);
          }
        })
      }
      case REJECTED: {
        return new MyPromise((res, rej) => {
          let ret;
          try {
            ret = onRejected(_value);
            if (ret instanceof MyPromise) {
              ret.then(res, rej);
            } else {
              res(ret);
            }
          } catch (err) {
            rej(err);
          }
        })
      }
    }
  }
}

export default MyPromise;
```

