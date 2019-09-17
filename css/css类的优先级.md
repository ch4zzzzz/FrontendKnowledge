```css
.div {
  width: 100px;
  height: 100px;
}

.styleA {
  background: blue;
}

.styleB {
  background: red;
}
```
```html
<div class="div styleA styleB"></div>
```
在此例中，`styleA`和`styleB`中定义了相同的属性，但由于`styleB`的书写顺序较靠后，因此对于div，`styleB`中定义的属性将覆盖`styleA`中的定义的属性。
