# Express 学习笔记

+ `app` 对象

  app 对象一般用来表示 Express 程序。通过调用 Express 模块导出的顶层的express()方法来创建它。
  
  + `app.engine()`：注册模板引擎
  + `app.render()`：渲染HTML视图
  
+ 托管静态资源：

  使用内置的 `express.static(root, [options])` 中间件函数托管静态文件

  `app.use(express.static('public'))` 将静态资源放在 public 目录下

+ `request` 对象：

  回调参数，表示请求

  + `req.app`：当callback为外部文件时，用req.app访问express的实例
  + `req.baseUrl`：获取路由当前安装的URL路径
  + `req.body` / `req.cookies`：获得「请求主体」/ Cookies
  + `req.fresh` / `req.stale`：判断请求是否还「新鲜」
  + `req.hostname` / `req.ip`：获取主机名和IP地址
  + `req.originalUrl`：获取原始请求URL
  + `req.params`：获取路由的parameters
  + `req.path`：获取请求路径
  + `req.protocol`：获取协议类型
  + `req.query`：获取URL的查询参数串
  + `req.route`：获取当前匹配的路由
  + `req.subdomains`：获取子域名
  + `req.accepts()`：检查可接受的请求的文档类型
  + `req.get()`：获取指定的HTTP请求头
  + `req.is()`：判断请求头Content-Type的MIME类型
  + `req.acceptsCharsets` / `req.acceptsEncodings` / `req.acceptsLanguages`：返回指定字符集的第一个可接受字符编码

+ `response` 对象：

  回调参数，表示响应

  + `req.app`：当callback为外部文件时，用req.app访问express的实例
  + `req.baseUrl`：获取路由当前安装的URL路径
  + `req.body` / `req.cookies`：获得「请求主体」/ Cookies
  + `req.fresh` / `req.stale`：判断请求是否还「新鲜」
  + `req.hostname` / `req.ip`：获取主机名和IP地址
  + `req.originalUrl`：获取原始请求URL
  + `req.params`：获取路由的parameters
  + `req.path`：获取请求路径
  + `req.protocol`：获取协议类型
  + `req.query`：获取URL的查询参数串
  + `req.route`：获取当前匹配的路由
  + `req.subdomains`：获取子域名
  + `req.accepts()`：检查可接受的请求的文档类型
  + `req.get()`：获取指定的HTTP请求头
  + `req.is()`：判断请求头Content-Type的MIME类型
  + `req.acceptsCharsets` / `req.acceptsEncodings` / `req.acceptsLanguages`：返回指定字符集的第一个可接受字符编码

+ 常用的模块：

  + `body-parser`：中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据
  + `cookie-parser`：解析 Cookie 的工具，通过 `req.cookies` 可以取到传过来的 cookie，并把它们转成对象
  + `multer`： 中间件，用于处理 `enctype="multipart/form-data"`（设置表单的MIME编码）的表单数据