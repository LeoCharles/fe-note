# 前端面试资料

+ viewport

  ```HTML
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
    // width： 设置viewport的宽度，为一个正整数或字符串‘device-widit’（设备宽度）
    // height: 设置viewport的高度，一般设置了宽度，会自动解析出高度，可以不用设置
    // initial-scale: 初始缩放比，为一个数字，可以带小数
    // minimum-scale：允许用户最小缩放比例，为一个数字，可以带小数
    // maximum-scale：允许用户最大缩放比例，为一个数字，可以带小数
    // user-scalable：是否允许手动缩放
  ```

+ 如何处理移动端高清屏 1px细线 被渲染成 2px或者3px 问题

  利用伪类:before 或:after 重做 border，原先的元素相对定位，新做的 border 绝对定位
  ```less
  border-1px($color)
    position: relative
    &::after
      content: ' '
      display: block
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      border-bottom: 1px solid $color
  // 或者
  border-1px($color)
    position: relative
    &::after
      content: ' '
      display: block
      position: absolute
      left: 0
      bottom: 0
      background: $color
      width: 100%
      height: 1px
      -webkit-transform: scaleY(0.5)
      transform: scaleY(0.5)
      -webkit-transform-origin: 0 0
      transform-origin: 0 0
  ```

+ 和Viewport相关的单位有四个，分别为vw、vh、vmin和vmax

  + vw：是Viewport's width的简写,1vw等于window.innerWidth的1%
  + vh: 和vw类似，是Viewport's height的简写，1vh等于window.innerHeihgt的1%
  + vmin：vmin的值是当前vw和vh中较小的值
  + vmax：vmax的值是当前vw和vh中较大的值

  目前出视觉设计稿，我们都是使用750px宽度的，那么100vw = 750px，即1vw = 7.5px。那么我们可以根据设计图上的px值直接转换成对应的vw值。使用PostCSS的插件postcss-px-to-viewport，让我们可以直接在代码中写px

+ 跨域的几种方式

  同源策略/SOP（Same origin policy）是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源

  + 通过jsonp跨域

    通过动态创建script标签，再请求一个带参网址实现跨域通讯，jsonp缺点：只能实现get一种请求。
  ```Javascript
    // 1.原生实现：
    var script = document.createElement('script');
    script.type = 'text/javascript';
    // 传参并指定回调执行函数为onBack
    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=onBack';
    document.head.appendChild(script);
    // 回调执行函数
    function onBack(res) {
      alert(JSON.stringify(res));
    }

    // 2.jquery实现
    $.ajax({
      url: 'http://www.domain2.com:8080/login?user=admin',
      type: 'get',
      dateType: 'jsonp',// 请求方式为jsonp
      jsonpCallBack: 'onBack',// 自定义回调函数名
      data: {}
    })
  ```
  + document.domain + iframe跨域

    此方案仅限主域相同，子域不同的跨域应用场景。两个页面都通过js强制设置document.domain为基础主域，就实现了同域。

  + nginx代理跨域

  + nodejs中间件代理跨域

  + 跨域资源共享（CORS）

    普通跨域请求：只服务端设置Access-Control-Allow-Origin即可，前端无须设置，若要带cookie请求：前后端都需要设置。

  + WebSocket协议跨域

    WebSocket protocol是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是server push技术的一种很好的实现。原生WebSocket API使用起来不太方便，我们使用Socket.io，它很好地封装了webSocket接口，提供了更简单、灵活的接口，也对不支持webSocket的浏览器提供了向下兼容。

+ 浏览器渲染过程

  用户在使用浏览器访问一个网站时需要先通过HTTP协议向服务器发送请求，之后服务器返回HTML文件与响应信息。这时，浏览器会根据HTML文件来进行解析与渲染（该阶段还包括向服务器请求非内联的CSS文件与JavaScript文件或者其他资源），最终再将页面呈现在用户面前。  
  浏览器接收到服务器返回的HTML、CSS和JavaScript字节数据并对其进行解析和转变成像素的渲染过程被称为关键渲染路径。  
  浏览器在渲染页面前需要先构建出DOM树与CSSOM树（如果没有DOM树和CSSOM树就无法确定页面的结构与样式，所以这两项是必须先构建出来的）。  
  DOM树全称为Document Object Model文档对象模型，它是HTML和XML文档的编程接口，提供了对文档的结构化表示，并定义了一种可以使程序对该结构进行访问的方式。  
  CSSOM树全称为Cascading Style Sheets Object Model层叠样式表对象模型，它与DOM树的含义相差不大，只不过它是CSS的对象集合。  
  DOM树描述了文档的结构与内容，CSSOM树则描述了对文档应用的样式规则，想要渲染出页面，就需要将DOM树与CSSOM树结合在一起，这就是渲染树。  
  浏览器会先从DOM树的根节点开始遍历每个可见节点（不可见的节点自然就没必要渲染到页面了，不可见的节点还包括被CSS设置了display: none属性的节点，值得注意的是visibility: hidden属性并不算是不可见属性，它的语义是隐藏元素，但元素仍然占据着布局空间，所以它会被渲染成一个空框）。对每个可见节点，找到其适配的CSS样式规则并应用。  
  渲染树构建完毕后，浏览器得到了每个可见节点的内容与其样式，下一步工作则需要计算每个节点在窗口内的确切位置与大小，也就是布局阶段。  
  布局阶段会从渲染树的根节点开始遍历，然后确定每个节点对象在页面上的确切大小与位置，布局阶段的输出是一个盒子模型，它会精确地捕获每个元素在屏幕内的确切位置与大小，所有相对的测量值也都会被转换为屏幕内的绝对像素值。  
  当Layout布局事件完成后，浏览器会立即发出Paint Setup与Paint事件，开始将渲染树绘制成像素，绘制所需的时间跟CSS样式的复杂度成正比，绘制完成后，用户就可以看到页面的最终呈现效果了。

+ 渲染优化
  + 网络方面
    1. 减少HTTP请求：合并js文件、合并css文件，使用雪碧图，对于简单的小图片使用base64位编码
    2. 减少资源体积：gzip压缩、js混淆、css压缩、图片压缩
    3. 缓存：DNS缓存、CDN缓存、HTTP缓存
    4. 移动端优化：使用长cache，减少重定向；首屏优化，保证首屏加载数据小于14kb

  + 渲染和DOM操作方面
    1. css的文件放在头部，js文件放在尾部或者异步
    2. 尽量避免內联样式
    3. 避免在document上直接进行频繁的DOM操作
    4. 使用classname代替大量的内联样式修改
    5. 对于复杂的UI元素，设置position为absolute或fixed
    6. 尽量使用css动画
    7. 使用window.requestAnimationFrame代替setInterval操作
    8. 适当使用canvas
    9. 使用事件代理
    10. 避免图片或者frame使用空src
    11. 在css属性为0时，去掉单位
    12. 禁止图像缩放
    13. 移除空的css规则
    14. 缩短css选择器，多使用伪元素等帮助定位
    15. 使用css中的translateZ设定，来欺骗浏览器，让其帮忙开启GPU加速
    16. 函数防抖和函数节流
    17. 移动端使用touchstart、touchend代替click

  + 数据方面
    1. 图片预加载，图片懒加载
    2. 首屏加载时进度条的显示
    3. 使用正常的json数据格式进行交互
    4. 部分常用数据的缓存
    5. 需要大量运算时，可以使用webWorker

+ 