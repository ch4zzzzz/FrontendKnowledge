# GET和POST

## 浏览器的GET和POST

指浏览器中**非Ajax**的HTTP请求，即从HTML和浏览器诞生就一直使用的HTTP协议中的GET/POST。浏览器用GET请求来获取一个html页面/图片/css/js等资源；用POST来提交一个<form>表单，并得到一个结果的网页。

浏览器中的GET请求没有body，只有url，请求数据放在url的querystring中；POST的请求数据在body中

### GET

**读取**一个资源，比如HTML、图片等。反复读取不应该对访问的数据有副作用，没有副作用则为**幂等**

浏览器可以对GET请求的数据做缓存。

###  POST

在`<form>`中定义一个表单，点击submit元素发出的POST请求，这往往是有副作用，是不幂等的。

不幂等意味着，不能随意多次请求。如果POST

## 接口中的POST和GET

用HTTP实现接口发送请求时，就没有浏览器中那么多限制了，只要是符合HTTP格式的就可以发送。

REST接口规范：

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。

## 安全性

就安全性来讲，POST和GET没有显著区别。GET用url传输，更加容易看到。而POST用body传输数据，也是可以被记录下来的。保证安全，还是要**使用HTTPS**。

## 参考资料

https://www.zhihu.com/question/28586791/answer/767316172