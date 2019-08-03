# HTML5表单改进

## 约束校验API

### 属性和方法示例

* `validationMessage`: 一个本地化消息，描述元素不满足校验条件时（如果有的话）的文本信息。如果元素无需校验（`willValidate` 为 `false`），或元素的值满足校验条件时，为空字符串。
* `validity`: 一个 [`ValidityState`](https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState) 对象，描述元素的验证状态。
* `validity.valid`: 如果元素的值不存在校验问题，返回 `true`，否则返回 `false`。当此属性为 `true` 时，元素将命中  [`:valid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:valid) CSS 伪类，否则命中 [`:invalid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid) CSS 伪类。
* `validity.valueMissing`: 如果元素设置了 required 属性且值为空，返回 `true`，否则返回 `false`。当此属性为 true 时，元素将命中  [`:invalid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid) CSS 伪类。
* `checkValidity()`: 如果元素的值不存在校验问题，返回 `true`，否则返回 `false`。如果元素校验失败，此方法会触发`invalid` 事件。
* `HTMLFormElement.reportValidity()`: 如果元素或它的子元素控件符合校验的限制，返回 `true` . 当返回为 `false` 时, 对每个无效元素可撤销 `invalid` 事件会被唤起并且校验错误会报告给用户 。
* `setCustomValidity(message)`: 为元素添加一个自定义的错误消息；如果设置了自定义错误消息，该元素被认为是无效的，则显示指定的错误。这允许你使用 JavaScript 代码来建立校验失败，而不是用标准约束校验 API 所提供的。这些自定义信息将在向用户报告错误时显示。如果参数为空，则清空自定义错误。

### 示例

```html
<form novalidate>
  <p>
    <label for="mail">
      <span>Please enter an email address:</span>
      <input type="email" id="mail" name="mail">
      <span class="error" aria-live="polite"></span>
    </label>
  </p>
  <button>Submit</button>
</form>
```

这个简单的表单使用 `novalidate` 属性关闭浏览器的自动校验；这允许我们使用脚本控制表单校验。但是，这并不禁止对约束校验 API的支持或是以下 CSS 伪类：[`:valid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:valid)、[`:invalid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid)、[`:in-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:in-range) 、[`:out-of-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:out-of-range) 的应用。这意味着，即使浏览器在发送数据之前没有自动检查表单的有效性，您仍然可以自己做，并相应地设置表单的样式。

```javascript
// 有许多方式可以获取 DOM 节点；在此我们获取表单本身和
// email 输入框，以及我们将放置错误信息的 span 元素。

var form  = document.getElementsByTagName('form')[0];
var email = document.getElementById('mail');
var error = document.querySelector('.error');

email.addEventListener("input", function (event) {
  // 当用户输入信息时，校验 email 字段
  if (email.validity.valid) {
    // 如果校验通过，清除已显示的错误消息
    error.innerHTML = ""; // 重置消息的内容
    error.className = "error"; // 重置消息的显示状态
  }
}, false);
form.addEventListener("submit", function (event) {
  // 当用户提交表单时，校验 email 字段
  if (!email.validity.valid) {
    
    // 如果校验失败，显示一个自定义错误
    error.innerHTML = "I expect an e-mail, darling!";
    error.className = "error active";
    // 还需要阻止表单提交事件，以取消数据传送
    event.preventDefault();
  }
}, false);
```

### 参考资料

[约束校验](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Forms/Data_form_validation#使用_JavaScript校验表单)

## `<output>`

`<output>`表示计算或用户操作的结果。

```html
<form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
    <input type="range" name="b" value="50" /> +
    <input type="number" name="a" value="10" /> =
    <output name="result"></output>
</form>
```

