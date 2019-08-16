# CSP内容安全策略

内容安全策略   (CSP) 是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本 (XSS) 和数据注入攻击等。无论是数据盗取、网站内容污染还是散发恶意软件，这些攻击都是主要的手段。

CSP 被设计成完全向后兼容（除CSP2 在向后兼容有明确提及的不一致;  更多细节查看这里 章节1.1）。不支持CSP的浏览器也能与实现了CSP的服务器正常合作，反之亦然：不支持 CSP 的浏览器只会忽略它，如常运行，默认为网页内容使用标准的同源策略。如果网站不提供 CSP 头部，浏览器也使用标准的同源策略。

## 使用方法

### `Content-Security-Policy`

为使CSP可用, 你需要配置你的网络服务器返回  [`Content-Security-Policy`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy)  HTTP头部 ( 有时你会看到一些关于`X-Content-Security-Policy`头部的提法, 那是旧版本，你无须再如此指定它)。

* 一个网站管理者想要所有内容均来自站点的同一个源 (不包括其子域名)

  ```http
  Content-Security-Policy: default-src 'self'
  ```

* 一个网站管理者允许内容来自信任的域名及其子域名 (域名不必须与CSP设置所在的域名相同)

  ```http
  Content-Security-Policy: default-src 'self' *.trusted.com
  ```

* 一个网站管理者允许网页应用的用户在他们自己的内容中包含来自任何源的图片, 但是限制音频或视频需从信任的资源提供者(获得)，所有脚本必须从特定主机服务器获取可信的代码.

  ```http
  Content-Security-Policy: default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com
  ```

  在这里，各种内容默认仅允许从文档所在的源获取, 但存在如下例外:

  * 图片可以从任何地方加载(注意 "*" 通配符)。
  * 多媒体文件仅允许从 media1.com 和 media2.com 加载(不允许从这些站点的子域名)。
  * 可运行脚本仅允许来自于userscripts.example.com。

* 一个线上银行网站的管理者想要确保网站的所有内容都要通过SSL方式获取，以避免攻击者窃听用户发出的请求。

  ````http
  Content-Security-Policy: default-src https://onlinebanking.jumbobank.com
  ````

*  一个在线邮箱的管理者想要允许在邮件里包含HTML，同样图片允许从任何地方加载，但不允许JavaScript或者其他潜在的危险内容(从任意位置加载)。

  ```http
  Content-Security-Policy: default-src 'self' *.mailsite.com; img-src *
  ```

  这个示例并未指定[`script-src`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/script-src)。在此CSP示例中，站点通过 [`default-src`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/default-src) 指令的对其进行配置，这也同样意味着脚本文件仅允许从原始服务器获取。

### 使用`<meta>`

除此之外,  `<meta>`元素也可以被用来配置该策略, 例如

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">
```

## 启用违例报告

默认情况下，违规报告并不会发送。为启用发送违规报告，你需要指定 [`report-uri`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/report-uri) 策略指令，并提供至少一个URI地址去递交报告：

```http
Content-Security-Policy: default-src 'self'; report-uri http://reportcollector.example.com/collector.cgi
```

然后你需要设置你的服务器能够接收报告，使其能够以你认为恰当的方式存储并处理这些报告。

## 对策略进行测试

为降低部署成本，CSP可以部署为*报告(report-only)*模式。在此模式下，CSP策略不是强制性的，但是任何违规行为将会报告给一个指定的URI地址。此外，一个报告模式的头部可以用来测试一个修订后的未来将应用的策略而不用实际部署它。

使用`Content-Security-Policy-Report-Only`头部来指定策略

```http
Content-Security-Policy-Report-Only: policy
```

如果[`Content-Security-Policy-Report-Only`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only) 头部和 [`Content-Security-Policy`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy) 同时出现在一个响应中，两个策略均有效。在`Content-Security-Policy` 头部中指定的策略有强制性 ，而`Content-Security-Policy-Report-Only`中的策略仅产生报告而不具有强制性。

支持CSP的浏览器将始终对于每个企图违反你所建立的策略都发送违规报告，如果策略里包含一个有效的[`report-uri`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/report-uri) 指令。

## 参考资料

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP