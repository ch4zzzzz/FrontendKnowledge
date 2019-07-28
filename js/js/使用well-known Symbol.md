# 使用well-known Symbol

使用well-known Symbol来自定义内部操作

* `Symbol.hasInstance`检测对象的继承信息
* `Symbol.isConcatSpreadable`控制被concat时的行为

## `Symbol.hasInstance`

```javascript
function Obj () {}

Object.defineProperty(Obj, Symbol.hasInstance, {
    value: function (v) {
        return false;
    }
})

const obj = new Obj ();
obj instanceof Obj // false

function SpecialNumber () {}

Object.defineProperty(SpecialNumber, Symbol.hasInstance, {
    value: function (v) {
        return (v instanceof Number) && (v >= 1);
    }
})

const one = new Number(1),
      zero = new Number(0);

one instanceof SpecialNumber // true
zero instanceof SpecialNumber // false
```

## `Symbol.isConcatSpreadable`

```javascript
const collection = {
    0: 1,
    1: 2,
    length: 2,
    [Symbol.isConcatSpreadable]: true
}

const arr = [0].concat(collection);
console.log(arr); // [0, 1, 2]
```

## 正则相关

* `Symbol.match`
* `Symbol.replace`
* `Symbol.search`
* `Symbol.split`

```javascript
const hasLengthOf10 = {
    [Symbol.match]: function (value) {
        return value.length === 10 ? [value.substring(0 ,10)] : null;
    },
    [Symbol.replace]: function (value, replacement) {
        return value.length === 10 ? replacement + value.substring(10) : value;
    },
    [Symbol.search]: function (value) {
        return value.length === 10 ? 0 : -1;
    },
    [Symbol.split]: function (value) {
        return value.length === 10 ? ["", ""] : [value];
    }
}
```

## `Symbol.toPrimitive`

控制转化为原始值时被执行的操作，返回数字、字符或无类型偏好的值

```javascript
const object1 = {
  [Symbol.toPrimitive] (hint) {
    if (hint === 'number') {
      return 42;
    }
    return null;
  }
};

console.log(+object1); // 42
console.log(object1+'!') // null!
String(object1) // null
```

## `Symbol.toStringTag`

```javascript
class ValidatorClass {
  get [Symbol.toStringTag]() {
    return "Validator";
  }
}

Object.prototype.toString.call(new ValidatorClass()); // "[object Validator]"
```

## `Symbol.unscopables`

`Symbol.unscopables`指用于指定在with语句中要忽略的标识符