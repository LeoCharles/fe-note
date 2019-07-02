# React 基础

+ [JSX](#JSX)
+ [组件](#组件)
+ [组件生命周期](#组件生命周期)
+ [事件处理](#事件处理)
+ [条件渲染和列表渲染](#条件渲染和列表渲染)
+ [表单](#表单)
+ [状态提升](#状态提升)

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

## 组将生命周期

### 装载

+ `constructor()`

  组件的构造函数将会在其装载之前被调用，构造函数用于两个目的：初始化状态、绑定事件处理方法

  如果不初始化状态，也不绑定方法，就不需要为组件实现构造函数

+ `static getDerivedStateFromProps()`

  组件实例化后和接受新属性时将会调用

+ `render()`

+ `componentDidMount()`

  组件被装载后调用，可以在这里发送网络请求，初始化 DOM 节点

### 更新

+ `static getDerivedStateFromProps()`

  组件实例化后和接受新属性时将会调用

+ `shouldComponentUpdate()`

  当接收到新属性或状态时，在渲染前被调用，默认为 `true`

+ `render()`

+ `getSnapshotBeforeUpdate()`

  最新的渲染输出提交给DOM前将会立即调用，这一生命周期返回的任何值将会 作为参数被传递给`componentDidUpdate()`

+ `componentDidUpdate()`

  在更新发生后调用，对于初次的渲染，该方法并不会调用

  可以立即调用 `setState()`，但是要注意 必须把它包裹在一个条件中，否则你将引发一个无限循环

### 卸载

+ `componentWillUnmount()`

  组件被卸载和销毁之前调用，可以在这里处理必要的清理工作，例如解绑定时器，取消网络请求

## 事件处理

React 事件绑定属性的命名采用驼峰式写法，而不是小写

采用 JSX 的语法需要传入一个函数作为事件处理函数，而不是一个字符串

不能使用返回 `false` 的方式阻止默认行为，必须明确的使用 `preventDefault`

类的方法默认不会绑定 `this`，需要手动绑定 `this`，可以通过箭头函数和 `bind()`

使用箭头函数传参时，需要显式传递事件对象 `e`

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
  }
  // 事件对象 e 被隐式传递
  handleToggle(msg, e) {
    // 使用 e.preventDefault() 阻止默认行为
    e.preventDefault()
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
    alert(msg)
  }
  // 事件对象 e 要放在参数最后
  handleClick(msg, e) {
    e.preventDefault()
    alert(msg)
  }
  // 使用属性初始化语法绑定 this
  handleClickMe = (e) => {
    e.preventDefault()
    console.log(this)
  }
  render() {
    return (
      // 使用 bind 绑定 this ,事件对象 e 会被隐式传递
      <button onClick={this.handleToggle.bind(this, 'toggle!')}>
        {this.state.isToggleOn ? 'On' : 'Off'}
      </button>
      // 使用属性初始化语法绑定 this ,事件对象 e 会被隐式传递
      <button onClick={this.handleClickMe}>click me</button>
      // 使用箭头函数(可能有性能问题)需要显式传递 事件对象 e
      <button onClick={(e) => this.handleClick('click!', e)}>click</button>
    );
  }
}
```

## 条件渲染和列表渲染

React 中的条件渲染和 JavaScript 中的一致，使用 `if` 或`条件运算符`来创建表示当前状态的元素

`true && expression` 总是返回 `expression`，而 `false && expression` 总是返回 `false`，如果条件是 `true`，`&&` 右侧的元素就会被渲染，如果是 `false`，React 会忽略

使用 `map()` 函数渲染列表，给每个列表元素分配一个 `key`

```jsx
class LoginControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }
  handleLogoutClick = () => {
    this.setState({isLoggedIn: false})
  }
  handleLogInClick = () => {
    this.setState({isLoggedIn: true})
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn
    let button = null
    // 条件渲染
    if (isLoggedIn) {
      button = <button onClick={this.handleLogoutClick}>Logout</button>
    } else {
      button = <button onClick={this.handleLogInClick}>Login</button>
    }
    return (
      <div>
        {button}
      </div>
    );
  }
}
// 使用 map 渲染列表
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()} value={number} />
      )}
    </ul>
  );
}
```

## 表单

在 HTML 当中，像 `<input>`，`<textarea>`，和 `<select>`这类表单元素会维持自身状态，并根据用户输入进行更新

但在 React 中，可变的状态通常保存在组件的状态属性中，并且只能用 `setState()` 方法进行更新

在表单元素上将 `value`设置为 `state` 状态的值，按键触发 `change` 事件，在处理函数中 使用 `setState()` 改变 `state` 状态的值，成为受控组件

在HTML当中，`<input type="file">` 标签的 value 属性是只读的， 所以它是 React 中的一个非受控组件

```jsx
class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      gender: ''
    }
  }
  handleInputChange(e) {
    const target = e.target
    const name = target.name
    const value = target.value
    this.setState({
     [name]: value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    const {name, password, gender} = this.state
    console.log(name, password, gender)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>name:
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange.bind(this)} />
        </label>
        <label>password:
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange.bind(this)} />
        </label>
        <label>male:
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={this.handleInputChange.bind(this)}/>
        </label>
        <label>female
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={this.handleInputChange.bind(this)}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
```

## 状态提升

核心思想：把数据抽离到最近的共同父组件，父组件管理状态 `state`，然后通过属性 `props` 传递给子组件。

## 组合

## Context

使用 `context`, 可以避免通过中间元素层层传递 `props`。

## Hook

`Hook` 可以在不编写 `class` 的情况下使用 `state` 以及其他的 React 特性。
