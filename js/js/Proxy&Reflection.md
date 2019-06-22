# Proxy&Reflection

## `Proxy`

`Proxy`对象可以拦截某些操作并实现自定义行为

```javascript
let handler = {
  get: function(target, name){
    return name in target ? target[name] : 42;
}};

let p = new Proxy({}, handler);
p.a = 1;

console.log(p.a, p.b); // 1 42
```

### 语法

```javascript
let p = new Proxy(target, handler)
```

* `target`: 用`Proxy`包装的**目标对象**（可以是任何类型的对象）
* `handle`: 一个对象，其属性是当执行一个操作时定义代理的行为的**函数**。

## `Reflection`

`Reflection`对象提供一些与`Object`上对应方法相同的方法。

```javascript
"assign" in Object // true
Reflect.has(Object, "assign"); // true

Function.prototype.apply.call("".charAt, "ponies", [3]); // "i"
Reflect.apply("".charAt, "ponies", [3]); // "i"
```

## 代理陷阱示例

| 代理陷阱 | 覆写的特性     | 默认特性        |
| -------- | -------------- | --------------- |
| get      | 读取一个属性值 | `Reflect.get()` |
| set      | 写入一个属性   | `Reflect.set()` |
| has      | in操作符       | `Reflect.has()` |

