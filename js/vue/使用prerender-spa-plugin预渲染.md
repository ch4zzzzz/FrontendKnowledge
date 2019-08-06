# 使用prerender-spa-plugin预渲染

## 原理介绍

使用History模式的单页应用，可以使用prerender-spa-plugin可以将指定路由渲染生成静态html，该html中包含当前页面的静态HTML内容，CSS和JS以及SPA应用全局的CSS和JS。

随后通过配置后端服务器，使指定路由返回对应的html文件。

## 使用方法

* 基本用法

  ```javascript
  // webpack.config.js
  
  const path = require('path')
  const PrerenderSPAPlugin = require('prerender-spa-plugin')
  
  module.exports = {
    plugins: [
      ...
      new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__dirname, 'dist'),
        // Required - Routes to render.
        routes: [ '/', '/about', '/some/deep/nested/route' ],
      })
    ]
  }
  ```

* 高阶用法

  见https://github.com/chrisvfritz/prerender-spa-plugin#advanced-usage-webpackconfigjs

## 针对个性化内容或经常变化的内容

若要对此类页面进行预渲染，可插入预渲染路由骨架

https://segmentfault.com/a/1190000014832185#articleHeader1

## 不适用的场景

* 成千上万的路由：渲染数量很多的路由会严重拖慢构建进程

## 预渲染 VS 服务器端渲染

* **预渲染**：构建阶段生成匹配预渲染路径的 html 文件，构建出来的 html 文件已有部分内容。
* **服务端渲染**：用户访问 url，服务端根据访问路径请求所需数据，拼接成 html 字符串，返回给前端。前端接收到 html 时已有部分内容；
* **客户端渲染**：用户访问 url，请求 html 文件，前端根据路由动态渲染页面内容。关键链路较长，有一定的白屏时间；

## 参考资料

https://juejin.im/post/59d49d976fb9a00a571d651d#heading-0