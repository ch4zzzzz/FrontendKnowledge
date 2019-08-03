# HTML5通信：WebSockets、Server-sent events、WebRTC

## WebSockets

**WebSockets** 是一种先进的技术。它可以在用户的浏览器和服务器之间打开交互式通信会话。使用此API，可以向服务器发送消息并接收事件驱动的响应，而无需通过轮询服务器的方式以获得响应。

### 特点

* 服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于[服务器推送技术](https://en.wikipedia.org/wiki/Push_technology)的一种。
* 建立在 TCP 协议之上，服务器端的实现比较容易。
* 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
* 数据格式比较轻量，性能开销小，通信高效。
* 可以发送文本，也可以发送二进制数据。
* 没有同源限制，客户端可以与任意服务器通信。
* 协议标识符是`ws`（如果加密，则为`wss`），服务器网址就是 URL。

### 示例

```javascript
// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
    // Send messages.
	socket.send('your message');
});

// Connection closed
socket.addEventListener('close', (event) => {
    console.log('Bye!');
})

// Close WebSocket connection.
setTimeout(() => {
    socket.close(1000)
}, 60*1000)
```

### 参考资料

<http://www.ruanyifeng.com/blog/2017/05/websocket.html>

<https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API>

## Server-sent events

### 本质

服务器向客户端声明，接下来要发送一个数据流。客户端不会关闭连接，会一直等着服务器发过来的新的数据流，视频播放就是这样的例子。本质上，这种通信就是以流信息的方式，完成一次用时很长的下载。

### 特点

* SSE 使用 HTTP 协议，现有的服务器软件都支持。WebSocket 是一个独立协议。
* SSE 属于轻量级，使用简单；WebSocket 协议相对复杂。
* SSE 默认支持断线重连，WebSocket 需要自己实现。
* SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket 默认支持传送二进制数据。
* SSE 支持自定义发送的消息类型。

### 示例

```javascript
const evtSource = new EventSource(url);

evtSource.onopen = () => {
    // Close SSE
    setTimeout(() => {
        evtSource.close(1000)
    }, 60*1000)
}

evtSource.onmessage = function(e) {
  const newElement = document.createElement("li");
  
  newElement.innerHTML = "message: " + e.data;
  eventList.appendChild(newElement);
}

evtSource.addEventListener("ping", function(e) {
  const newElement = document.createElement("li");
  
  const obj = JSON.parse(e.data);
  newElement.innerHTML = "ping at " + obj.time;
  eventList.appendChild(newElement);
}, false);
```

### 事件流格式

每条消息是由多个字段组成的,每个字段由字段名,一个冒号,以及字段值组成.

```javascript
event: userconnect
data: {"username": "bobby", "time": "02:33:48"}

data: Here's a system message of some kind that will get used
data: to accomplish some task.

event: usermessage
data: {"username": "bobby", "time": "02:34:11", "text": "Hi everyone."}
```

#### 字段

* `event`: 事件类型.如果指定了该字段,则在客户端接收到该条消息时,会在当前的`EventSource`对象上触发一个事件,事件类型就是该字段的字段值,你可以使用`addEventListener()方法在当前EventSource`对象上监听任意类型的命名事件,如果该条消息没有`event`字段,则会触发`onmessage属性上的事件处理函数`.
* `data`: 消息的数据字段.如果该条消息包含多个`data`字段,则客户端会用换行符把它们连接成一个字符串来作为字段值.
* `id`: 事件ID,会成为当前`EventSource`对象的内部属性"最后一个事件ID"的属性值.
* `retry`: 一个整数值,指定了重新连接的时间(单位为毫秒),如果该字段值不是整数,则会被忽略.

## WebRTC

**WebRTC** (Web Real-Time Communications) 是一项实时通讯技术，它允许网络应用或者站点，在不借助中间媒介的情况下，建立浏览器之间点对点（Peer-to-Peer）的连接，实现视频流和（或）音频流或者其他任意数据的传输。WebRTC包含的这些标准使用户在无需安装任何插件或者第三方的软件的情况下，创建点对点（Peer-to-Peer）的数据分享和电话会议成为可能。

