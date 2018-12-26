# React 基础

+ [JSX](#JSX)
+ [元素渲染](#元素渲染)

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

## 元素渲染
