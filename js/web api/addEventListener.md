# `target.addEventListener()`

## 简介

* `target.addEventListener()`将指定的监听器注册到target上，当时间传递到target上时，触发指定的回调函数。
* target可以是一个DOM元素，`document`，`window`，以及`XMLHttpRequest`这样支持事件的对象。

## 语法

```javascript
target.addEventListener(type, listener, options)
target.addEventListener(type, listener, useCapture)

// wantsUntrusted未被标准化
target.addEventListener(type, listener, useCapture, wantsUntrusted) 
```

* `type`: 事件类型，如`click`

* `listener`: 必须是一个实现了`EventListener`接口的对象，或者是一个函数。

  ```javascript
  const buttonElement = document.getElementById('btn');
  
  // Listener is a function.
  buttonElement.addEventListener('click', function (event) {
    alert('Element clicked through function!');
  });
  
  // Listener is an Object.
  buttonElement.addEventListener('click', {
    handleEvent: function (event) {
      alert('Element clicked through handleEvent property!');
    }
  });
  ```

* `options`: 参数对象

  * `capture`: `Boolean`。表示 `listener` 会在该类型的事件捕获阶段传播到该target时触发。
  * `once`: `Boolean`。表示是否只触发一次。
  * `passive`: `Boolean`。设置为`true`时，表示`listener`永远不调用`preventDefault()`，如果仍调用了这个函数将抛出警告。

* `useCapture`: `Boolean`。注册了`listener`的元素， 是否要先于它下面的EventTarget，调用该listener。

个人理解，`options`中的`capture`基本等同于`useCapture`

## 检测是否支持`option`

例子：检测是否支持`passive`

```javascript
var passiveSupported = false;

try {
  var options = Object.defineProperty({}, "passive", {
    get: function() {
      passiveSupported = true;
    }
  });

  window.addEventListener("test", null, options);
} catch(err) {}
```

## `this`指向

* 非箭头函数的`this`指向该元素本身。
* 可以使用`bind`改变`this`指向。

## 内存问题

没有保持静态引用的`listener`无法被移除

## 使用`passive`改善滚屏性能

根据规范，`passive` 选项的默认值始终为false。但是，这引入了处理某些触摸事件（以及其他）的事件监听器在尝试处理滚动时阻止浏览器的主线程的可能性，从而导致滚动处理期间性能可能大大降低。

为防止出现此问题，某些浏览器（特别是Chrome和Firefox）已将`touchstart`和`touchmove`事件的`passive`选项的默认值更改为true文档级节点 [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)，[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)和[`Document.body`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/body)。这可以防止调用事件监听器，因此在用户滚动时无法阻止页面呈现。

添加`passive`参数后，`touchmove`事件不会阻塞页面的滚动（同样适用于鼠标的滚轮事件）。

## `scroll`

在document视图或者一个element在滚动的时候，会触发元素的`scroll`事件。

### 冒泡

* `element`的`scroll`事件不冒泡。`scroll`可被捕获，沿着事件流，在触发目标元素的冒泡事件后，事件流截断。
* `document`的`defaultView`的`scroll`事件冒泡

### 使用`window.requestAnimationFrame`优化`Scroll`处理性能

```javascript
// Reference: http://www.html5rocks.com/en/tutorials/speed/animations/

var last_known_scroll_position = 0;
var ticking = false;

function doSomething(scroll_pos) {
  // do something with the scroll position
}

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position);
      ticking = false;
    });
  }
  ticking = true;
});
```

## 参考资料

整理自

* [EventTarget.addEventListener() - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
* [scroll](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/scroll_event)
* [你所不知道的scroll事件：为什么scroll事件会失效？](https://ayase.moe/2018/11/20/scroll-event/)