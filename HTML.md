# HTML

+ Doctype作用？标准模式与兼容模式各有什么区别?

      (1)、<!DOCTYPE>声明位于位于HTML文档中的第一行，处于 <html> 标签之前。告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。
      (2)、 标准模式的排版和JS运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。

+ HTML5 为什么只需要写`<!DOCTYPE HTML>`？

      HTML5 不基于 SGML，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为（让浏览器按照它们应该的方式来运行）；
      而HTML4.01基于SGML,所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型。

+ 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

      CSS规范规定，每个元素都有display属性，确定该元素的类型，每个元素都有默认的display值，如div的display默认值为“block”，则为“块级”元素；span默认display属性值为“inline”，是“行内”元素。
      （1）行内元素有：span a b img input select strong（强调的语气）
      （2）块级元素有：div ul ol li dl dt dd h1 h2 h3 h4…p
      （3）常见的空元素：br hr img link meta
           鲜为人知的是：area base col command embed keygen param source track wbr

+ 页面导入样式时，使用link和@import有什么区别？

      （1）link属于XHTML标签，除了加载CSS外，还能用于定义RSS, 定义rel连接属性等作用；而@import是CSS提供的，只能用于加载CSS;
      （2）页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载;
      （3）import是CSS2.1 提出的，只在IE5以上才能被识别，而link是XHTML标签，无兼容问题;

+ 介绍一下你对浏览器内核的理解？

      主要分成两部分：渲染引擎(layout engineer或Rendering Engine)和JS引擎。
      渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核。
      JS引擎则：解析和执行javascript来实现网页的动态效果。
      最开始渲染引擎和JS引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎。

+ 常见的浏览器内核有哪些？

      Trident内核：IE,MaxThon,TT,The World,360,搜狗浏览器等。[又称MSHTML]
      Gecko内核：Netscape6及以上版本，FF,MozillaSuite/SeaMonkey等
      Presto内核：Opera7及以上。      [Opera内核原为：Presto，现为：Blink;]
      Webkit内核：Safari,Chrome等。   [ Chrome的：Blink（WebKit的分支）]

+ 简述一下你对HTML语义化的理解？

      （1）用正确的标签做正确的事情。
      （2）HTML语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;
      （3）即使在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的;
      （4）搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO;
      （5）使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。

+ title与h1 的区别、b与strong的区别、i与em的区别？

      title属性没有明确意义只表示是个标题，H1则表示层次明确的标题，对页面信息的抓取也有很大的影响；

      strong是标明重点内容，有语气加强的含义，使用阅读设备阅读网络时：<strong>会重读，而<b>是展示强调内容。

      <i>内容展示为斜体，<em>表示强调的文本；

      Physical Style Elements -- 自然样式标签
      b, i, u, s, pre
      Semantic Style Elements -- 语义样式标签
      strong, em, ins, del, code

      应该准确使用语义样式标签, 但不能滥用, 如果不能确定时首选使用自然样式标签。

+ HTML全局属性(global attribute)有哪些?

      accesskey:设置快捷键，提供快速访问元素如aaa在windows下的firefox中按alt + shift + a可激活元素
      class:为元素设置类标识，多个类名用空格分开，CSS和javascript可通过class属性获取元素
      contenteditable: 指定元素内容是否可编辑
      contextmenu: 自定义鼠标右键弹出菜单内容
      data-*: 为元素增加自定义属性
      dir: 设置元素文本方向
      draggable: 设置元素是否可拖拽
      dropzone: 设置元素拖放类型： copy, move, link
      hidden: 表示一个元素是否与文档。样式上会导致元素不显示，但是不能用这个属性实现样式效果
      id: 元素id，文档内唯一
      lang: 元素内容的的语言
      spellcheck: 是否启动拼写和语法检查
      style: 行内css样式
      tabindex: 设置元素可以获得焦点，通过tab可以导航
      title: 元素相关的建议信息
      translate: 元素和子孙节点内容是否需要本地化

+ `<img>` 的 title 和 alt 有什么区别?

      title是global attributes之一，用于为元素提供附加的advisory information。通常当鼠标滑动到元素上的时候显示。

      alt是<img>的特有属性，是图片内容的等价描述，用于图片无法加载时显示、读屏器阅读图片。可提图片高可访问性，除了纯装饰图片外都必须设置有意义的值，搜索引擎会重点分析。

+ label的作用是什么？是怎么用的？

      label 标签来定义表单控制间的关系,当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。

      <label for="Name">Number:</label>
      <input type=“text“name="Name" id="Name"/>

      <label>Date:<input type="text" name="B"/></label>

+ html5有哪些新特性、移除了那些元素？如何处理HTML5新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？

      HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加。

      新特性：
      （1）绘画 canvas
      （2）用于媒介回放的 video 和 audio 元素;
      （3）本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失;sessionStorage 的数据在浏览器关闭后自动删除;
      （4）语意化更好的内容元素，比如 article、footer、header、nav、section;
      （5）表单控件，calendar、date、time、email、url、search;
      （6）新的技术webworker, websocket, Geolocation;

      移除的元素：
      （1）纯表现的元素：basefont，big，center，font, s，strike，tt，u;
      （2）对可用性产生负面影响的元素：frame，frameset，noframes；

      支持HTML5新标签：
      IE8/IE7/IE6支持通过document.createElement方法产生的标签，可以利用这一特性让这些浏览器支持HTML5新标签，浏览器支持新标签后，还需要添加标签默认的样式。
      当然也可以直接使用成熟的框架、比如html5shim;
      <!--[if lt IE 9]>
        <script> src="http://html5shim.googlecode.com/svn/trunk/html5.js"</script>
      <![endif]-->

      如何区分HTML5：
      DOCTYPE声明\新增的结构元素\功能元素

+ HTML5的离线储存怎么使用，工作原理能不能解释一下？

      在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。

      原理：HTML5的离线存储是基于一个新建的.appcache文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。

      如何使用：
      创建一个和html同名的manifest文件，比如页面为index.html，那么可以建一个index.manifest的文件，然后给index.html的html标签添加如下属性即可：
      <html lang="en" manifest="index.manifest">
      Manifest文件:
      CACHE MANIFEST
      #v0.11
      CACHE:
      js/app.js
      css/style.css
      NETWORK:
      resourse/logo.png
      FALLBACK:
      / /offline.html
      在离线状态时，操作window.applicationCache进行需求实现。

+ 浏览器是怎么对HTML5的离线储存资源进行管理和加载的呢？

      在线的情况下，浏览器发现html头部有manifest属性，它会请求manifest文件，如果是第一次访问app，那么浏览器就会根据manifest文件的内容下载相应的资源并且进行离线存储。如果已经访问过app并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的manifest文件与旧的manifest文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。
      离线的情况下，浏览器就直接使用离线存储的资源。

+ 请描述一下 cookies，sessionStorage 和 localStorage 的区别？

      cookie 是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）。
      cookie 数据始终在同源的http请求中携带（即使不需要），记会在浏览器和服务器间来回传递。
      sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存。

      存储大小：
        cookie 数据大小不能超过4k
        sessionStorage 和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。

      有期时间：
        localStorage    存储持久数据，浏览器关闭后数据不丢失除非主动删除数据
        sessionStorage  数据在当前浏览器窗口关闭后自动删除
        cookie          设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭

+ iframe有那些缺点？

      iframe会阻塞主页面的onLoad事件；
      搜索引擎的检索程序无法解读这种页面，不利于SEO;
      iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。

      使用iframe之前需要考虑这两个缺点。如果需要使用iframe，最好是通过javascript动态给iframe添加src属性值，这样可以绕开以上两个问题。

+ HTML5的form如何关闭自动完成功能？

      给不想要提示的 form 或某个 input 设置为 autocomplete=off。

+ 页面可见性（Page Visibility API） 可以有哪些用途？

      通过 visibilityState 的值检测页面当前是否可见，以及打开网页的时间等;
      在页面被切换到其他后台进程的时候，自动暂停音乐或视频的播放；

