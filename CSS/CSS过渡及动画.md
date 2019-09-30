# CSS过渡及动画

- `transition` 过度动画

  - `transition-property`：属性
  - `transition-duration`：间隔
  - `transition-timing-function`：动画曲线
  - `transition-delay`：延迟
  - 常用钩子：`transitionend`

- `transform` 变形

  - `transform: translate(12px, 50%)`：平移
  - `transform: rotate(30deg)`：旋转
  - `transform: scale(1.5)`：缩放
  - `transform: skew(20deg)`：倾斜

- `animation / keyframes` 动画

  - `animation-name`: 动画名称，对应 `@keyframes`
  - `animation-duration`: 间隔
  - `animation-timing-function`: 曲线
  - `animation-delay`: 延迟
  - `animation-iteration-count`: 次数
    - `infinite`: 循环动画
  - `animation-direction`: 方向
    - `alternate`: 反向播放
  - `animation-fill-mode`: 静止模式
    - `forwards`: 停止时，保留最后一帧
    - `backwards`: 停止时，回到第一帧
    - `both`: 同时运用 `forwards / backwards`
  - 常用钩子: `animationend`

```CSS
/* 关键帧动画 */
@keyframes testAnimation {
  0%   {background: red; left:0; top:0;}
  25%  {background: yellow; left:200px; top:0;}
  50%  {background: blue; left:200px; top:200px;}
  75%  {background: green; left:0; top:200px;}
  100% {background: red; left:0; top:0;}
}
div {
  width: 100px;
  height: 50px;
  position: absolute;
  animation-name: testAnimation;
  animation-duration: 5s;
}
```

- animation 逐帧动画

```CSS
/* 逐帧动画 */
.fadeIn {
  animation: fadeIn .5s ease 1s both;
}
@keyframes fadeIn{
  from{
    opacity:0;
  }
  to{
    opacity:1
  }
}
```
