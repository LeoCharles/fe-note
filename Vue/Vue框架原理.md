# Vue 框架原理

+ [MVVM框架](#MVVM)
+ [前端路由原理](#前端路由原理)
+ [虚拟DOM](#虚拟dom)

## MVVM

MVVM 由以下三个内容组成：

+ View：视图
+ Model：数据模型
+ ViewModel；负责沟通 View 和 Model 的桥梁。

在 MVVM 中，最核心的就是数据的双向绑定。视图通过数据驱动，数据一旦改变就会刷新视图。如果视图发生改变，也会改变对应的数据。这样就可以在业务处理中只关心数据的流转，不要直接操作 DOM。

Vue 通过数据劫持实现数据双向绑定。

### 数据劫持

Vue 内部使用了 Object.defineProperty() 来实现双向绑定，通过设定对象属性的 setter/getter 方法来监听数据的变化，通过 getter 进行依赖收集，而每个 setter 方法就是一个观察者，在数据变更的时候通知订阅者更新视图。

```js
// 劫持数据，将数据变成可观察的（observable）
function observe(obj) {
  if (!obj || typeof obj !== 'object') {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}
// 改造数据 定义属性的 getter 和 setter
function defineReactive(obj, key, val) {
  // 递归 劫持属性的属性值
  observe(val)
  // 修改属性描述对象
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      console.log('get value')
      return val
    },
    set: function reactiveSetter (newVal) {
      console.log('set value')
      val = newVal
    }
  })
}

// js
let data = { name: 'Leo' }
observe(data)
let name = data.name; // get value
data.name = 'Tom'; // set value
```

以上代码简单的实现了如何监听数据的 set 和 get 的事件，但是仅仅如此是不够的，还需要在适当的时候给属性添加订阅。

```js
// 订阅器
class Dep {
  constructor() {
    // 用来收集订阅者实例
    this.subs = []
  }
  // 添加订阅者实例
  addSub(sub) {
    this.subs.push(sub)
  }
  // 通知所有订阅者更新视图
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

// 全局属性，通过该属性配置观察者实例
Dep.target = null

// 模拟视图更新
function update(value) {
  document.querySelector('div').innerText = value
}

// 观察者
class Watcher {
  constructor(obj, key, cb) {
    Dep.target = this
    this.cb = cb
    this.obj = obj
    this.key = key
    this.value = obj[key]
    Dep.target =  null
  }
  update() {
    // 获取新值
    this.value = this.obj[this.key]
    // 调用 update 方法更新 DOM
    this.cb(this.value)
  }
}
// 对 defineReactive 函数进行改造 给属性添加监听
function defineReactive(obj, key, val) {
  observe(val)
  // 为每个属性创建 订阅器 实例
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      console.log('get value')
      // 将观察者实例添加到订阅器，观察者实例也就变成了订阅者
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return val
    },
    set: function reactiveSetter (newVal) {
      console.log('set value')
      val = newVal
      // 数据改变时 通过订阅器通知所有的订阅者(观察者)更新视图
      dep.notify()
    }
  })
}

// html
<div>
    {{name}}
</div>
// js
var data = { name: 'Leo' }
observe(data)
// 模拟解析到 `{{name}}` 触发的操作
new Watcher(data, 'name', update)
// update Dom innerText
data.name = 'Tom'
```

以上实现了一个简易的双向绑定，核心思路就是手动触发一次属性的 getter 来实现发布订阅的添加。

### Vue 数据绑定的实现

![Vue数据绑定](/img/shujvbangding.png)

+ Observer 数据劫持，能够对数据对象的所有属性进行劫持并添加订阅，如有变动可拿到最新值并通知订阅者。
+ Compile 指令解析器，它的作用对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。
+ Watcher 观察者(也是订阅者)， 作为连接 Observer 和 Compile 的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数。
+ Dep 消息订阅器，内部维护了一个数组，用来收集订阅者（Watcher），数据变动触发 notify 函数，通知所有的订阅者(观察者)调用 update 方法。

当执行 new Vue() 时，Vue 就进入了初始化阶段，一方面 Vue 会遍历 data 选项中的属性，并用 Observerr 实现数据变化监听功能；另一方面，Vue 的指令编译器 Compile 对元素节点的指令进行扫描和解析，初始化视图，并订阅 Watcher 来更新视图，此时Wather 会将自己添加到消息订阅器中 Dep，初始化完毕。当数据发生变化时，Observer 中的 setter 方法被触发，setter 会立即调用 Dep.notify()，订阅者收到通知后对视图进行相应的更新。

### Proxy 与 Object.defineProperty 对比

Object.defineProperty 虽然已经能够实现双向绑定了，但是他还是有缺陷的：

+ 只能对属性进行数据劫持，所以需要深度遍历整个对象
+ 对于数组不能监听到数据的变化

虽然 Vue 中确实能检测到数组数据的变化，但是其实是使用了 hack 的办法，并且也是有缺陷的。

Proxy 就没以上的问题，原生支持监听数组变化，并且可以直接对整个对象进行拦截

## 前端路由原理

前端路由本质上是监听 URL 的变化，然后匹配路由规则，显示相应的页面，并且无需刷新。

目前实现的方式有两种：

+ hash 模式
+ history 模式

### hash 模式

`www.test.com/#` 就是 Hash URL，当 # 后面的哈希值发生变化时，不会向服务器请求数据，可以通过 hashchange 事件来监听到 URL 的变化，从而进行跳转页面。

![hash模式](/img/hash.png)

### history 模式

history 模式是 HTML5 新推出的功能，比之 Hash URL 更加美观。通过 pushState 和 replaceState 两个 API 可以改变 URL 地址且不会发送请求。同时通过 popstate 事件，来监听 URL 的变化。

但因为没有 # 号，所以当用户刷新页面之类的操作时，浏览器还是会给服务器发送请求。为了避免出现这种情况，所以这个实现需要服务器的支持，需要把所有路由都重定向到根页面。

![history模式](/img/history.png)

## 虚拟DOM

操作 DOM 是很耗费性能的一件事情，因此可以考虑通过 JS 对象来模拟 DOM 对象，帮助我们更高效的操作 DOM。

Vue 通过将 JS 对象 VNode 与 DOM 的 Node 对象一一对应，这样对 VNode 的操作就可以实现对 DOM 的操作，这样就可以避免频繁的 DOM 操作带来的性能问题。

在实际操作中，还需要给每个 VNode 一个标识，作为判断是同一个节点的依据。所以这也是 Vue 中官方推荐列表里的节点使用唯一的 key 来保证性能的原因。

JS 对象模拟 DOM 对象的简单实现：

```js
export default class VNode {
  /**
   * @param {String} tag element类型 如'div'
   * @param {Object} props node的属性 如 { class: 'item' }
   * @param {Array}  children 子节点 [ vnode1, 'text']
   * @param {String} key option
   * */
  constructor (tag, props, children, key) {
    this.tag = tag
    this.props = props
    if (Array.isArray(children)) {
      this.children = children
    } else if (isString(children)) {
      this.key = children
      this.children = null
    }
    if (key) this.key = key
  }
  // 渲染函数
  render () {
    let root = this._createElement(this.tag, this.props, this.children, this.key)
    document.body.appendChild(root)
    return root
  }
  // 初始化
  create () {
    return this._createElement(this.tag, this.props, this.children, this.key)
  }
  // 创建 DOM 节点
  _createElement (tag, props, child, key) {
    // 通过 tag 创建节点
    let el = document.createElement(tag)
    // 设置节点属性
    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        const value = props[key]
        el.setAttribute(key, value)
      }
    }
    if (key) {
      el.setAttribute('key', key)
    }
    // 递归添加子节点
    if (child) {
      child.forEach(element => {
        let child
        // 判断是否为虚拟节点
        if (element instanceof VNode) {
          child = this._createElement(
            element.tag,
            element.props,
            element.children,
            element.key
          )
        } else {
          child = document.createTextNode(element)
        }
        el.appendChild(child)
      })
    }
    return el
  }
}
```

我们已经通过 JS 来模拟实现了 DOM，那么接下来的难点就在于如何判断旧的对象和新的对象之间的差异。

### diff 算法

DOM 是多叉树的结构，如果需要完整的对比两颗树的差异，那么需要的时间复杂度会是 O(n^3)，这个复杂度肯定是不能接受的。于是 React 团队优化了算法，实现了 O(n) 的复杂度来对比差异。

实现 O(n) 复杂度的关键就是只对比同层的节点，而不是跨层对比。判断差异的 diff 算法就分为了两步：

+ 首先从上至下，从左往右遍历对象，也就是树的深度遍历，这一步中会给每个节点添加索引，便于最后渲染差异
+ 一旦节点有子元素，就去判断子元素是否有不同

树的递归：

首先我们来实现树的递归算法，在实现该算法前，先来考虑下两个节点对比会有几种情况：

+ 新的节点的 tagName 或者 key 和旧的不同，这种情况代表需要替换旧的节点，并且也不再需要遍历新旧节点的子元素了，因为整个旧节点都被删掉了
+ 新的节点的 tagName 和 key（可能都没有）和旧的相同，开始遍历子树
+ 没有新的节点，那么什么都不用做

判断属性的更改：

判断属性的更改也分三个步骤：

+ 遍历旧的属性列表，查看每个属性是否还存在于新的属性列表中
+ 遍历新的属性列表，判断两个列表中都存在的属性的值是否有变化
+ 在第二步中同时查看是否有属性不存在与旧的属性列列表中

判断列表差异：

这个算法是整个 Virtual Dom 中最核心的算法，这里的主要步骤其实和判断属性差异是类似的，也是分为三步：

+ 遍历旧的节点列表，查看每个节点是否还存在于新的节点列表中
+ 遍历新的节点列表，判断是否有新的节点
+ 在第二步中同时判断节点是否有移动

该算法只对有 key 的节点做处理。