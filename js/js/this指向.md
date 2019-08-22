# this指向

简单来讲，this指调用函数的对象

调用函数式，如果函数引用是要经过计算得到，则其调用者为undefined，非严格模式下，调用者会隐式转为全局对象。

```javascript
var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}

//示例1 调用者即foo
console.log(foo.bar()); // 2
//示例2 ()没有对函数引用计算，所以函数引用仍为foo.bar，调用者为foo
console.log((foo.bar)()); // 2
//示例3 在括号内通过赋值运算对函数引用进行的计算，因此调用者为全局对象
console.log((foo.bar = foo.bar)()); // 1
//示例4 在括号内通过逻辑运算对函数引用进行的计算，因此调用者为全局对象
console.log((false || foo.bar)()); // 1
//示例5 在括号内通过逗号运算对函数引用进行的计算，因此调用者为全局对象
console.log((foo.bar, foo.bar)()); // 1
```

所以，当使用的函数是一个需要计算的引用时，其调用者为undefined

## this绑定的优先级

new绑定 > 显式绑定 >隐式绑定 >默认绑定

且bind > apply || call

## 参考资料

<https://github.com/mqyqingfeng/Blog/issues/7>