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
// 定义属性的 getter 和 setter
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

### Proxy 与 Object.defineProperty 对比

Object.defineProperty 虽然已经能够实现双向绑定了，但是他还是有缺陷的：

+ 只能对属性进行数据劫持，所以需要深度遍历整个对象
+ 对于数组不能监听到数据的变化

虽然 Vue 中确实能检测到数组数据的变化，但是其实是使用了 hack 的办法，并且也是有缺陷的。

Proxy 就没以上的问题，原生支持监听数组变化，并且可以直接对整个对象进行拦截

## 前端路由原理

## 虚拟DOM