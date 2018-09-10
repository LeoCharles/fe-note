# 移动Web开发

+ meta基础知识点

```HTML
<!-- 页面窗口自动调整到设备宽度，并禁止用户及缩放页面 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0,maximum-scale=1.0, user-scalable=0" />

<!-- 忽略将页面中的数字识别为电话号码 -->
<meta name="format-detection" content="telephone=no" />

<!-- 忽略Android平台中对邮箱地址的识别 -->
<meta name="format-detection" content="email=no" />

<!-- 当网站添加到主屏幕快速启动方式，可隐藏地址栏，仅针对ios的safari -->
<meta name="apple-mobile-web-app-capable" content="yes" />

<!-- 将网站添加到主屏幕快速启动方式，仅针对ios的safari顶端状态条的样式 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
```

+ 在android或者IOS下 拨打电话/发短信/发邮件代码如下：

```HTML
<a href="tel:15602512356">打电话给:15602512356</a>
<a href="sms:10010">发短信给: 10010</a>
<a href="mailto:tugenhua@126.com">发电子邮件</a>
```

+ 移动端IOS手机下清除输入框内阴影，代码如下

```CSS
  input, textarea {
    -webkit-appearance: none;
  }
```
