# 使用XMLHttpRequest

使用XMLHttpRequest发送一个HTTP请求

```javascript
function reqListener () {
  console.log(this.responseText);
}

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "yourFile.txt", true);
oReq.send();
```

## 请求模式：异步or同步

通过XMLHttpRequest生成的请求可以有两种方式来获取数据，异步模式或同步模式。

异步：

```javascript
var xhr = new XMLHttpRequest();
xhr.open("GET", "/bar/foo.txt", true);
```

同步：

```javascript
var request = new XMLHttpRequest();
request.open('GET', 'http://www.mozilla.org/', false); 
```

同步XHR不允许所有新的XHR功能（如`timeout`或`abort`）。这样做会调用`InvalidAccessError`。

在`Worker`中使用`XMLHttpRequest`时,同步请求比异步请求更适合.

## 监测进度

`XMLHttpRequest` 提供了各种在请求被处理期间发生的事件以供监听。这包括定期进度通知、错误通知，等等。

* abort: 当request被停止时触发，例如当程序调用[`XMLHttpRequest.abort()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/abort)。也可使用[`onabort`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onabort)属性。
* error: 当request遭遇错误时触发。也可使用[`onerror`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onerror) 属性
* load: [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)请求成功完成时触发。也可使用[`onload`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onload) 属性.
* loadend: 当request完成触发, 无论成功 ( [`load`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/load_event)) 还是失败 ([`abort`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/abort_event) 或 [`error`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/error_event))。也可使用 [`onloadend`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onloadend)属性。
* loadstart: 接收到响应数据时触发。也可使用 [`onloadstart`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onloadstart) 属性。
* progress: 接收数据开始周期触发。也可使用 [`onprogress`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onprogress) 属性。
* timeout: 在预设时间内没有接收到响应时触发。也可用 [`ontimeout`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/ontimeout) 属性。

```javascript
var req = new XMLHttpRequest();

req.addEventListener("progress", updateProgress, false);
// progress 事件在使用 file: 协议的情况下是无效的。
req.addEventListener("load", transferComplete, false);
req.addEventListener("error", transferFailed, false);
req.addEventListener("abort", transferCanceled, false);

req.open();

var req = new XMLHttpRequest();

req.upload.addEventListener("progress", updateProgress);
req.upload.addEventListener("load", transferComplete);
req.upload.addEventListener("error", transferFailed);
req.upload.addEventListener("abort", transferCanceled);

req.open();


// 使用 loadend 事件可以侦测到所有的三种加载结束条件（abort、load、error）
req.addEventListener("loadend", loadEnd, false);

function loadEnd(evt) {
  alert("The transfer finished (although we don't know if it succeeded or not).");
}
```

## ajax状态码 readyState

| 值   | 状态               | 描述                                                         |
| ---- | ------------------ | ------------------------------------------------------------ |
| `0`  | `UNSENT`           | 代理被创建，但尚未调用 open() 方法。                         |
| `1`  | `OPENED`           | `open()` 方法已经被调用。在这个状态中，可以通过  [setRequestHeader()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader) 方法来设置请求的头部， 可以调用 [send()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send) 方法来发起请求。 |
| `2`  | `HEADERS_RECEIVED` | `send()` 方法已经被调用，并且头部和状态已经可获得。          |
| `3`  | `LOADING`          | 下载中；如果 `responseType` 属性是“text”或空字符串， `responseText` 将会在载入的过程中拥有部分响应数据。 |
| `4`  | `DONE`             | 下载操作已完成。这意味着数据传输已经彻底完成或失败。         |

## 参考资料

[https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#%E8%AF%B7%E6%B1%82%E7%B1%BB%E5%9E%8B](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest

