# CSRF跨站请求伪造

攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

示例：

```html
<img src="https://www.example.com/index.php?action=delete&id=123">
```

对于在 `https://www.example.com` 有权限的用户，这个 `<img>` 标签会在他们根本注意不到的情况下对 `https://www.example.com`执行这个操作，即使这个标签根本不在 `https://www.example.com` 内亦可。

## 常见类型

* GET类型

  ```html
  <img src="https://www.example.com/index.php?action=delete&id=123">
  ```

  用户访问含有这个img的页面后，会自动向`https://www.example.com/index.php?action=delete&id=123`发送一次请求。

* POST类型

  ```html
  <form action="http://bank.example/withdraw" method=POST>
      <input type="hidden" name="account" value="xiaoming" />
      <input type="hidden" name="amount" value="10000" />
      <input type="hidden" name="for" value="hacker" />
  </form>
  <script> document.forms[0].submit(); </script> 
  ```

  使用一个自动提交的表单，访问页面时将自动提交该表单	

* 链接类型，

  ```html
  <a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">
    重磅消息！！
  <a/>
  ```

## 特点

* 攻击一般发起在第三方网站，而不是被攻击的网站
* 攻击利用受害者在被攻击网站的登录凭证（一般是cookie），冒充受害者提交操作；而不是直接窃取数据。
* 整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”。
* 跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪。

## 防范措施

* 阻止不明外域访问
  * 同源检测
  * Samesite Cookie
* 提交时要求附加本域才能获取的信息
  * CSRF Token
  * 双重cookie验证

### 同源检测

通过同源检测，来禁止外域或不受信任的域名的请求。

在HTTP协议中，每一个异步请求都会携带两个Header，用于标记来源域名：

- Origin Header
- Referer Header

这两个Header在浏览器发起请求时，大多数情况会自动带上，并且不能由前端自定义内容。 服务器可以通过解析这两个Header中的域名，确定请求的来源域。

#### 使用Origin Header确定来源域名

在部分与CSRF有关的请求中，请求的Header中会携带Origin字段。字段内包含请求的域名（不包含path及query）。如果Origin存在，那么直接使用Origin中的字段确认来源域名就可以。

Origin在以下情况不存在：

* IE11同源策略：IE11不会在跨站CORS请求上添加Origin，Referer头将仍然是唯一的标识。最根本原因是因为IE 11对同源的定义和其他浏览器有不同
* 302重定向：在302重定向之后Origin不包含在重定向的请求中，因为Origin可能会被认为是其他来源的敏感信息。对于302重定向的情况来说都是定向到新的服务器上的URL，因此浏览器不想将Origin泄漏到新的服务器上。[见StackOverflow](https://stackoverflow.com/questions/22397072/are-there-any-browsers-that-set-the-origin-header-to-null-for-privacy-sensitiv)

#### 使用Referer Header确定来源域名

根据HTTP协议，在HTTP头中有一个字段叫Referer，记录了该HTTP请求的来源地址。 对于Ajax请求，图片和script等资源请求，Referer为发起请求的页面地址。对于页面跳转，Referer为打开页面历史记录的前一个页面地址。因此我们使用Referer中链接的Origin部分可以得知请求的来源域名。

以下情况Referer没有或者不可信：

* IE6、7下使用window.location.href=url进行界面的跳转，会丢失Referer。
* IE6、7下使用window.open，也会缺失Referer。
* HTTPS页面跳转到HTTP页面，所有浏览器Referer都丢失。
* 点击Flash上到达另外一个网站的时候，Referer的情况就比较杂乱，不太可信。

#### 阻止外域请求

判断阻止外域请求时，当来源是搜索引擎的链接（例如百度的搜索结果），也会被当成疑似CSRF攻击。所以要过滤掉页面请求的情况

```javascript
Accept: text/html
Method: GET
```

#### 缺点

* 页面请求就会暴露在CSRF攻击范围中

  ```javascript
  GET https://example.com/addComment?comment=XXX&dest=orderId
  ```

  如果页面的GET请求中包含了用户操作，仍然有CSRF攻击的风险

* CSRF大多数情况下来自第三方域名，但并不能排除本域发起。如果攻击者有权限在本域发布评论（含链接、图片等，统称UGC），那么它可以直接在本域发起攻击，这种情况下同源策略无法达到防护的作用。

#### 总结

同源验证是一个相对简单的防范方法，能够防范绝大多数的CSRF攻击。但这并不是万无一失的，对于安全性要求较高，或者有较多用户输入内容的网站，我们就要对关键的接口做**额外的防护措施**。

###  CSRF Token

#### 基本步骤

1. 服务器将CSRF Token输出到页面中
2. 页面提交的请求携带这个Token
3. 服务器验证Token是否正确

#### 分类

* 随机生成的token，存储在session或redis中
* 加密计算生成的token，后端重新解密即可验证token的有效性，性能高

#### 总结

只要没有XSS漏洞泄露token，那么接口的CSRF攻击就无法奏效

### 双重cookie验证

* 在用户访问网站页面时，向请求域名注入一个Cookie，内容为随机字符串（例如`csrfcookie=v8g9e4ksfhw`）。

* 在前端向后端发起请求时，取出Cookie，并添加到URL的参数中（接上例`POST https://www.a.com/comment?csrfcookie=v8g9e4ksfhw`）。

* 后端接口验证Cookie中的字段与URL参数中的字段是否一致，不一致则拒绝。

#### 缺点

由于任何跨域都会导致前端无法获取Cookie中的字段（包括子域名之间），子域之间进行通信，必须将cookie种在根域名上。这样每个子域都可以修改根域上的cookie，若遭受XSS攻击，攻击者可以自行配置Cookie，发起CSRF攻击

## 参考资料

https://developer.mozilla.org/zh-CN/docs/Glossary/CSRF

https://tech.meituan.com/2018/10/11/fe-security-csrf.html