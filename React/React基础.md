# React 基础

+ [JSX](#JSX)
+ [组件](#组件)
+ [事件处理](#事件处理)

## JSX

React 是一个构建用户界面的 JavaScript 库

JSX 是一种 JavaScript 语法扩展，看起来像比较像模板语言，但实际上完全由 JavaScript 实现

可以在 JSX 中使用 `JavaScript 表达式`，推荐在 JSX

JSX 本身也是一种表达式，可以在 `if` 或 `for` 语句里使用 JSX ，将它赋值给变量，当作参数传入，作为返回值都可以

可以使用引号来定义以字符串为值得属性

可以使用大括号来定义以 JavaScript 表达式为值得属性

JSX 使用小驼峰命名来定义属性名称，如 class 变为 className，tabindex 变为 tabIndex

Babel 转译器会把 JXS 转换成一个名为 `React.createElement()` 的方法调用

```jsx
function formatName(user) {
  return user.firstName + '' + user.lastName;
}
function getGreeting(user) {
  if (user) {
    return <h1>hello, {formatName(user)}!</h1>
  } else {
    return <h1>hello, stranger!</h1>
  }
}
const user = {
  firstName: 'Leo',
  lastName: 'Charles'
};
const element = (
  <h1>
    hello, {formatName(user)}!
  </h1>
);
ReactDOM.render(element, document.getElementById('root'));

// 以字符串为值得属性
const tabElement = <div tabIndex="0"></div>
// 以 JavaScript 表达式为值的属性
const imgElement = <img src={user.avatarUrl}/>

const element = (
  <h1 className="greeting">
    hello, world
  </h1>
)
// 等价于
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'hello, world'
)
```

## 组件

组件就像是函数，输入 `props`，返回 React 元素，定义一个组件最简单的方式是使用 JavaScript 函数

也可以使用 `ES6 class`

组件不能修改自己的 `props`

```jsx
// 函数组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}
// 使用 类 定义组件
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

状态 `state` 是私有的，受控于当前组件，使用 `this.setState()` 来更新状态

状态更新可能是异步的，此时使用第二种形式的 `setState()` 来接受一个函数而不是一个对象

组件可以选择将其 状态 作为 属性 传递给其子组件

```jsx
// 时钟组件
class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }
  // 使用 setState 修改状态
  tick() {
    // 接收一个对象
    this.setState({
      date: new Date()
    })
    // 接收一个函数
    this.setState((prevState, props) => (
      {date: new Date()}
    ))
  }
  // 挂载
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }
  // 卸载
  componentWillUnmount() {
    clearInterval(this.timerID)
  }
  render() {
    return (
      <div>
        <h1>{this.state.date.toLocaleTimeString()}</h1>
      </div>
    );
  }
}
```

## 事件处理

React 事件绑定属性的命名采用驼峰式写法，而不是小写

采用 JSX 的语法需要传入一个函数作为事件处理函数，而不是一个字符串

不能使用返回 ``false` 的方式阻止默认行为，必须明确的使用 `preventDefault`

类的方法默认不会绑定 `this`，需要手动绑定 `this`

```jsx
// HTML 中属性名不用驼峰命名
<button onclick="handleClick()">click</button>
// JSX 中写法
class Toggle  extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggleOn: true
    }
    // 绑定 this
    this.handleClick = this.handleClick.bind(this)
  }
  // 回调函数
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
  }
  // 或者
  // handleClick = () => {
  //   this.setState(prevState => ({
  //     isToggleOn: !prevState.isToggleOn
  //   }))
  // }
  render() {
    return (
      // 采用驼峰命名
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'On' : 'Off'}
      </button>
    );
  }
}
```
