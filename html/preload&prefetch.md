# preload&prefetch

## preload

Preload 与 prefetch 不同的地方就是它专注于**当前的页面**，并以**高优先级**加载资源，Prefetch 专注于下一个页面将要加载的资源并以低优先级加载。同时也要注意 preload 并不会阻塞 window 的 `onload` 事件。

```html
<link rel="preload" href="//cdn.staticfile.org/jquery/3.2.1/jquery.min.js" as="script" />


// 随后使用预加载的资源
<script src="//cdn.staticfile.org/jquery/3.2.1/jquery.min.js"></script>


<link rel="preload" href="non-critial.css" as="style" />
<link href="non-critial.css" rel="stylesheet" />
```

### 优点

- 允许浏览器来**设定资源加载的优先级**因此可以允许前端开发者来优化指定资源的加载。
- 赋予浏览器**决定资源类型**的能力，因此它能分辨这个资源在以后是否可以重复利用。
- 浏览器可以通过指定 `as` 属性来决定这个**请求是否符合 content security policy**。
- 浏览器可以基于资源的类型（比如 image/webp）来发送适当的 `accept` 头。

## prefetch

Prefetch 是一个低优先级的资源提示，允许**浏览器在后台（空闲时）获取将来可能用得到的资源，并且将他们存储在浏览器的缓存中**。一旦一个页面加载完毕就会开始下载其他的资源，然后当用户点击了一个带有 prefetched 的连接，它将可以立刻从缓存中加载内容。

## 参考资料

https://developer.mozilla.org/zh-CN/docs/Web/HTML/Preloading_content

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Link_prefetching_FAQ

https://github.com/fi3ework/blog/issues/32

https://github.com/fi3ework/blog/issues/16