# DOMContentLoaded

DOMContentLoaded在初试的HTML文档完全加载和解析后就会触发，而无需等待样式表、图像、子框架加载完成。

同步的JavaScript阻塞HTML的解析，若想加快HTML的解析，可以异步加载JavaScript并优化样式表。

## 对于defer脚本

在defer脚本执行的执行，在DOMContentLoaded触发前

## 与load对比

load事件在整个页面全部加载完成后触发，这包含了所有的依赖资源如样式表、图像

## 参考资料

https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event

https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event