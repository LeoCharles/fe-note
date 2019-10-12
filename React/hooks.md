# React Hooks

使用 `hooks` 不用再区分无状态组件（Function）和有状态组件（Class），所有组件都是Function。

使用 `hooks` 不能再用 `componentDidMount` 、`componentDidUpdate` 等这些生命周期函数。

不能在循环、条件判断或子函数中使用 `hooks`。

## useState

`useState` 是用来声明状态变量的函数。

参数是状态初始值，它返回一个数组，数组第 0 项是当前状态值，第 1 项是改变状态值的方法。

```js
import React, { useState } from 'react';

function Example() {
  // 使用 useState 声明状态变量
  const [count, setCount] = useState(0)

  return (
    <div>
      <p> You clicked {count} times </p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

## useEffect

`useEffect` 是用来处理副作用（Ajax 请求后端数据、操作 DOM等）的函数。

可以把 `useEffect` 看作 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 这三个的组合。

`useEffect` 第一个参数是匿名函数，用于处理副作用，可以返回一个函数来清除副作用。

`useEffect` 第二个参数是一个数组，可以传入多个状态变量，当状态变量发生更新时才能清除上一次的副作用，空数组表示组件销毁时才能清除副作用。

```js
import React, { useState, useEffect } from 'react'

function Example() {
  const [count, setCount] = useState(0)

  // 首次渲染（componentDidMount） 及 count 更新时（componentDidUpdate）会触发副作用，执行这个匿名函数
  useEffect(() => {
    console.log(`useEffect=> you clicked ${count} times`)

    // 返回一个函数用于清除副作用，相当于 componentWillUnmount
    return () => {
      console.log('对上一个 effect 进行清除');
    }

  // 第二个参数是一个数组，当 count 变化时才清除副作用，如果是 [] 表示组件销毁时清除副作用
  }, [count])

  return (
    <div>
      <p> You clicked {count} times </p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

## useContext

`useContext` 用于跨组件传值，实现数据共享。

`useContext` 接收一个 context 对象（React.createContext的返回值），并返回该 context 的当前值。

```js
// Example.js 父组件
import React, { useState, createContext } from 'react'
import Counter from './Counter.js' // 引入子组件
// 创建 context 对象并导出
export const CountContext = createContext()

export default function Example() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p> You clicked {count} times </p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      {/* 通过 value 传入共享数据， 当父组件 count 变化时，子组件也会发生改变 */}
      <CountContext.Provider value={count}>
        <Counter />
      </CountContext.Provider>
    </div>
  )
}
/* ======================================================================== */
// Counter.js 子组件
import React, { useContext } from 'react'
// 引入上下文
import { CountContext } from './Example.js'

export default function Counter() {
  // 接收上下文中的共享数据
  const count = useContext(CountContext)
  return (
    <h1>{count}</h1>
  )
}
```

## useReducer

`useReducer` 是 useState 的替代方案。

```js
import React, { useReducer } from 'react'

```

## useCallback

## useMemo

## useRef

## useImperativeHanle

## useLayoutEffect

## 自定义 hook
