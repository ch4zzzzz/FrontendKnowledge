# `Symbol`

`Symbol`是原始值，是基本数据类型之一。ES6新增。

## 使用

`Symbol`通常作为一个对象的私有键。

```javascript
const symbol = Symbol();
const symbol2 = Symbol();
symbol === symbol2 // false

const name = Symbol("name");
const cat = {
    [name]: "Tom"
}
cat[name] // "Tom"

// 可对Symbol类型的属性使用Object.defineProperty()
Object.defineProperty(cat, name, {
    writable: false,
    value: "A Cat."
})
```

## `Symbol`共享体系

ES6提供了一个可随时访问的全局`Symbol`注册表，用以跨文件共享`Symbol`

```javascript
// 全局注册表中无"uid"这个Symbol时将创建并引用，否则直接返回引用
const uid = Symbol.for("uid");
const uid2 = Symbol.for("uid");
uid === uid2 // true

// 使用Symbol.keyFor()查看与当前Symbol有关的键
Symbol.keyFor(uid2); // "uid"
const uid3 = Symbol("uid");
Symbol.keyFor(uid3); // undefined
```

## 强制类型转换

```javascript
const symbol = Symbol();
if (Symbol && 1) {console.log(true)} // true
symbol == 1 // false
symbol > 1 // Error!
symbol + 1 // Error!
symbol + "abc" // Error!
```

## `Symbol`属性检索

`Object.getOwnPropertySymbols()`

```javascript
const name = Symbol("name");
const age = Symbol("age");
const cat = {
    [name]: "Tom",
    [age]: 25
}

let symbols = Object.getOwnPropertySymbols(cat);
console.log(symbols);
// logs: [Symbol(name), Symbol(age)]
```

## 参考资料

<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol>