# CSS

+ 介绍一下标准的CSS的盒子模型？低版本IE的盒子模型有什么不同的？

      （1）有两种， IE 盒子模型、W3C 盒子模型；
      （2）盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)；
      （3）区  别： IE 盒子模型 的 content 部分把 border 和 padding计算了进去;

+ CSS选择符有哪些？哪些属性可以继承？

      （1）、通配符选择器（*），选择所有元素，不参与计算优先级
      （2）、id选择器（#）
      （3）、类选择器（.）
      （4）、标签选择器（div, h1, p）
      （5）、后代选择器（ul li）
      （6）、子选择器（X > Y），选择X的子元素中满足Y选择器的元素，兼容性： IE7+
      （7）、直接兄弟选择器（X + Y），在X之后第一个兄弟节点中选择满足Y选择器的元素，兼容性： IE7+
      （8）、兄弟选择器（X ~ Y），选择X之后所有兄弟节点中满足Y选择器的元素，兼容性： IE7+
      （9）、属性选择器：
            [attr]：选择所有设置了attr属性的元素，兼容性IE7+
            [attr=value]：选择属性值刚好为value的元素
            [attr~=value]：选择属性值为空白符分隔，其中一个的值刚好是value的元素
            [attr|=value]：选择属性值刚好为value或者value-开头的元素
            [attr^=value]：选择属性值以value开头的元素
            [attr$=value]：选择属性值以value结尾的元素
            [attr=value]*：选择属性值中包含value的元素
      （10）、伪类选择器
            ：link，：visited，：focus，：hover，：active链接状态，选择特定状态的链接元素
            :hover：鼠标移入状态的元素
            :not(selector)：选择不符合selector的元素。不参与计算优先级，兼容性：IE9+
            :checked，选择单选框，复选框，下拉框中选中状态下的元素，兼容性：IE9+
            :disabled，控制表单控件为禁用状态的元素，兼容性：IE9+
            :nth-child(an + b)：伪类，选择前面有an + b - 1个兄弟节点的元素，其中n >= 0， 兼容性IE9+
            :nth-last-child(an + b)：伪类，选择后面有an + b - 1个兄弟节点的元素 其中n >= 0，兼容性IE9+
            X:nth-of-type(an+b)：伪类，X为选择器，解析得到元素标签，选择前面有an + b - 1个相同标签兄弟节点的元素。兼容性IE9+
            X:nth-last-of-type(an+b)：伪类，X为选择器，解析得到元素标签，选择后面有an+b-1个相同标签兄弟节点的元素。兼容性IE9+
            X:first-child：伪类，选择满足X选择器的元素，且这个元素是其父节点的第一个子元素。兼容性IE7+
            X:last-child：伪类，选择满足X选择器的元素，且这个元素是其父节点的最后一个子元素。兼容性IE9+
            X:only-child：伪类，选择满足X选择器的元素，且这个元素是其父元素的唯一子元素。兼容性IE9+
            X:only-of-type：伪类，选择X选择的元素，解析得到元素标签，如果该元素没有相同类型的兄弟节点时选中它。兼容性IE9+
            X:first-of-type：伪类，选择X选择的元素，解析得到元素标签，如果该元素是此此类型元素的第一个兄弟。选中它。兼容性IE9+
      （11）、伪元素选择器
            X:after, X::after：after伪元素，选择元素虚拟子元素（元素的最后一个子元素），CSS3中::表示伪元素。兼容性:after为IE8+，::after为IE9+
            ::first-letter：伪元素，选择块元素第一行的第一个字母
            ::first-line：伪元素，选择块元素的第一行

      可继承的样式：
            关于文字排版的属性：font word-break letter-spacing text-align text-rendering word-spacing white-space text-indent text-transform text-shadow
            颜色：color
            可见性：visibility
            鼠标：cursor
      不可继承的样式：border padding margin width height

+ 盒子垂直水平居中？

      （1）、盒子宽高已知：
            position: absolute(relative)；left: 50%; top: 50%; margin-left:-(自身一半宽度); margin-top: -(自身一半高度);
      （2）、盒子宽高不定：
            position: absolute(relative)；left: 50%; top: 50%; transform: translate(-50%, -50%);
      （3）、flex布局：
            父级：
                  display: flex; /*flex 布局*/
                  align-items: center; /*实现垂直居中*/
                  justify-content: center; /*实现水平居中*/
      （4）、只在水平方向居中：
            margin-left : 50% ; transform: translateX(-50%);

+ display有哪些值？说明他们的作用。

      block             块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
      none              此元素不会被显示。
      inline            行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
      inline-block      默认宽度为内容宽度，可以设置宽高，同行显示。
      list-item         象块类型元素一样显示，并添加样式列表标记。
      table             此元素会作为块级表格来显示。
      inherit           规定应该从父元素继承 display 属性的值。

+ display: none与visibility: hidden的区别？

      （1）、display:none;会让元素完全从渲染树中消失，渲染的时候不占据任何空间；visibility: hidden;不会让元素从渲染树消失，渲染师元素继续占据空间，只是内容不可见。
      （2）display: none;是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示；visibility: hidden;是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式
      （3）、修改常规流中元素的display通常会造成文档重排。修改visibility属性只会造成本元素的重绘。
      （4）、读屏器不会读取display: none元素内容；会读取visibility: hidden元素内容

+ display: block和display: inline的区别

      block元素特点：
      （1）、处于常规流中时，如果width没有设置，会自动填充满父容器
      （2）、可以应用margin/padding
      （3）、在没有设置高度的情况下会扩展高度以包含常规流中的子元素
      （4）、处于常规流中时布局时在前后元素位置之间（独占一个水平空间）
      （5）、忽略vertical-align

      inline元素特点：
      （1）、水平方向上根据direction依次布局
      （2）、不会在元素前后进行换行
      （3）、受white-space控制
      （4）、margin/padding在竖直方向上无效，水平方向上有效
      （5）、width/height属性对非替换行内元素无效，宽度由元素内容决定
      （6）、非替换行内元素的行框高由line-height确定，替换行内元素的行框高由height,margin,padding,border决定
      （7）、浮动或绝对定位时会转换为block
      （8）、vertical-align属性生效

+ css hack原理及常用hack

      原理：利用不同浏览器对CSS的支持和解析结果不一样编写针对特定浏览器样式。常见的hack有属性hack、选择器hack、IE条件注释。
      （1）、IE条件注释
      条件注释：由于IE8下CSS问题较少，一般只需要为IE6、7写一点修正代码
      <!--[if lt IE 8]>
            IE6、IE7 修正代码
      <![endif]-->
      （2）、选择器hack：不同浏览器对选择器的支持不一样
      （3）、属性hack：不同浏览器解析bug或方法
            #content{
                  background:red; /* 所有浏览器 */
                  background:orange\9; /* 所有IE浏览器 */
                  *background:yellow; /* IE7和IE6 */
                  +background:green; /* IE7 */
                  _background:blue; /* IE6 */
            }

+ CSS3有哪些新特性？

      （1）、新增各种CSS选择器
            E:last-child 匹配父元素的最后一个子元素E。
            E:nth-child(n) 匹配父元素的第n个子元素E。
            E:nth-last-child(n) CSS3 匹配父元素的倒数第n个子元素E。
      （2）、字体规则 （@Font-face）
            Font-face 可以用来加载字体样式，而且它还能够加载服务器端的字体文件，让客户端显示客户端所没有安装的字体。
      （3）、媒体查询（@media）
      （4）、圆角（border-radius），盒阴影（box-shadow），边界图片（border-image）
      （5）、多列布局（multi-column layout）
      （6）、阴影（shadow）
      （7）、文字阴影（text-shadow）
      （8）、线性渐变（gradient）
      （9）、转换（transform），将元素旋转，缩放，移动，倾斜等
      （10）、过渡动画（transition）
      （11）、动画（animation）
      （12）、盒模型（box-sizing）

+ 请解释一下CSS3的Flexbox（弹性盒布局模型）,以及适用场景？

      Flex可以把列表放在同一个方向（从上到下排列，从左到右），并让列表能延伸到占用可用的空间。
      较为复杂的布局还可以通过嵌套一个伸缩容器（flex container）来实现。
      采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。
      它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称"项目"。
      常规布局是基于块和内联流方向，而Flex布局是基于flex-flow流可以很方便的用来做局中，能对不同屏幕大小自适应。

+ 对BFC规范(块级格式化上下文：block formatting context)的理解？

      W3C 规范中的一个概念,它是一个独立容器，决定了元素如何对其内容进行定位,以及与其他元素的关系和相互作用。一个页面是由很多个 Box 组成的,元素的类型和 display 属性,决定了这个 Box 的类型。
      不同类型的 Box,会参与不同的 Formatting Context（决定如何渲染文档的容器）,因此Box内的元素会以不同的方式渲染,也就是说BFC内部的元素和外部的元素不会互相影响。