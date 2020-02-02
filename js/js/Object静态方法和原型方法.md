# Object静态方法和原型方法

## 静态方法

* `Object.assign`通过复制一个或多个对象来创建一个新的对象。

  `Object.assign`拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。

  `Object.assign`只会拷贝可枚举的属性，包括Symbol属性

  若属性名相同，则source会覆盖target中的属性

  ```javascript
  const target = { a: 1, b: 2 };
  const source = { b: 4, c: 5 };
  
  const returnedTarget = Object.assign(target, source);
  
  console.log(target);
  // expected output: Object { a: 1, b: 4, c: 5 }
  
  console.log(returnedTarget);
  // expected output: Object { a: 1, b: 4, c: 5 }
  ```

* `Object.create`使用指定的原型对象和属性创建一个新对象。使用现有的对象来提供新创建的对象的`__proto__`

   * 实现单继承

      ```javascript
      // Shape - 父类(superclass)
      function Shape() {
        this.x = 0;
        this.y = 0;
      }
      
      // 父类的方法
      Shape.prototype.move = function(x, y) {
        this.x += x;
        this.y += y;
        console.info('Shape moved.');
      };
      
      // Rectangle - 子类(subclass)
      function Rectangle() {
        Shape.call(this); // call super constructor.
      }
      
      // 子类续承父类
      Rectangle.prototype = Object.create(Shape.prototype);
      Rectangle.prototype.constructor = Rectangle;
      
      var rect = new Rectangle();
      
      console.log('Is rect an instance of Rectangle?',
        rect instanceof Rectangle); // true
      console.log('Is rect an instance of Shape?',
        rect instanceof Shape); // true
      rect.move(1, 1); // Outputs, 'Shape moved.'
      ```

   * 使用 Object.create 的 propertyObject参数

      ```javascript
      // 创建一个原型为null的空对象
      o = Object.create(null);
      
      
      o = {};
      // 以字面量方式创建的空对象就相当于:
      o = Object.create(Object.prototype);
      
      
      o = Object.create(Object.prototype, {
        // foo会成为所创建对象的数据属性
        foo: { 
          writable:true,
          configurable:true,
          value: "hello" 
        },
        // bar会成为所创建对象的访问器属性
        bar: {
          configurable: false,
          get: function() { return 10 },
          set: function(value) {
            console.log("Setting `o.bar` to", value);
          }
        }
      });
      
      
      function Constructor(){}
      o = new Constructor();
      // 上面的一句就相当于:
      o = Object.create(Constructor.prototype);
      // 当然,如果在Constructor函数中有一些初始化代码,Object.create不能执行那些代码
      
      
      // 创建一个以另一个空对象为原型,且拥有一个属性p的对象
      o = Object.create({}, { p: { value: 42 } })
      ```

      



## 遍历对象属性

* for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

* `Object.keys(obj)`返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

* `Object.getOwnPropertyNames(obj)`返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是**包括不可枚举属性**）的键名。

  ```javascript
  const obj = {val:1}
  Object.defineProperty(obj, 'name', {
      enumerable: false,
      value: 12
  })
  
  Object.keys(obj);
  // ["val"]
  
  Object.getOwnPropertyNames(obj);
  // ["val", "name"]
  ```

* `Object.getOwnPropertySymbols(obj)`返回一个数组，包含对象自身的所有 Symbol 属性的键名。

* `Reflect.ownKeys(obj)`返回一个数组，包含对象自身的所有键名，不管键名是 **Symbol** 或字符串，也**不管是否可枚举**。

## 参考资料

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object

https://es6.ruanyifeng.com/#docs/object

https://stackoverflow.com/questions/22658488/object-getownpropertynames-vs-object-keys

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create