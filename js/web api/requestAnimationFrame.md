# requestAnimationFrame

**window.requestAnimationFrame()** 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

通常，浏览器的刷新是每秒60帧，相当于最短每16.7ms重绘一次，`requestAnimationFrame`会在重绘前调用。

```javascript
let i = 0;
let start = null;
let dur = 1000;

// timestamp就是这一次调用requestAnimationFrame时的时间戳
function step(timestamp) {
    if (start===null) start = timestamp;
    if (timestamp-start<dur) {
        requestAnimationFrame(step);
    } else {
        console.log(new Date());
        start = timestamp;
        requestAnimationFrame(step);
    }
}

requestAnimationFrame(step);
```

## 参考资料

https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame

https://developers.google.com/web/updates/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision

[https://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/?_t_t_t=0.3547051663712042](https://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-动画算法/?_t_t_t=0.3547051663712042)