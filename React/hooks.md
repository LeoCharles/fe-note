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

/* ====================================================== */

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

`useReducer` 是 useState 的替代方案，用于 state 逻辑较复杂包含多个子值，或下一个 state 依赖于之前的 state 等。

`useReducer` 接收一个 reducer（形如 `(state, action) => newState`），返回当前的 state 以及与其配套的 dispatch 方法。

```js
import React, { useReducer } from 'react'
// 初始 state
const initialState = {count: 0}

function reducer(state, action) {
  switch(action.type) {
    case 'increment':
      return {count: state.count + 1}
    case 'decrement':
      return {count: state.count - 1}
    default:
      return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      <p> You clicked {state.count} times </p>
      <button onClick={() => dispatch({type: 'increment'})}>Increment</button>
      <button onClick={() => dispatch({type: 'decrement'})}>Decrement</button>
    </div>
  )
}
```

使用 `useContext` 和 `useReducer` 可以实现类似 Redux 的效果。

```js
// Example.js 父组件
import React from 'react'
import ShowArea from './ShowArea.js'
import Buttons from './Buttons.js'
import Color from './Color.js'

export default Example() {
  return (
    <Color>
      <ShowArea />
      <Buttons />
    </Color>
  )
}

/* ====================================================== */

// ShowArea.js 展示颜色组件
import React, {useContext} from 'react'
import {ColorContext} from './Color.js' // 引入 context

export default function ShowArea() {
  // 通过 useContext 得到 Color 组件中传递的 color
  const { color } = useContext(ColorContext)

  return (
    <div style={{color: color}}>字体颜色为：{color}</div>
  )
}

/* ====================================================== */

// Buttons.js 按钮组件
import React, {useContext} from 'react'
import {ColorContext, UPDATE_COLOR} from './Color.js' // 引入 context

export default function Buttons() {
  // 通过 useContext 得到 Color 组件中传递的 dispatch
  const {dispatch} = useContext(ColorContext)

  return (
    <div>
      <button onClick={() => dispatch({type: UPDATE_COLOR, color: 'red'})}>红色</button>
      <button onClick={() => dispatch({type: UPDATE_COLOR, color: 'blue'})}>蓝色</button>
    </div>
  )
}

/* ====================================================== */

// Color.js 颜色共享组件
import React, {createContext, useReducer} from 'react'

// 创建 context 并导出
export const ColorContext = createContext({})
// reducer 类型常量
export const UPDATE_COLOR = 'UPDATE_COLOR'
// reducer
const reducer = (state, action) => {
  switch(action.type) {
    case UPDATE_COLOR:
      return action.color
    default:
      return state
  }
}

// Color 组件包裹的所有塑件可以访问到 value
export default function Color(props) {
  const [color, dispatch] = useReducer(reducer, '#333')
  // 向子组件传递 color 和 dispatch
  return (
    <ColorContext.Provider value={{color, dispatch}}>
      {props.children}
    </ColorContext.Provider>
  )
}
```

## useMemo

`useMemo` 用来优化使用 hooks 产生的无用渲染的性能问题。

使用 function 的形式来声明组件，不能使用 `shouldComponentUpdate` 这个生命周期，无法通过组件更新前条件来决定组件是否更新。

在函数中也不再区分 `mount` 和 `update` 两个状态，这意味着函数组件的每天调用都会执行内部所有逻辑，带来很大损耗。

使用 `useMemo` ， 第一个参数是计算函数，第二个参数是依赖项数组，返回值是要缓存的数据或组件，任何一个依赖项发生变化时就会重新调用计算函数生成新的返回值。

```js
import React, {useState, useMemo} from 'react'

export default function Example() {
  const [count, setCount] = useState(0)
  // 返回一个缓存的值
  const result = useMemo(() => {
    return <p>{Date.now()}</p>
  }, [count]) // 当 count 改变时，result 才会改变，如果是空数组，result 只会计算一次

  return (
    <div>
      <p> You clicked {count} times </p>
      <div> {result} </div>
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  )
}
```

## useCallback

`useCallback` 和 `useMemo` 类似，都会在组件第一次渲染时执行，之后在其依赖的变量改变时在次执行，`useCallback`返回的是缓存的函数，`useMemo` 返回的是缓存的值。

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`

## useRef

`useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数。

主要两个作用：

1. 获取 JSX 中的 DOM 元素， 需要将 ref 对象以  `<div ref={myRef} />` 形式传入组件。

2. 保存变量。用来保存在组件每次渲染后不会被重复声明的变量，如 DOM 节点，定时器 id 等

```js
import React, {useEffect, useRef} from 'react'

export default function Ref() {
  
  // 使用 useRef 获取 input 元素
  const inputEl = useRef(null)

  // input 在渲染后自动聚焦
  useEffect(() => {
    // current 指向 input 元素，然后就可以操作 DOM 了
    inputEl.current.focus()
  })

  return (
    <div>
      <input ref={inputEl}/>
    </div>
  )
}
```

## useImperativeHandle

`useImperativeHandle` 子组件可以选择性的暴露一些方法给父组件，这样可以隐藏一些私有方法和属性。

`useImperativeHandle` 应当与 `forwardRef` 一起使用。

```js
import React, {useImperativeHandle, useRef, forwardRef} from 'react'

// 配合 forwardRef 一起使用
const FancyInput = forwardRef((props, ref) => {
  const ref = useRef()
  // 对外暴露方法
  useImperativeHandle(ref, () => {
    focus() {
      ref.current.value = 'hello'
    }
  })
  return <input ref={ref}/>
})

export default function Example() {
  const inputRef = useRef()
  useEffect(() => {
    // 调用子组件的方法
    inputRef.current.focus()
  })
  return (
    <div><FancyInput ref={inputRef}/></div>
  )
}

```

## useLayoutEffect

`useLayoutEffect` 与 `useEffect` 相同，但它会在所有 DOM 变更后同步调用 effect。

主要用来读取 DOM 布局并触发同步渲染。

## 自定义 Hook

通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。

自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook。

```js
import React, {useState, useEffect, useRef} from 'react'

// 模拟 componentDidMount
function useDidMount(fn) {
  // 第二个参数为 []，只在首次渲染时调用
  useEffect(() => fn && fn(), [])
}

// 模拟 componentWillUnmount
function useWillUnmount(fn) {
  useEffect(() => {
    return () => fn && fn()
  }, [])
}

// 模拟 componentDidUpdate
function useDidUpdate(fn, deps) {
  const ref = useRef(false)
  useEffect(() => {
    // 首次渲染不执行
    if(!ref.current){
      ref.current = true
      return
    } else {
      return fn && fn()
    }
  }, deps)
}

// 拖拽事件
function useDraggable(ref) {
  const [{dx, dy}, setOffset] = useState({dx: 0, dy: 0})

  useEffect(() => {
    if(ref.current === null) {
      throw new Error(`[useDraggable] ref未注册到组件中`)
    }
    const el = ref.current

    const handleMouseDown = (e) => {
      const startX = e.pageX - dx
      const startY = e.pageY - dy

      const handleMouseMove = (e) => {
        const newDx = e.pageX - startX
        const newDy = e.pageY - startY
        setOffset({dx: newDx, dy: newDy})
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', handleMouseMove)
      }, {once: true})
    }

    el.addEventListener('mousedown', handleMouseDown)

    return () => {
      if(ref.current) {
        ref.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
      }
    }
  }, [dx, dy])
}



```
