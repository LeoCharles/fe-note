# Redux 基础

## 基本概念和 API

+ `store`

  `store` 就是保存数据的地方，可以看成一个容器，整个容器只能有一个 `store`

  Redux 提供 `createStore` 方法用来生成 `store`

```js
import { createStore } from 'redux'
// createStore 接受另一个函数作为参数，返回新生成的 store 对象
const store = createStore(fn)

```

+ `state`

  `state` 对象包含所有数据，当前时刻的 `state`， 可以通过 `store.getState()` 拿到

  Redux 规定， 一个 `state` 对应一个 `view`，只要 `state` 相同，`view` 就相同

```js
import { createStore } from 'redux'
const store = createStore(fn)
const state = store.getState()
```

+ `action`

  `action` 是一个对象，其中 `type` 属性是必须的，表示 `action` 的名称，其他属性可以自由设置

  `action` 描述当前发生的事情，改变 `state` 的唯一方法就是使用 `action`， 它会运送数据到 `store`

```js
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
}
```

+ `action creator`

  如果都手写 `action`，会很麻烦，可以定义一个函数来生成 `action`，这个函数叫 `action creator`

```js
const ADD_TODO = 'ADD_TODO'

function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

const action = addTodo('Learn Redux')
```

+ `store.dispatch()`

  `store.dispatch()` 是 view 发出 action 的唯一方法

```js
import { createStore } from 'redux'
const store = createStore(fn)

store.dispatch({
  type: 'ADD_TODO',
  playload: 'Learn Redux'
})

// 结合 action creator
store.dispatch(addTodo('Learn Redux'))
```

+ `reducer`

  `store` 收到 `action` 以后，必须给出要给新的 `state`， 这样 view 才会发生变化,这种 `state` 的计算过程就叫 `reducer`

  `reducer` 是一个函数， 它接受 `action` 和当前 `state` 作为参数，返回一个新的 `state`

```js
const defaultState = 0
const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'ADD':
      return state + action.playload
    default:
      return state
  }
}

const state = reducer(1, {
  type: 'ADD',
  playload: 2
})
```

  实际应用中，`reducer` 函数不用像上面那样手动调用，`store.dispatch()` 方法会触发 `reducer` 自动执行

  这需要在生成 `store` 的时候，将 `reducer` 传入 `createStore` 方法

```js
import { createState } from 'redux'
const store = createStore(reducer)
```

  `reducer` 是一个纯函数，也就是说，只要同样的输入，必定得到同样的输出

+ `store.subscribe`

  `store` 允许使用 `store.subscribe` 方法设置监听函数， 一旦 `state` 发生变化，就自动执行这个函数

  `store.subscribe` 方法返回一个函数，调用这个函数就可以解除监听

```js
let unsubscribe = store.subscribe( () => {
  console.log(store.getState())
})

unsubscribe()
```