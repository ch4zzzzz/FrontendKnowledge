# 避免空src

设置`src=""`，浏览器在渲染过程中会把 `src` 属性中的空内容进行加载，直至加载失败，影响 `DOMContentLoaded` 与 `Loaded` 事件之间的资源准备过程，拉长了首屏渲染所用的时间；

空的 `href` 属性对首屏渲染的影响比较小。

## 参考资料

https://blog.csdn.net/Panda_m/article/details/78456358