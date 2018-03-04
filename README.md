# 前端面试资料

+ viewport

```Html
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

  1. 通过jsonp跨域
