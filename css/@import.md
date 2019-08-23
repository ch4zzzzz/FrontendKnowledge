# @import

- link属于XHTML标签，而@import是CSS提供的。
- 页面被加载时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载。
- import只在IE 5以上才能识别，而link是XHTML标签，无兼容问题。
- 使用dom控制样式时的差别。当使用javascript控制dom去改变样式的时候，只能使用link标签，因为@import不是dom可以控制的。

