# React 学习笔记

## JSX

JSX 是可选的，我们可以直接用 `React.createElment` 来构建组件的 DOM 树， 第一个参数是标签名，第二个参数是属性对象，第三个参数是子元素

一个包含子元素的例子：

```js
  var child = React.createElement('li', null, 'Text Contnt');
  var root = React.createElement('ul', {className: 'my-list'}, child);
  React.render(root, document.body);
```

利用 JSX 编写 DOM 结构，可以用原生的 HTML 标签，也可以直接像普通标签一样引用 React 组件

这两者约定通过大小写来区分，小写的字符串是 HTML 标签，大写开头的变量是 React 组件

HTML 里的 `class` 在 JSX 里要写成 `className`，因为 `class` 在 JS 里是保留关键字

属性值使用表达式，用 `{}` 替换 `""`

在 JSX 里注释要用 `{}` 包起来

## 组件

组件有两个核心概念：`props` 和 `state`

`props` 是组件的属性，由外部通过 JSX 属性传入，一旦初始设置完成，就可以认为 `this.props` 是不可更改的

`state` 是组件的状态，可以把组件简单看成一个“状态机”，根据状态 `state` 呈现不同的 UI 展示

通过 `this.setState` 方法来修改状态， 一旦状态（数据）更改，组件就会自动调用 `render` 重新渲染 UI

无状态组件：这种组件没有状态，没有生命周期，只是简单的接受 `props` 渲染生成 DOM 结构，可以用纯粹的函数来定义无状态组件

组件生命周期：

+ `componentWillMount` (不安全，下个大版本将移除)

  在 `render` 之前调用，在挂载之前调用一次，可以在这个方法里调用 `setState` 改变状态

+ `componentDidMount`

  在 `render` 之后调用，在挂载之后调用一次，从这里开始可以通过 `ReactDOM.findDOMNode` 方法获取组件的 DOM 节点

+ `componentWillReceiveProps`

+ `shouldComponentUpdate`

+ `componentWillUpdate`

+ `componentDidUpdate`

+ `componentWillUnmount`

React 里面绑定事件的方式和在 HTML 中绑定事件类似，使用驼峰式命名，注意要显式调用 `bind(this)` 将事件函数上下文绑定要组件实例上

DOM 操作：

当组件加载到页面上之后（mounted），可以通过 `react-dom` 提供的 `findDOMNode()` 方法拿到组件对应的 DOM 元素

通过在要引用的 DOM 元素上面设置一个 `ref` 属性指定一个名称，然后通过 `this.refs.name` 来访问对应的 DOM 元素。