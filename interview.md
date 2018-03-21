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

      vw：是Viewport's width的简写,1vw等于window.innerWidth的1%
      vh: 和vw类似，是Viewport's height的简写，1vh等于window.innerHeihgt的1%
      vmin：vmin的值是当前vw和vh中较小的值
      vmax：vmax的值是当前vw和vh中较大的值

      目前出视觉设计稿，我们都是使用750px宽度的，那么100vw = 750px，即1vw = 7.5px。那么我们可以根据设计图上的px值直接转换成对应的vw值。使用PostCSS的插件postcss-px-to-viewport，让我们可以直接在代码中写px

+ 跨域的几种方式

      同源策略/SOP（Same origin policy）是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源

      1、通过jsonp跨域
        通过动态创建script标签，再请求一个带参网址实现跨域通讯，jsonp缺点：只能实现get一种请求。

      // 1).原生实现：
      var script = document.createElement('script');
      script.type = 'text/javascript';
      // 传参并指定回调执行函数为onBack
      script.src = 'http://www.domain2.com:8080/login?user=admin&callback=onBack';
      document.head.appendChild(script);
      // 回调执行函数
      function onBack(res) {
        alert(JSON.stringify(res));
      }
      // 2).jquery实现
      $.ajax({
        url: 'http://www.domain2.com:8080/login?user=admin',
        type: 'get',
        dateType: 'jsonp',// 请求方式为jsonp
        jsonpCallBack: 'onBack',// 自定义回调函数名
        data: {}
      })

      2、document.domain + iframe跨域
        此方案仅限主域相同，子域不同的跨域应用场景。两个页面都通过js强制设置document.domain为基础主域，就实现了同域。

      3、nginx代理跨域

      4、nodejs中间件代理跨域

      5、跨域资源共享（CORS）
        普通跨域请求：只服务端设置Access-Control-Allow-Origin即可，前端无须设置，若要带cookie请求：前后端都需要设置。

      6、WebSocket协议跨域
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

      网络方面
      1. 减少HTTP请求：合并js文件、合并css文件，使用雪碧图，对于简单的小图片使用base64位编码
      2. 减少资源体积：gzip压缩、js混淆、css压缩、图片压缩
      3. 缓存：DNS缓存、CDN缓存、HTTP缓存
      4. 移动端优化：使用长cache，减少重定向；首屏优化，保证首屏加载数据小于14kb

      渲染和DOM操作方面
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

      数据方面
      1. 图片预加载，图片懒加载
      2. 首屏加载时进度条的显示
      3. 使用正常的json数据格式进行交互
      4. 部分常用数据的缓存
      5. 需要大量运算时，可以使用webWorker

+ 前端需要注意哪些SEO?

      （1）、合理的title、description、keywords：搜索对着三项的权重逐个减小，title值强调重点即可，重要关键词出现不要超过2次，而且要靠前，不同页面title要有所不同；description把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面description有所不同；keywords列举出重要关键词即可
      （2）、语义化的HTML代码，符合W3C规范：语义化代码让搜索引擎容易理解网页
      （3）、重要内容HTML代码放在最前：搜索引擎抓取HTML顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容一定会被抓取
      （4）、重要内容不要用js输出：爬虫不会执行js获取内容
      （5）、少用iframe：搜索引擎不会抓取iframe中的内容
      （6）、非装饰性图片必须加alt
      （7）、提高网站速度：网站速度是搜索引擎排序的一个重要指标

+ sessionStorage,localStorage,cookie区别

      （1）、都会在浏览器端保存，有大小限制，同源限制。
      （2）、cookie会在请求时发送到服务器，作为会话标识，服务器可修改cookie；web storage不会发送到服务器。
      （3）、cookie有path概念，子路径可以访问父路径cookie，父路径不能访问子路径cookie
      （4）、有效期：cookie在设置的有效期内有效，默认为浏览器关闭；sessionStorage在窗口关闭前有效，localStorage长期有效，直到用户删除。
      （5）、共享：sessionStorage不能共享，localStorage在同源文档之间共享，cookie在同源且符合path规则的文档之间共享。
      （6）、localStorage的修改会促发其他文档窗口的update事件。
      （7）、cookie有secure属性要求HTTPS传输。
      （8）、浏览器不能保存超过300个cookie，单个服务器不能超过20个，每个cookie不能超过4k。web storage大小支持能达到5M。

+ HTML5的离线缓存怎么使用，并解释其工作原理。

+ Javascript几种继承方式。

+ 谈谈你对this的理解。

      this就是函数运行时所在的对象（环境）。
      不管是不是在函数内部，只要是在全局环境下运行，this就是指顶层对象window。
      构造函数中的this，指的是实例对象。
      如果对象的方法里面包含this，this的指向就是方法运行时所在的对象。该方法赋值给另一个对象，就会改变this的指向。
      严格模式下，如果函数内部的this指向顶层对象，就会报错。

+ call 和 apply。

+ 什么是闭包，其具有的特性及对页面的影响。

+ 对原型的理解？

+ Window.onload 和 document.ready的区别。

+ http状态码？ 分别代表什么意思。

      200：请求已成功，请求所希望的响应头或数据体将随此响应返回。
      302：请求的资源临时从不同的 URI 响应请求。由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求。只有在 Cache-Control 或 Expires 中进行了指定的情况下，这个响应才是可缓存的。
      304：如果客户端发送了一个带条件的 GET 请求且该请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个状态码。
      304 响应禁止包含消息体，因此始终以消息头后的第一个空行结尾。
      403：服务器已经理解请求，但是拒绝执行它。
      404：请求失败，请求所希望得到的资源未被在服务器上发现。
      500：服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器端的源代码出现错误时出现。

+ GET和POST的区别

      GET：一般用于查询数据，使用URL传递参数，由于浏览器对地址栏长度有限制，所以对使用get方式所发送信息的数量有限制，同时浏览器会记录（历史记录，缓存）中会保留请求地址的信息，包括地址后面的数据。get 只能发送普通格式（URL 编码格式）的数据。
      POST：一般用于向服务器发送数据，对所发送的数据的大小理论上是没有限制，浏览器会缓存记录地址，但是不会记录 post 提交的数据。post 可以发送纯文本、URL编码格式、二进制格式的字符串，形式多样。
      在以下情况中，请使用 POST 请求：
      以提交为目的的请求（类似语义化，get 表示请求，post 表示提交）；
      发送私密类数据（用户名、密码）（因为浏览器缓存记录特性）；
      向服务器发送大量数据（数据大小限制区别）；
      上传文件图片时（数据类型区别）；


+ 一个页面从输入URL到页面加载显示完成，这个过程中发生了什么？

+ 在微信或浏览器中页面加载较慢如何优化？

+ web前后端分离技术该怎么实现，及其意义？

+ 微信小程序如何组件化？

+ require.js的用法

+ 微信小程序的生命周期？

+ 你对VUE的理解，如何理解MVVM框架？

+ 数组的处理？

+ 微信小程序授权流程？

+ ES6的新特性？

+ 常用的自动化构建与模块化方案？

+ 浏览器兼容问题

  1.不同浏览器的默认样式存在差异，可以使用 Normalize.css 抹平这些差异。

  2.解决 IE9 以下浏览器对 html5 新增标签不识别的问题。使用html5shiv.js
    ```html
    <!--[if lt IE 9]>
    <script type="text/javascript" src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <![endif]-->
    ```
  3.解决 IE9 以下浏览器不支持 CSS3 Media Query 的问题。使用respond.js

  4.IE条件注释，IE 属性过滤器，浏览器前缀

  5.IE9 以下浏览器不能使用 opacity

  6.CSS3字体单位“rem”兼容方案：rem.js

