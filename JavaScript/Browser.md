# 浏览器

+ [事件](#事件)
+ [跨域](#跨域)
+ [存储](#存储)
+ [事件循环](#事件循环)
+ [渲染机制](#渲染机制)
+ [优化](#优化)

## 事件

### 事件触发的三个阶段

一个事件发生后，会在子元素和父元素之间传播，分成三个阶段：

+ 捕获阶段：从 window 对象往 目标节点 传播，遇到注册的捕获事件会触发
+ 目标阶段：在目标节点上触发注册的事件
+ 冒泡阶段：从 目标节点 往 window 对象传播，遇到注册的冒泡事件会触发

事件触发一般来说会按照上面的顺序进行，但是也有特例，如果给一个目标节点同时注册冒泡和捕获事件，事件触发会按照注册的顺序执行。

```js
// 以下会先打印 '冒泡' 然后是 '捕获'
node.addEventListener('click',(event) =>{
  console.log('冒泡')
}, false);
node.addEventListener('click',(event) =>{
  console.log('捕获 ')
}, true)
```

### 注册事件

使用 addEventListener 方法注册事件，该方法接受三个参数：

+ type：事件名称，大小写敏感。
+ listener：监听函数。事件发生时，会调用该监听函数。
  + 第二个参数除了监听函数，还可以是一个具有 handleEvent 方法的对象。
+ useCapture：决定了注册的事件是捕获事件还是冒泡事件，默认值为 false。也可以是对象：
  + capture，布尔值，和 useCapture 作用一样
  + once，布尔值，值为 true 表示该回调只会调用一次，调用后会移除监听
  + passive，布尔值，表示永远不会调用 preventDefault

一般来说，我们只希望事件只触发在目标上，这时候可以使用 stopPropagation 来阻止事件的进一步传播。

通常我们认为 stopPropagation 是用来阻止事件冒泡的，其实该函数也可以阻止捕获事件。

stopImmediatePropagation 同样也能实现阻止事件，但是还能阻止该事件目标执行别的注册事件。

```js
// 阻止向上冒泡
node.addEventListener('click',(event) =>{
    event.stopPropagation()
    console.log('冒泡')
}, false);
// 阻止向下捕获
node.addEventListener('click',(event) =>{
    event.stopPropagation()
    console.log('捕获')
}, true);
// 彻底取消该事件
node.addEventListener('click',(event) =>{
    event.stopImmediatePropagation()
    console.log('冒泡')
}, false);
// 点击 node 只会执行上面的函数，该函数不会执行
node.addEventListener('click',(event) => {
    console.log('捕获 ')
}, true)
```

removeEventListener 方法用来移除 addEventListener 方法添加的事件监听函数。该方法没有返回值。

dispatchEvent 方法在当前节点上触发指定事件，从而触发监听函数的执行。

### 事件代理

由于事件会在 冒泡阶段 向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件代理（delegation）。

如果子节点是动态生成的，监听函数依然有效。

```js
var ul = document.querySelector('ul');
ul.addEventListener('click', function (event) {
  if (event.target.tagName.toLowerCase() === 'li') {
    // ...
  }
});
```

## 跨域

浏览器出于安全考虑，有“同源策略”：协议相同、域名相同、端口相同。

非同源的限制：

+ 无法读取非同源网页的 Cookie、LocalStorage 和 IndexedDB。
+ 无法接触非同源网页的 DOM。
+ 无法向非同源地址发送 AJAX 请求（可以发送，但浏览器会拒绝接受响应）。

通过以下几种常用方法解决跨域的问题。

### JSONP

JSONP 的基本原理是利用 `<script>` 标签没有跨域限制的漏洞。网页通过添加一个`<script>` 标签，向服务器请求 JSON 数据。只限于 get 请求。

首先，网页动态插入`<script>` 标签，由它向跨源网址发出请求。该请求的查询字符串有一个callback 参数，用来指定回调函数的名字，这对于 JSONP 是必需的。

服务器收到这个请求以后，会将数据放在回调函数的参数位置返回。由于`<script>`标签请求的脚本，直接作为代码运行。因此，只要浏览器定义了回调函数，该函数就会立即调用。

```js
// 封装 jsonp
function jsonp(url, jsonpCallback, success) {
  // 动态添加标签
  var script = document.createElment('script')
  script.src = url
  script.async = true
  script.type = 'text/javascript'
  document.body.appendChild(script)
  // 注册回调事件
  window[jsonpCallback] = function(data) {
    success && success(data)
  }
}
// 使用
window.onload = function () {
  jsonp('http://example.com/ip?callback=foo','foo', function(value) {
    // 成功的回调
    console.log(value)
  })
}
// 服务器收到这个请求以后，会将数据放在回调函数的参数位置返回
foo({
  "ip": "8.8.8.8"
})
```

### CORS

CORS 是跨源资源共享。它允许浏览器向跨域的服务器，发出 XMLHttpRequest 请求，从而克服了 AJAX 只能同源使用的限制。

浏览器会自动进行 CORS 通信，实现CORS通信的关键是后端。只要后端实现了 CORS，就实现了跨域。兼容性：IE10+

服务端设置 Access-Control-Allow-Origin 就可以开启 CORS。

### Server Proxy

通过服务端代理请求的方式也是解决浏览器跨域问题的方案。同源策略只是针对浏览器的安全策略，服务端并不受同源策略的限制，也就不存在跨域的问题。

### window.postMessage

window.postMessage(message, targetOrigin) 方法是 HTML5 新引进的特性，用于页面之间跨域通信。

```js
// 发送消息端
window.parent.postMessage('message', 'http://test.com');
// 接收消息端
var mc = new MessageChannel();
mc.addEventListener('message', (event) => {
  var origin = event.origin || event.originalEvent.origin
  if (origin === 'http://test.com') {
    console.log('验证通过')
  }
})
```

## 存储

|     特性    |                   cookie                |       localStorage       | sessionStorage |         indexDB          |
| :---------: | :------------------------------: | :----------------------: | :------------: | :----------------------: |
| 数据生命周期 |     一般由服务器生成，可以设置过期时间     | 除非被清理，否则一直存在 | 页面关闭就清理 | 除非被清理，否则一直存在 |
| 数据存储大小 |                     4K                     |            5M            |       5M       |           无限           |
| 与服务端通信 | 每次都会携带在 header 中，对于请求性能影响 |          不参与          |     不参与     |          不参与          |

### Cookie

Cookie 是服务器保存在浏览器的一小段文本信息，每个 Cookie 的大小一般不能超过 4KB。

Cookie属性：

+ name: 该 Cookie 的名称，一旦创建，名称便不可更改。
+ value：该 Cookie 的值，如果用于保存用户登录态，应该将该值加密，不能使用明文的用户标识。
+ expires 属性指定一个具体的到期时间，到了指定时间以后，浏览器就不再保留这个 Cookie。它的值是 UTC 格式。
+ max-age 属性指定从现在开始 Cookie 存在的秒数。过了这个时间以后，浏览器就不再保留这个 Cookie。
+ domain 属性指定浏览器发出 HTTP 请求时，哪些域名要附带这个 Cookie。
+ path 属性指定浏览器发出 HTTP 请求时，哪些路径要附带这个 Cookie。
+ secure 属性指定浏览器只有在加密协议 HTTPS 下，才能将这个 Cookie 发送到服务器。
+ http-only 属性指定该 Cookie 无法通过 Js 脚本拿到，减少 XSS 攻击。
+ same-site 规定浏览器不能在跨域请求中携带 Cookie，减少 CSRF 攻击。

document.cookie 可以对 cookie 进行读写：

```js
console.log(document.cookie) // 读取浏览器中的 cookie
document.cookie = 'myname=leo;path=/;domain=.test.com' // 写入 cookie

// 操作 cookie 的库 js-cookie。
// npm 安装：npm install js-cookie --save
Cookies.set('name', 'value', { expires: 7, path: '/'}) // 过期时间 7 天
Cookies.get('name') // => 'value'
Cookies.remove('name')
```

### Storage

Storage 接口用于脚本在浏览器保存数据。两个对象部署了这个接口：window.sessionStorage 和 window.localStorage。

sessionStorage 保存的数据用于浏览器的一次会话（session），当会话结束（通常是窗口关闭），数据被清空。

localStorage 保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。

除了保存期限的长短不同，这两个对象的其他方面都一致。

Storage 方法：

+ setItem() 方法用于存入数据。它接受两个字符串参数，第一个是键名，第二个是保存的数据。如果键名已经存在，该方法会更新已有的键值。
+ getItem() 方法用于读取数据。它只有一个参数，就是键名。如果键名不存在，该方法返回 null。
+ removeItem() 方法用于清除某个键名对应的键值。它接受键名作为参数，如果键名不存在，该方法不会做任何事情。
+ clear() 方法用于清除所有保存的数据。该方法的返回值是undefined。
+ key() 接受一个整数作为参数（从零开始），返回该位置对应的键值。

Storage 事件：

Storage 接口储存的数据发生变化时，会触发 storage 事件，可以指定这个事件的监听函数。

```js
// store.js 是一个兼容所有浏览器的 LocalStorage 包装器。
// 安装: npm install store --save
var store = require('store')
store.set('user', {name:'Marcus' })
store.get('user')
store.remove('user')
store.clearAll()
store.each(function(value, key) {
  console.log(key, '==', value)
})
// 使用插件
var expirePlugin = require('store/plugins/expire')
store.addPlugin(expirePlugin)
```

### indexDB

indexedDB 是 HTML5 规范里新出现的浏览器里内置的数据库，它可以被网页脚本创建和操作。

浏览器原生提供 indexedDB 对象。

### Service Worker

service worker 也称服务工作线程，是浏览器在后台独立网页运行的脚本。它无法直接访问 DOM，如果需要操作页面的 DOM 节点，可以通过 postMessage 来跟想控制的页面进行通信。

目前该技术通常用来做缓存文件，提高首屏速度。

## 事件循环

+ [阮一峰《再谈Event Loop》](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

JavaScript 是门非阻塞单线程语言，单线程指的是，JavaScript 只在一个线程上运行。也就是说，JavaScript 同时只能执行一个任务，其他任务都必须在后面排队等待。（JavaScript 引擎有多个线程，单个脚本只能在一个线程上运行（称为主线程），其他线程都是在后台配合）。

程序里面所有的任务，可以分成两类：同步任务和异步任务。

同步任务是那些没有被引擎挂起、在主线程上排队执行的任务。只有前一个任务执行完毕，才能执行后一个任务。

异步任务是那些被引擎放在一边，不进入主线程、而进入任务队列（task queue）的任务。只有引擎认为某个异步任务可以执行了（比如 Ajax 操作从服务器得到了结果），该任务（采用回调函数的形式）才会进入主线程执行。排在异步任务后面的代码，不用等待异步任务结束会马上运行，也就是说，异步任务不具有“堵塞”效应。

异步任务的写法通常是回调函数。一旦异步任务重新进入主线程，就会执行对应的回调函数。如果一个异步任务没有回调函数，就不会进入任务队列，也就是说，不会重新进入主线程，因为没有用回调函数指定下一步的操作。

只要同步任务执行完了，JavaScript 引擎就会去检查那些挂起来的异步任务，是不是可以进入主线程了。这种循环检查的机制，就叫做事件循环（Event Loop）。

不同的任务源会被分配到不同的任务队列中，任务源可以分为 宏任务（macro-task）和 微任务（micro-task）。在 ES6 规范中，micro-task 称为 jobs，macro-task 称为 task。

宏任务包括： script(整体代码)， setTimeout，setInterval，setImmediate(Node.js环境），I/O，UI rendering，postMessage

微任务包括： promise.then，process.nextTick(Node.js环境），Object.observe，MutationObserver

事件循环(Event Loop)中，每一次循环称为 tick, 每一次 tick 的任务如下：

+ 执行所有同步代码(script整体代码)，这属于宏任务
+ 同步任务全部执行完，执行栈为空，查询是否有微任务需要执行
+ 执行所有微任务，直至清空微任务队列
+ 必要的话渲染 UI
+ 然后开始下一轮 Event loop，执行宏任务中的代码

```js
// 首先进入 script 代码段 先执行一个宏任务
// 同步代码 - 顺序执行
console.log('script start');
// 异步代码 - 宏任务
setTimeout(function() {
  console.log('setTimeout');
}, 0); // 延时为 0，其实还是异步，因为 HTML5 标准规定这个函数第二个参数不得小于 4 毫秒，不足会自动增加。

new Promise((resolve) => {
  // Promise 构造函数中为 同步代码
  console.log('Promise')
  resolve()
}).then(function() {
  // 回调为 异步代码 - 微任务
  console.log('promise1');
}).then(function() {
  // 回调为 异步代码 - 微任务
  console.log('promise2');
});
// 同步代码
console.log('script end');
// script start => Promise => script end => promise1 => promise2 => setTimeout
```

## 渲染机制

浏览器的渲染机制一般分为以下几个步骤：

1. 处理 HTML 并构建 DOM 树。
2. 处理 CSS 构建 CSSOM 树。
3. 将 DOM 树和 CSSOM 树合并成渲染树。
4. 根据渲染树来布局 Layout，计算每个节点的位置。
5. 调用 GPU 绘制，合成图层，显示在屏幕上。

![浏览器渲染](/img/xuanran.png)

在构建 CSSOM 树时，会阻塞渲染，直至 CSSOM 树构建完成。

构建 CSSOM 树是一个十分消耗性能的过程，所以应该尽量保证层级扁平，减少过度层叠，越是具体的 CSS 选择器，执行速度越慢。

当 HTML 解析到 script 标签时，会暂停构建 DOM，完成后才会从暂停的地方重新开始。

如果你想首屏渲染的越快，就越不应该在首屏就加载 JS 文件。并且 CSS 也会影响 JS 的执行，只有当解析完样式表才会执行 JS，所以也可以认为这种情况下，CSS 也会暂停构建 DOM。

load 事件触发代表页面中的 DOM，CSS，JS，图片已经全部加载完毕。

DOMContentLoaded 事件触发代表初始的 HTML 被完全加载和解析，不需要等待 CSS，JS，图片加载。

图层：

一般来说，可以把普通文档流看成一个图层。特定的属性可以生成一个新的图层。不同的图层渲染互不影响，所以对于某些频繁需要渲染的建议单独生成一个新图层，提高性能。但也不能生成过多的图层，会引起反作用。

通过以下几个常用属性可以生成新图层：

+ 3D 变换：translate3d、translateZ
+ will-change，提前通知浏览器我们要对元素做什么动画
+ video、iframe 标签
+ 通过动画实现的 opacity 动画转换
+ position: fixed

重绘（Repaint）和回流（Reflow）：

重绘和回流是渲染步骤中的一小节，但是这两个步骤对于性能影响很大。

+ 重绘是当节点需要更改外观而不会影响布局的，比如改变 color 就叫称为重绘
+ 回流是布局或者几何属性需要改变就称为回流。

回流必定会发生重绘，重绘不一定会引发回流。回流所需的成本比重绘高的多，改变深层次的节点很可能导致父节点的一系列回流。

所以以下几个动作可能会导致性能问题：

+ 改变 window 大小
+ 改变字体
+ 添加或删除样式
+ 文字改变
+ 定位或者浮动
+ 盒模型

很多人不知道的是，重绘和回流其实和 Event loop 有关。

+ 当 Event loop 执行完 Microtasks 后，会判断 document 是否需要更新。因为浏览器是 60Hz 的刷新率，每 16ms 才会更新一次。
+ 然后判断是否有 resize 或者 scroll ，有的话会去触发事件，所以 resize 和 scroll 事件也是至少 16ms 才会触发一次，并且自带节流功能。
+ 判断是否触发了 media query
+ 更新动画并且发送事件
+ 判断是否有全屏操作事件
+ 执行 requestAnimationFrame 回调
+ 执行 IntersectionObserver 回调，该方法用于判断元素是否可见，可以用于懒加载上，但是兼容性不好
+ 更新界面
+ 以上就是一帧中可能会做的事情。如果在一帧中有空闲时间，就会去执行 requestIdleCallback 回调。

减少重绘和回流：

+ 使用 translate 替代 top、left 等位置变换。
+ 使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局）。
+ 把 DOM 离线后修改，比如：先把 DOM 给 display:none (有一次 Reflow)，然后你修改100次，然后再把它显示出来。
+ 不要把 DOM 结点的属性值放在一个循环里当成循环里的变量。
+ 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局。
+ 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 requestAnimationFrame。
+ CSS 选择符从右往左匹配查找，避免 DOM 深度过深。
+ 将频繁运行的动画变为图层，图层能够阻止该节点回流影响别的元素。比如对于 video 标签，浏览器会自动将该节点变为图层。

## 优化

### 网络相关

+ 减少网络请求次数。
+ 使用 HTTP / 2.0。
+ DNS 预解析：可以通过预解析的方式来预先获得域名所对应的 IP。`<link rel="dns-prefetch" href="//yuchengkai.cn">`
+ 预加载：有些资源不需要马上用到，但是希望尽早获取，这时候就可以使用预加载，不会阻塞 onload 事件。`<link rel="preload" href="http://example.com">`
+ 预渲染：可以通过预渲染将下载的文件预先在后台渲染，要确保该页面百分百会被用户在之后打开，否则就白白浪费资源去渲染。`<link rel="prerender" href="http://example.com">`
+ 缓存：
  + 强缓存：实现强缓存可以通过两种响应头实现：Expires 和 Cache-Control 。强缓存表示在缓存期间不需要请求，state code 为 200。
  + 协商缓存：有两种实现方式：
    + Last-Modified 和 If-Modified-Since。Last-Modified 表示本地文件最后修改日期。If-Modified-Since 会将 Last-Modified 的值发送给服务器，询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来。
    + ETag 和 If-None-Match。ETag 类似于文件指纹，If-None-Match 会将当前 ETag 发送给服务器，询问该资源 ETag 是否变动，有变动的话就将新的资源发送回来。并且 ETag 优先级比 Last-Modified 高。

缓存策略：

+ 对于某些不需要缓存的资源，可以使用 Cache-control: no-store ，表示该资源不需要缓存。
+ 对于频繁变动的资源，可以使用 Cache-Control: no-cache 并配合 ETag 使用，表示该资源已被缓存，但是每次都会发送请求询问资源是否更新。
+ 对于代码文件来说，通常使用 Cache-Control: max-age=31536000 并配合策略缓存使用，然后对文件进行指纹处理，一旦文件名变动就会立刻下载新的文件。

### 渲染相关

+ CSS 文件放在 head 标签中。
+ JS 文件放在 body 标签底部，因为 JS 文件执行会阻塞渲染。也可以把 script 标签放在任意位置然后加上 defer ，表示该文件会并行下载，但是会放到 HTML 解析完成后顺序执行。对于没有任何依赖的 JS 文件可以加上 async ，表示加载和渲染后续文档元素的过程将和 JS 文件的加载与执行并行无序进行。
+ 懒加载：懒加载就是将不关键的资源延后加载。原理就是只加载可视区域内需要加载的东西。
  + 对于图片来说，先设置图片标签的 src 属性为一张占位图，将真实的图片资源放入一个自定义属性中，当进入自定义区域时，就将自定义属性替换为 src 属性，这样图片就会去下载资源，实现了图片懒加载。
  + 懒加载不仅可以用于图片，也可以使用在别的资源上。比如进入可视区域才开始播放视频等等。
+ 预加载：图片等静态资源在使用之前的提前请求资源使用到时能从缓存中加载，提升用户体验。
+ 减少 DOM 操作，在进行 DOM 操作前，先对元素进行缓存。添加大量元素时使用文档片段 DocumentFragment。
+ 使用 requestAnimationFrame 而若不是 setTimeout 和 setInterval 实现动画。
+ 减少重绘和回流。

### 文件相关

+ 压缩合并文件。
+ 服务端开启 Gzip 压缩。
+ 静态资源尽量使用 CDN 加载。
+ 使用字体图标。
+ 图片优化：
  + 修饰性的图片可以用 CSS 去代替。
  + 小图使用 base64 格式。
  + 将多个图标文件整合到一张图片中（雪碧图）。
  + 对于能够显示 WebP 格式的浏览器尽量使用 WebP 格式。
  + 小图使用 PNG，对于大部分图标这类图片，完全可以使用 SVG 代替
  + 照片使用 JPEG
  + 移动端使用媒体查询加载不同分辨率的图片。
