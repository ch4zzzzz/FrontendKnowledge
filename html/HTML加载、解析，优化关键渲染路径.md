# HTML加载、解析，优化关键渲染路径

浏览器从收到 HTML、CSS 和 JavaScript 字节到对其进行必需的处理，从而将它们转变成渲染的像素这一过程中有一些中间步骤，优化性能其实就是了解这些步骤中发生了什么 - 即**关键渲染路径**。

主要步骤：

1. 处理 HTML 标记并构建 DOM 树。
2. 处理 CSS 标记并构建 CSSOM 树。
3. 将 DOM 与 CSSOM 合并成一个渲染树。
4. 根据渲染树来布局，以计算每个节点的几何信息。
5. 将各个节点绘制到屏幕上。

如果 DOM 或 CSSOM 被修改，您只能再执行一遍以上所有步骤，以确定哪些像素需要在屏幕上进行重新渲染。

**优化关键渲染路径就是指最大限度缩短执行上述第 1 步至第 5 步耗费的总时间。** 这样一来，就能尽快将内容渲染到屏幕上，此外还能缩短首次渲染后屏幕刷新的时间，即为交互式内容实现更高的刷新率。

## 阻塞渲染的CSS

默认情况下，CSS 被视为阻塞渲染的资源，这意味着浏览器将不会渲染任何已处理的内容，直至 CSSOM 构建完毕。请务必精简您的 CSS，尽快提供它，并利用媒体类型和查询来解除对渲染的阻塞。

## 使用Javascript

当 HTML 解析器遇到一个 script 标记时，它会暂停构建 DOM，将控制权移交给 JavaScript 引擎；等 JavaScript 引擎运行完毕，浏览器会从中断的地方恢复 DOM 构建。

如果浏览器**尚未完成 CSSOM 的下载和构建**，而我们却想在此时运行脚本，将会对性能不利：**浏览器将延迟脚本执行和 DOM 构建，直至其完成 CSSOM 的下载和构建。**

总结：

- 脚本在文档中的位置很重要。
- 当浏览器遇到一个 script 标记时，DOM 构建将暂停，直至脚本完成执行。
- JavaScript 可以查询和修改 DOM 与 CSSOM。
- JavaScript 执行将暂停，直至 CSSOM 就绪。

## 参考资料

https://developers.google.com/web/fundamentals/performance/critical-rendering-path/

​	