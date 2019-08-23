# img的srcset和sizes

## 使用srcset和sizes

设置srcset后，src属性就没有效果了。

使用srcset和sizes来创建响应式图片，在指定的视口宽度范围内下载分辨率合适的图片

```html
<img srcset="elva-fairy-320w.jpg 320w,
             elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
     src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
```

当浏览器以视窗宽度为480px来加载页面，那么`(max-width: 480px)`的媒体条件为真，因此`440px`的槽会被选择，所以`elva-fairy-480w.jpg`将加载，因为它的的固定宽度（`480w`）最接近于`440px`。

## 使用srcset

混合使用宽度描述符和像素密度描述符以及重复的描述符都是无效的

```html
<img srcset="elva-fairy-320w.jpg,
             elva-fairy-480w.jpg 1.5x,
             elva-fairy-640w.jpg 2x"
     src="elva-fairy-640w.jpg" alt="Elva dressed as a fairy">
```

在这种情况下，`sizes`并不需要——浏览器只是计算出正在显示的显示器的分辨率，然后提供`srcset`引用的最适合的图像。因此，如果访问页面的设备具有标准/低分辨率显示，一个设备像素表示一个CSS像素，`elva-fairy-320w.jpg`会被加载（1x 是默认值，所以你不需要写出来）。如果设备有高分辨率，两个或更多的设备像素表示一个CSS像素，`elva-fairy-640w.jpg` 会被加载。640px的图像大小为93KB，320px的图像的大小仅仅有39KB。

注：不同设备上物理像素分辨率和CSS像素分辨率[可能不同](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/devicePixelRatio)

## 使用picture来加载不同的图片

**HTML `<picture> `元素**通过包含零或多个`<source>`元素和一个 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 元素来为不同的显示/设备场景提供图像版本。浏览器会选择最匹配的子 `<source>` 元素，如果没有匹配的，就选择 `<img>` 元素的 `src` 属性中的URL。然后，所选图像呈现在<img>元素占据的空间中。

通过media属性进行媒体查询

```html
<picture>
  <source srcset="mdn-logo-wide.png" media="(min-width: 600px)">
  <img src="mdn-logo-narrow.png" alt="MDN">
</picture>
```

通过type来判断浏览器是否支持该格式

```html
<picture>
  <source srcset="mdn-logo.svg" type="image/svg+xml">
  <img src="mdn-logo.png" alt="MDN">
</picture>
```

## 参考资料

https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/picture