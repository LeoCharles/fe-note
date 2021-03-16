# EventTarget 学习笔记

- [概述](#概述)

- [事件模型](#事件模型)

## 概述

## 事件模型

### 事件触发的三个阶段

一个事件发生后，会在子元素和父元素之间传播，分成三个阶段：

- 捕获阶段：从 window 对象往 目标节点 传播，遇到注册的捕获事件会触发
- 目标阶段：在目标节点上触发注册的事件
- 冒泡阶段：从 目标节点 往 window 对象传播，遇到注册的冒泡事件会触发

事件触发一般来说会按照上面的顺序进行，但是也有特例，如果给一个目标节点同时注册冒泡和捕获事件，事件触发会按照注册的顺序执行。

```js
// 以下会先打印 '冒泡' 然后是 '捕获'
node.addEventListener(
  'click',
  event => {
    console.log('冒泡')
  },
  false
)
node.addEventListener(
  'click',
  event => {
    console.log('捕获 ')
  },
  true
)
```

### 注册事件

使用 addEventListener 方法注册事件，该方法接受三个参数：

- type：事件名称，大小写敏感。
- listener：监听函数。事件发生时，会调用该监听函数。
  - 第二个参数除了监听函数，还可以是一个具有 handleEvent 方法的对象。
- useCapture：决定了注册的事件是捕获事件还是冒泡事件，默认值为 false。也可以是对象：
  - capture，布尔值，和 useCapture 作用一样
  - once，布尔值，值为 true 表示该回调只会调用一次，调用后会移除监听
  - passive，布尔值，表示永远不会调用 preventDefault

一般来说，我们只希望事件只触发在目标上，这时候可以使用 stopPropagation 来阻止事件的进一步传播。

通常我们认为 stopPropagation 是用来阻止事件冒泡的，其实该函数也可以阻止捕获事件。

stopImmediatePropagation 同样也能实现阻止事件，但是还能阻止该事件目标执行别的注册事件。

```js
// 阻止向上冒泡
node.addEventListener(
  'click',
  event => {
    event.stopPropagation()
    console.log('冒泡')
  },
  false
)
// 阻止向下捕获
node.addEventListener(
  'click',
  event => {
    event.stopPropagation()
    console.log('捕获')
  },
  true
)
// 彻底取消该事件
node.addEventListener(
  'click',
  event => {
    event.stopImmediatePropagation()
    console.log('冒泡')
  },
  false
)
// 点击 node 只会执行上面的函数，该函数不会执行
node.addEventListener(
  'click',
  event => {
    console.log('捕获 ')
  },
  true
)
```

removeEventListener 方法用来移除 addEventListener 方法添加的事件监听函数。该方法没有返回值。

dispatchEvent 方法在当前节点上触发指定事件，从而触发监听函数的执行。

### 事件代理

由于事件会在 冒泡阶段 向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件代理（delegation）。

如果子节点是动态生成的，监听函数依然有效。

```js
var ul = document.querySelector('ul')
ul.addEventListener('click', function(event) {
  if (event.target.tagName.toLowerCase() === 'li') {
    // ...
  }
})
```
